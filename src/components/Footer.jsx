import React from 'react';
import { ArrowUpRight, Heart, Code2 } from 'lucide-react';
import { developerInfo, socialLinks } from '../data/portfolioData';
import { GithubIcon, UpworkIcon, FiverrIcon } from './BrandIcons';

export function Footer() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-950 border-t border-white/10 pt-14 pb-10 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-electric-500/20 to-indigoAcc-500/20 border border-electric-400/40 flex items-center justify-center font-bold text-sm tracking-wider text-gradient">
                {developerInfo.initials}
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {developerInfo.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {developerInfo.title} focused on reliable backend systems, REST APIs, and responsive modern interfaces. Ready to build for your business.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-dark-900 border border-white/10 hover:border-electric-400/40 hover:text-white flex items-center justify-center transition"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-dark-900 border border-white/10 hover:border-emerald-400/40 hover:text-emerald-400 flex items-center justify-center transition"
                aria-label="Upwork Profile"
                title="Hire on Upwork"
              >
                <UpworkIcon className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-dark-900 border border-white/10 hover:border-emerald-400/40 hover:text-emerald-400 flex items-center justify-center transition"
                aria-label="Fiverr Profile"
                title="Hire on Fiverr"
              >
                <FiverrIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {['Home', 'About', 'Skills', 'Services', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => scrollTo(`#${item.toLowerCase()}`)}
                    className="hover:text-electric-300 transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Quicklist */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-4">
              Core Expertise
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-slate-400 hover:text-slate-200 transition">Backend Architecture</li>
              <li className="text-slate-400 hover:text-slate-200 transition">REST & CRUD APIs</li>
              <li className="text-slate-400 hover:text-slate-200 transition">Responsive Frontend</li>
              <li className="text-slate-400 hover:text-slate-200 transition">Tailwind CSS Design</li>
              <li className="text-slate-400 hover:text-slate-200 transition">API Integration</li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© 2026 Mahir Arman Suvro. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Built with</span>
            <span className="text-electric-400 font-semibold">React & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
