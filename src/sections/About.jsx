import React from 'react';
import { ArrowRight, Server, Layout, Network, FileCode, CheckCircle2 } from 'lucide-react';
import { aboutPillars } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

export function About() {
  const { developerInfo } = usePortfolio();
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const pillarIcons = [
    <Server className="w-5 h-5 text-electric-400" key="1" />,
    <Layout className="w-5 h-5 text-indigoAcc-400" key="2" />,
    <Network className="w-5 h-5 text-cyan-400" key="3" />,
    <FileCode className="w-5 h-5 text-emerald-400" key="4" />,
  ];

  return (
    <section id="about" className="py-24 bg-dark-950 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-electric-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Bio and Vision (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-400/30 text-electric-300 text-xs font-mono font-semibold uppercase tracking-wider">
              About Me
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Engineering Practical, Reliable &amp; Modern Solutions
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                I’m a web developer focused on building practical, reliable, and user-friendly web applications. My current specialization is <span className="text-white font-medium">backend development</span>, where I work with <span className="text-electric-300 font-mono">Node.js</span>, <span className="text-electric-300 font-mono">Express.js</span>, and <span className="text-electric-300 font-mono">REST APIs</span>.
              </p>
              <p>
                I also build responsive frontend interfaces using <span className="text-white font-medium">HTML5, CSS3, JavaScript</span>, and <span className="text-indigoAcc-300 font-mono">Tailwind CSS</span>. As I expand toward full-stack development, my goal is to deliver clean, end-to-end architectures where every request is handled efficiently and every interface is intuitive.
              </p>
              <p className="text-slate-400 text-sm">
                Whether creating structured CRUD endpoints, organizing clean database schemas, or polishing responsive user flows, I prioritize code maintainability and long-term business value.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={() => scrollTo('#contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-500 to-indigoAcc-500 hover:from-electric-400 hover:to-indigoAcc-400 text-white text-sm font-semibold transition shadow-md shadow-electric-500/20 cursor-pointer"
              >
                <span>Let's Build Something</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('#skills')}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-slate-300 hover:text-white text-sm font-medium hover:bg-white/5 transition cursor-pointer"
              >
                <span>Explore Technical Skills</span>
              </button>
            </div>
          </div>

          {/* Right: 4 Technical Pillars Cards (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aboutPillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-dark-800 border border-white/10 flex items-center justify-center mb-4 shadow-sm">
                    {pillarIcons[idx]}
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-electric-400 font-semibold">
                    {pillar.badge}
                  </span>

                  <h3 className="text-lg font-bold text-white mt-1">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Production standard</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
