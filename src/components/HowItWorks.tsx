import { Upload, Cpu, FileBarChart, Rocket } from 'lucide-react';
import Reveal from '@/components/Reveal';

const steps = [
  {
    icon: <Upload className="w-6 h-6" />,
    n: '01',
    title: 'Upload your codebase',
    desc: 'Drop in a ZIP of your legacy project or point ATLAS at a repository. Source stays private and is processed securely.',
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    n: '02',
    title: 'AI analyzes the system',
    desc: 'ATLAS parses structure, dependencies, business rules, and patterns — building a complete model of your application.',
  },
  {
    icon: <FileBarChart className="w-6 h-6" />,
    n: '03',
    title: 'Explore the insights',
    desc: 'Review health, architecture, impact, and effort across interactive panels — each insight explained in plain language.',
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    n: '04',
    title: 'Get your roadmap',
    desc: 'Walk away with a prioritized migration roadmap and recommendations your team can execute on day one.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-28 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-atlas-400 text-[12.5px] font-semibold tracking-[0.08em] uppercase">
            <span className="w-6 h-px bg-atlas-400/50" />
            How It Works
          </span>
          <h2 className="mt-4 text-3xl sm:text-[2.6rem] font-bold tracking-[-0.02em] leading-[1.12]">
            From codebase to roadmap
            <br className="hidden sm:block" /> in four steps.
          </h2>
          <p className="mt-4 text-slate-300/90 text-[17px] leading-[1.65]">
            No consultants, no spreadsheets, no months of discovery. Just upload and go.
          </p>
        </Reveal>

        <div className="mt-16 relative">
          {/* connector line */}
          <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-atlas-400/0 via-atlas-400/30 to-indigo-500/0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="relative">
                  <div className="relative z-10 mx-auto lg:mx-0 grid place-items-center w-[72px] h-[72px] rounded-2xl bg-ink-700/80 border border-white/10 text-atlas-300 group hover:border-atlas-400/40 transition-all duration-500 ease-smooth">
                    {s.icon}
                    <span className="absolute -top-2 -right-2 text-[10px] font-bold text-ink-950 bg-atlas-400 rounded-full px-2 py-0.5 shadow-lg shadow-atlas-500/30">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="mt-5 font-semibold text-[15px] text-center lg:text-left">{s.title}</h3>
                  <p className="mt-2 text-[13.5px] text-slate-400 leading-[1.6] text-center lg:text-left">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
