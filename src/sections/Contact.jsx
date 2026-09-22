import React, { useState } from 'react';
import { Mail, Copy, Check, ArrowUpRight, MessageSquare } from 'lucide-react';
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
    <section id="contact" className="py-24 bg-dark-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Channels & Context (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-400/30 text-electric-300 text-xs font-mono font-semibold uppercase tracking-wider">
              Get in Touch
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Let's Work Together
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Have an idea, project or API requirement? Send me a message and let's discuss how I can help bring your digital vision to life.
            </p>

            {/* Direct Email Card */}
            <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 font-semibold uppercase">
                  Direct Email
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-xs text-electric-400 hover:text-electric-300 transition cursor-pointer font-mono"
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
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3 text-slate-200 text-sm font-mono truncate">
                <Mail className="w-4 h-4 text-electric-400 flex-shrink-0" />
                <span className="truncate">{socialLinks.email}</span>
              </div>
            </div>

            {/* External Platform Cards */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                Freelance Channels
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={socialLinks.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-dark-900 border border-white/10 hover:border-emerald-500/40 flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <UpworkIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Upwork</div>
                      <div className="text-[11px] text-slate-400">Hire Profile</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                </a>

                <a
                  href={socialLinks.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-dark-900 border border-white/10 hover:border-emerald-500/40 flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <FiverrIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Fiverr</div>
                      <div className="text-[11px] text-slate-400">Gigs &amp; Orders</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                </a>
              </div>

              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-dark-900 border border-white/10 hover:border-electric-400/40 flex items-center justify-between group transition block"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-dark-800 flex items-center justify-center text-slate-200">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">GitHub</div>
                    <div className="text-[11px] text-slate-400">Review Code &amp; Repositories</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-electric-300 transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-card border border-white/10 shadow-xl">
            <div className="flex items-center gap-2 mb-6 text-sm font-semibold text-white">
              <MessageSquare className="w-4 h-4 text-electric-400" />
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
