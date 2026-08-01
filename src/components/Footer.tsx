import { Compass, Linkedin, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] py-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-gradient-to-t from-atlas-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-atlas-400 via-indigo-500 to-purple-500 shadow-xl shadow-atlas-500/30">
                <Compass className="w-5 h-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-black text-[17px] tracking-tight">
                <span className="bg-gradient-to-r from-atlas-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">ATLAS</span>
              </span>
            </div>
            <p className="mt-5 text-[14px] text-slate-300 max-w-xs leading-[1.7] font-light">
              AI-powered legacy modernization assessment — from codebase to roadmap in minutes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[13px] font-bold text-white uppercase tracking-wider">Platform</h4>
              <ul className="mt-4 space-y-3 text-[14px] text-slate-400">
                <li><a href="#features" className="hover:text-atlas-400 transition-colors duration-300 inline-flex items-center gap-1">Capabilities</a></li>
                <li><a href="#how" className="hover:text-atlas-400 transition-colors duration-300 inline-flex items-center gap-1">How it works</a></li>
                <li><a href="#comparison" className="hover:text-atlas-400 transition-colors duration-300 inline-flex items-center gap-1">Comparison</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-white uppercase tracking-wider">Engage</h4>
              <ul className="mt-4 space-y-3 text-[14px] text-slate-400">
                <li><a href="#poc" className="hover:text-atlas-400 transition-colors duration-300 inline-flex items-center gap-1">The POC</a></li>
                <li><a href="#cta" className="hover:text-atlas-400 transition-colors duration-300 inline-flex items-center gap-1">Try it</a></li>
              </ul>
            </div>
          </div>

          <div className="flex md:justify-end items-start gap-3">
            {[Linkedin, Github, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="group grid place-items-center w-11 h-11 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-atlas-400/40 hover:bg-gradient-to-br hover:from-atlas-400/10 hover:to-indigo-500/10 transition-all duration-300 hover:scale-110"
                aria-label="social link"
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-slate-400">© {new Date().getFullYear()} ATLAS. All rights reserved.</p>
          <p className="text-[13px] text-slate-400">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-atlas-400/20 bg-atlas-400/5 text-atlas-400 font-medium">
              Proof of Concept
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
