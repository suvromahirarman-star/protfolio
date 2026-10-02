import React, { useState, useEffect } from 'react';
import { ExternalLink, Eye, Server, Layers, Code, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

export function ProjectCard({ project, onViewDetails, isHeroCard = false }) {
  const getInitialSrc = () => {
    if (typeof project.image === 'string' && project.image.startsWith('/src/assets')) {
      return project.image.replace('/src/assets', '');
    }
    return project.image;
  };

  const [srcAttempt, setSrcAttempt] = useState(getInitialSrc());
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
    setSrcAttempt(getInitialSrc());
  }, [project.image]);

  const handleImageError = () => {
    setImageError(true);
  };

  const renderCategoryIcon = () => {
    if (project.category.toLowerCase().includes('backend')) {
      return <Server className="w-3.5 h-3.5 text-[#FF6B00]" />;
    }
    if (project.category.toLowerCase().includes('frontend')) {
      return <Layers className="w-3.5 h-3.5 text-[#FF8533]" />;
    }
    return <Code className="w-3.5 h-3.5 text-white" />;
  };

  return (
    <article
      className={`group flex flex-col justify-between h-full rounded-2xl bg-[#121212] overflow-hidden border border-[#262626] hover:border-[#FF6B00]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 ${
        isHeroCard ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Top Preview Section */}
      <div className={`relative w-full ${isHeroCard ? 'h-64 sm:h-72 lg:h-80' : 'h-52 sm:h-56'} bg-[#0A0A0A] overflow-hidden border-b border-[#262626] flex items-center justify-center`}>
        {!imageError ? (
          <img
            src={srcAttempt}
            alt={`${project.title} preview`}
            loading="lazy"
            onError={handleImageError}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Technical Mockup Fallback */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#121212] to-[#0A0A0A] relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-25" />
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#1A1A1A] border border-[#262626] flex items-center justify-center mb-3">
              {renderCategoryIcon()}
            </div>
            <h4 className="relative z-10 text-sm font-semibold text-neutral-200 text-center px-4 line-clamp-1">
              {project.title}
            </h4>
            <span className="relative z-10 text-[11px] font-mono text-[#FF8533] mt-1">
              {project.technologies.slice(0, 2).join(' • ')}
            </span>
          </div>
        )}

        {/* Category badge overlay */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0A0A]/90 backdrop-blur-md border border-[#262626] text-xs font-mono text-neutral-200 shadow-md">
          {renderCategoryIcon()}
          <span>{project.category}</span>
        </div>

        {/* Featured Pill */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-[#FF6B00] text-white text-[10px] font-bold tracking-wider uppercase shadow-sm shadow-[#FF6B00]/30">
            Featured
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FF8533] transition-colors line-clamp-1">
            {project.title}
          </h3>

          <p className="text-neutral-300 text-xs sm:text-sm mt-2.5 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-[#1A1A1A] border border-[#262626] text-neutral-300 text-[11px] font-mono font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-5 mt-5 border-t border-[#262626] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* GitHub Button */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#262626] text-white text-xs font-medium border border-[#262626] transition-colors"
                title="View GitHub Repository"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}

            {/* Live Demo Button (ONLY if available) */}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF6B00] hover:bg-[#FF8533] text-white text-xs font-bold transition-all shadow-sm shadow-[#FF6B00]/25"
                title="View Live Demo"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* View Details Button */}
          <button
            type="button"
            onClick={() => onViewDetails(project)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors ml-auto cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Details</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
