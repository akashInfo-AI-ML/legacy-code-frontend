import {
  Activity,
  Brain,
  Network,
  ScrollText,
  GitCompareArrows,
  Gauge,
  Map,
  Lightbulb,
} from 'lucide-react';
import Reveal from '@/components/Reveal';

const features = [
  {
    icon: <Activity className="w-5 h-5" />,
    title: 'Health Score',
    desc: 'A single, defensible number that captures code quality, technical debt, and risk — so stakeholders align instantly.',
    span: 'lg:col-span-2',
    featured: true,
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: 'AI Analysis',
    desc: 'Natural-language insights that explain what the system does, where it hurts, and why.',
    span: '',
    featured: false,
  },
  {
    icon: <Network className="w-5 h-5" />,
    title: 'Architecture Viewer',
    desc: 'Auto-generated visual map of components, services, and dependencies.',
    span: '',
    featured: false,
  },
  {
    icon: <ScrollText className="w-5 h-5" />,
    title: 'Business Rules Extraction',
    desc: 'ATLAS reads the code and surfaces the embedded business logic — so nothing gets lost in translation.',
    span: 'lg:col-span-2',
    featured: true,
  },
  {
    icon: <GitCompareArrows className="w-5 h-5" />,
    title: 'Impact Analysis',
    desc: 'See the blast radius of any change before you make it.',
    span: '',
    featured: false,
  },
  {
    icon: <Gauge className="w-5 h-5" />,
    title: 'Effort Estimation',
    desc: 'AI-driven estimates in hours and sprints, scoped to each component.',
    span: '',
    featured: false,
  },
  {
    icon: <Map className="w-5 h-5" />,
    title: 'Migration Roadmap',
    desc: 'A phased, prioritized plan that sequences work by risk, dependency, and value — ready to hand to a delivery team.',
    span: 'lg:col-span-2',
    featured: true,
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: 'Recommendations',
    desc: 'Actionable, ranked next steps tailored to your stack and goals.',
    span: '',
    featured: false,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-28 border-t border-white/[0.05]">
      <div className="absolute top-1/3 left-0 w-[440px] h-[440px] bg-atlas-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-atlas-400 text-[12.5px] font-semibold tracking-[0.08em] uppercase">
            <span className="w-6 h-px bg-atlas-400/50" />
            Capabilities
          </span>
          <h2 className="mt-4 text-3xl sm:text-[2.6rem] font-bold tracking-[-0.02em] leading-[1.12]">
            Everything you need to assess a
            <br className="hidden sm:block" /> legacy system — in one pass.
          </h2>
          <p className="mt-4 text-slate-300/90 text-[17px] leading-[1.65]">
            Eight AI-driven modules work together to give you a complete picture: from
            high-level health down to line-level recommendations.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Reveal key={i} delay={(i % 3) * 80} className={f.span}>
              <div className="group h-full relative rounded-2xl border border-white/[0.07] bg-ink-800/40 p-6 hover:border-atlas-400/30 hover:bg-ink-800/70 hover:-translate-y-1 transition-all duration-500 ease-smooth overflow-hidden">
                {/* hover glow */}
                <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-atlas-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-10 h-10 rounded-lg bg-gradient-to-br from-atlas-400/15 to-indigo-500/15 text-atlas-300 group-hover:from-atlas-400/25 group-hover:to-indigo-500/25 group-hover:scale-105 transition-all duration-500 ease-smooth">
                    {f.icon}
                  </span>
                  <h3 className="font-semibold text-[15px]">{f.title}</h3>
                </div>
                <p className="mt-3 text-[13.5px] text-slate-400 leading-[1.6]">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
