import React from 'react';
import { Lock, ArrowUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { GithubIcon, UpworkIcon, FiverrIcon } from './BrandIcons';

export function Footer() {
  const { developerInfo, socialLinks, setIsAdminOpen } = usePortfolio();

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-black border-t border-white/10 pt-16 pb-12 text-brand-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center font-bold text-sm tracking-wider text-brand-orange">
                {developerInfo.initials || 'MAS'}
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {developerInfo.name}
              </span>
            </div>
            <p className="text-sm text-brand-muted max-w-sm leading-relaxed">
              Full-Stack Web Developer specialized in building scalable Node.js & Express REST APIs, modern responsive frontend interfaces, and production-ready applications.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-brand-card border border-white/10 hover:border-brand-orange/40 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-brand-card border border-white/10 hover:border-[#14a800]/50 hover:text-[#14a800] flex items-center justify-center transition-all duration-200"
                aria-label="Upwork Profile"
                title="Hire on Upwork"
              >
                <UpworkIcon className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-brand-card border border-white/10 hover:border-[#1dbf73]/50 hover:text-[#1dbf73] flex items-center justify-center transition-all duration-200"
                aria-label="Fiverr Profile"
                title="Hire on Fiverr"
              >
                <FiverrIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Home', id: '#home' },
                { name: 'About', id: '#about' },
                { name: 'Skills', id: '#skills' },
                { name: 'Services', id: '#services' },
                { name: 'Projects', id: '#projects' },
                { name: 'Contact', id: '#contact' },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    className="hover:text-brand-orange transition-colors cursor-pointer text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-white transition-colors">REST & CRUD API Design</li>
              <li className="hover:text-white transition-colors">Express Backend Architecture</li>
              <li className="hover:text-white transition-colors">Modern Responsive Frontend</li>
              <li className="hover:text-white transition-colors">Database Integration</li>
              <li className="hover:text-white transition-colors">Website Bug Fixing & Tuning</li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>© {new Date().getFullYear()} {developerInfo.name}. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="text-brand-muted">
              Designed with <span className="text-brand-orange font-semibold">White + Black + Orange</span>
            </span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="hover:text-brand-orange transition-colors inline-flex items-center gap-1.5 text-brand-muted hover:text-white cursor-pointer"
              title="Admin Customization Studio"
            >
              <Lock className="w-3 h-3 text-brand-orange" />
              <span>Studio</span>
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-brand-orange transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
