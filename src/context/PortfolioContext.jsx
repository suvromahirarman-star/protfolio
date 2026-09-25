import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  developerInfo as defaultDeveloperInfo,
  socialLinks as defaultSocialLinks,
  projectsData as defaultProjectsData,
  authConfig as defaultAuthConfig,
} from '../data/portfolioData';
import { getAsset, setAsset, clearAllAssets } from '../utils/storage';
import { verifySecurePin, updateSecurePin } from '../utils/security';
import {
  fetchCloudPortfolio,
  saveCloudPortfolio,
  uploadCloudImage,
  updateCloudPin,
  isSupabaseConfigured,
} from '../utils/supabase';

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
  const [isCloudConnected, setIsCloudConnected] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Initial Local Cache Load + Cloud Auto-Sync
  useEffect(() => {
    async function loadData() {
      try {
        // Fast local initialization
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

        // 2. Fetch live data from Supabase Cloud if configured
        if (isSupabaseConfigured()) {
          const cloudData = await fetchCloudPortfolio();
          if (cloudData) {
            setIsCloudConnected(true);
            if (cloudData.developerInfo) {
              setDeveloperInfo((prev) => ({ ...prev, ...cloudData.developerInfo }));
            }
            if (cloudData.socialLinks) {
              setSocialLinks((prev) => ({ ...prev, ...cloudData.socialLinks }));
            }
            if (cloudData.projects && Array.isArray(cloudData.projects)) {
              setProjects(cloudData.projects);
            }
            if (cloudData.pinHash) {
              setCurrentPinHash(cloudData.pinHash);
              localStorage.setItem(STORAGE_KEYS.PIN_HASH, cloudData.pinHash);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
      } finally {
        setIsLoaded(true);
      }
    }

    loadData();
  }, []);

  // Fetch or refresh live cloud data on demand
  const refreshCloudData = async () => {
    if (!isSupabaseConfigured()) return false;
    try {
      const cloudData = await fetchCloudPortfolio();
      if (cloudData) {
        setIsCloudConnected(true);
        if (cloudData.developerInfo) {
          setDeveloperInfo((prev) => ({ ...prev, ...cloudData.developerInfo }));
        }
        if (cloudData.socialLinks) {
          setSocialLinks((prev) => ({ ...prev, ...cloudData.socialLinks }));
        }
        if (cloudData.projects && Array.isArray(cloudData.projects)) {
          setProjects(cloudData.projects);
        }
        if (cloudData.pinHash) {
          setCurrentPinHash(cloudData.pinHash);
          localStorage.setItem(STORAGE_KEYS.PIN_HASH, cloudData.pinHash);
        }
        return true;
      }
    } catch (e) {
      console.warn('refreshCloudData error:', e);
    }
    return false;
  };

  // Update profile photo (handles either direct file upload to cloud or base64)
  const updateProfilePhoto = async (fileOrUrl) => {
    let finalUrl = fileOrUrl;

    // If a File object is passed and Supabase is configured, upload to cloud storage
    if (typeof fileOrUrl === 'object' && fileOrUrl instanceof File && isSupabaseConfigured()) {
      try {
        finalUrl = await uploadCloudImage(fileOrUrl, 'profile');
      } catch (err) {
        console.warn('Cloud photo upload failed, using local storage:', err);
      }
    }

    await setAsset(STORAGE_KEYS.PROFILE_IMAGE, finalUrl);
    setDeveloperInfo((prev) => {
      const updated = { ...prev, profileImage: finalUrl };
      localStorage.setItem(STORAGE_KEYS.DEV_INFO, JSON.stringify(updated));
      if (isSupabaseConfigured()) {
        saveCloudPortfolio({ developerInfo: updated }).catch(console.error);
      }
      return updated;
    });

    return finalUrl;
  };

  // Developer info updater
  const updateDeveloperInfo = (fields) => {
    setDeveloperInfo((prev) => {
      const updated = { ...prev, ...fields };
      localStorage.setItem(STORAGE_KEYS.DEV_INFO, JSON.stringify(updated));
      if (isSupabaseConfigured()) {
        saveCloudPortfolio({ developerInfo: updated }).catch(console.error);
      }
      return updated;
    });
  };

  // Social & freelance links updater
  const updateSocialLinks = (newLinks) => {
    setSocialLinks((prev) => {
      const updated = { ...prev, ...newLinks };
      localStorage.setItem(STORAGE_KEYS.SOCIAL_LINKS, JSON.stringify(updated));
      if (isSupabaseConfigured()) {
        saveCloudPortfolio({ socialLinks: updated }).catch(console.error);
      }
      return updated;
    });
  };

  // Update a specific project's fields
  const updateProject = async (id, updatedFields) => {
    setProjects((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
      setAsset(STORAGE_KEYS.PROJECTS, updated);
      if (isSupabaseConfigured()) {
        saveCloudPortfolio({ projects: updated }).catch(console.error);
      }
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
      if (isSupabaseConfigured()) {
        saveCloudPortfolio({ projects: updated }).catch(console.error);
      }
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
      if (isSupabaseConfigured()) {
        saveCloudPortfolio({ projects: updated }).catch(console.error);
      }
      return updated;
    });
  };

  // Delete a project
  const deleteProject = async (id) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      setAsset(STORAGE_KEYS.PROJECTS, updated);
      if (isSupabaseConfigured()) {
        saveCloudPortfolio({ projects: updated }).catch(console.error);
      }
      return updated;
    });
  };

  // Verify PIN with salted SHA-256 and brute-force protection
  const verifyPin = async (inputPin) => {
    // If Supabase is connected, optionally refresh cloud PIN before verifying
    let activePinHash = currentPinHash;
    if (isSupabaseConfigured()) {
      try {
        const cloudData = await fetchCloudPortfolio();
        if (cloudData?.pinHash) {
          activePinHash = cloudData.pinHash;
          setCurrentPinHash(cloudData.pinHash);
        }
      } catch (e) {
        console.warn('Could not refresh cloud PIN before verify:', e);
      }
    }

    const result = await verifySecurePin(inputPin, activePinHash);
    if (result.success) {
      setIsAdminAuthenticated(true);
    }
    return result;
  };

  // Change Admin PIN (updates salted SHA-256 hash in state, localStorage, and Supabase cloud)
  const changePin = async (newPin) => {
    const newHash = await updateSecurePin(newPin);
    setCurrentPinHash(newHash);

    // Sync to Supabase Cloud immediately
    if (isSupabaseConfigured()) {
      try {
        await updateCloudPin(newHash);
        setIsCloudConnected(true);
      } catch (err) {
        console.warn('Failed to sync new PIN to Supabase cloud:', err);
      }
    }

    return newHash;
  };

  // Manual trigger to sync current state to cloud
  const syncToCloud = async () => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }
    await saveCloudPortfolio({
      developerInfo,
      socialLinks,
      projects,
      pinHash: currentPinHash,
    });
    setIsCloudConnected(true);
    return true;
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
        isCloudConnected,
        setIsCloudConnected,
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
        syncToCloud,
        refreshCloudData,
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
