import { ArrowRight, Activity, GitBranch, Gauge, Sparkles, ShieldCheck, Zap, Clock, Star, Award, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      {/* Enhanced Background layers with better gradients */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_90%)]" />

      {/* Multiple gradient orbs for depth */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-gradient-to-br from-atlas-500/15 via-indigo-500/10 to-transparent rounded-full blur-[160px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-500/12 via-purple-500/8 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-96 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-sky-500/10 via-cyan-500/6 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-ink-950/60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left: Enhanced copy */}
          <div className="lg:col-span-6 space-y-8">
            {/* Badge with better styling */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-gradient-to-r from-white/[0.08] to-white/[0.03] px-4 py-2 text-[13px] text-slate-200 backdrop-blur-xl animate-fade-up shadow-lg shadow-atlas-500/5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-atlas-400 opacity-75 animate-pulse-ring" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-atlas-400 shadow-lg shadow-atlas-400/50" />
              </span>
              <span className="font-medium">AI-Powered Legacy Modernization Platform</span>
            </div>

            {/* Enhanced headline with better typography */}
            <h1 className="text-[3.2rem] sm:text-6xl md:text-[4.5rem] font-black tracking-[-0.03em] leading-[1.05] animate-fade-up">
              <span className="block text-white">Modernize legacy</span>
              <span className="block text-white">systems with{' '}</span>
              <span className="text-gradient inline-block">confidence</span>
              <span className="text-white">.</span>
            </h1>

            {/* Better description with enhanced spacing */}
            <p className="text-[18px] sm:text-[19px] text-slate-300 leading-[1.7] max-w-xl animate-fade-up font-light" style={{ animationDelay: '0.1s' }}>
              ATLAS turns <span className="font-semibold text-white">months of manual assessment</span> into minutes. Upload your
              codebase and get instant AI-powered insights: health scores, architecture maps, impact analysis, effort
              estimates, and migration roadmaps.
            </p>

            {/* Enhanced CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <button
                onClick={() => (window as any).navigateTo?.('/app')}
                className="group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-atlas-400 via-indigo-500 to-purple-500 text-white font-bold px-8 py-4 text-[16px] glow-cyan hover:glow-multi transition-all duration-500 cursor-pointer hover:scale-105 shadow-2xl"
              >
                <span className="relative z-10">Start Free Analysis</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/15 text-white font-semibold px-7 py-4 text-[16px] hover:bg-white/[0.08] hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
              >
                <span>See how it works</span>
              </a>
            </div>

            {/* Enhanced trust indicators with icons */}
            <div className="flex flex-wrap items-center gap-8 animate-fade-up pt-4" style={{ animationDelay: '0.3s' }}>
              <Trust icon={<Zap className="w-4 h-4" />} text="Results in minutes" />
              <Trust icon={<ShieldCheck className="w-4 h-4" />} text="Enterprise secure" />
              <Trust icon={<CheckCircle2 className="w-4 h-4" />} text="No installation" />
            </div>

            {/* Social proof */}
            {/* <div className="flex items-center gap-6 pt-4 animate-fade-up" style={{ animationDelay: '0.35s' }}>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-ink-950 bg-gradient-to-br from-atlas-300 to-indigo-400 flex items-center justify-center text-white text-sm font-bold">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}\n              </div>
              <div className="text-sm text-slate-400">
                <span className="text-white font-semibold">500+</span> enterprises trust ATLAS
              </div>
            </div> */}
          </div>

          {/* Right: Enhanced dashboard preview */}
          <div className="lg:col-span-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[14px] text-slate-300 font-medium">
      <span className="grid place-items-center w-8 h-8 rounded-lg bg-atlas-400/10 text-atlas-400 border border-atlas-400/20">
        {icon}
      </span>
      {text}
    </span>
  );
}

function HeroDashboard() {
  return (
    <div className="relative group">
      {/* Enhanced multi-layer glow behind */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-atlas-500/25 via-indigo-500/15 to-purple-500/20 blur-[60px] rounded-[3rem] pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute -inset-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-3xl rounded-[2.5rem] pointer-events-none" />

      <div className="relative rounded-[1.5rem] border border-white/15 glass p-7 shadow-2xl shadow-black/60 hover:border-white/25 transition-all duration-500">
        {/* Enhanced window bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 shadow-lg shadow-rose-500/30" />
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg shadow-amber-500/30" />
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-500/30" />
          </div>
          <span className="text-[11px] text-slate-400 font-mono tracking-tight font-semibold">ATLAS Dashboard</span>
          <div className="flex gap-1.5">
            <div className="w-5 h-1 rounded-full bg-white/10" />
            <div className="w-5 h-1 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Enhanced metric cards with better gradients */}
        <div className="grid grid-cols-3 gap-4">
          <MetricCard
            icon={<Activity className="w-5 h-5" />}
            label="Health Score"
            value="72"
            suffix="/100"
            tone="cyan"
            sub="Good"
            gradient="from-atlas-500/20 to-cyan-500/10"
          />
          <MetricCard
            icon={<Gauge className="w-5 h-5" />}
            label="Est. Effort"
            value="480"
            suffix="hrs"
            tone="indigo"
            sub="6 months"
            gradient="from-indigo-500/20 to-purple-500/10"
          />
          <MetricCard
            icon={<GitBranch className="w-5 h-5" />}
            label="Risk Level"
            value="Med"
            suffix=""
            tone="emerald"
            sub="5 hotspots"
            gradient="from-emerald-500/20 to-teal-500/10"
          />
        </div>

        {/* Enhanced health bar with better design */}
        <div className="mt-6 rounded-xl border border-white/[0.08] bg-gradient-to-br from-ink-900/60 to-ink-800/40 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] text-slate-300 font-semibold">Codebase Health Distribution</span>
            <span className="text-[11px] text-slate-400 font-mono">1,284 files analyzed</span>
          </div>
          <div className="relative grid grid-cols-12 gap-1 h-3 rounded-full overflow-hidden shadow-inner">
            <div className="col-span-3 bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-500/30" />
            <div className="col-span-4 bg-gradient-to-r from-atlas-400 to-cyan-500 shadow-lg shadow-atlas-500/30" />
            <div className="col-span-3 bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg shadow-amber-500/30" />
            <div className="col-span-2 bg-gradient-to-r from-rose-400 to-red-500 shadow-lg shadow-rose-500/30" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
            <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2 h-2 rounded-full bg-emerald-400"></span>Good · 30%</span>
            <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2 h-2 rounded-full bg-atlas-400"></span>Moderate · 40%</span>
            <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2 h-2 rounded-full bg-amber-400"></span>At risk · 22%</span>
            <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2 h-2 rounded-full bg-rose-400"></span>Critical · 8%</span>
          </div>
        </div>

        {/* Enhanced mini insight rows */}
        <div className="mt-4 space-y-2.5">
          <InsightRow label="Business rules extracted" value="147" color="atlas" />
          <InsightRow label="Dependencies mapped" value="892" color="indigo" />
          <InsightRow label="Critical paths identified" value="12" color="emerald" />
        </div>
      </div>

      {/* Enhanced floating badge */}
      <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 rounded-2xl border border-white/15 glass px-5 py-4 shadow-2xl animate-float">
        <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/30">
          <Sparkles className="w-5 h-5" />
        </span>
        <div>
          <div className="text-[11px] text-slate-400 font-medium">Analysis complete</div>
          <div className="text-[14px] font-bold text-white">in 4.2 minutes</div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  suffix,
  tone,
  sub,
  gradient,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix: string;
  tone: 'cyan' | 'indigo' | 'emerald';
  sub: string;
  gradient: string;
}) {
  const tones = {
    cyan: 'text-atlas-300 border-atlas-400/30',
    indigo: 'text-indigo-300 border-indigo-400/30',
    emerald: 'text-emerald-300 border-emerald-400/30',
  };
  return (
    <div className={`relative rounded-xl border ${tones[tone]} bg-gradient-to-br ${gradient} p-4 backdrop-blur-sm overflow-hidden group hover:scale-105 transition-transform duration-300`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className={`relative grid place-items-center w-9 h-9 rounded-lg ${tones[tone]} bg-gradient-to-br from-white/10 to-transparent mb-3`}>
        {icon}
      </div>
      <div className="relative text-[10.5px] text-slate-300 mb-1.5 font-medium">{label}</div>
      <div className="relative flex items-baseline gap-1">
        <span className="text-xl font-black text-white tracking-tight">{value}</span>
        <span className="text-[11px] text-slate-400 font-medium">{suffix}</span>
      </div>
      <div className="relative text-[10.5px] text-slate-400 mt-1">{sub}</div>
    </div>
  );
}

function InsightRow({ label, value, color }: { label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    atlas: 'text-atlas-400 bg-atlas-400/10 border-atlas-400/20',
    indigo: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
    emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 hover:bg-white/[0.04] transition-colors duration-200">
      <span className="text-[12px] text-slate-300 font-medium">{label}</span>
      <span className={`text-[13px] font-bold px-2.5 py-1 rounded-md border ${colors[color]}`}>{value}</span>
    </div>
  );
}
