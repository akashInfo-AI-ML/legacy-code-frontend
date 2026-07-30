import { useState, useEffect } from 'react';
import { Compass, Menu, X, ArrowRight } from 'lucide-react';

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
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-smooth ${scrolled
          ? 'bg-ink-950/80 backdrop-blur-2xl border-b border-white/[0.06] py-0'
          : 'bg-transparent py-0'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="relative grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-atlas-400 to-indigo-500 shadow-lg shadow-atlas-500/20">
            <Compass className="w-[18px] h-[18px] text-white" strokeWidth={2.5} />
            <span className="absolute inset-0 rounded-xl bg-atlas-400/40 blur-md -z-10 group-hover:bg-atlas-400/70 transition-all duration-500" />
          </span>
          <span className="font-bold text-[15px] tracking-tight">
            <span className="text-atlas-400">ATLAS</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative px-3.5 py-2 text-[13.5px] text-slate-300 hover:text-white transition-colors duration-200 group"
              >
                {l.label}
                <span className="absolute left-3.5 right-3.5 -bottom-px h-px bg-gradient-to-r from-atlas-400/0 via-atlas-400 to-atlas-400/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-smooth" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#cta"
            className="group relative inline-flex items-center gap-1.5 rounded-full bg-white text-ink-950 font-semibold text-sm px-4 py-2 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
          >
            <span className="relative z-10">Try it</span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden grid place-items-center w-9 h-9 rounded-lg hover:bg-white/5 transition"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-smooth ${open ? 'max-h-96 border-t border-white/[0.06]' : 'max-h-0'
          }`}
      >
        <div className="bg-ink-950/95 backdrop-blur-2xl">
          <ul className="px-5 py-4 space-y-0.5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-slate-300 hover:text-white text-sm transition"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-full bg-white text-ink-950 font-semibold text-sm px-4 py-2"
              >
                Try it
                <ArrowRight className="w-4 h-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
