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
    <Server className="w-5 h-5 text-[#FF6B00]" key="1" />,
    <Layout className="w-5 h-5 text-[#FF8533]" key="2" />,
    <Network className="w-5 h-5 text-neutral-200" key="3" />,
    <FileCode className="w-5 h-5 text-emerald-400" key="4" />,
  ];

  return (
    <section id="about" className="py-24 bg-[#0A0A0A] relative overflow-hidden border-b border-[#262626]">
      {/* Subtle background orange accent */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FF6B00]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Bio and Core Focus (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-[#262626] text-neutral-300 text-xs font-mono font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
              <span>About Me</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Engineering Practical, Reliable &amp;{' '}
              <span className="text-[#FF6B00]">Modern Solutions.</span>
            </h2>

            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                I am a web developer focused on building practical, reliable, and user-friendly web applications. My current specialization is <strong className="text-white font-semibold">backend development</strong>, architecting robust server-side services with <span className="text-[#FF8533] font-mono font-medium">Node.js</span>, <span className="text-[#FF8533] font-mono font-medium">Express.js</span>, and <span className="text-[#FF8533] font-mono font-medium">REST APIs</span>.
              </p>
              <p>
                I also engineer responsive frontend interfaces using <strong className="text-white font-semibold">HTML5, CSS3, JavaScript, React</strong>, and <span className="text-neutral-200 font-mono font-medium">Tailwind CSS</span>. As I expand toward full-stack development, my focus is delivering clean, end-to-end architectures where every request is handled efficiently and every interface is responsive and intuitive.
              </p>
              <p className="text-neutral-400 text-sm">
                Whether creating structured CRUD endpoints, organizing clean database schemas, or polishing mobile user flows, I prioritize code maintainability, transparent communication, and long-term business value.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollTo('#contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#FF8533] text-white text-sm font-bold shadow-md shadow-[#FF6B00]/25 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Let's Build Something</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('#skills')}
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-[#121212] hover:bg-[#1A1A1A] border border-[#262626] text-neutral-200 text-sm font-semibold transition-all hover:border-[#FF6B00]/40 cursor-pointer"
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
                className="p-6 rounded-2xl bg-[#121212] border border-[#262626] hover:border-[#FF6B00]/40 transition-all duration-200 group flex flex-col justify-between shadow-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-black/40"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#0A0A0A] border border-[#262626] group-hover:border-[#FF6B00]/30 flex items-center justify-center mb-4 transition-colors">
                    {pillarIcons[idx]}
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF6B00] font-semibold">
                    {pillar.badge}
                  </span>

                  <h3 className="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-[#FF8533] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#262626] flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
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
