import { useState, useEffect } from 'react';
import { Compass, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

const links = [
  { label: 'Problem', href: '#problem' },
  { label: 'Capabilities', href: '#features' },
  { label: 'How It Works', href: '#how' },
  { label: 'Comparison', href: '#comparison' },
  { label: 'POC', href: '#poc' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-smooth ${scrolled
          ? 'bg-ink-950/70 backdrop-blur-2xl border-b border-white/[0.08] py-0 shadow-2xl shadow-black/20'
          : 'bg-transparent py-2'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Enhanced Logo */}
        <button
          onClick={() => (window as any).navigateTo?.('/')}
          className="flex items-center gap-3 group cursor-pointer bg-transparent border-0 p-0"
        >
          <span className="relative grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-atlas-400 via-indigo-500 to-purple-500 shadow-xl shadow-atlas-500/30 group-hover:shadow-atlas-500/50 transition-all duration-500">
            <Compass className="w-5 h-5 text-white" strokeWidth={2.5} />
            <span className="absolute inset-0 rounded-xl bg-atlas-400/50 blur-lg -z-10 group-hover:bg-atlas-400/80 transition-all duration-500" />
          </span>
          <span className="font-black text-[17px] tracking-tight">
            <span className="bg-gradient-to-r from-atlas-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">ATLAS</span>
          </span>
        </button>

        {/* Desktop nav with better styling */}
        <ul className="hidden md:flex items-center gap-1.5">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative px-4 py-2.5 text-[14px] font-medium text-slate-300 hover:text-white transition-colors duration-300 group"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/[0.06] transition-all duration-300" />
                <span className="absolute left-4 right-4 -bottom-px h-[2px] bg-gradient-to-r from-atlas-400/0 via-atlas-400 to-atlas-400/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-smooth" />
              </a>
            </li>
          ))}
        </ul>

        {/* Enhanced CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#cta"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-atlas-400 via-indigo-500 to-purple-500 text-white font-bold text-[14px] px-5 py-2.5 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-atlas-500/30 hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-atlas-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Sparkles className="relative z-10 w-4 h-4" />
            <span className="relative z-10">Try Free</span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden grid place-items-center w-10 h-10 rounded-lg hover:bg-white/5 transition-all duration-300 border border-white/10"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Enhanced Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-smooth ${open ? 'max-h-[500px] border-t border-white/[0.08]' : 'max-h-0'
          }`}
      >
        <div className="bg-ink-950/95 backdrop-blur-2xl">
          <ul className="px-5 py-5 space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 px-4 text-slate-300 hover:text-white text-[15px] rounded-lg hover:bg-white/[0.06] transition-all duration-300 font-medium"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-atlas-400 via-indigo-500 to-purple-500 text-white font-bold text-[15px] px-5 py-3 shadow-lg shadow-atlas-500/30"
              >
                <Sparkles className="w-4 h-4" />
                Try Free
                <ArrowRight className="w-4 h-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
