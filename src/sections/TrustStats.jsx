import React from 'react';
import { quickStats } from '../data/portfolioData';
import { Code2, Server, Smartphone, CheckCircle } from 'lucide-react';

export function TrustStats() {
  const statIcons = [
    <Code2 className="w-5 h-5 text-electric-400" key="1" />,
    <Server className="w-5 h-5 text-indigoAcc-400" key="2" />,
    <Smartphone className="w-5 h-5 text-purple-400" key="3" />,
    <CheckCircle className="w-5 h-5 text-emerald-400" key="4" />,
  ];

  return (
    <section className="py-8 bg-dark-900/60 border-y border-white/5 relative z-10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {quickStats.map((stat, idx) => (
            <div
              key={stat.label}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-dark-850/40 border border-white/5 hover:border-electric-400/20 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-dark-800 flex items-center justify-center flex-shrink-0 border border-white/5">
                {statIcons[idx]}
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-300">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 hidden sm:block">
                  {stat.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustStats;
