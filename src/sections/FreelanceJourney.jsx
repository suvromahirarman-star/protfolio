import React from 'react';
import { freelanceJourney, journeyTimeline } from '../data/portfolioData';
import { ShieldCheck, CheckCircle2, ArrowRight, GitCommit } from 'lucide-react';

export function FreelanceJourney() {
  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-brand-black relative overflow-hidden border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-orange/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Main Freelance Commitment Banner */}
        <div className="rounded-3xl p-8 sm:p-12 lg:p-14 bg-brand-card/90 border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/[0.04] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Honest Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{freelanceJourney.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {freelanceJourney.title}
              </h2>

              <p className="text-base sm:text-lg font-medium text-white/90 leading-relaxed">
                {freelanceJourney.lead}
              </p>

              <div className="space-y-3 text-brand-muted text-sm leading-relaxed">
                {freelanceJourney.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/30 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Work Directly With Me</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Commitments / Client Guarantees (5 cols) */}
            <div className="lg:col-span-5 bg-brand-dark/90 rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-brand-orange font-semibold flex items-center gap-2">
                <span>// Client Commitments</span>
              </h3>

              <div className="space-y-3.5">
                {freelanceJourney.offerings.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                    </div>
                    <span className="text-sm text-slate-200 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5 text-xs text-brand-muted font-mono">
                Direct communication • Transparent milestone delivery • Clean code guaranteed
              </div>
            </div>
          </div>
        </div>

        {/* Technical Progression Timeline */}
        {journeyTimeline && journeyTimeline.length > 0 && (
          <div className="space-y-8 pt-4">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-muted text-xs font-mono font-medium">
                <GitCommit className="w-3.5 h-3.5 text-brand-orange" />
                <span>TECHNICAL PROGRESSION</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Engineering <span className="text-brand-orange">Milestones</span>
              </h3>
              <p className="text-brand-muted text-sm">
                A structured, disciplined path from web fundamentals to scalable backend architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {journeyTimeline.map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-brand-card/70 border border-white/5 hover:border-brand-orange/40 transition-all duration-300 relative group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-brand-orange">
                        0{idx + 1}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-brand-muted">
                        {step.year}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-brand-orange transition-colors">
                      {step.milestone}
                    </h4>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-[10px] font-mono text-brand-muted group-hover:text-brand-orange/80 transition-colors">
                    Verified Competency
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default FreelanceJourney;
