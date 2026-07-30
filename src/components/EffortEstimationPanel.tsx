import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Loader2,
    BarChart3,
    Wrench,
    Bug,
    Plane,
    FileText,
    AlertTriangle,
    TrendingUp,
    ChevronDown,
    Users,
    Calendar,
    DollarSign,
    Target,
    Lightbulb,
    Sparkles,
    Clock,
} from 'lucide-react';

interface EffortEstimationPanelProps {
    projectId: string;
}

const phaseIcons: Record<string, JSX.Element> = {
    analysis_and_planning: <BarChart3 className="w-4 h-4" />,
    code_refactoring: <Wrench className="w-4 h-4" />,
    testing_and_qa: <Bug className="w-4 h-4" />,
    migration_execution: <Plane className="w-4 h-4" />,
    documentation: <FileText className="w-4 h-4" />,
};

const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
        case 'critical':
            return 'border-red-500/30 bg-red-500/5 text-red-300';
        case 'high':
            return 'border-amber-500/30 bg-amber-500/5 text-amber-300';
        case 'medium':
            return 'border-blue-500/30 bg-blue-500/5 text-blue-300';
        default:
            return 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300';
    }
};

const getSeverityIconColor = (severity: string) => {
    switch (severity.toLowerCase()) {
        case 'critical':
            return 'text-red-400';
        case 'high':
            return 'text-amber-400';
        case 'medium':
            return 'text-blue-400';
        default:
            return 'text-emerald-400';
    }
};

export default function EffortEstimationPanel({ projectId }: EffortEstimationPanelProps) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedScenario, setSelectedScenario] = useState('medium_team');
    const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set());

    useEffect(() => {
        const fetchEffortEstimate = async () => {
            try {
                const response = await axios.get(
                    `https://legacy-code-backend.onrender.com/effort-estimate/${projectId}`
                );
                setData(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch effort estimate');
            } finally {
                setLoading(false);
            }
        };

        fetchEffortEstimate();
    }, [projectId]);

    const togglePhase = (phase: number) => {
        setExpandedPhases((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(phase)) {
                newSet.delete(phase);
            } else {
                newSet.add(phase);
            }
            return newSet;
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
                <Loader2 className="w-14 h-14 text-atlas-400 animate-spin" />
                <p className="text-[15px] text-slate-400">Calculating effort estimates...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <p className="text-[14px] text-red-300">{error}</p>
            </div>
        );
    }

    const storyPoints = data?.story_points || {};
    const timeEstimates = data?.time_estimates || {};
    const costEstimates = data?.cost_estimates || {};
    const risks = data?.risks || [];
    const phaseBreakdown = data?.phase_breakdown || [];
    const confidenceLevel = data?.confidence_level || 'medium';

    const currentScenario = timeEstimates.scenarios?.[selectedScenario] || {};
    const currentCostScenario = costEstimates.scenarios?.[selectedScenario] || {};

    const getConfidenceColor = (level: string) => {
        switch (level) {
            case 'high':
                return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
            case 'medium':
                return 'border-atlas-500/30 bg-atlas-500/10 text-atlas-300';
            default:
                return 'border-amber-500/30 bg-amber-500/10 text-amber-300';
        }
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-8">
                <span className="inline-flex items-center gap-2 text-atlas-400 text-[12.5px] font-semibold tracking-[0.08em] uppercase mb-3">
                    <span className="w-6 h-px bg-atlas-400/50" />
                    Planning & Estimation
                    <span className="w-6 h-px bg-atlas-400/50" />
                </span>
                <h2 className="text-2xl sm:text-[2.2rem] font-bold tracking-[-0.02em] leading-tight bg-gradient-to-r from-atlas-400 to-indigo-500 bg-clip-text text-transparent">
                    Effort Estimation & Planning
                </h2>
                <p className="mt-3 text-slate-400 text-[15px] leading-[1.65]">
                    Comprehensive effort estimation with story points, time, and cost analysis
                </p>
            </div>

            {/* Confidence Level */}
            <div
                className={`rounded-xl border p-4 mb-6 ${getConfidenceColor(confidenceLevel)}`}
            >
                <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 mt-0.5 shrink-0" />
                    <div className="flex-1">
                        <h4 className="text-[14px] font-semibold text-white mb-2">
                            Confidence Level: {confidenceLevel.toUpperCase()}
                        </h4>
                        <p className="text-[13px] leading-[1.6]">
                            {confidenceLevel === 'high' &&
                                'High confidence based on comprehensive code analysis and good code health.'}
                            {confidenceLevel === 'medium' &&
                                'Medium confidence. Some assumptions made due to limited data or moderate code health.'}
                            {confidenceLevel === 'low' &&
                                'Low confidence. Significant unknowns or poor code health detected. Consider detailed discovery phase.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Story Points Overview */}
            <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-atlas-400" />
                    <h3 className="text-[16px] font-semibold text-white">Story Points Breakdown</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Total Story Points */}
                    <div className="text-center lg:border-r lg:border-white/10">
                        <div className="text-4xl sm:text-5xl font-bold text-atlas-400 mb-2">
                            {storyPoints.total_story_points || 0}
                        </div>
                        <div className="text-[14px] text-slate-400 mb-2">Total Story Points</div>
                        {storyPoints.ai_adjustment && (
                            <span className="inline-block px-3 py-1 rounded-full bg-atlas-500/20 text-atlas-400 text-[12px] font-medium">
                                AI Adjusted (×{storyPoints.ai_adjustment})
                            </span>
                        )}
                    </div>

                    {/* Breakdown */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {storyPoints.breakdown &&
                                Object.entries(storyPoints.breakdown).map(([key, value]: [string, any]) => (
                                    <div key={key} className="flex items-center gap-3">
                                        <div className="text-atlas-400">
                                            {phaseIcons[key] || <BarChart3 className="w-4 h-4" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[12px] text-slate-400 capitalize mb-1">
                                                {key.replace(/_/g, ' ')}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 rounded-full bg-ink-700 overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-atlas-400 to-indigo-500 transition-all duration-300"
                                                        style={{
                                                            width: `${(value / storyPoints.total_story_points) * 100}%`,
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-[14px] font-semibold text-white min-w-[30px]">
                                                    {value}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Scenario Selector */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-atlas-400" />
                    <h3 className="text-[16px] font-semibold text-white">Time & Cost Estimates</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {['small_team', 'medium_team', 'large_team'].map((scenario) => (
                        <button
                            key={scenario}
                            onClick={() => setSelectedScenario(scenario)}
                            className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 ${selectedScenario === scenario
                                    ? 'bg-gradient-to-r from-atlas-400 to-indigo-500 text-white'
                                    : 'bg-ink-700 text-slate-400 hover:text-white hover:bg-ink-600'
                                }`}
                        >
                            {scenario.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                        </button>
                    ))}
                </div>

                {/* Time and Cost Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Users className="w-4 h-4 text-atlas-400" />
                            <span className="text-[13px] text-slate-400">Team Size</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">
                            {currentScenario.team_size}
                        </div>
                        <div className="text-[12px] text-slate-500">
                            Velocity: {currentScenario.velocity} SP/sprint
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar className="w-4 h-4 text-atlas-400" />
                            <span className="text-[13px] text-slate-400">Estimated Duration</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">
                            {currentScenario.months} months
                        </div>
                        <div className="text-[12px] text-slate-500">
                            {currentScenario.weeks} weeks / {currentScenario.sprints} sprints
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <DollarSign className="w-4 h-4 text-atlas-400" />
                            <span className="text-[13px] text-slate-400">Estimated Cost</span>
                        </div>
                        <div className="text-2xl font-bold text-atlas-400 mb-1">
                            ${currentCostScenario.total_cost?.toLocaleString()}
                        </div>
                        <div className="text-[12px] text-slate-500">
                            ${currentCostScenario.cost_per_week?.toLocaleString()}/week
                        </div>
                    </div>
                </div>
            </div>

            {/* Cost Breakdown */}
            <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-6 mb-6">
                <h3 className="text-[16px] font-semibold text-white mb-4">Cost Breakdown</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                        <div className="text-[13px] text-slate-400 mb-1">Base Cost</div>
                        <div className="text-xl font-bold text-white">
                            ${currentCostScenario.base_cost?.toLocaleString()}
                        </div>
                    </div>
                    <div>
                        <div className="text-[13px] text-slate-400 mb-1">Contingency (20%)</div>
                        <div className="text-xl font-bold text-white">
                            ${currentCostScenario.contingency?.toLocaleString()}
                        </div>
                    </div>
                    <div>
                        <div className="text-[13px] text-slate-400 mb-1">Blended Rate</div>
                        <div className="text-xl font-bold text-white">
                            ${currentCostScenario.blended_rate}/hour
                        </div>
                    </div>
                </div>
                <div className="h-px bg-white/10 my-4" />
                <div className="rounded-xl border border-atlas-500/30 bg-atlas-500/10 p-3">
                    <p className="text-[13px] text-slate-300 leading-[1.6]">
                        <span className="font-semibold text-white">Includes:</span> Development, Testing,
                        Architecture, and Project Management. Costs may vary based on location and seniority
                        levels.
                    </p>
                </div>
            </div>

            {/* Phase Breakdown */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-atlas-400" />
                    <h3 className="text-[16px] font-semibold text-white">Phased Delivery Plan</h3>
                </div>
                <div className="space-y-3">
                    {phaseBreakdown.map((phase: any) => {
                        const isOpen = expandedPhases.has(phase.phase);
                        return (
                            <div
                                key={phase.phase}
                                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                                        ? 'border-atlas-400/30 bg-ink-800/70'
                                        : 'border-white/[0.07] bg-ink-800/40 hover:border-white/15'
                                    }`}
                            >
                                <button
                                    onClick={() => togglePhase(phase.phase)}
                                    className="w-full flex items-center gap-4 px-5 py-4 text-left"
                                >
                                    <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-atlas-400 to-indigo-500 text-white text-[12px] font-semibold">
                                        Phase {phase.phase}
                                    </span>
                                    <div className="flex-1">
                                        <h4 className="text-[15px] font-semibold text-white mb-1">{phase.name}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2.5 py-0.5 rounded-full border border-atlas-400/30 text-[11px] font-medium text-atlas-300">
                                                {phase.story_points} SP
                                            </span>
                                            <span className="px-2.5 py-0.5 rounded-full border border-white/15 text-[11px] font-medium text-slate-300">
                                                {phase.percentage}% of total
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-5 pt-1 border-t border-white/[0.06]">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                                            <div>
                                                <h5 className="text-[13px] font-semibold text-white mb-2">
                                                    Activities:
                                                </h5>
                                                <ul className="space-y-1.5">
                                                    {phase.activities?.map((activity: string, idx: number) => (
                                                        <li
                                                            key={idx}
                                                            className="flex items-start gap-2 text-[13px] text-slate-300"
                                                        >
                                                            <span className="text-atlas-400 mt-1.5 w-1 h-1 rounded-full bg-atlas-400 shrink-0" />
                                                            {activity}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="text-[13px] font-semibold text-white mb-2">
                                                    Deliverables:
                                                </h5>
                                                <ul className="space-y-1.5">
                                                    {phase.deliverables?.map((deliverable: string, idx: number) => (
                                                        <li
                                                            key={idx}
                                                            className="flex items-start gap-2 text-[13px] text-slate-300"
                                                        >
                                                            <span className="text-emerald-400 mt-1.5 w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                                                            {deliverable}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Risks */}
            {risks.length > 0 && (
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                        <h3 className="text-[16px] font-semibold text-white">Risk Assessment</h3>
                    </div>
                    <div className="space-y-3">
                        {risks.map((risk: any, index: number) => (
                            <div
                                key={index}
                                className={`rounded-2xl border p-5 ${getSeverityColor(risk.severity)}`}
                            >
                                <div className="flex items-start gap-3">
                                    <AlertTriangle
                                        className={`w-5 h-5 mt-0.5 shrink-0 ${getSeverityIconColor(risk.severity)}`}
                                    />
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <h4 className="text-[15px] font-semibold text-white">{risk.title}</h4>
                                            <span
                                                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${risk.severity === 'critical'
                                                        ? 'bg-red-500/20 text-red-400'
                                                        : risk.severity === 'high'
                                                            ? 'bg-amber-500/20 text-amber-400'
                                                            : 'bg-blue-500/20 text-blue-400'
                                                    }`}
                                            >
                                                {risk.severity}
                                            </span>
                                            <span className="px-2.5 py-0.5 rounded-full border border-white/15 text-[11px] font-medium text-slate-300 capitalize">
                                                {risk.category}
                                            </span>
                                        </div>
                                        <p className="text-[13px] leading-[1.6] mb-3">{risk.description}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <span className="text-[12px] font-semibold text-red-400">Impact: </span>
                                                <span className="text-[12px] text-slate-300">{risk.impact}</span>
                                            </div>
                                            <div>
                                                <span className="text-[12px] font-semibold text-emerald-400">
                                                    Mitigation:{' '}
                                                </span>
                                                <span className="text-[12px] text-slate-300">{risk.mitigation}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* AI Insights */}
            {data?.ai_insights && (
                <div className="rounded-2xl border-2 border-atlas-500/30 bg-gradient-to-br from-atlas-500/10 to-indigo-500/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-atlas-400" />
                        <h3 className="text-[16px] font-semibold text-atlas-300">AI-Enhanced Insights</h3>
                    </div>
                    <p className="text-[13px] text-slate-300 leading-[1.6] mb-4">
                        <span className="font-semibold text-white">Rationale:</span>{' '}
                        {data.ai_insights.rationale}
                    </p>

                    {data.ai_insights.key_challenges?.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-[13px] font-semibold text-white mb-2">Key Challenges:</h4>
                            <ul className="space-y-1.5">
                                {data.ai_insights.key_challenges.map((challenge: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2 text-[13px] text-slate-300">
                                        <Lightbulb className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                                        {challenge}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {data.ai_insights.recommendations?.length > 0 && (
                        <div>
                            <h4 className="text-[13px] font-semibold text-white mb-2">Recommendations:</h4>
                            <ul className="space-y-1.5">
                                {data.ai_insights.recommendations.map((rec: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2 text-[13px] text-slate-300">
                                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                                        {rec}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
