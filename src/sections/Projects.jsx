import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCard } from '../components/ProjectCard';
import { Layers, Sparkles } from 'lucide-react';

export function Projects({ onOpenModal }) {
  const { projects } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Backend', 'Frontend', 'API'];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true;
    return (project.filterTags && project.filterTags.includes(activeFilter)) || project.category === activeFilter;
  });

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 bg-dark-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-400/30 text-electric-300 text-xs font-mono font-semibold uppercase tracking-wider">
            Portfolio Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects &amp; Real Work
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Here are some of the web applications and backend APIs I've built, demonstrating routing architecture, CRUD operations, and responsive web design.
          </p>

          {/* Filter Tabs */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-electric-500 text-white font-semibold shadow-lg shadow-electric-500/25'
                    : 'bg-dark-850 text-slate-300 hover:text-white hover:bg-dark-800 border border-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && (
          <div className="mt-14 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-electric-400 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Featured Highlights</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewDetails={onOpenModal}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects Section */}
        {otherProjects.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold border-t border-white/5 pt-8">
              <Layers className="w-4 h-4" />
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
          <div className="text-center py-16 text-slate-400">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
