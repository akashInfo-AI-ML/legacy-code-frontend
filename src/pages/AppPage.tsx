import { useState } from 'react';
import {
  ArrowLeft,
  Upload,
  Layers,
  Brain,
  ScrollText,
  Clock,
  Map,
  TrendingUp,
  Activity,
  Lightbulb,
  Code,
  ChevronDown,
  CheckCircle,
  X,
} from 'lucide-react';
import UploadComponent from '@/components/UploadComponent';
import ArchitectureViewer from '@/components/ArchitectureViewer';
import AIAnalysisPanel from '@/components/AIAnalysisPanel';
import ImpactAnalysisPanel from '@/components/ImpactAnalysisPanel';
import HealthScorePanel from '@/components/HealthScorePanel';
import RecommendationsPanel from '@/components/RecommendationsPanel';
import BusinessRulesPanel from '@/components/BusinessRulesPanel';
import EffortEstimationPanel from '@/components/EffortEstimationPanel';
import MigrationRoadmapPanel from '@/components/MigrationRoadmapPanel';

interface NavItem {
  id: number;
  label: string;
  shortLabel?: string;
  icon: React.ReactNode;
  requiresProject: boolean;
}

const navItems: NavItem[] = [
  { id: 0, label: 'Upload', icon: <Upload className="w-4 h-4" />, requiresProject: false },
  { id: 1, label: 'Architecture', shortLabel: 'Arch', icon: <Layers className="w-4 h-4" />, requiresProject: true },
  { id: 2, label: 'AI Analysis', shortLabel: 'AI', icon: <Brain className="w-4 h-4" />, requiresProject: true },
  { id: 3, label: 'Business Rules', shortLabel: 'Rules', icon: <ScrollText className="w-4 h-4" />, requiresProject: true },
  { id: 4, label: 'Effort', icon: <Clock className="w-4 h-4" />, requiresProject: true },
  { id: 5, label: 'Roadmap', icon: <Map className="w-4 h-4" />, requiresProject: true },
  { id: 6, label: 'Impact', icon: <TrendingUp className="w-4 h-4" />, requiresProject: true },
  { id: 7, label: 'Recommendations', shortLabel: 'Rec', icon: <Lightbulb className="w-4 h-4" />, requiresProject: true },
];

export default function AppPage() {
  const [activeView, setActiveView] = useState(0);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const handleUploadSuccess = (id: string) => {
    setProjectId(id);
    setActiveView(1);
    setError(null);
  };

  const handleError = (msg: string) => {
    setError(msg);
  };

  const handleNavClick = (viewId: number) => {
    setActiveView(viewId);
    setError(null);
    setDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-ink-950 text-white noise">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-ink-900/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Top Bar */}
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => (window as any).navigateTo?.('/')}
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-0 p-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Back</span>
              </button>
              <div className="w-px h-6 bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-atlas-400 to-indigo-500">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-bold">ATLAS</h1>
                  <p className="text-[10px] text-slate-500 hidden sm:block">Legacy Intelligence</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {projectId && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] font-semibold text-emerald-300 hidden sm:inline">Project Loaded</span>
                  <span className="text-[10px] font-mono text-emerald-400">#{projectId.substring(0, 6)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="relative">
            {/* Desktop Tabs */}
            <div className="hidden lg:flex items-center gap-1 pb-px overflow-x-auto scrollbar-hide">
              {navItems.map((item) => {
                const isDisabled = item.requiresProject && !projectId;
                const isActive = activeView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => !isDisabled && handleNavClick(item.id)}
                    disabled={isDisabled}
                    className={`relative flex items-center gap-2 px-4 py-3 text-[13px] font-medium rounded-t-lg transition-all duration-300 whitespace-nowrap ${isActive
                      ? 'text-white bg-ink-950/50'
                      : isDisabled
                        ? 'text-slate-600 cursor-not-allowed'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <span className={isActive ? 'text-atlas-400' : ''}>{item.icon}</span>
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-atlas-400 to-indigo-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Dropdown */}
            <div className="lg:hidden py-2">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm font-medium"
              >
                <div className="flex items-center gap-2">
                  {navItems[activeView].icon}
                  <span>{navItems[activeView].label}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-white/10 bg-ink-900 shadow-2xl z-50 max-h-[400px] overflow-y-auto">
                    {navItems.map((item) => {
                      const isDisabled = item.requiresProject && !projectId;
                      const isActive = activeView === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => !isDisabled && handleNavClick(item.id)}
                          disabled={isDisabled}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-colors border-b border-white/5 last:border-0 ${isActive
                            ? 'text-white bg-atlas-500/10'
                            : isDisabled
                              ? 'text-slate-600 cursor-not-allowed opacity-40'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                          <span className={isActive ? 'text-atlas-400' : ''}>{item.icon}</span>
                          {item.label}
                          {isActive && <CheckCircle className="w-4 h-4 text-atlas-400 ml-auto" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {error && (
          <div className="mb-6">
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 flex items-start gap-3">
              <div className="flex-1">
                <p className="text-[14px] text-red-300">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-white/[0.08] bg-ink-900/40 p-6 sm:p-8">
          {activeView === 0 && (
            <UploadComponent onSuccess={handleUploadSuccess} onError={handleError} />
          )}

          {projectId && activeView === 1 && <ArchitectureViewer projectId={projectId} />}

          {projectId && activeView === 2 && <AIAnalysisPanel projectId={projectId} />}

          {projectId && activeView === 3 && <BusinessRulesPanel projectId={projectId} />}

          {projectId && activeView === 4 && <EffortEstimationPanel projectId={projectId} />}

          {projectId && activeView === 5 && <MigrationRoadmapPanel projectId={projectId} />}

          {projectId && activeView === 6 && <ImpactAnalysisPanel projectId={projectId} />}

          {projectId && activeView === 7 && <RecommendationsPanel projectId={projectId} />}
        </div>
      </main>
    </div>
  );
}
