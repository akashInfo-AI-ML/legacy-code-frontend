import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Loader2,
    CheckCircle,
    TrendingUp,
    Code,
    Database,
    Layers,
    Shield,
    Cloud,
    Eye,
    GitCompare,
    Undo,
    Trophy,
    Calendar,
    ChevronDown,
    AlertTriangle,
    Sparkles,
    Target,
} from 'lucide-react';

interface MigrationRoadmapPanelProps {
    projectId: string;
}

const categoryIcons: Record<string, JSX.Element> = {
    preparation: <Code className="w-5 h-5" />,
    analysis: <Layers className="w-5 h-5" />,
    foundation: <Database className="w-5 h-5" />,
    database: <Database className="w-5 h-5" />,
    architecture: <Layers className="w-5 h-5" />,
    api: <Cloud className="w-5 h-5" />,
    business_logic: <Code className="w-5 h-5" />,
    performance: <TrendingUp className="w-5 h-5" />,
    security: <Shield className="w-5 h-5" />,
    observability: <Eye className="w-5 h-5" />,
    deployment: <Cloud className="w-5 h-5" />,
};

const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
        case 'critical':
            return 'bg-red-500/20 text-red-400 border-red-500/30';
        case 'high':
            return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
        case 'medium':
            return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        default:
            return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
};

export default function MigrationRoadmapPanel({ projectId }: MigrationRoadmapPanelProps) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [expandedTech, setExpandedTech] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                const response = await axios.get(
                    `https://legacy-code-backend.onrender.com/migration-roadmap/${projectId}`
                );
                setData(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch migration roadmap');
            } finally {
                setLoading(false);
            }
        };

        fetchRoadmap();
    }, [projectId]);

    const toggleTech = (category: string) => {
        setExpandedTech((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
                <Loader2 className="w-14 h-14 text-atlas-400 animate-spin" />
                <p className="text-[15px] text-slate-400">Generating migration roadmap...</p>
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

    const strategy = data?.strategy || {};
    const modernizationSteps = data?.modernization_steps || [];
    const techStack = data?.technology_stack || {};
    const parallelStrategy = data?.parallel_run_strategy || {};
    const rollbackPlan = data?.rollback_plan || {};
    const successMetrics = data?.success_metrics || {};
    const timeline = data?.timeline || {};

    const recommendedStrategy = strategy.details || {};

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-8">
                <span className="inline-flex items-center gap-2 text-atlas-400 text-[12.5px] font-semibold tracking-[0.08em] uppercase mb-3">
                    <span className="w-6 h-px bg-atlas-400/50" />
                    Roadmap
                    <span className="w-6 h-px bg-atlas-400/50" />
                </span>
                <h2 className="text-2xl sm:text-[2.2rem] font-bold tracking-[-0.02em] leading-tight bg-gradient-to-r from-atlas-400 to-indigo-500 bg-clip-text text-transparent">
                    Migration Roadmap
                </h2>
                <p className="mt-3 text-slate-400 text-[15px] leading-[1.65]">
                    Strategic plan for modernizing your legacy application
                </p>
            </div>

            {/* Timeline Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5 hover:border-atlas-400/30 transition-all duration-300">
                    <Calendar className="w-10 h-10 text-atlas-400 mb-3" />
                    <div className="text-3xl font-bold text-atlas-400 mb-1">
                        {timeline.total_duration_months}
                    </div>
                    <div className="text-[13px] text-slate-400">Months Duration</div>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5 hover:border-atlas-400/30 transition-all duration-300">
                    <TrendingUp className="w-10 h-10 text-atlas-400 mb-3" />
                    <div className="text-[15px] font-bold text-white mb-1 line-clamp-2">
                        {strategy.recommended_approach
                            ?.replace(/_/g, ' ')
                            .replace(/\b\w/g, (l: string) => l.toUpperCase())}
                    </div>
                    <div className="text-[13px] text-slate-400">Recommended Strategy</div>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5 hover:border-atlas-400/30 transition-all duration-300">
                    <Code className="w-10 h-10 text-atlas-400 mb-3" />
                    <div className="text-3xl font-bold text-atlas-400 mb-1">
                        {modernizationSteps.length}
                    </div>
                    <div className="text-[13px] text-slate-400">Modernization Steps</div>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5 hover:border-emerald-400/30 transition-all duration-300">
                    <CheckCircle className="w-10 h-10 text-emerald-400 mb-3" />
                    <div className="text-3xl font-bold text-emerald-400 mb-1">
                        {timeline.phases?.length || 5}
                    </div>
                    <div className="text-[13px] text-slate-400">Delivery Phases</div>
                </div>
            </div>

            {/* Migration Strategy */}
            <div className="rounded-2xl border-2 border-atlas-500/30 bg-gradient-to-br from-atlas-500/10 to-indigo-500/10 p-6 mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <Target className="w-6 h-6 text-atlas-400" />
                    <h3 className="text-[18px] font-bold text-atlas-300">{recommendedStrategy.name}</h3>
                </div>
                <p className="text-[14px] text-slate-300 leading-[1.7] mb-4">
                    {recommendedStrategy.description}
                </p>

                <div className="rounded-xl border border-atlas-500/30 bg-atlas-500/10 p-4 mb-4">
                    <h4 className="text-[13px] font-semibold text-white mb-2">Why this approach?</h4>
                    <p className="text-[13px] text-slate-300 leading-[1.6]">
                        {recommendedStrategy.rationale}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="text-[14px] font-semibold text-emerald-400 mb-2">✅ Advantages:</h4>
                        <ul className="space-y-1.5">
                            {recommendedStrategy.advantages?.map((adv: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2 text-[13px] text-slate-300">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                                    {adv}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[14px] font-semibold text-amber-400 mb-2">⚠️ Challenges:</h4>
                        <ul className="space-y-1.5">
                            {recommendedStrategy.challenges?.map((challenge: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2 text-[13px] text-slate-300">
                                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                                    {challenge}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Modernization Steps */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-atlas-400" />
                    <h3 className="text-[16px] font-semibold text-white">Modernization Steps</h3>
                </div>
                <div className="space-y-4">
                    {modernizationSteps.map((step: any, index: number) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-white/[0.07] bg-ink-800/40 overflow-hidden"
                        >
                            {/* Step Header */}
                            <div className="p-5">
                                <div className="flex items-start gap-4 mb-3">
                                    <div className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-atlas-400 to-indigo-500 text-white shrink-0">
                                        {categoryIcons[step.category] || <Code className="w-5 h-5" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <h4 className="text-[15px] font-semibold text-white">{step.title}</h4>
                                            <span
                                                className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold capitalize ${getPriorityColor(
                                                    step.priority
                                                )}`}
                                            >
                                                {step.priority}
                                            </span>
                                            <span className="px-2.5 py-0.5 rounded-full border border-white/15 text-[11px] font-medium text-slate-300">
                                                {step.estimated_duration}
                                            </span>
                                        </div>
                                        <p className="text-[13px] text-slate-400 leading-[1.6] mb-3">
                                            {step.description}
                                        </p>

                                        {/* Tasks */}
                                        <div>
                                            <h5 className="text-[12px] font-semibold text-white mb-2">Tasks:</h5>
                                            <ul className="space-y-1.5">
                                                {step.tasks?.map((task: string, idx: number) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-2 text-[12px] text-slate-300"
                                                    >
                                                        <span className="text-atlas-400 mt-1.5 w-1 h-1 rounded-full bg-atlas-400 shrink-0" />
                                                        {task}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Dependencies */}
                                        {step.dependencies?.length > 0 && (
                                            <div className="mt-3 rounded-lg border border-blue-500/30 bg-blue-500/10 p-3">
                                                <p className="text-[12px] text-blue-300">
                                                    <span className="font-semibold">Dependencies:</span> Requires completion
                                                    of step(s) {step.dependencies.join(', ')}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Connecting Line */}
                            {index < modernizationSteps.length - 1 && (
                                <div className="flex justify-center">
                                    <div className="w-px h-6 bg-gradient-to-b from-atlas-400/50 to-transparent" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Technology Stack Recommendations */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="w-5 h-5 text-atlas-400" />
                    <h3 className="text-[16px] font-semibold text-white">
                        Technology Stack Recommendations
                    </h3>
                </div>
                <div className="space-y-3">
                    {Object.entries(techStack).map(([category, techs]: [string, any]) => {
                        const isOpen = expandedTech.has(category);
                        return (
                            <div
                                key={category}
                                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                                        ? 'border-atlas-400/30 bg-ink-800/70'
                                        : 'border-white/[0.07] bg-ink-800/40 hover:border-white/15'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleTech(category)}
                                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                                >
                                    <span className="text-[15px] font-semibold text-white capitalize">
                                        {category.replace(/_/g, ' ')}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-5 pt-1 border-t border-white/[0.06]">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            {Object.entries(techs).map(([key, value]: [string, any]) => (
                                                <div
                                                    key={key}
                                                    className="rounded-xl border border-white/10 bg-ink-900/50 p-4"
                                                >
                                                    <h5 className="text-[13px] font-semibold text-white mb-2 capitalize">
                                                        {key.replace(/_/g, ' ')}
                                                    </h5>
                                                    <span className="inline-block px-3 py-1 rounded-full bg-atlas-500/20 text-atlas-400 text-[12px] font-medium mb-2">
                                                        {value.recommended}
                                                    </span>
                                                    <p className="text-[12px] text-slate-400 leading-[1.6] mb-2">
                                                        {value.rationale}
                                                    </p>
                                                    {value.alternatives?.length > 0 && (
                                                        <p className="text-[11px] text-slate-500">
                                                            Alternatives: {value.alternatives.join(', ')}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Parallel Run Strategy */}
            <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <GitCompare className="w-8 h-8 text-atlas-400" />
                    <h3 className="text-[16px] font-semibold text-white">
                        {parallelStrategy.approach}
                    </h3>
                </div>
                <p className="text-[14px] text-slate-400 leading-[1.6] mb-6">
                    {parallelStrategy.description}
                </p>

                <div className="space-y-4">
                    {parallelStrategy.phases?.map((phase: any, index: number) => (
                        <div key={index} className="rounded-xl border border-white/10 bg-ink-900/50 p-4">
                            <div className="mb-3">
                                <h4 className="text-[14px] font-semibold text-white mb-1">{phase.name}</h4>
                                <span className="inline-block px-2.5 py-0.5 rounded-full border border-white/15 text-[11px] font-medium text-slate-300">
                                    {phase.duration}
                                </span>
                            </div>
                            <p className="text-[13px] text-slate-400 leading-[1.6] mb-3">{phase.description}</p>

                            <div className="mb-3">
                                <h5 className="text-[12px] font-semibold text-white mb-2">Activities:</h5>
                                <ul className="space-y-1">
                                    {phase.activities?.map((activity: string, idx: number) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-2 text-[12px] text-slate-300"
                                        >
                                            <span className="text-atlas-400 mt-1.5 w-1 h-1 rounded-full bg-atlas-400 shrink-0" />
                                            {activity}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
                                <h5 className="text-[12px] font-semibold text-emerald-400 mb-2">
                                    Success Criteria:
                                </h5>
                                <ul className="space-y-1">
                                    {phase.success_criteria?.map((criteria: string, idx: number) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-2 text-[12px] text-emerald-300"
                                        >
                                            <CheckCircle className="w-3 h-3 mt-0.5 shrink-0" />
                                            {criteria}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rollback Plan */}
            <div className="rounded-2xl border-2 border-amber-500/30 bg-amber-500/5 p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <Undo className="w-8 h-8 text-amber-400" />
                    <h3 className="text-[16px] font-semibold text-white">
                        Rollback Plan: {rollbackPlan.strategy}
                    </h3>
                </div>

                <div className="space-y-3">
                    {rollbackPlan.levels?.map((level: any, index: number) => (
                        <div
                            key={index}
                            className="rounded-xl border border-white/10 bg-ink-800/70 p-4"
                        >
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[11px] font-semibold">
                                    Level {level.level}
                                </span>
                                <h4 className="text-[14px] font-semibold text-white">{level.name}</h4>
                                <span className="px-2.5 py-0.5 rounded-full border border-white/15 text-[11px] font-medium text-slate-300">
                                    {level.time_to_rollback}
                                </span>
                            </div>
                            <p className="text-[13px] text-slate-400 mb-3">
                                <span className="font-semibold text-white">Trigger:</span> {level.trigger}
                            </p>
                            <div>
                                <h5 className="text-[12px] font-semibold text-white mb-2">Procedure:</h5>
                                <ul className="space-y-1">
                                    {level.procedure?.map((step: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2 text-[12px] text-slate-300">
                                            <span className="text-amber-400 mt-1.5 w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Success Metrics */}
            <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <Trophy className="w-8 h-8 text-emerald-400" />
                    <h3 className="text-[16px] font-semibold text-white">Success Metrics</h3>
                </div>

                <div className="space-y-4">
                    {Object.entries(successMetrics).map(([category, metrics]: [string, any]) => (
                        <div key={category}>
                            <h4 className="text-[14px] font-semibold text-white mb-3 capitalize">
                                {category.replace(/_/g, ' ')}
                            </h4>
                            <div className="rounded-xl border border-white/10 bg-ink-800/50 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/[0.07] bg-ink-900/50">
                                                <th className="px-4 py-3 text-left text-[12px] font-semibold text-slate-300">
                                                    Metric
                                                </th>
                                                <th className="px-4 py-3 text-left text-[12px] font-semibold text-slate-300">
                                                    Target
                                                </th>
                                                <th className="px-4 py-3 text-left text-[12px] font-semibold text-slate-300">
                                                    Measurement
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {metrics.map((metric: any, idx: number) => (
                                                <tr
                                                    key={idx}
                                                    className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors duration-200"
                                                >
                                                    <td className="px-4 py-3 text-[13px] text-slate-300">
                                                        {metric.metric}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[12px] font-medium">
                                                            {metric.target}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-[13px] text-slate-300">
                                                        {metric.measurement}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timeline Milestones */}
            <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-atlas-400" />
                    <h3 className="text-[16px] font-semibold text-white">Key Milestones</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {timeline.milestones?.map((milestone: any, index: number) => (
                        <div
                            key={index}
                            className="rounded-xl border border-white/10 bg-ink-900/50 p-4"
                        >
                            <h4 className="text-[14px] font-semibold text-white mb-2">{milestone.name}</h4>
                            <p className="text-[13px] text-slate-400">
                                Target: {new Date(milestone.target_date).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
