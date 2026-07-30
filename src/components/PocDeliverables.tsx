import { CheckCircle2, Package } from 'lucide-react';
import Reveal from '@/components/Reveal';

const deliverables = [
  'Health score with weighted risk breakdown',
  'AI-generated system analysis (plain language)',
  'Interactive architecture & dependency map',
  'Extracted business rules catalog',
  'Change impact analysis across components',
  'Effort estimates scoped per module',
  'Phased migration roadmap with priorities',
  'Ranked, actionable recommendations',
];

export default function PocDeliverables() {
  return (
    <section id="poc" className="relative py-24 sm:py-28 border-t border-white/[0.05]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-ink-700/70 via-ink-800/70 to-ink-900/70 p-8 sm:p-12 overflow-hidden noise">
            {/* decorative glow */}
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-atlas-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-atlas-500/15 text-atlas-300 shrink-0">
                <Package className="w-6 h-6" />
              </span>
              <div>
                <span className="text-atlas-400 text-[12.5px] font-semibold tracking-[0.08em] uppercase">The POC</span>
                <h2 className="text-2xl sm:text-[2rem] font-bold tracking-[-0.02em] leading-tight">
                  What you get in this proof of concept
                </h2>
              </div>
            </div>

            <p className="relative mt-5 text-slate-300/90 text-[15.5px] leading-[1.65] max-w-2xl">
              This POC demonstrates the full ATLAS workflow end-to-end on your codebase — a
              tangible preview of the platform your team will use to plan modernization with
              confidence.
            </p>

            <div className="relative mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5">
              {deliverables.map((d, i) => (
                <Reveal key={i} delay={(i % 2) * 60} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-atlas-400 mt-0.5 shrink-0" />
                  <span className="text-[13.5px] text-slate-300">{d}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
