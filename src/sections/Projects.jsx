import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCard } from '../components/ProjectCard';
import { Sparkles, Layers } from 'lucide-react';

export function Projects({ onOpenModal }) {
  const { projects } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Full-Stack', 'Backend', 'Frontend', 'API'];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true;
    return (
      (project.filterTags && project.filterTags.includes(activeFilter)) ||
      project.category?.toLowerCase() === activeFilter.toLowerCase()
    );
  });

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 bg-[#0A0A0A] relative border-y border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-[#262626] text-neutral-300 text-xs font-mono font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            <span>Portfolio Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Featured Projects &amp; <span className="text-[#FF6B00]">Real Work.</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Real production applications and backend APIs I have designed and deployed, demonstrating clean architecture, RESTful routing, input validation, and modern responsive interfaces.
          </p>

          {/* Filter Tabs */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#FF6B00] text-white font-bold shadow-md shadow-[#FF6B00]/25'
                    : 'bg-[#121212] text-neutral-300 hover:text-white hover:bg-[#1A1A1A] border border-[#262626]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects Grid */}
        {featuredProjects.length > 0 && (
          <div className="mt-14 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF8533] font-semibold">
              <Sparkles className="w-4 h-4 text-[#FF6B00]" />
              <span>Key Highlights</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewDetails={onOpenModal}
                  isHeroCard={idx === 0 && featuredProjects.length > 2}
                />
              ))}
            </div>
          </div>
        )}

        {/* Additional Projects Section */}
        {otherProjects.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold border-t border-[#262626] pt-8">
              <Layers className="w-4 h-4 text-[#FF6B00]" />
              <span>Additional Projects &amp; Foundational Architecture</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewDetails={onOpenModal}
                />
              ))}
            </div>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-neutral-400">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
