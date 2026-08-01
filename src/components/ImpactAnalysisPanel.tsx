import { useState } from 'react';
import axios from 'axios';
import {
  Target,
  Loader2,
  Crosshair,
  Package,
  CheckCircle2,
  FlaskConical,
  TrendingUp,
  ShieldAlert,
  Zap,
} from 'lucide-react';

interface ImpactAnalysisPanelProps {
  projectId: string;
}

interface TestingScope {
  unit_tests?: number;
  integration_tests?: number;
  regression_tests?: number;
  performance_tests?: number;
  estimated_test_effort?: string;
}

interface AffectedService {
  name: string;
  impact_level: string;
  reason: string;
  specific_concerns: string[];
}

interface Recommendation {
  priority: string;
  category: string;
  recommendation: string;
  rationale: string;
}

interface ImpactData {
  risk_level: string;
  estimated_effort: string;
  testing_scope: TestingScope | string;
  affected_services: AffectedService[] | string[];
  recommendations: Recommendation[] | string[];
}

const modules = ['UserController', 'UserService', 'User', 'Database', 'API Gateway'];

const riskTone = (level: string) => {
  const l = level.toLowerCase();
  if (l === 'high') return { ring: 'border-rose-500/30', bg: 'from-rose-500/[0.1] to-pink-500/[0.08]', text: 'text-rose-300' };
  if (l === 'medium') return { ring: 'border-amber-500/30', bg: 'from-amber-500/[0.1] to-yellow-500/[0.08]', text: 'text-amber-300' };
  return { ring: 'border-emerald-500/30', bg: 'from-emerald-500/[0.1] to-green-500/[0.08]', text: 'text-emerald-300' };
};

const effortTone = (effort: string) => {
  const e = effort.toLowerCase();
  if (e.includes('high') || e.includes('large') || e.includes('month')) return 'text-rose-300';
  if (e.includes('medium') || e.includes('week')) return 'text-amber-300';
  return 'text-emerald-300';
};

export default function ImpactAnalysisPanel({ projectId }: ImpactAnalysisPanelProps) {
  const [loading, setLoading] = useState(false);
  const [impact, setImpact] = useState<ImpactData | null>(null);
  const [changeScope, setChangeScope] = useState('refactoring');
  const [selectedModules, setSelectedModules] = useState<string[]>(['UserService', 'UserController']);

  const handleModuleToggle = (module: string) => {
    setSelectedModules((prev) =>
      prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module],
    );
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await axios.post<ImpactData>('https://legacy-code-backend.onrender.com/impact', {
        project_id: projectId,
        change_scope: changeScope,
        affected_modules: selectedModules,
      });
      setImpact(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-7">
        <span className="inline-flex items-center gap-2 text-atlas-400 text-[12.5px] font-semibold tracking-[0.08em] uppercase">
          <span className="w-6 h-px bg-atlas-400/50" />
          Impact Analysis
          <span className="w-6 h-px bg-atlas-400/50" />
        </span>
        <h2 className="mt-3 flex items-center gap-3 text-2xl sm:text-[2.2rem] font-bold tracking-[-0.02em] leading-tight">
          <Target className="w-7 h-7 text-atlas-400" />
          Impact Analysis
        </h2>
        <p className="mt-2 text-slate-400 text-[14px]">
          Simulate the impact of changes on your application architecture
        </p>
      </div>

      {/* Control Panel */}
      <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-6 mb-6">
        {/* Change Scope */}
        <div className="flex items-center gap-2.5 mb-4">
          <Crosshair className="w-5 h-5 text-atlas-300" />
          <h3 className="font-semibold text-[15px]">Define Change Scope</h3>
        </div>

        <div className="relative mb-6">
          <select
            value={changeScope}
            onChange={(e) => setChangeScope(e.target.value)}
            className="w-full appearance-none rounded-xl border border-white/10 bg-ink-700/60 px-4 py-3 pr-10 text-[14px] text-white focus:border-atlas-400/50 focus:outline-none focus:ring-2 focus:ring-atlas-500/20 transition-all duration-300 capitalize cursor-pointer"
          >
            <option value="bug-fix">Bug Fix</option>
            <option value="feature">Feature Addition</option>
            <option value="refactoring">Refactoring</option>
            <option value="migration">Migration</option>
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Affected Modules */}
        <div className="flex items-center gap-2.5 mb-4">
          <Package className="w-5 h-5 text-atlas-300" />
          <h3 className="font-semibold text-[15px]">Affected Modules</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 pl-1">
          {modules.map((module) => {
            const checked = selectedModules.includes(module);
            return (
              <button
                key={module}
                onClick={() => handleModuleToggle(module)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${checked
                    ? 'border-atlas-400/40 bg-atlas-500/[0.08]'
                    : 'border-white/10 bg-ink-700/30 hover:border-white/20'
                  }`}
              >
                <span
                  className={`grid place-items-center w-5 h-5 rounded-md border transition-all duration-300 ${checked ? 'border-atlas-400 bg-atlas-400 text-white' : 'border-white/25 text-transparent'
                    }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                <span className={`text-[14px] font-medium ${checked ? 'text-white' : 'text-slate-400'}`}>
                  {module}
                </span>
              </button>
            );
          })}
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={loading || selectedModules.length === 0}
          className={`group w-full inline-flex items-center justify-center gap-2 rounded-full font-semibold text-[15px] px-6 py-4 transition-all duration-300 ${loading || selectedModules.length === 0
              ? 'bg-ink-700 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-atlas-400 to-indigo-500 text-white glow-cyan hover:brightness-110'
            }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing…
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Analyze Impact
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {impact && (
        <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <TrendingUp className="w-5 h-5 text-atlas-300" />
            <h3 className="font-semibold text-[15px]">Impact Summary</h3>
          </div>

          {/* Risk + Effort Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div
              className={`rounded-2xl border bg-gradient-to-br ${riskTone(impact.risk_level).ring} ${riskTone(impact.risk_level).bg} p-6 text-center`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <ShieldAlert className="w-5 h-5 opacity-70" />
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Risk Level</span>
              </div>
              <div className={`text-2xl sm:text-[1.8rem] font-extrabold uppercase ${riskTone(impact.risk_level).text}`}>
                {impact.risk_level}
              </div>
            </div>

            <div className="rounded-2xl border border-atlas-500/30 bg-gradient-to-br from-atlas-500/[0.1] to-indigo-500/[0.08] p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-5 h-5 opacity-70 text-atlas-300" />
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Estimated Effort</span>
              </div>
              <div className={`text-2xl sm:text-[1.8rem] font-extrabold uppercase ${effortTone(impact.estimated_effort)}`}>
                {impact.estimated_effort}
              </div>
            </div>
          </div>

          {/* Testing Scope */}
          <div className="mb-6">
            <div className="flex items-center gap-2.5 mb-2.5">
              <FlaskConical className="w-4 h-4 text-atlas-300" />
              <p className="font-semibold text-[14px]">Testing Scope</p>
            </div>
            <div className="rounded-xl bg-atlas-500/[0.05] border border-atlas-500/15 px-4 py-3.5">
              {typeof impact.testing_scope === 'string' ? (
                <p className="text-[14px] text-slate-300 leading-[1.65]">{impact.testing_scope}</p>
              ) : (
                <div className="space-y-2">
                  {impact.testing_scope.unit_tests !== undefined && (
                    <div className="flex items-center justify-between text-[13.5px]">
                      <span className="text-slate-400">Unit Tests</span>
                      <span className="text-white font-semibold">{impact.testing_scope.unit_tests}</span>
                    </div>
                  )}
                  {impact.testing_scope.integration_tests !== undefined && (
                    <div className="flex items-center justify-between text-[13.5px]">
                      <span className="text-slate-400">Integration Tests</span>
                      <span className="text-white font-semibold">{impact.testing_scope.integration_tests}</span>
                    </div>
                  )}
                  {impact.testing_scope.regression_tests !== undefined && (
                    <div className="flex items-center justify-between text-[13.5px]">
                      <span className="text-slate-400">Regression Tests</span>
                      <span className="text-white font-semibold">{impact.testing_scope.regression_tests}</span>
                    </div>
                  )}
                  {impact.testing_scope.performance_tests !== undefined && (
                    <div className="flex items-center justify-between text-[13.5px]">
                      <span className="text-slate-400">Performance Tests</span>
                      <span className="text-white font-semibold">{impact.testing_scope.performance_tests}</span>
                    </div>
                  )}
                  {impact.testing_scope.estimated_test_effort && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="flex items-center justify-between text-[13.5px]">
                        <span className="text-slate-400">Estimated Test Effort</span>
                        <span className="text-atlas-300 font-semibold">{impact.testing_scope.estimated_test_effort}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Affected Services */}
          {impact.affected_services?.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Package className="w-4 h-4 text-atlas-300" />
                <p className="font-semibold text-[14px]">Affected Services</p>
              </div>
              <div className="space-y-3">
                {impact.affected_services.map((service, idx) => {
                  if (typeof service === 'string') {
                    return (
                      <span
                        key={`service-${idx}`}
                        className="inline-flex items-center rounded-lg bg-gradient-to-r from-atlas-500/15 to-indigo-500/15 border border-atlas-400/20 text-atlas-200 px-3 py-1.5 text-[12.5px] font-medium mr-2"
                      >
                        {service}
                      </span>
                    );
                  } else {
                    const impactLevelColor = service.impact_level?.toLowerCase() === 'high'
                      ? 'border-rose-400/30 bg-rose-500/[0.08]'
                      : service.impact_level?.toLowerCase() === 'medium'
                        ? 'border-amber-400/30 bg-amber-500/[0.08]'
                        : 'border-emerald-400/30 bg-emerald-500/[0.08]';

                    return (
                      <div
                        key={`service-${service.name}-${idx}`}
                        className={`rounded-xl border ${impactLevelColor} p-4`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-[14px] text-white">{service.name}</h4>
                          <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-white/10">
                            {service.impact_level}
                          </span>
                        </div>
                        <p className="text-[13px] text-slate-300 mb-2">{service.reason}</p>
                        {service.specific_concerns?.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-white/10">
                            <p className="text-[11px] text-slate-400 uppercase tracking-wider mb-1.5">Concerns:</p>
                            <ul className="space-y-1">
                              {service.specific_concerns.map((concern, cIdx) => (
                                <li key={`concern-${idx}-${cIdx}`} className="text-[12px] text-slate-300 flex items-start gap-1.5">
                                  <span className="text-atlas-400 mt-0.5">•</span>
                                  {concern}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {impact.recommendations?.length > 0 && (
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <p className="font-semibold text-[14px]">Recommendations</p>
              </div>
              <div className="space-y-3">
                {impact.recommendations.map((rec, idx) => {
                  if (typeof rec === 'string') {
                    return (
                      <div key={`rec-${idx}`} className="flex items-start gap-2.5 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <p className="text-[13.5px] text-slate-300 leading-[1.6] font-medium">{rec}</p>
                      </div>
                    );
                  } else {
                    const priorityColor = rec.priority?.toLowerCase() === 'high'
                      ? 'text-rose-400 bg-rose-500/15'
                      : rec.priority?.toLowerCase() === 'medium'
                        ? 'text-amber-400 bg-amber-500/15'
                        : 'text-emerald-400 bg-emerald-500/15';

                    return (
                      <div
                        key={`rec-${idx}`}
                        className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="font-semibold text-[14px] text-white flex-1">{rec.recommendation}</h4>
                          <div className="flex items-center gap-2 shrink-0">
                            {rec.priority && (
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${priorityColor}`}>
                                {rec.priority}
                              </span>
                            )}
                            {rec.category && (
                              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-atlas-500/15 text-atlas-300">
                                {rec.category}
                              </span>
                            )}
                          </div>
                        </div>
                        {rec.rationale && (
                          <p className="text-[13px] text-slate-400 leading-[1.6] mt-2">{rec.rationale}</p>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
