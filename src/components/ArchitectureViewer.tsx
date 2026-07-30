import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Loader2,
    CheckCircle,
    AlertTriangle,
    TrendingUp,
    Layers,
    ArrowDown,
    Package,
    GitBranch,
    Target,
    Zap,
} from 'lucide-react';

interface ArchitectureViewerProps {
    projectId: string;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <div className="py-6">{children}</div>}
        </div>
    );
}

export default function ArchitectureViewer({ projectId }: ArchitectureViewerProps) {
    const [loading, setLoading] = useState(true);
    const [architecture, setArchitecture] = useState<any>(null);
    const [aiAnalysis, setAiAnalysis] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // First scan
                await axios.post(`https://legacy-code-backend.onrender.com/scan/${projectId}`);

                // Get architecture
                const archResponse = await axios.get(
                    `https://legacy-code-backend.onrender.com/architecture/${projectId}`
                );
                setArchitecture(archResponse.data);

                // Get AI analysis for architecture patterns
                const aiResponse = await axios.post(
                    `https://legacy-code-backend.onrender.com/ai/analyze`,
                    {
                        project_id: projectId,
                        context: 'Architecture analysis and modernization recommendations',
                    }
                );
                setAiAnalysis(aiResponse.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch architecture data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [projectId]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
                <Loader2 className="w-14 h-14 text-atlas-400 animate-spin" />
                <p className="text-[15px] text-slate-400">Analyzing architecture...</p>
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

    const currentArch = aiAnalysis?.current_architecture || {};
    const recommendedArch = aiAnalysis?.recommended_architecture || {};

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-8">
                <span className="inline-flex items-center gap-2 text-atlas-400 text-[12.5px] font-semibold tracking-[0.08em] uppercase mb-3">
                    <span className="w-6 h-px bg-atlas-400/50" />
                    Analysis Results
                    <span className="w-6 h-px bg-atlas-400/50" />
                </span>
                <h2 className="text-2xl sm:text-[2.2rem] font-bold tracking-[-0.02em] leading-tight bg-gradient-to-r from-atlas-400 to-indigo-500 bg-clip-text text-transparent">
                    Architecture Analysis
                </h2>
                <p className="mt-3 text-slate-400 text-[15px] leading-[1.65]">
                    Comprehensive analysis of your current architecture with modernization recommendations
                </p>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5 hover:border-atlas-400/30 transition-all duration-300">
                    <div className="flex items-start justify-between mb-2">
                        <Package className="w-5 h-5 text-atlas-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                        {architecture?.nodes?.length || 0}
                    </div>
                    <div className="text-[13px] text-slate-400">Components</div>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5 hover:border-atlas-400/30 transition-all duration-300">
                    <div className="flex items-start justify-between mb-2">
                        <GitBranch className="w-5 h-5 text-atlas-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                        {architecture?.edges?.length || 0}
                    </div>
                    <div className="text-[13px] text-slate-400">Dependencies</div>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5 hover:border-atlas-400/30 transition-all duration-300">
                    <div className="flex items-start justify-between mb-2">
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="text-3xl font-bold text-amber-400 mb-1">
                        {architecture?.metrics?.cyclic_complexity || 0}
                    </div>
                    <div className="text-[13px] text-slate-400">Circular Dependencies</div>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5 hover:border-atlas-400/30 transition-all duration-300">
                    <div className="flex items-start justify-between mb-2">
                        <Layers className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="text-3xl font-bold text-emerald-400 mb-1">
                        {architecture?.layers?.length || 0}
                    </div>
                    <div className="text-[13px] text-slate-400">Architectural Layers</div>
                </div>
            </div>

            {/* Tabs */}
            <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 overflow-hidden">
                {/* Tab Headers */}
                <div className="border-b border-white/[0.07] bg-ink-900/50">
                    <div className="flex">
                        <button
                            onClick={() => setTabValue(0)}
                            className={`flex-1 px-6 py-4 text-[14px] font-semibold transition-all duration-300 ${tabValue === 0
                                    ? 'text-atlas-400 border-b-2 border-atlas-400 bg-atlas-500/[0.05]'
                                    : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                                }`}
                        >
                            Current Architecture
                        </button>
                        <button
                            onClick={() => setTabValue(1)}
                            className={`flex-1 px-6 py-4 text-[14px] font-semibold transition-all duration-300 ${tabValue === 1
                                    ? 'text-atlas-400 border-b-2 border-atlas-400 bg-atlas-500/[0.05]'
                                    : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                                }`}
                        >
                            Recommended Architecture
                        </button>
                        <button
                            onClick={() => setTabValue(2)}
                            className={`flex-1 px-6 py-4 text-[14px] font-semibold transition-all duration-300 ${tabValue === 2
                                    ? 'text-atlas-400 border-b-2 border-atlas-400 bg-atlas-500/[0.05]'
                                    : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                                }`}
                        >
                            Migration Path
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {/* Current Architecture Tab */}
                    <TabPanel value={tabValue} index={0}>
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="flex items-start gap-4">
                                <div className="grid place-items-center w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 shrink-0">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">
                                        {currentArch.pattern || 'Current Architecture Pattern'}
                                    </h3>
                                    <p className="text-[14px] text-slate-400 leading-[1.6]">
                                        {currentArch.description || 'Analyzing current architecture...'}
                                    </p>
                                </div>
                            </div>

                            {/* Architecture Diagram */}
                            <div className="rounded-2xl border-2 border-dashed border-white/10 bg-ink-900/50 p-8">
                                <p className="text-[13px] font-semibold text-center text-slate-300 mb-6">
                                    Current Architecture Layers
                                </p>
                                <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                                    {currentArch.layers && currentArch.layers.length > 0 ? (
                                        currentArch.layers.map((layer: string, index: number) => (
                                            <div key={index} className="relative">
                                                <div className="rounded-xl border-2 border-atlas-400/50 bg-ink-800 p-4 text-center font-semibold text-white">
                                                    {layer}
                                                </div>
                                                {index < currentArch.layers.length - 1 && (
                                                    <div className="flex justify-center my-2">
                                                        <ArrowDown className="w-5 h-5 text-atlas-400" />
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-slate-400 text-[14px]">
                                            Analyzing architecture layers...
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Issues */}
                            {currentArch.issues && currentArch.issues.length > 0 && (
                                <div>
                                    <h4 className="text-[15px] font-semibold text-red-400 mb-3">
                                        Issues & Concerns:
                                    </h4>
                                    <div className="space-y-2">
                                        {currentArch.issues.map((issue: string, index: number) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3"
                                            >
                                                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                                                <p className="text-[13px] text-slate-300 leading-[1.6]">{issue}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Metrics */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-xl border border-white/[0.07] bg-ink-900/50 p-4 text-center">
                                    <p className="text-[13px] text-slate-400 mb-2">Coupling Level</p>
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-[12px] font-semibold ${currentArch.coupling === 'high'
                                                ? 'bg-red-500/20 text-red-400'
                                                : 'bg-amber-500/20 text-amber-400'
                                            }`}
                                    >
                                        {currentArch.coupling || 'Medium'}
                                    </span>
                                </div>
                                <div className="rounded-xl border border-white/[0.07] bg-ink-900/50 p-4 text-center">
                                    <p className="text-[13px] text-slate-400 mb-2">Cohesion Level</p>
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-[12px] font-semibold ${currentArch.cohesion === 'low'
                                                ? 'bg-red-500/20 text-red-400'
                                                : 'bg-emerald-500/20 text-emerald-400'
                                            }`}
                                    >
                                        {currentArch.cohesion || 'Medium'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    {/* Recommended Architecture Tab */}
                    <TabPanel value={tabValue} index={1}>
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="flex items-start gap-4">
                                <div className="grid place-items-center w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">
                                        {recommendedArch.pattern || 'Recommended Modern Architecture'}
                                    </h3>
                                    <p className="text-[14px] text-slate-400 leading-[1.6]">
                                        {recommendedArch.description || 'Modern, scalable architecture pattern'}
                                    </p>
                                </div>
                            </div>

                            {/* Architecture Diagram */}
                            <div className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-atlas-500/10 p-8">
                                <p className="text-[13px] font-semibold text-center text-emerald-400 mb-6">
                                    Recommended Modern Architecture
                                </p>
                                <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                                    {recommendedArch.layers && recommendedArch.layers.length > 0 ? (
                                        recommendedArch.layers.map((layer: string, index: number) => (
                                            <div key={index} className="relative">
                                                <div className="rounded-xl border-2 border-emerald-500 bg-ink-800 p-4 text-center font-semibold text-white shadow-lg shadow-emerald-500/20">
                                                    {layer}
                                                </div>
                                                {index < recommendedArch.layers.length - 1 && (
                                                    <div className="flex justify-center my-2">
                                                        <ArrowDown className="w-5 h-5 text-emerald-400" />
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-slate-400 text-[14px]">
                                            Generating recommendations...
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Benefits */}
                            {recommendedArch.benefits && recommendedArch.benefits.length > 0 && (
                                <div>
                                    <h4 className="text-[15px] font-semibold text-emerald-400 mb-3">Benefits:</h4>
                                    <div className="space-y-2">
                                        {recommendedArch.benefits.map((benefit: string, index: number) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3"
                                            >
                                                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                                <p className="text-[13px] text-slate-300 leading-[1.6]">{benefit}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Impact Alert */}
                            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                                <div className="flex items-start gap-3">
                                    <Zap className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                                    <div>
                                        <h4 className="text-[14px] font-semibold text-white mb-2">
                                            Modernization Impact
                                        </h4>
                                        <p className="text-[13px] text-slate-300 leading-[1.6]">
                                            Adopting this architecture will improve testability, maintainability, and
                                            scalability while reducing technical debt and making your system more
                                            adaptable to future changes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    {/* Migration Path Tab */}
                    <TabPanel value={tabValue} index={2}>
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white">Migration Steps</h3>

                            {recommendedArch.migration_steps && recommendedArch.migration_steps.length > 0 ? (
                                <div className="space-y-3">
                                    {recommendedArch.migration_steps.map((step: string, index: number) => (
                                        <div
                                            key={index}
                                            className={`flex items-start gap-4 rounded-xl border border-white/[0.07] p-4 ${index % 2 === 0 ? 'bg-ink-900/50' : 'bg-ink-800/30'
                                                }`}
                                        >
                                            <div className="grid place-items-center w-8 h-8 rounded-full bg-gradient-to-br from-atlas-400 to-indigo-500 text-white font-semibold text-[14px] shrink-0">
                                                {index + 1}
                                            </div>
                                            <p className="text-[14px] text-slate-300 leading-[1.6] pt-1">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-xl border border-atlas-500/30 bg-atlas-500/10 p-4 flex items-start gap-3">
                                    <Target className="w-5 h-5 text-atlas-400 mt-0.5 shrink-0" />
                                    <p className="text-[13px] text-slate-300">
                                        Visit the Migration Roadmap tab for a detailed step-by-step migration plan.
                                    </p>
                                </div>
                            )}

                            <div className="h-px bg-white/10 my-6" />

                            {/* Before & After Comparison */}
                            <div>
                                <h4 className="text-[16px] font-semibold text-white mb-4">
                                    Before & After Comparison
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Current State */}
                                    <div className="rounded-2xl border-2 border-amber-500/30 bg-amber-500/5 p-5">
                                        <h5 className="text-[14px] font-semibold text-amber-400 mb-4">
                                            Current State
                                        </h5>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2 text-[13px] text-slate-300">
                                                <span className="text-amber-400 mt-1">•</span>
                                                <span>High coupling between components</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-[13px] text-slate-300">
                                                <span className="text-amber-400 mt-1">•</span>
                                                <span>Difficult to test</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-[13px] text-slate-300">
                                                <span className="text-amber-400 mt-1">•</span>
                                                <span>Hard to maintain</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-[13px] text-slate-300">
                                                <span className="text-amber-400 mt-1">•</span>
                                                <span>Limited scalability</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Future State */}
                                    <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 p-5">
                                        <h5 className="text-[14px] font-semibold text-emerald-400 mb-4">
                                            Future State
                                        </h5>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2 text-[13px] text-slate-300">
                                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                                                <span>Low coupling, high cohesion</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-[13px] text-slate-300">
                                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                                                <span>Highly testable</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-[13px] text-slate-300">
                                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                                                <span>Easy to maintain and extend</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-[13px] text-slate-300">
                                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                                                <span>Highly scalable</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </div>
            </div>

            {/* Detected Layers */}
            {architecture?.layers && architecture.layers.length > 0 && (
                <div className="mt-6 rounded-2xl border border-white/[0.07] bg-ink-800/40 p-6">
                    <h3 className="text-[16px] font-semibold text-white mb-4">Detected Layers</h3>
                    <div className="flex flex-wrap gap-2">
                        {architecture.layers.map((layer: string, index: number) => (
                            <span
                                key={index}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-atlas-400/30 bg-atlas-500/10 text-[13px] font-medium text-atlas-300"
                            >
                                <Layers className="w-3.5 h-3.5" />
                                {layer}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
