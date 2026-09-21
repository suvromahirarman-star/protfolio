import React from 'react';
import { ArrowRight, Eye, Sparkles } from 'lucide-react';
import { developerInfo, socialLinks } from '../data/portfolioData';
import { ProfilePhoto } from '../components/ProfilePhoto';
import { CodeVisualizer } from '../components/CodeVisualizer';
import { GithubIcon, UpworkIcon, FiverrIcon } from '../components/BrandIcons';

export function Hero() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden bg-dark-950"
    >
      {/* Background Decorative Grid & Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-electric-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigoAcc-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Introductions & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-900/90 border border-emerald-500/30 shadow-md backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono font-medium text-emerald-300">
                {developerInfo.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Building Modern Web Experiences That{' '}
              <span className="text-gradient">Help Businesses Grow.</span>
            </h1>

            {/* Supporting Headline */}
            <h2 className="text-base sm:text-xl font-medium text-slate-300 leading-relaxed max-w-2xl">
              <strong className="font-semibold text-white">Full-Stack Web Developer</strong> specializing in{' '}
              <span className="text-electric-300">scalable backend systems</span>,{' '}
              <span className="text-electric-300">REST APIs</span>, and{' '}
              <span className="text-indigoAcc-300">responsive modern interfaces</span>.
            </h2>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
              {developerInfo.shortDescription}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollTo('#contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-electric-500 to-indigoAcc-500 hover:from-electric-400 hover:to-indigoAcc-400 text-white font-semibold text-sm transition shadow-lg shadow-electric-500/25 hover:shadow-electric-500/35 cursor-pointer"
              >
                <span>Let's Work Together</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('#projects')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-dark-850/80 hover:bg-dark-800 text-slate-200 hover:text-white font-semibold text-sm border border-white/10 transition cursor-pointer"
              >
                <Eye className="w-4 h-4 text-electric-400" />
                <span>View My Work</span>
              </button>
            </div>

            {/* Social & Freelance Badges */}
            <div className="pt-4 flex items-center gap-3">
              <span className="text-xs font-mono text-slate-500">Connect:</span>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-900 border border-white/10 text-slate-300 hover:text-white hover:border-electric-400/40 text-xs font-medium transition"
                title="View GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={socialLinks.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-900 border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 text-xs font-medium transition"
                title="Hire on Upwork"
              >
                <UpworkIcon className="w-3.5 h-3.5" />
                <span>Upwork</span>
              </a>
              <a
                href={socialLinks.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-900 border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 text-xs font-medium transition"
                title="Find on Fiverr"
              >
                <FiverrIcon className="w-3.5 h-3.5" />
                <span>Fiverr</span>
              </a>
            </div>
          </div>

          {/* Right Column: Profile Photo + Technical API Element (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-6">
            {/* Professional Profile Photo Component */}
            <ProfilePhoto priority size="lg" />

            {/* Developer-Themed Server/API Visualizer */}
            <CodeVisualizer />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
