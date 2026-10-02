import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export function Navbar({ activeSection = 'home' }) {
  const { developerInfo } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-[#FAFAFA]/90 backdrop-blur-xl border-b border-[#E5E5E5] shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="Mahir Arman Suvro Homepage"
        >
          <div className="w-9 h-9 rounded-lg bg-[#F3F3F3] border border-[#E5E5E5] flex items-center justify-center font-bold text-sm tracking-tight text-[#0A0A0A] group-hover:border-[#FF6B00]/60 transition-colors shadow-sm">
            <span>{developerInfo.initials || 'MAS'}</span>
            <span className="text-[#FF6B00] -ml-0.5">.</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[#0A0A0A] text-sm sm:text-base tracking-tight flex items-center gap-1 group-hover:text-[#FF6B00] transition-colors">
              {developerInfo.name}
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] hidden sm:block">
              {developerInfo.title || 'Full-Stack Developer'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F3F3F3] p-1.5 rounded-full border border-[#E5E5E5] shadow-sm backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#FF6B00] text-white font-semibold shadow-sm shadow-[#FF6B00]/25'
                    : 'text-[#525252] hover:text-[#0A0A0A] hover:bg-black/5'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button ("Let's Talk") */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#FF8533] text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-[#FF6B00]/25 hover:shadow-[#FF6B00]/40 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FF6B00] text-white text-xs font-semibold shadow-sm shadow-[#FF6B00]/20"
          >
            <span>Let's Talk</span>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#0A0A0A] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#0A0A0A]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-[#FAFAFA]/98 border-b border-[#E5E5E5] shadow-xl backdrop-blur-2xl transition-all">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#FF6B00] text-white font-semibold shadow-sm'
                      : 'text-[#525252] hover:bg-[#F3F3F3] hover:text-[#0A0A0A]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-[#E5E5E5]">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#FF8533] text-white font-semibold text-sm shadow-md shadow-[#FF6B00]/25 transition-all"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
