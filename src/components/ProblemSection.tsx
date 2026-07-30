import { AlertTriangle, Clock, FileQuestion, Ban } from 'lucide-react';
import Reveal from '@/components/Reveal';

const problems = [
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Months of manual assessment',
    desc: 'Engineering teams spend weeks reading undocumented code, mapping dependencies, and estimating effort — before any modernization even begins.',
  },
  {
    icon: <FileQuestion className="w-5 h-5" />,
    title: 'Tribal knowledge walks out the door',
    desc: 'The people who built the system are gone. Critical business rules live only in code comments and the memory of a few senior devs.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'High-risk, blind refactors',
    desc: 'Without an impact map, every change is a gamble. One missed dependency can break production and erode stakeholder trust.',
  },
  {
    icon: <Ban className="w-5 h-5" />,
    title: 'No shared understanding',
    desc: 'Business and technical teams speak different languages. Leaders can\u2019t see the ROI, and engineers can\u2019t justify the scope.',
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="relative py-24 sm:py-28 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-atlas-400 text-[12.5px] font-semibold tracking-[0.08em] uppercase">
            <span className="w-6 h-px bg-atlas-400/50" />
            The Problem
          </span>
          <h2 className="mt-4 text-3xl sm:text-[2.6rem] font-bold tracking-[-0.02em] leading-[1.12]">
            Legacy modernization is slow,
            <br className="hidden sm:block" /> risky, and opaque.
          </h2>
          <p className="mt-4 text-slate-300/90 text-[17px] leading-[1.65]">
            Most modernization programs stall in the assessment phase. ATLAS removes that
            bottleneck with AI that reads, understands, and explains your codebase for you.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-white/[0.07] bg-ink-800/40 p-6 hover:border-rose-400/25 hover:bg-ink-800/70 transition-all duration-500 ease-smooth">
                <div className="grid place-items-center w-11 h-11 rounded-xl bg-rose-500/10 text-rose-400/90 group-hover:scale-105 transition-transform duration-500 ease-smooth">
                  {p.icon}
                </div>
                <h3 className="mt-4.5 font-semibold text-[15px] leading-snug">{p.title}</h3>
                <p className="mt-2 text-[13.5px] text-slate-400 leading-[1.6]">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
