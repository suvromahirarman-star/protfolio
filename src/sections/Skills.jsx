import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';
import { 
  Server, 
  Layout, 
  Wrench, 
  FileCode, 
  Code, 
  Palette, 
  Smartphone, 
  Cpu, 
  Network, 
  Database, 
  GitBranch, 
  Laptop 
} from 'lucide-react';
import { GithubIcon } from '../components/BrandIcons';

export function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Map skill name to Lucide icon
  const getSkillIcon = (name) => {
    switch (name) {
      case 'HTML5':
        return <FileCode className="w-5 h-5 text-amber-400" />;
      case 'CSS3':
        return <Palette className="w-5 h-5 text-blue-400" />;
      case 'JavaScript':
        return <Code className="w-5 h-5 text-yellow-400" />;
      case 'Tailwind CSS':
        return <Palette className="w-5 h-5 text-cyan-400" />;
      case 'Responsive Design':
        return <Smartphone className="w-5 h-5 text-purple-400" />;
      case 'Node.js':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Express.js':
        return <Server className="w-5 h-5 text-electric-400" />;
      case 'REST APIs':
        return <Network className="w-5 h-5 text-indigoAcc-400" />;
      case 'CRUD APIs':
        return <Database className="w-5 h-5 text-rose-400" />;
      case 'Server-Side Logic':
        return <Server className="w-5 h-5 text-cyan-400" />;
      case 'Git':
        return <GitBranch className="w-5 h-5 text-orange-400" />;
      case 'GitHub':
        return <GithubIcon className="w-5 h-5 text-slate-200" />;
      case 'VS Code':
        return <Laptop className="w-5 h-5 text-blue-400" />;
      default:
        return <Code className="w-5 h-5 text-electric-400" />;
    }
  };

  const categories = [
    { key: 'all', label: 'All Technologies', count: 13 },
    { key: 'backend', label: 'Backend Development', count: skillsData.backend.length, icon: Server },
    { key: 'frontend', label: 'Frontend Development', count: skillsData.frontend.length, icon: Layout },
    { key: 'tools', label: 'Tools & Workflow', count: skillsData.tools.length, icon: Wrench },
  ];

  const getFilteredGroups = () => {
    if (activeCategory === 'backend') return [{ title: 'Backend Specialization', items: skillsData.backend }];
    if (activeCategory === 'frontend') return [{ title: 'Frontend Stack', items: skillsData.frontend }];
    if (activeCategory === 'tools') return [{ title: 'Development Tools', items: skillsData.tools }];

    return [
      { title: 'Backend Specialization (Primary Focus)', items: skillsData.backend },
      { title: 'Frontend Capabilities', items: skillsData.frontend },
      { title: 'Development Tools & Environment', items: skillsData.tools },
    ];
  };

  return (
    <section id="skills" className="py-24 bg-dark-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-400/30 text-electric-300 text-xs font-mono font-semibold uppercase tracking-wider">
            Technical Stack
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Specialized Skills &amp; Technologies
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            The specific, production-ready technologies I use to build reliable backend services, RESTful APIs, and modern responsive interfaces.
          </p>

          {/* Filter tabs */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-electric-500 text-white shadow-lg shadow-electric-500/25 font-semibold'
                    : 'bg-dark-850 text-slate-300 hover:text-white hover:bg-dark-800 border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Groups */}
        <div className="mt-14 space-y-12">
          {getFilteredGroups().map((group) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-semibold border-b border-white/5 pb-2">
                {group.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-5 rounded-2xl glass-card glass-card-hover flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-dark-800 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-inner">
                      {getSkillIcon(skill.name)}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-base font-bold text-white tracking-tight">
                          {skill.name}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-800 text-electric-300 border border-white/5">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
