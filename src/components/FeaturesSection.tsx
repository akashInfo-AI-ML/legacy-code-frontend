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
    <section id="features" className="relative py-28 sm:py-32 border-t border-white/[0.06] overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute top-1/3 left-0 w-[700px] h-[700px] bg-gradient-to-br from-atlas-500/12 via-indigo-500/8 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2.5 text-atlas-400 text-[13px] font-bold tracking-[0.1em] uppercase px-4 py-2 rounded-full border border-atlas-400/20 bg-atlas-400/5 backdrop-blur-sm">
            <span className="w-8 h-px bg-gradient-to-r from-transparent via-atlas-400 to-transparent" />
            Capabilities
            <span className="w-8 h-px bg-gradient-to-r from-transparent via-atlas-400 to-transparent" />
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl md:text-[3.2rem] font-black tracking-[-0.03em] leading-[1.1]">
            Everything you need to assess a legacy system —{' '}
            <span className="text-gradient">in one pass</span>
          </h2>
          <p className="mt-6 text-slate-300 text-[18px] leading-[1.7] font-light">
            Eight AI-driven modules work together to give you a complete picture: from
            high-level health down to line-level recommendations.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Reveal key={i} delay={(i % 3) * 80} className={f.span}>
              <div className="group h-full relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-ink-800/60 to-ink-900/40 p-7 hover:border-atlas-400/40 hover:bg-gradient-to-br hover:from-ink-800/80 hover:to-ink-900/60 hover:-translate-y-2 transition-all duration-500 ease-smooth overflow-hidden backdrop-blur-sm hover:shadow-2xl hover:shadow-atlas-500/20">
                {/* Enhanced hover glow */}
                <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-atlas-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-atlas-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex items-center gap-3.5">
                  <span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-atlas-400/20 to-indigo-500/15 text-atlas-300 group-hover:from-atlas-400/30 group-hover:to-indigo-500/25 group-hover:scale-110 transition-all duration-500 ease-smooth border border-atlas-400/20 shadow-lg shadow-atlas-500/10">
                    {f.icon}
                  </span>
                  <h3 className="font-bold text-[17px] text-white">{f.title}</h3>
                </div>
                <p className="relative mt-4 text-[14.5px] text-slate-300 leading-[1.65]">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
