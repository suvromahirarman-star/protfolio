import React, { useState, useEffect } from 'react';
import { ExternalLink, Eye, Server, Layers, Code } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

export function ProjectCard({ project, onViewDetails }) {
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
    if (typeof srcAttempt === 'string' && !srcAttempt.startsWith('/src/assets') && typeof project.image === 'string' && project.image.startsWith('/src/assets')) {
      setSrcAttempt(project.image);
    } else {
      setImageError(true);
    }
  };

  // Fallback icon based on category
  const renderCategoryIcon = () => {
    if (project.category.toLowerCase().includes('backend')) {
      return <Server className="w-3.5 h-3.5 text-electric-400" />;
    }
    if (project.category.toLowerCase().includes('frontend')) {
      return <Layers className="w-3.5 h-3.5 text-purple-400" />;
    }
    return <Code className="w-3.5 h-3.5 text-cyan-400" />;
  };

  return (
    <article className="group flex flex-col justify-between h-full rounded-2xl glass-card overflow-hidden border border-white/10 hover:border-electric-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-electric-500/10">
      {/* Top Preview Section */}
      <div className="relative w-full h-52 sm:h-56 bg-dark-900 overflow-hidden border-b border-white/5 flex items-center justify-center">
        {!imageError ? (
          <img
            src={srcAttempt}
            alt={`${project.title} preview`}
            loading="lazy"
            onError={handleImageError}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* High-end technical mockup fallback */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-dark-850 to-dark-950 relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-electric-500/10 border border-electric-400/30 flex items-center justify-center mb-3">
              {renderCategoryIcon()}
            </div>
            
            <h4 className="relative z-10 text-sm font-semibold text-slate-200 text-center px-4 line-clamp-1">
              {project.title}
            </h4>
            
            <span className="relative z-10 text-[11px] font-mono text-electric-400 mt-1">
              {project.technologies.slice(0, 2).join(' • ')}
            </span>

            <div className="absolute bottom-2 text-[9px] text-slate-600 font-mono">
              Screenshot Placeholder
            </div>
          </div>
        )}

        {/* Category badge overlay */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-950/85 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-200 shadow-md">
          {renderCategoryIcon()}
          <span>{project.category}</span>
        </div>

        {/* Featured Pill */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-electric-500/20 border border-electric-400/40 text-electric-300 text-[10px] font-semibold tracking-wide uppercase">
            Featured
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-electric-300 transition-colors line-clamp-1">
            {project.title}
          </h3>

          <p className="text-slate-300 text-sm mt-2.5 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-dark-800/80 border border-white/5 text-slate-300 text-xs font-mono font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* GitHub Button */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-200 hover:text-white text-xs font-medium border border-white/10 transition-colors"
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-electric-500/15 hover:bg-electric-500/25 text-electric-300 text-xs font-medium border border-electric-400/30 transition-colors"
                title="View Live Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          {/* View Details Button */}
          <button
            type="button"
            onClick={() => onViewDetails(project)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-300 hover:text-electric-300 hover:bg-white/5 text-xs font-medium transition-colors ml-auto"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
