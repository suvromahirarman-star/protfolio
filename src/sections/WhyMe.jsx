import React from 'react';
import { whyWorkWithMe } from '../data/portfolioData';
import { Code2, Smartphone, Server, MessageSquare, Wrench, TrendingUp, Check } from 'lucide-react';

export function WhyMe() {
  const getCardIcon = (iconName) => {
    const iconClass = "w-5 h-5 text-brand-orange transition-transform duration-300 group-hover:scale-110";
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
    <section className="py-24 bg-brand-black relative overflow-hidden border-t border-white/5">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-orange/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono font-semibold uppercase tracking-wider">
            Client Advantages
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why Work <span className="text-brand-orange">With Me?</span>
          </h2>
          <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
            The engineering discipline, clear communication standards, and architectural hygiene I bring to every single client project.
          </p>
        </div>

        {/* Benefits Grid (6 cards) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyWorkWithMe.map((item) => (
            <div
              key={item.title}
              className="group p-6 sm:p-7 rounded-2xl bg-brand-card/90 border border-white/10 hover:border-brand-orange/40 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-brand-orange/5"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-dark border border-white/10 flex items-center justify-center mb-5 group-hover:border-brand-orange/40 group-hover:bg-brand-orange/10 transition-colors">
                  {getCardIcon(item.icon)}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-brand-orange transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-brand-muted mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-brand-orange">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> Guaranteed Standard
                </span>
                <span className="text-white/20 group-hover:text-brand-orange/50 transition-colors font-sans font-bold">
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
