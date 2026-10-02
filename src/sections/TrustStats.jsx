import React from 'react';
import { quickStats } from '../data/portfolioData';
import { Code2, Server, Smartphone, CheckCircle } from 'lucide-react';

export function TrustStats() {
  const statIcons = [
    <Code2 className="w-5 h-5 text-[#FF6B00]" key="1" />,
    <Server className="w-5 h-5 text-[#FF8533]" key="2" />,
    <Smartphone className="w-5 h-5 text-[#0A0A0A]" key="3" />,
    <CheckCircle className="w-5 h-5 text-emerald-600" key="4" />,
  ];

  return (
    <section className="py-8 bg-[#FAFAFA] border-y border-[#E5E5E5] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {quickStats.map((stat, idx) => (
            <div
              key={stat.label}
              className="flex items-center gap-3.5 p-4 rounded-xl bg-[#F3F3F3] border border-[#E5E5E5] hover:border-[#FF6B00]/40 transition-all duration-200 group shadow-sm hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center flex-shrink-0 border border-[#E5E5E5] group-hover:border-[#FF6B00]/30 transition-colors shadow-xs">
                {statIcons[idx]}
              </div>
              <div className="overflow-hidden">
                <div className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] tracking-tight leading-none mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-[#525252] truncate">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[#737373] hidden sm:block truncate mt-0.5">
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
