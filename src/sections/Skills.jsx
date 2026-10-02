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

  const getSkillIcon = (name) => {
    switch (name) {
      case 'HTML5':
        return <FileCode className="w-5 h-5 text-amber-500" />;
      case 'CSS3':
        return <Palette className="w-5 h-5 text-blue-500" />;
      case 'JavaScript':
        return <Code className="w-5 h-5 text-amber-500" />;
      case 'Tailwind CSS':
        return <Palette className="w-5 h-5 text-cyan-500" />;
      case 'Responsive Design':
        return <Smartphone className="w-5 h-5 text-purple-500" />;
      case 'Node.js':
        return <Cpu className="w-5 h-5 text-emerald-600" />;
      case 'Express.js':
        return <Server className="w-5 h-5 text-[#FF6B00]" />;
      case 'REST APIs':
        return <Network className="w-5 h-5 text-[#FF8533]" />;
      case 'CRUD APIs':
        return <Database className="w-5 h-5 text-emerald-600" />;
      case 'Server-Side Logic':
        return <Server className="w-5 h-5 text-[#FF6B00]" />;
      case 'Git':
        return <GitBranch className="w-5 h-5 text-orange-500" />;
      case 'GitHub':
        return <GithubIcon className="w-5 h-5 text-[#0A0A0A]" />;
      case 'VS Code':
        return <Laptop className="w-5 h-5 text-blue-500" />;
      default:
        return <Code className="w-5 h-5 text-[#FF6B00]" />;
    }
  };

  const categories = [
    { key: 'all', label: 'All Technologies' },
    { key: 'backend', label: 'Backend Architecture', count: skillsData.backend.length },
    { key: 'frontend', label: 'Frontend Interface', count: skillsData.frontend.length },
    { key: 'tools', label: 'Tools & Workflow', count: skillsData.tools.length },
  ];

  const getFilteredGroups = () => {
    if (activeCategory === 'backend') return [{ title: 'Backend Specialization (Primary Focus)', items: skillsData.backend }];
    if (activeCategory === 'frontend') return [{ title: 'Frontend Capabilities', items: skillsData.frontend }];
    if (activeCategory === 'tools') return [{ title: 'Development Tools & Environment', items: skillsData.tools }];

    return [
      { title: 'Backend Specialization (Primary Focus)', items: skillsData.backend },
      { title: 'Frontend Capabilities', items: skillsData.frontend },
      { title: 'Development Tools & Environment', items: skillsData.tools },
    ];
  };

  return (
    <section id="skills" className="py-24 bg-[#FAFAFA] relative border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F3F3] border border-[#E5E5E5] text-[#525252] text-xs font-mono font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            <span>Technical Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A0A0A] tracking-tight">
            Specialized Skills &amp; <span className="text-[#FF6B00]">Technologies.</span>
          </h2>
          <p className="text-[#525252] text-sm sm:text-base leading-relaxed">
            The verified, production-ready technologies I use daily to build reliable backend services, RESTful APIs, and modern responsive interfaces.
          </p>

          {/* Filter tabs */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-[#FF6B00] text-white shadow-sm shadow-[#FF6B00]/25 font-bold'
                    : 'bg-[#F3F3F3] text-[#525252] hover:text-[#0A0A0A] hover:bg-[#E5E5E5] border border-[#E5E5E5]'
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
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#737373] font-semibold border-b border-[#E5E5E5] pb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                <span>{group.title}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-5 rounded-xl bg-[#F3F3F3] border border-[#E5E5E5] hover:border-[#FF6B00]/40 transition-all duration-200 group flex items-start gap-4 shadow-xs hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="w-11 h-11 rounded-lg bg-white border border-[#E5E5E5] group-hover:border-[#FF6B00]/30 flex items-center justify-center flex-shrink-0 transition-colors shadow-xs">
                      {getSkillIcon(skill.name)}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm sm:text-base font-bold text-[#0A0A0A] tracking-tight group-hover:text-[#FF6B00] transition-colors">
                          {skill.name}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#FF6B00] border border-[#E5E5E5] font-semibold">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-[#525252] mt-1.5 leading-relaxed">
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
