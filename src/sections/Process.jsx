import React from 'react';
import { processSteps } from '../data/portfolioData';
import { Compass, FileCode, Cpu, CheckCircle } from 'lucide-react';

export function Process() {
  const stepIcons = [
    <Compass className="w-5 h-5 text-[#FF6B00]" key="1" />,
    <FileCode className="w-5 h-5 text-[#FF8533]" key="2" />,
    <Cpu className="w-5 h-5 text-white" key="3" />,
    <CheckCircle className="w-5 h-5 text-emerald-400" key="4" />,
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] relative border-b border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-[#262626] text-neutral-300 text-xs font-mono font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            <span>Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How I <span className="text-[#FF6B00]">Work.</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            A structured, collaborative workflow designed to ensure complete transparency, clean execution, and production-grade software delivery.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {processSteps.map((step, idx) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-[#121212] border border-[#262626] hover:border-[#FF6B00]/40 transition-all duration-200 group flex flex-col justify-between shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
            >
              {/* Step number badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-extrabold text-neutral-700 font-mono group-hover:text-[#FF6B00] transition-colors">
                  {step.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#171717] border border-[#262626] group-hover:border-[#FF6B00]/30 flex items-center justify-center transition-colors shadow-sm">
                  {stepIcons[idx]}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#FF8533] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2.5 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#262626] flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
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
