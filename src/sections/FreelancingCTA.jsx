import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUpRight, Sparkles, MessageSquare } from 'lucide-react';
import { GithubIcon, UpworkIcon, FiverrIcon } from '../components/BrandIcons';

export function FreelancingCTA() {
  const { socialLinks } = usePortfolio();

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-brand-black relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-brand-card/90 border border-brand-orange/30 shadow-2xl overflow-hidden text-center">
          {/* Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available for New Projects</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Have a Project <span className="text-brand-orange">in Mind?</span>
            </h2>

            <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
              Whether you need a reliable REST API, scalable backend architecture, responsive frontend, or bug fixes, let's turn your requirements into production software.
            </p>

            {/* Prominent Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              {/* Direct Project Inquiry (Primary Orange CTA) */}
              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/35 hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Start Direct Discussion</span>
              </button>

              {/* Upwork */}
              <a
                href={socialLinks.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand-dark hover:bg-brand-dark/80 text-white font-semibold text-sm border border-white/10 hover:border-brand-orange/40 transition-all duration-200 hover:-translate-y-0.5"
              >
                <UpworkIcon className="w-4 h-4 text-[#14a800]" />
                <span>Hire on Upwork</span>
                <ArrowUpRight className="w-4 h-4 text-brand-muted" />
              </a>

              {/* Fiverr */}
              <a
                href={socialLinks.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand-dark hover:bg-brand-dark/80 text-white font-semibold text-sm border border-white/10 hover:border-brand-orange/40 transition-all duration-200 hover:-translate-y-0.5"
              >
                <FiverrIcon className="w-4 h-4 text-[#1dbf73]" />
                <span>Hire on Fiverr</span>
                <ArrowUpRight className="w-4 h-4 text-brand-muted" />
              </a>

              {/* GitHub */}
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-brand-dark/60 hover:bg-brand-dark text-slate-300 hover:text-white font-medium text-sm border border-white/5 hover:border-white/20 transition-all hover:-translate-y-0.5"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repos</span>
              </a>
            </div>

            <p className="text-xs text-brand-muted font-mono pt-3">
              Fast response • Clear milestones • Flexible fixed-price or milestone terms
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FreelancingCTA;
