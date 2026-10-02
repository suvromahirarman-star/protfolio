import React, { useEffect, useState } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2, Code2, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

export function ProjectModal({ project, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Close modal on Escape key & lock scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  const rawScreenshots = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [project.image];

  const resolvePath = (p) => (typeof p === 'string' && p.startsWith('/src/assets') ? p.replace('/src/assets', '') : p);

  const rawCurrent = rawScreenshots[activeImageIndex] || project.image;
  const [currentSrc, setCurrentSrc] = useState(resolvePath(rawCurrent));

  useEffect(() => {
    setImageError(false);
    setCurrentSrc(resolvePath(rawScreenshots[activeImageIndex] || project.image));
  }, [activeImageIndex, project]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleNextImage = () => {
    setImageError(false);
    setActiveImageIndex((prev) => (prev + 1) % rawScreenshots.length);
  };

  const handlePrevImage = () => {
    setImageError(false);
    setActiveImageIndex((prev) => (prev - 1 + rawScreenshots.length) % rawScreenshots.length);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-4xl min-h-screen sm:min-h-0 bg-[#121212] border-0 sm:border border-[#262626] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-6 py-4 bg-[#171717] border-b border-[#262626]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-[#1A1A1A] border border-[#FF6B00]/30 text-[#FF8533] text-xs font-mono font-medium">
              {project.category}
            </span>
            <h2 id="modal-title" className="text-base sm:text-lg font-bold text-white line-clamp-1">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 md:p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)] sm:max-h-[82vh]">
          {/* Main Screenshot / Preview Carousel */}
          <div className="relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-[#262626] shadow-inner group">
            <div className="relative w-full h-64 sm:h-80 md:h-96 flex items-center justify-center">
              {!imageError ? (
                <img
                  src={currentSrc}
                  alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                  onError={handleImageError}
                  className="w-full h-full object-cover object-top transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#121212] to-[#0A0A0A] relative">
                  <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-[#262626] flex items-center justify-center mb-3 text-[#FF6B00]">
                    <Code2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-neutral-200">{project.title}</h4>
                  <p className="text-xs text-[#FF8533] font-mono mt-1">
                    Slide {activeImageIndex + 1} of {rawScreenshots.length}
                  </p>
                </div>
              )}

              {/* Prev / Next controls if multiple screenshots */}
              {rawScreenshots.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/75 text-white hover:bg-[#121212] border border-[#262626] transition-colors backdrop-blur-sm cursor-pointer"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/75 text-white hover:bg-[#121212] border border-[#262626] transition-colors backdrop-blur-sm cursor-pointer"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigator */}
            {rawScreenshots.length > 1 && (
              <div className="flex items-center justify-center gap-2 p-3 bg-[#171717] border-t border-[#262626]">
                {rawScreenshots.map((shot, idx) => (
                  <button
                    key={shot + idx}
                    type="button"
                    onClick={() => {
                      setImageError(false);
                      setActiveImageIndex(idx);
                    }}
                    className={`w-12 h-8 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#FF6B00] scale-105 shadow-md shadow-[#FF6B00]/25'
                        : 'border-[#262626] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="w-full h-full bg-[#0A0A0A] flex items-center justify-center text-[10px] text-neutral-400 font-mono">
                      #{idx + 1}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Links & Quick Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#171717] border border-[#262626]">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md bg-[#121212] border border-[#262626] text-xs font-mono font-medium text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A1A1A] hover:bg-[#262626] text-white text-xs font-medium border border-[#262626] transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#FF8533] text-white text-xs font-bold transition-all shadow-md shadow-[#FF6B00]/25"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Overview, Challenge & Solution */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono">
                Project Overview
              </h3>
              <p className="mt-2 text-neutral-200 text-sm sm:text-base leading-relaxed">
                {project.overview || project.description}
              </p>
            </div>

            {project.problem && project.solution && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#171717] border border-[#262626]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF8533] font-mono">
                    The Challenge / Problem
                  </span>
                  <p className="mt-1.5 text-neutral-300 text-xs sm:text-sm leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#171717] border border-[#262626]">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                    The Architectural Solution
                  </span>
                  <p className="mt-1.5 text-neutral-300 text-xs sm:text-sm leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono mb-3">
                Key Technical Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[#171717] border border-[#262626] text-neutral-300 text-xs sm:text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
