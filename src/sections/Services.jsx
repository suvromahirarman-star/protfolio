import React from 'react';
import { servicesData } from '../data/portfolioData';
import { Server, Network, Database, Layout, PlugZap, Layers, ArrowRight } from 'lucide-react';

export function Services({ onSelectService }) {
  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Server':
        return <Server className="w-6 h-6 text-[#FF6B00]" />;
      case 'Network':
        return <Network className="w-6 h-6 text-[#FF8533]" />;
      case 'Database':
        return <Database className="w-6 h-6 text-[#0A0A0A]" />;
      case 'Layout':
        return <Layout className="w-6 h-6 text-[#FF6B00]" />;
      case 'PlugZap':
        return <PlugZap className="w-6 h-6 text-emerald-600" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#FF8533]" />;
      default:
        return <Server className="w-6 h-6 text-[#FF6B00]" />;
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
    <section id="services" className="py-24 bg-[#FAFAFA] relative border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F3F3] border border-[#E5E5E5] text-[#525252] text-xs font-mono font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            <span>Freelance Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A0A0A] tracking-tight">
            What I Can Build <span className="text-[#FF6B00]">For You.</span>
          </h2>
          <p className="text-[#525252] text-sm sm:text-base leading-relaxed">
            Delivering clean code, reliable backend architecture, and responsive user experiences tailored to solve your business challenges.
          </p>
        </div>

        {/* Services Grid (6 cards) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="p-7 rounded-2xl bg-[#F3F3F3] border border-[#E5E5E5] hover:border-[#FF6B00]/40 transition-all duration-200 group flex flex-col justify-between shadow-xs hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <div className="w-13 h-13 rounded-xl bg-white border border-[#E5E5E5] group-hover:border-[#FF6B00]/30 flex items-center justify-center mb-5 transition-transform group-hover:scale-105 shadow-xs">
                  {getServiceIcon(service.icon)}
                </div>

                <span className="text-[11px] font-mono text-[#FF6B00] font-semibold uppercase tracking-wider">
                  {service.category}
                </span>

                <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0A] mt-1 group-hover:text-[#FF6B00] transition-colors">
                  {service.title}
                </h3>

                <p className="text-[#525252] text-xs sm:text-sm mt-3 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5E5E5]">
                <button
                  type="button"
                  onClick={() => handleDiscuss(service.title)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#525252] group-hover:text-[#FF6B00] transition-colors cursor-pointer"
                >
                  <span>Inquire About This Service</span>
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
