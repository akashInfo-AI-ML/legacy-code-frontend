import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ScrollText,
  Loader2,
  ChevronDown,
  CheckCircle2,
  Calculator,
  GitBranch,
  Lock,
  Gauge,
  AlertTriangle,
  TrendingUp,
  Info,
  Sparkles,
} from 'lucide-react';

interface BusinessRulesPanelProps {
  projectId: string;
}

interface BusinessRule {
  id: string;
  name: string;
  category: string;
  criticality: string;
  complexity: string;
  description: string;
  implementation: string;
  source_components: string[];
  dependencies: string[];
  recommended_action: string;
}

interface RuleConflict {
  rule_ids: string[];
  description: string;
  resolution: string;
}

interface ExternalizationCandidate {
  rule_id: string;
  reason: string;
  approach: string;
}

interface BusinessRulesData {
  summary: {
    total_rules: number;
    high_criticality_count: number;
    by_category: Record<string, number>;
    recommendations: string[];
  };
  business_rules: BusinessRule[];
  rule_conflicts: RuleConflict[];
  externalization_candidates: ExternalizationCandidate[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  validation: <CheckCircle2 className="w-4 h-4" />,
  calculation: <Calculator className="w-4 h-4" />,
  workflow: <GitBranch className="w-4 h-4" />,
  authorization: <Lock className="w-4 h-4" />,
  constraint: <Gauge className="w-4 h-4" />,
};

const criticalityStyle = (level: string) => {
  const l = level.toLowerCase();
  if (l === 'critical') return 'bg-rose-500/15 text-rose-300 border-rose-500/25';
  if (l === 'high') return 'bg-amber-500/15 text-amber-300 border-amber-500/25';
  if (l === 'medium') return 'bg-atlas-500/15 text-atlas-300 border-atlas-500/25';
  return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25';
};

const complexityStyle = (level: string) => {
  const l = level.toLowerCase();
  if (l === 'high') return 'bg-rose-500/15 text-rose-300';
  if (l === 'medium') return 'bg-amber-500/15 text-amber-300';
  return 'bg-emerald-500/15 text-emerald-300';
};

export default function BusinessRulesPanel({ projectId }: BusinessRulesPanelProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BusinessRulesData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openRule, setOpenRule] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinessRules = async () => {
      try {
        const response = await axios.get<BusinessRulesData>(
          `https://legacy-code-backend.onrender.com/business-rules/${projectId}`,
        );
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch business rules');
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessRules();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <span className="relative grid place-items-center w-16 h-16">
            <span className="absolute inset-0 rounded-full bg-atlas-500/20 animate-pulse-ring" />
            <Loader2 className="w-8 h-8 text-atlas-400 animate-spin" />
          </span>
          <p className="text-[13px] text-slate-400">Extracting business rules…</p>
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

  const summary = data?.summary || {
    total_rules: 0,
    high_criticality_count: 0,
    by_category: {},
    recommendations: [],
  };
  const businessRules = data?.business_rules || [];
  const conflicts = data?.rule_conflicts || [];
  const externalizationCandidates = data?.externalization_candidates || [];

  const statCards = [
    { value: summary.total_rules || 0, label: 'Total Rules Identified', tone: 'atlas' },
    { value: summary.high_criticality_count || 0, label: 'High / Critical Priority', tone: 'rose' },
    { value: conflicts.length, label: 'Rule Conflicts', tone: 'amber' },
    { value: externalizationCandidates.length, label: 'Externalization Candidates', tone: 'emerald' },
  ];
  const statTones: Record<string, string> = {
    atlas: 'text-atlas-300',
    rose: 'text-rose-300',
    amber: 'text-amber-300',
    emerald: 'text-emerald-300',
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-7">
        <span className="inline-flex items-center gap-2 text-atlas-400 text-[12.5px] font-semibold tracking-[0.08em] uppercase">
          <span className="w-6 h-px bg-atlas-400/50" />
          Business Rules
          <span className="w-6 h-px bg-atlas-400/50" />
        </span>
        <h2 className="mt-3 flex items-center gap-3 text-2xl sm:text-[2.2rem] font-bold tracking-[-0.02em] leading-tight">
          <ScrollText className="w-7 h-7 text-atlas-400" />
          Business Rules Analysis
        </h2>
        <p className="mt-2 text-slate-400 text-[14px]">
          Extracted business rules, constraints, and logic patterns from your codebase
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5 hover:border-white/15 transition-all duration-500 ease-smooth"
          >
            <div className={`text-3xl sm:text-[2.4rem] font-extrabold leading-none ${statTones[s.tone]}`}>
              {s.value}
            </div>
            <div className="mt-2 text-[11.5px] text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Categories Distribution */}
      {summary.by_category && Object.keys(summary.by_category).length > 0 && (
        <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5 mb-6">
          <h3 className="font-semibold text-[14px] mb-3.5">Rules by Category</h3>
          <div className="flex flex-wrap gap-2.5">
            {Object.entries(summary.by_category).map(([category, count]) => (
              <span
                key={category}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12.5px] text-slate-300 capitalize"
              >
                <span className="text-atlas-300">{categoryIcons[category] || <CheckCircle2 className="w-4 h-4" />}</span>
                {category}: <span className="font-semibold text-white">{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {summary.recommendations && summary.recommendations.length > 0 && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-atlas-500/20 bg-atlas-500/[0.05] px-5 py-4">
          <Info className="w-5 h-5 text-atlas-400 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-[13.5px] text-atlas-300 mb-1.5">Recommendations</p>
            <ul className="space-y-1">
              {summary.recommendations.map((rec, index) => (
                <li key={index} className="text-[13px] text-slate-300 leading-[1.55] flex items-start gap-2">
                  <span className="text-atlas-400 mt-1.5 w-1 h-1 rounded-full bg-atlas-400 shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Business Rules */}
      <h3 className="font-semibold text-[15px] mb-4">Detailed Business Rules</h3>
      <div className="space-y-3 mb-8">
        {businessRules.map((rule) => {
          const isOpen = openRule === rule.id;
          return (
            <div
              key={rule.id}
              className={`rounded-2xl border transition-all duration-400 ease-smooth overflow-hidden ${
                isOpen
                  ? 'border-atlas-400/30 bg-ink-800/70'
                  : 'border-white/[0.07] bg-ink-800/40 hover:border-white/15'
              }`}
            >
              <button
                onClick={() => setOpenRule(isOpen ? null : rule.id)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left"
              >
                <span className="grid place-items-center w-9 h-9 rounded-lg bg-atlas-500/10 text-atlas-300 shrink-0">
                  {categoryIcons[rule.category] || <CheckCircle2 className="w-4 h-4" />}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="block font-semibold text-[14px] text-white truncate">{rule.name}</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <span className="inline-flex items-center rounded-full border border-white/15 px-2 py-0.5 text-[10.5px] font-medium text-slate-300 capitalize">
                      {rule.category}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-semibold capitalize ${criticalityStyle(rule.criticality)}`}
                    >
                      {rule.criticality}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10.5px] font-semibold capitalize ${complexityStyle(rule.complexity)}`}
                    >
                      {rule.complexity}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-400 ease-smooth ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`grid transition-all duration-400 ease-smooth ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 pt-1 border-t border-white/[0.06]">
                    <p className="text-[13.5px] text-slate-400 leading-[1.65] mt-3">{rule.description}</p>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          Implementation
                        </p>
                        <p className="text-[13px] text-slate-400 leading-[1.6]">{rule.implementation}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          Source Components
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {rule.source_components?.map((comp, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center rounded-lg border border-white/10 px-2 py-0.5 text-[11.5px] text-slate-300"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          Dependencies
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {rule.dependencies?.map((dep, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center rounded-lg bg-atlas-500/10 text-atlas-300 px-2 py-0.5 text-[11.5px] font-medium"
                            >
                              {dep}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          Recommended Action
                        </p>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold ${
                            rule.recommended_action === 'Externalize'
                              ? 'bg-amber-500/15 text-amber-300'
                              : 'bg-white/[0.05] text-slate-300'
                          }`}
                        >
                          {rule.recommended_action === 'Externalize' && <TrendingUp className="w-3.5 h-3.5" />}
                          {rule.recommended_action}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rule Conflicts */}
      {conflicts.length > 0 && (
        <>
          <h3 className="flex items-center gap-2.5 font-semibold text-[15px] mb-4 mt-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Rule Conflicts
          </h3>
          <div className="space-y-3 mb-8">
            {conflicts.map((conflict, index) => (
              <div
                key={index}
                className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.05] p-5"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-[13.5px] text-amber-200 mb-1">
                      Conflicting Rules:{' '}
                      <span className="font-mono text-amber-300/90">
                        {conflict.rule_ids?.join(', ')}
                      </span>
                    </p>
                    <p className="text-[13px] text-slate-300 leading-[1.6] mb-2">{conflict.description}</p>
                    <p className="text-[13px] font-semibold text-emerald-300 leading-[1.6]">
                      Resolution: {conflict.resolution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Externalization Candidates */}
      {externalizationCandidates.length > 0 && (
        <>
          <h3 className="flex items-center gap-2.5 font-semibold text-[15px] mb-4 mt-2">
            <Sparkles className="w-5 h-5 text-atlas-300" />
            Externalization Candidates
          </h3>
          <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
            <div className="grid grid-cols-3 bg-ink-700/50 text-[12.5px] font-semibold">
              <div className="p-4 text-slate-400">Rule ID</div>
              <div className="p-4 text-slate-400 border-l border-white/[0.06]">Reason</div>
              <div className="p-4 text-slate-400 border-l border-white/[0.06]">Suggested Approach</div>
            </div>
            {externalizationCandidates.map((candidate, index) => (
              <div
                key={index}
                className="grid grid-cols-3 text-[13px] border-t border-white/[0.05] hover:bg-white/[0.015] transition-colors duration-300"
              >
                <div className="p-4">
                  <span className="inline-flex items-center rounded-lg bg-atlas-500/15 text-atlas-300 px-2.5 py-0.5 text-[12px] font-mono font-medium">
                    {candidate.rule_id}
                  </span>
                </div>
                <div className="p-4 text-slate-300 border-l border-white/[0.06] leading-[1.55]">{candidate.reason}</div>
                <div className="p-4 text-slate-300 border-l border-white/[0.06] leading-[1.55]">{candidate.approach}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
