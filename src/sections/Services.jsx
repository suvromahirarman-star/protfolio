import React from 'react';
import { servicesData } from '../data/portfolioData';
import { Server, Network, Database, Layout, PlugZap, Layers, ArrowRight } from 'lucide-react';

export function Services({ onSelectService }) {
  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Server':
        return <Server className="w-6 h-6 text-electric-400" />;
      case 'Network':
        return <Network className="w-6 h-6 text-indigoAcc-400" />;
      case 'Database':
        return <Database className="w-6 h-6 text-rose-400" />;
      case 'Layout':
        return <Layout className="w-6 h-6 text-cyan-400" />;
      case 'PlugZap':
        return <PlugZap className="w-6 h-6 text-emerald-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-purple-400" />;
      default:
        return <Server className="w-6 h-6 text-electric-400" />;
    }
  };

  const handleDiscuss = (serviceTitle) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 bg-dark-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-400/30 text-electric-300 text-xs font-mono font-semibold uppercase tracking-wider">
            Freelance Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What I Can Build For You
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Delivering clean code, reliable backend architecture, and responsive user experiences tailored to your business needs.
          </p>
        </div>

        {/* Services Grid (6 cards) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="p-7 rounded-2xl glass-card glass-card-hover flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-dark-800 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-md">
                  {getServiceIcon(service.icon)}
                </div>

                <span className="text-[11px] font-mono text-electric-400 font-semibold uppercase tracking-wider">
                  {service.category}
                </span>

                <h3 className="text-xl font-bold text-white mt-1 group-hover:text-electric-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => handleDiscuss(service.title)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 group-hover:text-electric-300 transition-colors cursor-pointer"
                >
                  <span>Discuss Project</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
