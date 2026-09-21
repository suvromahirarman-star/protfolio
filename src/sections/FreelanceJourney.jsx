import React from 'react';
import { freelanceJourney } from '../data/portfolioData';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export function FreelanceJourney() {
  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-dark-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 glass-card border border-white/10 relative overflow-hidden">
          {/* Subtle background gradient glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-electric-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Honest Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{freelanceJourney.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {freelanceJourney.title}
              </h2>

              <p className="text-base sm:text-lg font-medium text-slate-200 leading-relaxed">
                {freelanceJourney.lead}
              </p>

              <div className="space-y-3 text-slate-400 text-sm leading-relaxed">
                {freelanceJourney.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-electric-500/20 hover:bg-electric-500/30 text-electric-300 border border-electric-400/40 font-semibold text-sm transition cursor-pointer"
                >
                  <span>Work Directly With Me</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Commitments / Client Guarantees (5 cols) */}
            <div className="lg:col-span-5 bg-dark-900/90 rounded-2xl p-6 sm:p-7 border border-white/5 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                What You Can Expect
              </h3>

              <div className="space-y-3.5">
                {freelanceJourney.offerings.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-sm text-slate-300 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5 text-xs text-slate-500 font-mono">
                No inflated claims. Transparent communication from Day 1.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FreelanceJourney;
