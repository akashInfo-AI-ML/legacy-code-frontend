import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Loader2,
    Activity,
    AlertTriangle,
    CheckCircle,
    TrendingUp,
    TrendingDown,
    Minus,
    Shield,
    Code,
    Zap,
    Target,
} from 'lucide-react';

interface HealthScorePanelProps {
    projectId: string;
}

export default function HealthScorePanel({ projectId }: HealthScorePanelProps) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHealthScore = async () => {
            try {
                const response = await axios.get(
                    `https://legacy-code-backend.onrender.com/health-score/${projectId}`
                );
                setData(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch health score');
            } finally {
                setLoading(false);
            }
        };

        fetchHealthScore();
    }, [projectId]);

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-emerald-400';
        if (score >= 60) return 'text-atlas-400';
        if (score >= 40) return 'text-amber-400';
        return 'text-red-400';
    };

    const getScoreGradient = (score: number) => {
        if (score >= 80) return 'from-emerald-400 to-emerald-500';
        if (score >= 60) return 'from-atlas-400 to-indigo-500';
        if (score >= 40) return 'from-amber-400 to-amber-500';
        return 'from-red-400 to-red-500';
    };

    const getScoreBg = (score: number) => {
        if (score >= 80) return 'bg-emerald-500/10 border-emerald-500/30';
        if (score >= 60) return 'bg-atlas-500/10 border-atlas-500/30';
        if (score >= 40) return 'bg-amber-500/10 border-amber-500/30';
        return 'bg-red-500/10 border-red-500/30';
    };

    const getTrendIcon = (trend: string) => {
        if (trend === 'improving') return <TrendingUp className="w-4 h-4 text-emerald-400" />;
        if (trend === 'declining') return <TrendingDown className="w-4 h-4 text-red-400" />;
        return <Minus className="w-4 h-4 text-slate-400" />;
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
                <Loader2 className="w-14 h-14 text-atlas-400 animate-spin" />
                <p className="text-[15px] text-slate-400">Calculating health score...</p>
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

    const overallScore = data?.overall_score || 0;
    const categories = data?.categories || {};
    const recommendations = data?.recommendations || [];

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-8">
                <span className="inline-flex items-center gap-2 text-atlas-400 text-[12.5px] font-semibold tracking-[0.08em] uppercase mb-3">
                    <span className="w-6 h-px bg-atlas-400/50" />
                    Health Assessment
                    <span className="w-6 h-px bg-atlas-400/50" />
                </span>
                <h2 className="text-2xl sm:text-[2.2rem] font-bold tracking-[-0.02em] leading-tight bg-gradient-to-r from-atlas-400 to-indigo-500 bg-clip-text text-transparent">
                    Code Health Score
                </h2>
                <p className="mt-3 text-slate-400 text-[15px] leading-[1.65]">
                    Comprehensive assessment of your codebase quality and maintainability
                </p>
            </div>

            {/* Overall Score */}
            <div className={`rounded-2xl border-2 p-8 mb-8 ${getScoreBg(overallScore)}`}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                            <Activity className="w-6 h-6 text-atlas-400" />
                            <h3 className="text-[18px] font-semibold text-white">Overall Health Score</h3>
                        </div>
                        <p className="text-[13px] text-slate-400">Based on multiple quality metrics</p>
                    </div>
                    <div className="relative">
                        <div className="relative w-32 h-32">
                            <svg className="w-32 h-32 transform -rotate-90">
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="none"
                                    className="text-white/10"
                                />
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    stroke="url(#gradient)"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray={`${(overallScore / 100) * 351.858} 351.858`}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000"
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop
                                            offset="0%"
                                            className={getScoreColor(overallScore)}
                                            stopOpacity="1"
                                        />
                                        <stop
                                            offset="100%"
                                            className={getScoreColor(overallScore)}
                                            stopOpacity="0.6"
                                        />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
                                    {overallScore}
                                </span>
                                <span className="text-[11px] text-slate-400">/ 100</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Scores */}
            <div className="mb-8">
                <h3 className="text-[16px] font-semibold text-white mb-4">Category Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(categories).map(([category, details]: [string, any]) => (
                        <div
                            key={category}
                            className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    {category === 'maintainability' && <Code className="w-4 h-4 text-atlas-400" />}
                                    {category === 'security' && <Shield className="w-4 h-4 text-atlas-400" />}
                                    {category === 'performance' && <Zap className="w-4 h-4 text-atlas-400" />}
                                    {category === 'reliability' && <Target className="w-4 h-4 text-atlas-400" />}
                                    <h4 className="text-[14px] font-semibold text-white capitalize">
                                        {category}
                                    </h4>
                                </div>
                                <div className="flex items-center gap-2">
                                    {getTrendIcon(details.trend)}
                                    <span className={`text-xl font-bold ${getScoreColor(details.score)}`}>
                                        {details.score}
                                    </span>
                                </div>
                            </div>
                            <div className="h-2 rounded-full bg-ink-700 overflow-hidden mb-2">
                                <div
                                    className={`h-full bg-gradient-to-r ${getScoreGradient(
                                        details.score
                                    )} transition-all duration-1000`}
                                    style={{ width: `${details.score}%` }}
                                />
                            </div>
                            <p className="text-[12px] text-slate-400">{details.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-[16px] font-semibold text-white mb-4">
                        Improvement Recommendations
                    </h3>
                    <div className="space-y-3">
                        {recommendations.map((rec: any, index: number) => (
                            <div
                                key={index}
                                className="rounded-xl border border-white/[0.07] bg-ink-800/40 p-4"
                            >
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-atlas-400 mt-0.5 shrink-0" />
                                    <div className="flex-1">
                                        <h4 className="text-[14px] font-semibold text-white mb-1">{rec.title}</h4>
                                        <p className="text-[13px] text-slate-400 leading-[1.6]">
                                            {rec.description}
                                        </p>
                                        {rec.priority && (
                                            <span
                                                className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${rec.priority === 'high'
                                                        ? 'bg-red-500/20 text-red-400'
                                                        : rec.priority === 'medium'
                                                            ? 'bg-amber-500/20 text-amber-400'
                                                            : 'bg-blue-500/20 text-blue-400'
                                                    }`}
                                            >
                                                {rec.priority} priority
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
