/**
 * Code Export Utility
 * Safely generates and exports portfolioData.js ensuring 100% of required exports
 * (whyWorkWithMe, freelanceJourney, contactOptions, etc.) are ALWAYS preserved.
 * Prevents Vercel build failures when updating projects or profile info.
 */

import {
  quickStats,
  aboutPillars,
  skillsData,
  servicesData,
  processSteps,
  whyWorkWithMe,
  whyChoosePoints,
  freelanceJourney,
  journeyTimeline,
  contactOptions,
} from '../data/portfolioData';

/**
 * Formats a single project object as clean JavaScript code snippet ready to paste
 */
export function formatProjectJs(project) {
  const cleanProj = {
    id: project.id || `project-${Date.now()}`,
    title: project.title || 'Untitled Project',
    category: project.category || 'Full-Stack',
    filterTags: project.filterTags || [project.category || 'Full-Stack'],
    featured: Boolean(project.featured),
    image: project.image || '/projects/cineverse.png',
    screenshots: project.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : [project.image || '/projects/cineverse.png'],
    description: project.description || '',
    overview: project.overview || project.description || '',
    problem: project.problem || 'Client or business need requiring scalable software architecture.',
    solution: project.solution || 'Engineered responsive interface and reliable backend API services.',
    technologies: Array.isArray(project.technologies)
      ? project.technologies
      : String(project.technologies || '').split(',').map((t) => t.trim()).filter(Boolean),
    features: project.features && project.features.length > 0
      ? project.features
      : ['Clean code architecture', 'Responsive UI & modern design'],
    github: project.github || null,
    liveDemo: project.liveDemo || null,
  };

  return JSON.stringify(cleanProj, null, 2);
}

/**
 * Generates the complete, production-ready portfolioData.js file content
 */
export function generatePortfolioDataContent({ developerInfo, socialLinks, authConfig, projects }) {
  return `/**
 * Centralized Portfolio Data for Mahir Arman Suvro
 * Exported safely from In-Browser Admin Studio.
 * Includes 100% of required exports for Vite/Vercel build stability.
 */

export const developerInfo = ${JSON.stringify(developerInfo, null, 2)};

export const socialLinks = ${JSON.stringify(socialLinks, null, 2)};

export const authConfig = ${JSON.stringify(authConfig, null, 2)};

export const quickStats = ${JSON.stringify(quickStats, null, 2)};

export const aboutPillars = ${JSON.stringify(aboutPillars, null, 2)};

export const skillsData = ${JSON.stringify(skillsData, null, 2)};

export const servicesData = ${JSON.stringify(servicesData, null, 2)};

export const projectsData = ${JSON.stringify(projects, null, 2)};

export const processSteps = ${JSON.stringify(processSteps, null, 2)};

export const whyWorkWithMe = ${JSON.stringify(whyWorkWithMe, null, 2)};

export const whyChoosePoints = ${JSON.stringify(whyChoosePoints, null, 2)};

export const freelanceJourney = ${JSON.stringify(freelanceJourney, null, 2)};

export const journeyTimeline = ${JSON.stringify(journeyTimeline, null, 2)};

export const contactOptions = ${JSON.stringify(contactOptions, null, 2)};
`;
}

/**
 * Triggers a browser file download of portfolioData.js
 */
export function downloadPortfolioDataFile(data) {
  const fileContent = generatePortfolioDataContent(data);
  const blob = new Blob([fileContent], { type: 'text/javascript;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'portfolioData.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
