import { Check, X } from 'lucide-react';
import Reveal from '@/components/Reveal';

const rows = [
  { label: 'Time to first insight', manual: '4–8 weeks', atlas: '< 10 minutes' },
  { label: 'Health score', manual: 'Subjective, debated', atlas: 'Objective, defensible' },
  { label: 'Dependency mapping', manual: 'Manual, often incomplete', atlas: 'Auto-generated, complete' },
  { label: 'Business rules capture', manual: 'Interviews & guesswork', atlas: 'Extracted from code' },
  { label: 'Effort estimation', manual: 'Spreadsheets & gut feel', atlas: 'AI-scoped per component' },
  { label: 'Impact analysis', manual: 'Trial & error in QA', atlas: 'Predicted pre-change' },
  { label: 'Stakeholder-ready output', manual: 'Custom decks, weeks later', atlas: 'Instant, always current' },
];

export default function ComparisonTable() {
  return (
    <section id="comparison" className="relative py-24 sm:py-28 border-t border-white/[0.05]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-atlas-400 text-[12.5px] font-semibold tracking-[0.08em] uppercase">
            <span className="w-6 h-px bg-atlas-400/50" />
            Why ATLAS
            <span className="w-6 h-px bg-atlas-400/50" />
          </span>
          <h2 className="mt-4 text-3xl sm:text-[2.6rem] font-bold tracking-[-0.02em] leading-[1.12]">
            Manual assessment vs. ATLAS
          </h2>
          <p className="mt-4 text-slate-300/90 text-[17px] leading-[1.65]">
            The same outcomes — without the months of manual effort and guesswork.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
            {/* header */}
            <div className="grid grid-cols-3 bg-ink-700/50 text-[12.5px] font-semibold">
              <div className="p-4 text-slate-400">Capability</div>
              <div className="p-4 text-slate-300 border-l border-white/[0.06]">Manual Assessment</div>
              <div className="p-4 text-atlas-300 border-l border-white/[0.06] bg-gradient-to-r from-atlas-500/8 to-transparent">
                ATLAS
              </div>
            </div>
            {/* rows */}
            {rows.map((r, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 text-[13.5px] border-t border-white/[0.05] transition-colors duration-300 hover:bg-white/[0.015] ${i % 2 ? 'bg-ink-800/30' : ''}`}
              >
                <div className="p-4 text-slate-300 font-medium">{r.label}</div>
                <div className="p-4 text-slate-400 border-l border-white/[0.06] flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-400/70 mt-0.5 shrink-0" />
                  <span>{r.manual}</span>
                </div>
                <div className="p-4 text-slate-200 border-l border-white/[0.06] bg-gradient-to-r from-atlas-500/[0.04] to-transparent flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{r.atlas}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
