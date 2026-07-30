import { ArrowRight, Play } from 'lucide-react';
import Reveal from '@/components/Reveal';

export default function FinalCta() {
  return (
    <section id="cta" className="relative py-28 sm:py-32 border-t border-white/[0.05] overflow-hidden">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-atlas-500/12 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-[3.2rem] font-extrabold tracking-[-0.02em] leading-[1.1]">
            See ATLAS on
            <br className="hidden sm:block" />{' '}
            <span className="text-gradient">your codebase</span>.
          </h2>
          <p className="mt-5 text-slate-300/90 text-[17px] leading-[1.65]">
            Upload your legacy project and get a complete modernization assessment in minutes.
            No setup, no commitment — just answers.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="/app"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-atlas-400 to-indigo-500 text-white font-semibold px-8 py-4 text-[15px] glow-cyan hover:brightness-110 transition-all duration-300"
            >
              Try it now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 text-slate-200 font-medium px-6 py-4 text-[15px] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
            >
              <Play className="w-4 h-4" />
              Watch the flow
            </a>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            Proof of Concept · Private & secure · Results in minutes
          </p>
        </Reveal>
      </div>
    </section>
  );
}
