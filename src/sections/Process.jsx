import React from 'react';
import { processSteps } from '../data/portfolioData';
import { Compass, FileCode, Cpu, CheckCircle } from 'lucide-react';

export function Process() {
  const stepIcons = [
    <Compass className="w-5 h-5 text-[#FF6B00]" key="1" />,
    <FileCode className="w-5 h-5 text-[#FF8533]" key="2" />,
    <Cpu className="w-5 h-5 text-[#0A0A0A]" key="3" />,
    <CheckCircle className="w-5 h-5 text-emerald-600" key="4" />,
  ];

  return (
    <section className="py-24 bg-[#FAFAFA] relative border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F3F3] border border-[#E5E5E5] text-[#525252] text-xs font-mono font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            <span>Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A0A0A] tracking-tight">
            How I <span className="text-[#FF6B00]">Work.</span>
          </h2>
          <p className="text-[#525252] text-sm sm:text-base leading-relaxed">
            A structured, collaborative workflow designed to ensure complete transparency, clean execution, and production-grade software delivery.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {processSteps.map((step, idx) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-[#F3F3F3] border border-[#E5E5E5] hover:border-[#FF6B00]/40 transition-all duration-200 group flex flex-col justify-between shadow-xs hover:-translate-y-1 hover:shadow-md"
            >
              {/* Step number badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-extrabold text-[#D4D4D4] font-mono group-hover:text-[#FF6B00] transition-colors">
                  {step.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E5E5] group-hover:border-[#FF6B00]/30 flex items-center justify-center transition-colors shadow-xs">
                  {stepIcons[idx]}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#0A0A0A] group-hover:text-[#FF6B00] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#525252] mt-2.5 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#E5E5E5] flex items-center gap-2 text-[11px] font-mono text-[#737373]">
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
