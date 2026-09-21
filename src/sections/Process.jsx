import React from 'react';
import { processSteps } from '../data/portfolioData';
import { Compass, FileCode, Cpu, CheckCircle } from 'lucide-react';

export function Process() {
  const stepIcons = [
    <Compass className="w-5 h-5 text-electric-400" key="1" />,
    <FileCode className="w-5 h-5 text-indigoAcc-400" key="2" />,
    <Cpu className="w-5 h-5 text-cyan-400" key="3" />,
    <CheckCircle className="w-5 h-5 text-emerald-400" key="4" />,
  ];

  return (
    <section className="py-24 bg-dark-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-400/30 text-electric-300 text-xs font-mono font-semibold uppercase tracking-wider">
            Development Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How I Work
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            A structured, collaborative workflow designed to ensure complete transparency, clean execution, and on-time delivery.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {processSteps.map((step, idx) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col justify-between relative group"
            >
              {/* Step number badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-extrabold text-white/20 font-mono group-hover:text-electric-400/60 transition-colors">
                  {step.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-dark-800 border border-white/10 flex items-center justify-center shadow-sm">
                  {stepIcons[idx]}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-electric-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-400" />
                <span>Phase {step.step} of 04</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
