import { TrendingDown, ShieldCheck, Users, Zap } from 'lucide-react';
import Reveal from '@/components/Reveal';

const stats = [
  { value: '90%', label: 'faster assessment' },
  { value: '10×', label: 'cheaper discovery' },
  { value: '0', label: 'tribal-knowledge gaps' },
];

const values = [
  {
    icon: <TrendingDown className="w-5 h-5" />,
    title: 'Cut assessment cost',
    desc: 'Replace weeks of consultant hours with a single AI pass. Re-run it anytime the codebase changes.',
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: 'De-risk every change',
    desc: 'Impact analysis means no more surprise outages. Stakeholders trust the plan because the data backs it.',
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Align business & tech',
    desc: 'A shared, plain-language view of the system so leaders and engineers make decisions from the same page.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Ship modernization sooner',
    desc: 'Go from \u201cwhere do we start?\u201d to a sequenced roadmap your delivery team can pick up immediately.',
  },
];

export default function BusinessValue() {
  return (
    <section className="relative py-24 sm:py-28 border-t border-white/[0.05]">
      <div className="absolute bottom-0 right-1/4 w-[440px] h-[440px] bg-indigo-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-atlas-400 text-[12.5px] font-semibold tracking-[0.08em] uppercase">
              <span className="w-6 h-px bg-atlas-400/50" />
              Business Value
            </span>
            <h2 className="mt-4 text-3xl sm:text-[2.6rem] font-bold tracking-[-0.02em] leading-[1.12]">
              Measurable impact,
              <br className="hidden sm:block" /> from day one.
            </h2>
            <p className="mt-4 text-slate-300/90 text-[17px] leading-[1.65]">
              ATLAS doesn\u2019t just produce reports — it compresses the timeline and de-risks
              the entire modernization program.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5 text-center hover:border-atlas-400/20 transition-colors duration-500">
                    <div className="text-3xl sm:text-[2.6rem] font-extrabold text-gradient leading-none">{s.value}</div>
                    <div className="mt-2 text-[11.5px] text-slate-400">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <Reveal key={i} delay={(i % 2) * 100}>
                <div className="group h-full rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5 hover:border-atlas-400/25 hover:bg-ink-800/70 transition-all duration-500 ease-smooth">
                  <div className="grid place-items-center w-10 h-10 rounded-lg bg-atlas-500/10 text-atlas-300 group-hover:scale-105 transition-transform duration-500 ease-smooth">
                    {v.icon}
                  </div>
                  <h3 className="mt-3.5 font-semibold text-[14px]">{v.title}</h3>
                  <p className="mt-1.5 text-[13px] text-slate-400 leading-[1.6]">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
