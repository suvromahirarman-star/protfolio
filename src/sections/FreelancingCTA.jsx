import React from 'react';
import { socialLinks } from '../data/portfolioData';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon, UpworkIcon, FiverrIcon } from '../components/BrandIcons';

export function FreelancingCTA() {
  return (
    <section className="py-20 bg-dark-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-dark-850 via-dark-900 to-dark-950 border border-electric-400/20 shadow-2xl overflow-hidden text-center">
          {/* Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-electric-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigoAcc-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-electric-500/10 border border-electric-400/30 text-electric-300 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available for Hire</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Have a Project in Mind?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Whether you need a REST API, backend system, responsive website or a complete web application, let's discuss your project.
            </p>

            {/* Prominent Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              {/* Upwork */}
              <a
                href={socialLinks.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#14a800] hover:bg-[#118f00] text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-[#14a800]/25 hover:shadow-[#14a800]/35 hover:-translate-y-0.5"
              >
                <UpworkIcon className="w-5 h-5" />
                <span>Hire Me on Upwork</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {/* Fiverr */}
              <a
                href={socialLinks.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#1dbf73] hover:bg-[#19a463] text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-[#1dbf73]/25 hover:shadow-[#1dbf73]/35 hover:-translate-y-0.5"
              >
                <FiverrIcon className="w-5 h-5" />
                <span>Find Me on Fiverr</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {/* GitHub */}
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-dark-800 hover:bg-dark-700 text-slate-200 hover:text-white font-semibold text-sm border border-white/10 transition-all hover:-translate-y-0.5"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View GitHub</span>
              </a>
            </div>

            <p className="text-xs text-slate-500 font-mono pt-2">
              Fast communication • Flexible hourly or fixed-price arrangements
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FreelancingCTA;
