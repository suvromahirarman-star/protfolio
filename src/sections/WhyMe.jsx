import React from 'react';
import { whyWorkWithMe } from '../data/portfolioData';
import { Code2, Smartphone, Server, MessageSquare, Wrench, TrendingUp, Check } from 'lucide-react';

export function WhyMe() {
  const getCardIcon = (iconName) => {
    const iconClass = "w-5 h-5 text-[#FF6B00] transition-transform duration-300 group-hover:scale-110";
    switch (iconName) {
      case 'Code2':
        return <Code2 className={iconClass} />;
      case 'Smartphone':
        return <Smartphone className={iconClass} />;
      case 'Server':
        return <Server className={iconClass} />;
      case 'MessageSquare':
        return <MessageSquare className={iconClass} />;
      case 'Wrench':
        return <Wrench className={iconClass} />;
      case 'TrendingUp':
        return <TrendingUp className={iconClass} />;
      default:
        return <Code2 className={iconClass} />;
    }
  };

  return (
    <section className="py-24 bg-[#FAFAFA] relative overflow-hidden border-b border-[#E5E5E5]">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#FF6B00]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F3F3] border border-[#E5E5E5] text-[#525252] text-xs font-mono font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            <span>Client Advantages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A0A0A] tracking-tight">
            Why Work <span className="text-[#FF6B00]">With Me?</span>
          </h2>
          <p className="text-[#525252] text-sm sm:text-base leading-relaxed">
            The engineering discipline, clear communication standards, and architectural hygiene I bring to every single client project.
          </p>
        </div>

        {/* Benefits Grid (6 cards) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyWorkWithMe.map((item) => (
            <div
              key={item.title}
              className="group p-6 sm:p-7 rounded-2xl bg-[#F3F3F3] border border-[#E5E5E5] hover:border-[#FF6B00]/40 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E5E5] flex items-center justify-center mb-5 group-hover:border-[#FF6B00]/40 group-hover:bg-[#FF6B00]/5 transition-colors shadow-xs">
                  {getCardIcon(item.icon)}
                </div>

                <h3 className="text-lg font-bold text-[#0A0A0A] group-hover:text-[#FF6B00] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#525252] mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5E5E5] flex items-center justify-between text-[11px] font-mono text-[#FF6B00]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="w-3.5 h-3.5" /> Guaranteed Standard
                </span>
                <span className="text-neutral-400 group-hover:text-[#FF6B00] transition-colors font-sans font-bold">
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyMe;
