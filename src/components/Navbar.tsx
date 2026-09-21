import { useEffect, useState } from 'react';
import { Menu, X, Rocket, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Početna', href: '#hero' },
  { label: 'Status Sistema', href: '#status' },
  { label: 'Test Brzine', href: '#speedtest' },
  { label: 'Performanse', href: '#performance' },
  { label: 'Kontakt', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-950/85 backdrop-blur-xl border-b border-dark-800/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 glow-primary">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-400 animate-pulse-ring" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-lg text-white">Orion</span>
            <span className="text-[10px] text-dark-400 font-mono tracking-widest">TEST PLATFORMA</span>
          </div>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm text-dark-300 hover:text-white hover:bg-dark-800/50 transition-all duration-200 font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20">
            <Zap className="w-3.5 h-3.5 text-accent-400" />
            <span className="text-xs font-mono text-accent-400">SISTEM AKTIVAN</span>
          </div>
          <a href="#speedtest" className="btn-primary text-sm py-2.5 px-5">
            Pokreni Test
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden w-10 h-10 rounded-lg bg-dark-800/60 flex items-center justify-center text-white"
          aria-label="Meni"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-dark-950/95 backdrop-blur-xl border-b border-dark-800 animate-fade-in-down">
          <ul className="flex flex-col p-6 gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-dark-300 hover:text-white hover:bg-dark-800/50 transition-all"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#speedtest"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full"
              >
                Pokreni Test
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
