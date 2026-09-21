import { Rocket, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

const footerLinks = [
  {
    title: 'Platforma',
    links: [
      { label: 'Status Sistema', href: '#status' },
      { label: 'Test Brzine', href: '#speedtest' },
      { label: 'Performanse', href: '#performance' },
      { label: 'Kontakt', href: '#contact' },
    ],
  },
  {
    title: 'Usluge',
    links: [
      { label: 'Web Hosting', href: '#' },
      { label: 'VPS Serveri', href: '#' },
      { label: 'Dedicated Serveri', href: '#' },
      { label: 'Cloud Storage', href: '#' },
    ],
  },
  {
    title: 'Podrška',
    links: [
      { label: 'Dokumentacija', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Status Page', href: '#status' },
      { label: 'Kontakt', href: '#contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-dark-800 overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary-600/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center glow-primary">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-lg text-white">Orion</span>
                <span className="text-[10px] text-dark-400 font-mono tracking-widest">TEST PLATFORMA</span>
              </div>
            </div>
            <p className="text-sm text-dark-400 leading-relaxed max-w-sm mb-6">
              Profesionalna test platforma za Orion Telekom hosting. Proverite
              performanse, stabilnost i brzinu vašeg servera u realnom vremenu.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Mail, href: 'mailto:info@orion-telekom.rs' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Github, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-dark-800/60 border border-dark-700 flex items-center justify-center text-dark-400 hover:text-white hover:border-primary-500/50 hover:bg-primary-500/10 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-white text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-dark-400 hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-dark-800">
          <p className="text-xs text-dark-500">
            © 2026 Orion Telekom Test Platforma. Sva prava zadržana.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-dark-500">
            <span>Napravljeno sa</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>u Srbiji</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
            <span className="text-xs font-mono text-dark-500">SISTEM AKTIVAN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
