import React, { useState } from 'react';
import { Mail, Copy, Check, ArrowUpRight, MessageSquare, Clock, ShieldCheck, Zap } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ContactForm } from '../components/ContactForm';
import { GithubIcon, UpworkIcon, FiverrIcon } from '../components/BrandIcons';

export function Contact({ selectedService = '', onShowToast }) {
  const { developerInfo, socialLinks } = usePortfolio();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(socialLinks.email);
    setCopiedEmail(true);
    if (onShowToast) {
      onShowToast('Email address copied to clipboard!', 'success');
    }
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0A] relative border-t border-[#262626]">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#FF6B00]/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Channels & Context (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-[#262626] text-neutral-300 text-xs font-mono font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
              <span>Get in Touch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Have a Project in Mind? <span className="text-[#FF6B00]">Let's Build It.</span>
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Have an idea, project, or API requirement? Send me a message and let's discuss how we can engineer a clean, robust solution for your business.
            </p>

            {/* Direct Email Card */}
            <div className="p-5 rounded-2xl bg-[#121212] border border-[#262626] space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400 font-semibold uppercase">
                  Direct Email
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-xs text-[#FF6B00] hover:text-[#FF8533] transition cursor-pointer font-mono"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3 text-white text-sm font-mono truncate">
                <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#262626] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#FF6B00]" />
                </div>
                <span className="truncate">{socialLinks.email}</span>
              </div>
            </div>

            {/* External Platform Cards */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                Freelance &amp; Code Platforms
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={socialLinks.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#121212] border border-[#262626] hover:border-[#14a800]/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#14a800]/10 flex items-center justify-center text-[#14a800]">
                      <UpworkIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Upwork</div>
                      <div className="text-[11px] text-neutral-400">Direct Contract</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
                </a>

                <a
                  href={socialLinks.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#121212] border border-[#262626] hover:border-[#1dbf73]/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#1dbf73]/10 flex items-center justify-center text-[#1dbf73]">
                      <FiverrIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Fiverr</div>
                      <div className="text-[11px] text-neutral-400">Gigs &amp; Milestones</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
                </a>
              </div>

              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#121212] border border-[#262626] hover:border-[#FF6B00]/40 flex items-center justify-between group transition-all block"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-white border border-[#262626]">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#FF6B00] transition-colors">GitHub Repositories</div>
                    <div className="text-[11px] text-neutral-400">Inspect source code and commits</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#FF6B00] transition-colors" />
              </a>
            </div>

            {/* Reassurance Badges */}
            <div className="pt-2 grid grid-cols-3 gap-2">
              <div className="p-3 rounded-xl bg-[#121212] border border-[#262626] text-center">
                <Clock className="w-4 h-4 text-[#FF6B00] mx-auto mb-1" />
                <span className="text-[11px] font-mono text-neutral-300 block">24h Response</span>
              </div>
              <div className="p-3 rounded-xl bg-[#121212] border border-[#262626] text-center">
                <ShieldCheck className="w-4 h-4 text-[#FF6B00] mx-auto mb-1" />
                <span className="text-[11px] font-mono text-neutral-300 block">Clean Code</span>
              </div>
              <div className="p-3 rounded-xl bg-[#121212] border border-[#262626] text-center">
                <Zap className="w-4 h-4 text-[#FF6B00] mx-auto mb-1" />
                <span className="text-[11px] font-mono text-neutral-300 block">Direct 1-on-1</span>
              </div>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#121212] border border-[#262626] shadow-2xl">
            <div className="flex items-center gap-2 mb-6 text-sm font-semibold text-white">
              <MessageSquare className="w-4 h-4 text-[#FF6B00]" />
              <span>Project Inquiry Form</span>
            </div>

            <ContactForm
              initialProjectType={selectedService}
              onShowToast={onShowToast}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
