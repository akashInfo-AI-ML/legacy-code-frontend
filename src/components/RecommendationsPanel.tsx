import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Loader2,
    TrendingUp,
    Zap,
    Wrench,
    Calendar,
    CheckCircle,
    ArrowRight,
    Sparkles,
    RefreshCw,
} from 'lucide-react';

interface RecommendationsPanelProps {
    projectId: string;
}

export default function RecommendationsPanel({ projectId }: RecommendationsPanelProps) {
    const [loading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get(
                    `https://legacy-code-backend.onrender.com/recommendations/${projectId}`
                );
                setRecommendations(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch recommendations');
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [projectId]);

    const getEffortStyle = (effort: string) => {
        switch (effort.toLowerCase()) {
            case 'low':
                return 'bg-emerald-500/20 text-emerald-400';
            case 'medium':
                return 'bg-amber-500/20 text-amber-400';
            default:
                return 'bg-red-500/20 text-red-400';
        }
    };

    const getImpactStyle = (impact: string) => {
        switch (impact.toLowerCase()) {
            case 'high':
            case 'very_high':
                return 'bg-atlas-500/20 text-atlas-400';
            case 'medium':
                return 'bg-indigo-500/20 text-indigo-400';
            default:
                return 'bg-slate-500/20 text-slate-400';
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
                <Loader2 className="w-14 h-14 text-atlas-400 animate-spin" />
                <p className="text-[15px] text-slate-400">Loading recommendations...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 flex items-start gap-3">
                <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <p className="text-[14px] text-red-300">{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-8">
                <span className="inline-flex items-center gap-2 text-atlas-400 text-[12.5px] font-semibold tracking-[0.08em] uppercase mb-3">
                    <span className="w-6 h-px bg-atlas-400/50" />
                    Recommendations
                    <span className="w-6 h-px bg-atlas-400/50" />
                </span>
                <h2 className="text-2xl sm:text-[2.2rem] font-bold tracking-[-0.02em] leading-tight bg-gradient-to-r from-atlas-400 to-indigo-500 bg-clip-text text-transparent">
                    Modernization Roadmap
                </h2>
                <p className="mt-3 text-slate-400 text-[15px] leading-[1.65]">
                    Strategic recommendations for modernizing your legacy application
                </p>
            </div>

            {/* Quick Wins */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-[16px] font-semibold text-white">Quick Wins</h3>
                </div>
                <div className="space-y-3">
                    {recommendations?.quick_wins?.map((item: any) => (
                        <div
                            key={item.id}
                            className="group rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 p-5 hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-500 ease-smooth"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                <h4 className="text-[15px] font-semibold text-white flex-1">{item.title}</h4>
                                <div className="flex flex-wrap gap-2">
                                    <span
                                        className={`px-3 py-1 rounded-full text-[11px] font-semibold ${getEffortStyle(
                                            item.effort
                                        )}`}
                                    >
                                        {item.effort}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${getImpactStyle(item.impact)}`}>
                                        {item.impact}
                                    </span>
                                </div>
                            </div>
                            <p className="text-[14px] text-slate-300 leading-[1.7]">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Major Refactoring */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Wrench className="w-5 h-5 text-atlas-400" />
                    <h3 className="text-[16px] font-semibold text-white">Major Refactoring</h3>
                </div>
                <div className="space-y-3">
                    {recommendations?.refactoring?.map((item: any) => (
                        <div
                            key={item.id}
                            className="group rounded-2xl border-2 border-atlas-500/30 bg-gradient-to-br from-atlas-500/5 to-indigo-500/10 p-5 hover:border-atlas-500/50 hover:-translate-y-1 transition-all duration-500 ease-smooth"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                <h4 className="text-[15px] font-semibold text-white flex-1">{item.title}</h4>
                                <div className="flex flex-wrap gap-2">
                                    <span
                                        className={`px-3 py-1 rounded-full text-[11px] font-semibold ${getEffortStyle(
                                            item.effort
                                        )}`}
                                    >
                                        {item.effort}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${getImpactStyle(item.impact)}`}>
                                        {item.impact}
                                    </span>
                                </div>
                            </div>
                            <p className="text-[14px] text-slate-300 leading-[1.7]">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modernization Timeline */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-6">
                    <Calendar className="w-5 h-5 text-atlas-400" />
                    <h3 className="text-[16px] font-semibold text-white">Modernization Timeline</h3>
                </div>

                <div className="space-y-6">
                    {recommendations?.modernization_path?.map((phase: any, index: number) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div key={phase.phase} className="relative">
                                {/* Connector Line */}
                                {index < (recommendations?.modernization_path?.length || 0) - 1 && (
                                    <div className="absolute left-1/2 top-20 w-0.5 h-[calc(100%+24px)] -translate-x-1/2 bg-gradient-to-b from-atlas-400 to-indigo-500 hidden md:block" />
                                )}

                                <div
                                    className={`flex flex-col md:flex-row items-center gap-4 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Duration */}
                                    <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                                        <span className="inline-block px-4 py-2 rounded-full bg-atlas-500/15 text-atlas-400 text-[13px] font-semibold">
                                            {phase.duration}
                                        </span>
                                    </div>

                                    {/* Phase Indicator */}
                                    <div className="relative z-10 grid place-items-center w-14 h-14 rounded-full bg-gradient-to-br from-atlas-400 to-indigo-500 shadow-lg shadow-atlas-500/30">
                                        <TrendingUp className="w-6 h-6 text-white" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div
                                            className={`rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5 hover:border-atlas-400/30 hover:-translate-y-1 transition-all duration-500 ease-smooth ${isEven ? '' : 'md:ml-0'
                                                }`}
                                        >
                                            <h4 className="text-[15px] font-semibold text-white mb-3">
                                                Phase {phase.phase}: {phase.title}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {phase.items?.map((item: string) => (
                                                    <span
                                                        key={item}
                                                        className="px-3 py-1 rounded-full bg-atlas-500/15 text-atlas-300 text-[11px] font-medium"
                                                    >
                                                        {item}
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
            </div>

            {/* Next Steps */}
            <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-[16px] font-semibold text-white">Next Steps</h3>
                </div>
                <ol className="space-y-2.5 pl-5 list-decimal marker:text-emerald-400 marker:font-semibold">
                    <li className="text-[13px] text-slate-300 leading-[1.6] pl-2">
                        Review all recommendations with your architecture team
                    </li>
                    <li className="text-[13px] text-slate-300 leading-[1.6] pl-2">
                        Prioritize quick wins for immediate implementation
                    </li>
                    <li className="text-[13px] text-slate-300 leading-[1.6] pl-2">
                        Plan major refactoring in phases
                    </li>
                    <li className="text-[13px] text-slate-300 leading-[1.6] pl-2">
                        Schedule regular health score reviews
                    </li>
                    <li className="text-[13px] text-slate-300 leading-[1.6] pl-2">
                        Set up CI/CD for continuous monitoring
                    </li>
                </ol>
            </div>

            {/* Action Button */}
            <button
                onClick={() => window.location.reload()}
                className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-atlas-400 to-indigo-500 text-white font-semibold text-[15px] px-6 py-4 glow-cyan hover:brightness-110 transition-all duration-300"
            >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                Analyze Another Project
            </button>
        </div>
    );
}
