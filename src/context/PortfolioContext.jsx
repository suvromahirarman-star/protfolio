import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  developerInfo as defaultDeveloperInfo,
  socialLinks as defaultSocialLinks,
  projectsData as defaultProjectsData,
  authConfig as defaultAuthConfig,
} from '../data/portfolioData';
import { getAsset, setAsset, clearAllAssets } from '../utils/storage';
import { verifySecurePin, updateSecurePin, getLockoutStatus } from '../utils/security';

const PortfolioContext = createContext(null);

const STORAGE_KEYS = {
  DEV_INFO: 'portfolio_dev_info',
  SOCIAL_LINKS: 'portfolio_social_links',
  PROJECTS: 'portfolio_projects',
  PROFILE_IMAGE: 'portfolio_profile_image',
  PIN_HASH: 'portfolio_admin_pin_hash',
};

// Helper to sanitize paths away from legacy /src/assets/
function sanitizePath(path) {
  if (typeof path === 'string' && path.startsWith('/src/assets/')) {
    return path.replace('/src/assets/', '/');
  }
  return path;
}

export function PortfolioProvider({ children }) {
  const [developerInfo, setDeveloperInfo] = useState(defaultDeveloperInfo);
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks);
  const [projects, setProjects] = useState(defaultProjectsData);
  const [currentPinHash, setCurrentPinHash] = useState(defaultAuthConfig?.pinHash);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load custom configurations on startup from IndexedDB & LocalStorage
  useEffect(() => {
    async function loadData() {
      try {
        const savedPhoto = await getAsset(STORAGE_KEYS.PROFILE_IMAGE);
        const savedDevInfo = localStorage.getItem(STORAGE_KEYS.DEV_INFO);
        const savedSocial = localStorage.getItem(STORAGE_KEYS.SOCIAL_LINKS);
        const savedProjects = await getAsset(STORAGE_KEYS.PROJECTS);
        const savedPinHash = localStorage.getItem(STORAGE_KEYS.PIN_HASH);

        if (savedPinHash) {
          setCurrentPinHash(savedPinHash);
        } else if (defaultAuthConfig?.pinHash) {
          setCurrentPinHash(defaultAuthConfig.pinHash);
        }

        if (savedPhoto) {
          setDeveloperInfo((prev) => ({ ...prev, profileImage: savedPhoto }));
        }

        if (savedDevInfo) {
          try {
            const parsed = JSON.parse(savedDevInfo);
            setDeveloperInfo((prev) => ({
              ...prev,
              ...parsed,
              profileImage: savedPhoto || sanitizePath(parsed.profileImage) || prev.profileImage,
            }));
          } catch (e) {
            console.warn('Error parsing saved dev info:', e);
          }
        }

        if (savedSocial) {
          try {
            setSocialLinks((prev) => ({ ...prev, ...JSON.parse(savedSocial) }));
          } catch (e) {
            console.warn('Error parsing saved social links:', e);
          }
        }

        if (savedProjects) {
          try {
            const parsed = typeof savedProjects === 'string' ? JSON.parse(savedProjects) : savedProjects;
            if (Array.isArray(parsed) && parsed.length > 0) {
              const sanitizedProjects = parsed.map((p) => ({
                ...p,
                image: sanitizePath(p.image),
                screenshots: (p.screenshots || []).map(sanitizePath),
              }));
              setProjects(sanitizedProjects);
            }
          } catch (e) {
            console.warn('Error parsing saved projects:', e);
          }
        }
      } catch (err) {
        console.error('Failed to load customized portfolio data:', err);
      } finally {
        setIsLoaded(true);
      }
    }

    loadData();
  }, []);

  // Profile photo updater
  const updateProfilePhoto = async (dataUrl) => {
    await setAsset(STORAGE_KEYS.PROFILE_IMAGE, dataUrl);
    setDeveloperInfo((prev) => {
      const updated = { ...prev, profileImage: dataUrl };
      localStorage.setItem(STORAGE_KEYS.DEV_INFO, JSON.stringify(updated));
      return updated;
    });
  };

  // Developer info updater
  const updateDeveloperInfo = (fields) => {
    setDeveloperInfo((prev) => {
      const updated = { ...prev, ...fields };
      localStorage.setItem(STORAGE_KEYS.DEV_INFO, JSON.stringify(updated));
      return updated;
    });
  };

  // Social & freelance links updater
  const updateSocialLinks = (newLinks) => {
    setSocialLinks((prev) => {
      const updated = { ...prev, ...newLinks };
      localStorage.setItem(STORAGE_KEYS.SOCIAL_LINKS, JSON.stringify(updated));
      return updated;
    });
  };

  // Update a specific project's fields
  const updateProject = async (id, updatedFields) => {
    setProjects((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
      setAsset(STORAGE_KEYS.PROJECTS, updated);
      return updated;
    });
  };

  // Update a project's screenshots list
  const updateProjectScreenshots = async (id, screenshots) => {
    setProjects((prev) => {
      const updated = prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            image: screenshots[0] || p.image,
            screenshots: screenshots,
          };
        }
        return p;
      });
      setAsset(STORAGE_KEYS.PROJECTS, updated);
      return updated;
    });
  };

  // Add new project
  const addProject = async (newProject) => {
    const projectWithId = {
      ...newProject,
      id: newProject.id || `custom-${Date.now()}`,
      filterTags: newProject.filterTags || [newProject.category || 'Full-Stack'],
      screenshots: newProject.screenshots || (newProject.image ? [newProject.image] : []),
      featured: newProject.featured ?? true,
    };

    setProjects((prev) => {
      const updated = [projectWithId, ...prev];
      setAsset(STORAGE_KEYS.PROJECTS, updated);
      return updated;
    });
  };

  // Delete a project
  const deleteProject = async (id) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      setAsset(STORAGE_KEYS.PROJECTS, updated);
      return updated;
    });
  };

  // Verify PIN with salted SHA-256 and brute-force protection
  const verifyPin = async (inputPin) => {
    const result = await verifySecurePin(inputPin, currentPinHash);
    if (result.success) {
      setIsAdminAuthenticated(true);
    }
    return result;
  };

  // Change Admin PIN (updates salted SHA-256 hash in state & localStorage)
  const changePin = async (newPin) => {
    const newHash = await updateSecurePin(newPin);
    setCurrentPinHash(newHash);
    return newHash;
  };

  // Reset to original factory defaults
  const resetToDefaults = async () => {
    await clearAllAssets();
    setDeveloperInfo(defaultDeveloperInfo);
    setSocialLinks(defaultSocialLinks);
    setProjects(defaultProjectsData);
    setCurrentPinHash(defaultAuthConfig?.pinHash);
    setIsAdminAuthenticated(false);
  };

  // Export current data as JSON
  const getExportableData = () => {
    return {
      developerInfo,
      socialLinks,
      projects,
      authConfig: { pinHash: currentPinHash },
    };
  };

  return (
    <PortfolioContext.Provider
      value={{
        isLoaded,
        developerInfo,
        socialLinks,
        projects,
        currentPinHash,
        isAdminOpen,
        isAdminAuthenticated,
        setIsAdminOpen,
        setIsAdminAuthenticated,
        updateProfilePhoto,
        updateDeveloperInfo,
        updateSocialLinks,
        updateProject,
        updateProjectScreenshots,
        addProject,
        deleteProject,
        verifyPin,
        changePin,
        resetToDefaults,
        getExportableData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
