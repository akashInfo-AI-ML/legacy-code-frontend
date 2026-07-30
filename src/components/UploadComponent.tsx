import { useState } from 'react';
import axios from 'axios';
import {
  UploadCloud,
  FileArchive,
  CheckCircle2,
  Loader2,
  X,
  Zap,
  ShieldCheck,
  Lightbulb,
  Info,
} from 'lucide-react';

interface UploadComponentProps {
  onSuccess: (projectId: string) => void;
  onError: (error: string) => void;
}

export default function UploadComponent({ onSuccess, onError }: UploadComponentProps) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      onError('Please select a file');
      return;
    }

    setLoading(true);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'https://legacy-code-backend.onrender.com/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadProgress(progress);
          },
        },
      );
      onSuccess(response.data.project_id);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Fast Analysis',
      desc: 'Get comprehensive insights in seconds with AI-powered scanning',
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: 'Secure Processing',
      desc: 'Your code is analyzed securely with enterprise-grade protection',
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: 'Actionable Insights',
      desc: 'Get clear modernization recommendations and next steps',
    },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2.5 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-atlas-400/10 to-indigo-500/10 border border-atlas-400/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-atlas-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-atlas-400"></span>
          </span>
          <span className="text-atlas-400 text-[12px] font-semibold tracking-wide uppercase">
            Step 1: Upload
          </span>
        </div>
        <h2 className="text-3xl sm:text-[2.75rem] font-bold tracking-[-0.02em] leading-[1.1] bg-gradient-to-br from-white via-white to-slate-400 bg-clip-text text-transparent">
          Upload your .NET solution
        </h2>
        <p className="mt-4 text-slate-400 text-[15.5px] leading-[1.7] max-w-2xl mx-auto">
          Begin your modernization journey by uploading your .NET solution file or source code.
          Our AI-powered engine will analyze the architecture and provide comprehensive insights in seconds.
        </p>
      </div>

      {/* Feature Cards */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="group relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-ink-800/60 to-ink-900/40 backdrop-blur-sm p-6 text-center hover:border-atlas-400/40 hover:shadow-lg hover:shadow-atlas-500/10 hover:-translate-y-1.5 transition-all duration-500"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-atlas-400/0 to-indigo-500/0 group-hover:from-atlas-400/5 group-hover:to-indigo-500/5 transition-all duration-500" />
            <div className="relative">
              <div className="mx-auto grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-atlas-400/20 to-indigo-500/20 text-atlas-300 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-atlas-500/20">
                {f.icon}
              </div>
              <h3 className="mt-4 font-bold text-[14.5px] text-white">{f.title}</h3>
              <p className="mt-2 text-[13px] text-slate-400 leading-[1.6]">{f.desc}</p>
            </div>
          </div>
        ))}
      </div> */}

      {/* Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`group relative rounded-2xl border-2 border-dashed p-10 sm:p-12 mb-6 text-center transition-all duration-500 cursor-pointer overflow-hidden ${dragActive
          ? 'border-atlas-400 bg-atlas-500/10 scale-[1.02]'
          : 'border-white/15 hover:border-atlas-400/50 hover:bg-atlas-500/5'
          }`}
      >
        {/* Animated gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br from-atlas-400/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${dragActive ? 'opacity-100' : ''}`} />

        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-atlas-400/0 via-atlas-400/10 to-atlas-400/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${dragActive ? 'opacity-100 animate-pulse' : ''}`} />

        <input
          type="file"
          id="file-input"
          className="hidden"
          onChange={handleFileChange}
          accept=".zip,.sln,.cs"
        />
        <label htmlFor="file-input" className="cursor-pointer w-full block relative z-10">
          {file ? (
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-atlas-400 to-indigo-500 rounded-2xl blur-lg opacity-30 animate-pulse" />
                <span className="relative grid place-items-center w-20 h-20 rounded-2xl bg-gradient-to-br from-atlas-400/20 to-indigo-500/20 text-atlas-300 border border-atlas-400/30 shadow-xl">
                  <FileArchive className="w-9 h-9" />
                </span>
              </div>
              <div className="space-y-1">
                <span className="block font-bold text-[16px] text-white">{fileName}</span>
                <span className="block text-[13px] text-atlas-400 font-medium">{file.size ? formatFileSize(file.size) : ''}</span>
              </div>
              <div className="flex items-center gap-2 mt-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-[12.5px] text-emerald-300 font-semibold">Ready to analyze</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setFile(null);
                  setFileName(null);
                }}
                className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-white transition-colors duration-200 hover:gap-2"
              >
                <X className="w-4 h-4" />
                Change file
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br from-atlas-400 to-indigo-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${dragActive ? 'opacity-30' : ''}`} />
                <span className={`relative grid place-items-center w-20 h-20 rounded-2xl bg-gradient-to-br from-atlas-400/15 to-indigo-500/15 text-atlas-300 border border-atlas-400/20 group-hover:border-atlas-400/40 transition-all duration-500 group-hover:scale-110 ${dragActive ? 'scale-110 border-atlas-400/60' : ''}`}>
                  <UploadCloud className="w-9 h-9" />
                </span>
              </div>
              <div className="space-y-2">
                <span className="block font-bold text-[17px] text-white">Drag &amp; drop your file here</span>
                <span className="block text-[14px] text-slate-400">or click to browse from your computer</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-slate-400 font-medium">.ZIP</span>
                <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-slate-400 font-medium">.SLN</span>
                <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-slate-400 font-medium">.CS</span>
                <span className="text-slate-500 text-[11px]">·</span>
                <span className="text-[11px] text-slate-500">Max 100MB</span>
              </div>
            </div>
          )}
        </label>
      </div>

      {/* Progress */}
      {loading && (
        <div className="mb-6 rounded-2xl border border-atlas-400/20 bg-gradient-to-br from-ink-800/80 to-ink-900/60 backdrop-blur-sm p-5 shadow-lg shadow-atlas-500/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[14px] font-semibold text-white flex items-center gap-2.5">
              <span className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-atlas-400 opacity-75"></span>
                <Loader2 className="relative w-5 h-5 text-atlas-400 animate-spin" />
              </span>
              Analyzing your code…
            </span>
            <span className="text-[15px] font-bold text-atlas-300 font-mono tabular-nums">{uploadProgress}%</span>
          </div>
          <div className="relative h-2.5 rounded-full bg-ink-700 overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            <div
              className="h-full bg-gradient-to-r from-atlas-400 via-indigo-400 to-indigo-500 transition-all duration-300 ease-out relative overflow-hidden shadow-lg shadow-atlas-500/50"
              style={{ width: `${uploadProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </div>
          <p className="mt-3 text-[12px] text-slate-400 text-center">This may take a few moments depending on your project size</p>
        </div>
      )}

      {/* Tip */}
      {/* <div className="mb-6 flex items-start gap-3.5 rounded-xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/5 to-atlas-500/5 px-5 py-4 backdrop-blur-sm">
        <div className="grid place-items-center w-8 h-8 rounded-lg bg-indigo-400/10 shrink-0">
          <Info className="w-4 h-4 text-indigo-400" />
        </div>
        <div>
          <p className="text-[13.5px] text-slate-200 leading-[1.6]">
            <span className="font-bold text-white">Pro Tip:</span> For the most comprehensive analysis, upload a complete solution file (.sln) or a ZIP archive containing your entire project structure including dependencies.
          </p>
        </div>
      </div> */}

      {/* Action Button */}
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className={`group relative w-full inline-flex items-center justify-center gap-2.5 rounded-xl font-bold text-[16px] px-8 py-5 transition-all duration-300 overflow-hidden ${!file || loading
          ? 'bg-ink-700 text-slate-500 cursor-not-allowed border border-white/5'
          : 'bg-gradient-to-r from-atlas-400 to-indigo-500 text-white shadow-lg shadow-atlas-500/30 hover:shadow-xl hover:shadow-atlas-500/40 hover:scale-[1.02] active:scale-[0.98]'
          }`}
      >
        {/* Animated background */}
        {!loading && file && (
          <div className="absolute inset-0 bg-gradient-to-r from-atlas-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        <span className="relative z-10 flex items-center gap-2.5">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing your project…
            </>
          ) : (
            <>
              <UploadCloud className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform duration-300" />
              Start Analysis
              {file && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/20 text-[11px] font-semibold">READY</span>}
            </>
          )}
        </span>
      </button>

      {/* Additional info */}
      {!loading && (
        <p className="mt-4 text-center text-[12px] text-slate-500">
          Your code will be analyzed securely. We respect your privacy and never store your source code.
        </p>
      )}
    </div>
  );
}
