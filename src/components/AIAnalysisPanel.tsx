import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Brain,
  Loader2,
  ChevronDown,
  ClipboardList,
  Building2,
  Layers,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface AIAnalysisPanelProps {
  projectId: string;
}

interface BusinessCapability {
  id: string;
  name: string;
  criticality: string;
  complexity: string;
  description: string;
  modules: string[];
}

interface AnalysisData {
  summary: string;
  business_capabilities: BusinessCapability[];
  patterns_detected: string[];
  anti_patterns: string[];
}

export default function AIAnalysisPanel({ projectId }: AIAnalysisPanelProps) {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openCap, setOpenCap] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.post<AnalysisData>(
          'https://legacy-code-backend.onrender.com/ai/analyze',
          {
            project_id: projectId,
            context: 'Legacy .NET application analysis',
          },
        );
        setAnalysis(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analysis');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <span className="relative grid place-items-center w-16 h-16">
            <span className="absolute inset-0 rounded-full bg-atlas-500/20 animate-pulse-ring" />
            <Loader2 className="w-8 h-8 text-atlas-400 animate-spin" />
          </span>
          <p className="text-[13px] text-slate-400">AI is analyzing your codebase…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-rose-500/25 bg-rose-500/[0.06] px-5 py-4">
        <AlertTriangle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
        <p className="text-[14px] text-rose-300">{error}</p>
      </div>
    );
  }

  const criticalityStyle = (level: string) => {
    const l = level.toLowerCase();
    if (l === 'critical')
      return 'bg-rose-500/15 text-rose-300 border-rose-500/25';
    if (l === 'high')
      return 'bg-amber-500/15 text-amber-300 border-amber-500/25';
    return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25';
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-7">
        <span className="inline-flex items-center gap-2 text-atlas-400 text-[12.5px] font-semibold tracking-[0.08em] uppercase">
          <span className="w-6 h-px bg-atlas-400/50" />
          AI Analysis
          <span className="w-6 h-px bg-atlas-400/50" />
        </span>
        <h2 className="mt-3 flex items-center gap-3 text-2xl sm:text-[2.2rem] font-bold tracking-[-0.02em] leading-tight">
          <Brain className="w-7 h-7 text-atlas-400" />
          AI Analysis &amp; Insights
        </h2>
        <p className="mt-2 text-slate-400 text-[14px]">
          AI-powered business capability extraction and architectural insights
        </p>
      </div>

      {/* Executive Summary */}
      <div className="relative rounded-2xl border border-atlas-500/20 bg-gradient-to-br from-atlas-500/[0.08] to-indigo-500/[0.06] p-6 mb-8 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-atlas-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative flex items-center gap-2.5 mb-3">
          <ClipboardList className="w-5 h-5 text-atlas-300" />
          <h3 className="font-semibold text-[15px] text-atlas-300">Executive Summary</h3>
        </div>
        <p className="relative text-[14.5px] text-slate-200 leading-[1.75]">
          {analysis?.summary}
        </p>
      </div>

      {/* Business Capabilities */}
      <div className="flex items-center gap-2.5 mb-4">
        <Building2 className="w-5 h-5 text-atlas-300" />
        <h3 className="font-semibold text-[15px]">Business Capabilities</h3>
      </div>

      <div className="space-y-3 mb-8">
        {analysis?.business_capabilities?.map((cap) => {
          const isOpen = openCap === cap.id;
          return (
            <div
              key={cap.id}
              className={`rounded-2xl border transition-all duration-400 ease-smooth overflow-hidden ${
                isOpen
                  ? 'border-atlas-400/30 bg-ink-800/70'
                  : 'border-white/[0.07] bg-ink-800/40 hover:border-white/15'
              }`}
            >
              <button
                onClick={() => setOpenCap(isOpen ? null : cap.id)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left"
              >
                <span className="font-semibold text-[14.5px] text-white flex-1">{cap.name}</span>
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${criticalityStyle(cap.criticality)}`}
                >
                  {cap.criticality}
                </span>
                <span className="inline-flex items-center rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] font-medium text-slate-300 capitalize">
                  {cap.complexity}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-400 ease-smooth ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`grid transition-all duration-400 ease-smooth ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 pt-1 border-t border-white/[0.06]">
                    <p className="text-[13.5px] text-slate-400 leading-[1.65] mt-3">{cap.description}</p>
                    <p className="mt-4 mb-2 text-[12px] font-semibold text-slate-300 uppercase tracking-wider">
                      Related Modules
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cap.modules.map((mod) => (
                        <span
                          key={mod}
                          className="inline-flex items-center rounded-lg bg-atlas-500/10 text-atlas-300 px-2.5 py-1 text-[12px] font-medium"
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture Patterns */}
      <div className="flex items-center gap-2.5 mb-4">
        <Layers className="w-5 h-5 text-atlas-300" />
        <h3 className="font-semibold text-[15px]">Architecture Patterns</h3>
      </div>

      <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
        {/* table header */}
        <div className="grid grid-cols-2 bg-ink-700/50 text-[12.5px] font-semibold">
          <div className="p-4 text-slate-400">Pattern</div>
          <div className="p-4 text-slate-400 border-l border-white/[0.06]">Status</div>
        </div>

        {/* detected patterns */}
        {analysis?.patterns_detected?.map((pattern) => (
          <div
            key={pattern}
            className="grid grid-cols-2 text-[13.5px] border-t border-white/[0.05] hover:bg-white/[0.015] transition-colors duration-300"
          >
            <div className="p-4 text-slate-200 font-medium">{pattern}</div>
            <div className="p-4 border-l border-white/[0.06]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 text-emerald-300 px-2.5 py-0.5 text-[11.5px] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Detected
              </span>
            </div>
          </div>
        ))}

        {/* anti-patterns */}
        {analysis?.anti_patterns?.map((pattern) => (
          <div
            key={pattern}
            className="grid grid-cols-2 text-[13.5px] border-t border-white/[0.05] hover:bg-rose-500/[0.03] transition-colors duration-300"
          >
            <div className="p-4 text-slate-200 font-medium">{pattern}</div>
            <div className="p-4 border-l border-white/[0.06]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 text-rose-300 px-2.5 py-0.5 text-[11.5px] font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                Anti-pattern
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
