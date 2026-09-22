import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  developerInfo as defaultDeveloperInfo,
  socialLinks as defaultSocialLinks,
  projectsData as defaultProjectsData,
  skillsData as defaultSkillsData,
  servicesData as defaultServicesData,
} from '../data/portfolioData';
import { getAsset, setAsset, clearAllAssets } from '../utils/storage';

const PortfolioContext = createContext(null);

const STORAGE_KEYS = {
  DEV_INFO: 'portfolio_dev_info',
  SOCIAL_LINKS: 'portfolio_social_links',
  PROJECTS: 'portfolio_projects',
  ADMIN_PIN: 'portfolio_admin_pin',
  PROFILE_IMAGE: 'portfolio_profile_image',
};

const DEFAULT_PIN = '1234';

export function PortfolioProvider({ children }) {
  const [developerInfo, setDeveloperInfo] = useState(defaultDeveloperInfo);
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks);
  const [projects, setProjects] = useState(defaultProjectsData);
  const [adminPin, setAdminPin] = useState(DEFAULT_PIN);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load custom configurations on startup from IndexedDB & LocalStorage
  useEffect(() => {
    async function loadData() {
      try {
        // Load custom profile photo from IndexedDB if saved
        const savedPhoto = await getAsset(STORAGE_KEYS.PROFILE_IMAGE);
        const savedDevInfo = localStorage.getItem(STORAGE_KEYS.DEV_INFO);
        const savedSocial = localStorage.getItem(STORAGE_KEYS.SOCIAL_LINKS);
        const savedProjects = await getAsset(STORAGE_KEYS.PROJECTS);
        const savedPin = localStorage.getItem(STORAGE_KEYS.ADMIN_PIN);

        if (savedPhoto) {
          setDeveloperInfo((prev) => ({ ...prev, profileImage: savedPhoto }));
        }
        if (savedDevInfo) {
          setDeveloperInfo((prev) => ({
            ...prev,
            ...JSON.parse(savedDevInfo),
            profileImage: savedPhoto || JSON.parse(savedDevInfo).profileImage || prev.profileImage,
          }));
        }
        if (savedSocial) {
          setSocialLinks((prev) => ({ ...prev, ...JSON.parse(savedSocial) }));
        }
        if (savedProjects) {
          const parsed = typeof savedProjects === 'string' ? JSON.parse(savedProjects) : savedProjects;
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProjects(parsed);
          }
        }
        if (savedPin) {
          setAdminPin(savedPin);
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

  // Verify PIN
  const verifyPin = (inputPin) => {
    if (inputPin === adminPin) {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  // Change Admin PIN
  const changePin = (newPin) => {
    setAdminPin(newPin);
    localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, newPin);
  };

  // Reset to original factory defaults
  const resetToDefaults = async () => {
    await clearAllAssets();
    setDeveloperInfo(defaultDeveloperInfo);
    setSocialLinks(defaultSocialLinks);
    setProjects(defaultProjectsData);
    setAdminPin(DEFAULT_PIN);
    setIsAdminAuthenticated(false);
  };

  // Export current data as JSON or JS configuration
  const getExportableData = () => {
    return {
      developerInfo,
      socialLinks,
      projects,
    };
  };

  return (
    <PortfolioContext.Provider
      value={{
        isLoaded,
        developerInfo,
        socialLinks,
        projects,
        adminPin,
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

