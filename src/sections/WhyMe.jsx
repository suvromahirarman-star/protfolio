import React from 'react';
import { whyWorkWithMe } from '../data/portfolioData';
import { Code2, Smartphone, Server, MessageSquare, Wrench, TrendingUp } from 'lucide-react';

export function WhyMe() {
  const getCardIcon = (iconName) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-electric-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-indigoAcc-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-cyan-400" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-emerald-400" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-amber-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-purple-400" />;
      default:
        return <Code2 className="w-5 h-5 text-electric-400" />;
    }
  };

  return (
    <section className="py-24 bg-dark-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-400/30 text-electric-300 text-xs font-mono font-semibold uppercase tracking-wider">
            Client Advantages
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Work With Me?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            The engineering principles and client-first communication standards I bring to every single freelance engagement.
          </p>
        </div>

        {/* Benefits Grid (6 cards) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyWorkWithMe.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-dark-800 border border-white/10 flex items-center justify-center mb-4 shadow-sm">
                  {getCardIcon(item.icon)}
                </div>

                <h3 className="text-lg font-bold text-white">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-electric-400/80">
                Guaranteed standard
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyMe;
