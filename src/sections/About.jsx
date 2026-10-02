import React from 'react';
import { ArrowRight, Server, Layout, Network, FileCode, CheckCircle2 } from 'lucide-react';
import { aboutPillars } from '../data/portfolioData';

export function About() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const pillarIcons = [
    <Server className="w-5 h-5 text-[#FF6B00]" key="1" />,
    <Layout className="w-5 h-5 text-[#FF8533]" key="2" />,
    <Network className="w-5 h-5 text-[#0A0A0A]" key="3" />,
    <FileCode className="w-5 h-5 text-emerald-600" key="4" />,
  ];

  return (
    <section id="about" className="py-24 bg-[#FAFAFA] relative overflow-hidden border-b border-[#E5E5E5]">
      {/* Subtle background orange accent */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FF6B00]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Bio and Core Focus (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F3F3] border border-[#E5E5E5] text-[#525252] text-xs font-mono font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
              <span>About Me</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A0A0A] tracking-tight leading-tight">
              Engineering Practical, Reliable &amp;{' '}
              <span className="text-[#FF6B00]">Modern Solutions.</span>
            </h2>

            <div className="space-y-4 text-[#525252] text-sm sm:text-base leading-relaxed">
              <p>
                I am a web developer focused on building practical, reliable, and user-friendly web applications. My current specialization is <strong className="text-[#0A0A0A] font-semibold">backend development</strong>, architecting robust server-side services with <span className="text-[#FF6B00] font-mono font-medium">Node.js</span>, <span className="text-[#FF6B00] font-mono font-medium">Express.js</span>, and <span className="text-[#FF6B00] font-mono font-medium">REST APIs</span>.
              </p>
              <p>
                I also engineer responsive frontend interfaces using <strong className="text-[#0A0A0A] font-semibold">HTML5, CSS3, JavaScript, React</strong>, and <span className="text-[#0A0A0A] font-mono font-medium">Tailwind CSS</span>. As I expand toward full-stack development, my focus is delivering clean, end-to-end architectures where every request is handled efficiently and every interface is responsive and intuitive.
              </p>
              <p className="text-[#737373] text-sm">
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
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-[#F3F3F3] hover:bg-[#E5E5E5] border border-[#E5E5E5] text-[#0A0A0A] text-sm font-semibold transition-all hover:border-[#FF6B00]/40 cursor-pointer"
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
                className="p-6 rounded-2xl bg-[#F3F3F3] border border-[#E5E5E5] hover:border-[#FF6B00]/40 transition-all duration-200 group flex flex-col justify-between shadow-xs hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#E5E5E5] group-hover:border-[#FF6B00]/30 flex items-center justify-center mb-4 transition-colors shadow-xs">
                    {pillarIcons[idx]}
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF6B00] font-semibold">
                    {pillar.badge}
                  </span>

                  <h3 className="text-base sm:text-lg font-bold text-[#0A0A0A] mt-1 group-hover:text-[#FF6B00] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#525252] mt-2 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E5E5E5] flex items-center gap-1.5 text-xs text-[#737373] font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
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
