import React from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProfilePhoto } from '../components/ProfilePhoto';
import { CodeVisualizer } from '../components/CodeVisualizer';
import { GithubIcon, UpworkIcon, FiverrIcon } from '../components/BrandIcons';

export function Hero() {
  const { developerInfo, socialLinks } = usePortfolio();

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-28 sm:pt-32 pb-20 flex items-center justify-center overflow-hidden bg-[#FAFAFA]"
    >
      {/* Background Decorative Grid & Subtle Orange Ambient Glow */}
      <div className="absolute inset-0 bg-grid-pattern-light opacity-50 pointer-events-none" />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 sm:w-[650px] h-96 sm:h-[400px] bg-[#FF6B00]/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Headline, Description & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Small Label & Availability Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F3F3] border border-[#E5E5E5] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#525252]">
                  FULL-STACK WEB DEVELOPER
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F3F3] border border-emerald-500/30 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-mono font-medium text-emerald-600">
                  {developerInfo.badge || 'Available for Freelance Projects'}
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0A0A0A] leading-[1.12]">
              Building Modern Digital Experiences That{' '}
              <span className="text-[#FF6B00]">Actually Work.</span>
            </h1>

            {/* Short Professional Description */}
            <p className="text-base sm:text-lg text-[#525252] max-w-2xl leading-relaxed">
              I specialize in engineering <strong className="font-semibold text-[#0A0A0A]">production-ready REST APIs</strong>, scalable server-side systems with <strong className="font-semibold text-[#0A0A0A]">Node.js &amp; Express</strong>, and modern, highly responsive frontend interfaces tailored to help businesses and startups grow.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollTo('#projects')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#FF8533] text-white font-bold text-sm tracking-wide transition-all shadow-md shadow-[#FF6B00]/25 hover:shadow-[#FF6B00]/40 hover:-translate-y-0.5 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>View My Work</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('#contact')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#F3F3F3] hover:bg-[#E5E5E5] text-[#0A0A0A] font-semibold text-sm border border-[#E5E5E5] hover:border-[#FF6B00]/40 transition-all hover:-translate-y-0.5 cursor-pointer shadow-sm"
              >
                <span>Let's Work Together</span>
                <ArrowRight className="w-4 h-4 text-[#FF6B00]" />
              </button>
            </div>

            {/* Social & Freelance Proof Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-[#737373]">Hire / Follow:</span>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F3F3F3] border border-[#E5E5E5] text-[#525252] hover:text-[#0A0A0A] hover:border-[#FF6B00]/40 text-xs font-medium transition-all"
                title="View GitHub Profile"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#0A0A0A]" />
                <span>GitHub</span>
              </a>
              <a
                href={socialLinks.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F3F3F3] border border-[#E5E5E5] text-[#525252] hover:text-[#14a800] hover:border-[#14a800]/40 text-xs font-medium transition-all"
                title="Hire on Upwork"
              >
                <UpworkIcon className="w-3.5 h-3.5 text-[#14a800]" />
                <span>Upwork</span>
              </a>
              <a
                href={socialLinks.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F3F3F3] border border-[#E5E5E5] text-[#525252] hover:text-[#1dbf73] hover:border-[#1dbf73]/40 text-xs font-medium transition-all"
                title="Hire on Fiverr"
              >
                <FiverrIcon className="w-3.5 h-3.5 text-[#1dbf73]" />
                <span>Fiverr</span>
              </a>
            </div>
          </div>

          {/* Right Column: Profile Photo + Technical API Visualizer (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-6">
            <ProfilePhoto priority size="lg" />
            <CodeVisualizer />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
