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
    <section id="problem" className="relative py-28 sm:py-32 border-t border-white/[0.06] overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-rose-500/10 via-red-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2.5 text-rose-400 text-[13px] font-bold tracking-[0.1em] uppercase px-4 py-2 rounded-full border border-rose-400/20 bg-rose-400/5 backdrop-blur-sm">
            <span className="w-8 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent" />
            The Problem
            <span className="w-8 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent" />
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl md:text-[3.2rem] font-black tracking-[-0.03em] leading-[1.1]">
            Legacy modernization is{' '}
            <span className="text-gradient-warm">slow, risky, and opaque</span>
          </h2>
          <p className="mt-6 text-slate-300 text-[18px] leading-[1.7] font-light">
            Most modernization programs stall in the assessment phase. ATLAS removes that
            bottleneck with AI that reads, understands, and explains your codebase instantly.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-white/[0.08] bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-7 hover:border-rose-400/30 hover:bg-gradient-to-br hover:from-ink-800/80 hover:to-ink-900/60 transition-all duration-500 ease-smooth backdrop-blur-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-500/10">
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/15 to-red-500/10 text-rose-400 group-hover:scale-110 group-hover:from-rose-500/25 group-hover:to-red-500/15 transition-all duration-500 ease-smooth border border-rose-400/20">
                  {p.icon}
                </div>
                <h3 className="mt-5 font-bold text-[16px] leading-snug text-white">{p.title}</h3>
                <p className="mt-3 text-[14px] text-slate-400 leading-[1.65]">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
