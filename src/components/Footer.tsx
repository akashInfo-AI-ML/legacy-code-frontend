import { Compass, Linkedin, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-atlas-400 to-indigo-500 shadow-lg shadow-atlas-500/20">
                <Compass className="w-[18px] h-[18px] text-white" strokeWidth={2.5} />
              </span>
              <span className="font-bold text-[15px] tracking-tight">
                Project <span className="text-atlas-400">ATLAS</span>
              </span>
            </div>
            <p className="mt-4 text-[13.5px] text-slate-400 max-w-xs leading-[1.6]">
              AI-powered legacy modernization assessment — from codebase to roadmap in minutes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-[12px] font-semibold text-slate-300 uppercase tracking-wider">Platform</h4>
              <ul className="mt-3.5 space-y-2.5 text-[13.5px] text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors duration-200">Capabilities</a></li>
                <li><a href="#how" className="hover:text-white transition-colors duration-200">How it works</a></li>
                <li><a href="#comparison" className="hover:text-white transition-colors duration-200">Comparison</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[12px] font-semibold text-slate-300 uppercase tracking-wider">Engage</h4>
              <ul className="mt-3.5 space-y-2.5 text-[13.5px] text-slate-400">
                <li><a href="#poc" className="hover:text-white transition-colors duration-200">The POC</a></li>
                <li><a href="#cta" className="hover:text-white transition-colors duration-200">Try it</a></li>
              </ul>
            </div>
          </div>

          <div className="flex md:justify-end items-start gap-3">
            {[Linkedin, Github, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid place-items-center w-10 h-10 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/25 hover:bg-white/[0.03] transition-all duration-300"
                aria-label="social link"
              >
                <Icon className="w-[18px] h-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} ATLAS. All rights reserved.</p>
          <p className="text-xs text-slate-500">Proof of Concept build</p>
        </div>
      </div>
    </footer>
  );
}
