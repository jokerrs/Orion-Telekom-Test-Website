import { useEffect, useState } from 'react';
import { Zap, Shield, Cloud, Gauge, Database, GitBranch, Lock, BarChart3, Globe, Cpu, HardDrive, Network } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'SSD NVMe Storage',
    description: 'Ultra-brzi NVMe diskovi sa 10x većom brzinom čitanja od tradicionalnih SSD-ova.',
    metric: '7.000 MB/s',
    color: 'primary',
  },
  {
    icon: Shield,
    title: 'DDoS Zaštita',
    description: 'Napredna zaštita od DDoS napada u realnom vremenu na mrežnom sloju.',
    metric: '99.99% blokada',
    color: 'accent',
  },
  {
    icon: GitBranch,
    title: 'Auto-Deploy',
    description: 'Automatsko postavljanje aplikacija iz Git repozitorijuma sa zero-downtime.',
    metric: '< 30s deploy',
    color: 'primary',
  },
  {
    icon: Lock,
    title: 'SSL Besplatno',
    description: 'Let\'s Encrypt SSL sertifikati automatski postavljeni i obnavljani za sve domene.',
    metric: 'Auto-obnova',
    color: 'accent',
  },
  {
    icon: Database,
    title: 'Baze Podataka',
    description: 'MySQL i PostgreSQL baze sa automatskim dnevnim backup-om i replikacijom.',
    metric: 'Dnevni backup',
    color: 'primary',
  },
  {
    icon: BarChart3,
    title: 'Monitoring 24/7',
    description: 'Praćenje performansi, apija i bezbednosti sa notifikacijama u realnom vremenu.',
    metric: '24/7 nadzor',
    color: 'accent',
  },
];

const specs = [
  { icon: Cpu, label: 'Procesor', value: 'AMD EPYC 7763', sub: '64 jezgra / 128 niti' },
  { icon: HardDrive, label: 'Storage', value: 'NVMe SSD RAID', sub: '10Gb/s protok' },
  { icon: Network, label: 'Mreža', value: '10 Gbit veza', sub: 'BGP redundancy' },
  { icon: Globe, label: 'Datacenter', value: 'Beograd — SR', sub: 'Tier III standard' },
];

export default function Features() {
  const [visibleSpecs, setVisibleSpecs] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisibleSpecs(true),
      { threshold: 0.3 }
    );
    const el = document.getElementById('performance-specs');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="performance" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-20" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-accent-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-4">
            <Cpu className="w-3.5 h-3.5 text-accent-400" />
            <span className="text-xs font-mono text-dark-300 tracking-wide">PERFORMANSE I MOGUĆNOSTI</span>
          </div>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4">
            Zašto <span className="text-gradient-accent">Orion Hosting</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Vrhunska infrastruktura sa najnovijom tehnologijom za maksimalne performanse.
          </p>
        </div>

        {/* Specs bar */}
        <div id="performance-specs" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {specs.map((spec, i) => (
            <div
              key={spec.label}
              className={`glass rounded-2xl p-5 transition-all duration-500 ${visibleSpecs ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <spec.icon className="w-6 h-6 text-primary-400 mb-3" />
              <p className="text-xs text-dark-500 mb-1">{spec.label}</p>
              <p className="font-display font-bold text-white text-sm">{spec.value}</p>
              <p className="text-xs text-dark-400 mt-0.5">{spec.sub}</p>
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="card p-6 group hover:scale-[1.02] animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.08}s`, opacity: 0 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${feature.color === 'accent' ? 'bg-accent-500/15' : 'bg-primary-500/15'}`}>
                  <feature.icon className={`w-6 h-6 ${feature.color === 'accent' ? 'text-accent-400' : 'text-primary-400'}`} />
                </div>
                <span className={`text-xs font-mono px-2.5 py-1 rounded-full ${feature.color === 'accent' ? 'bg-accent-500/10 text-accent-400' : 'bg-primary-500/10 text-primary-400'}`}>
                  {feature.metric}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-dark-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-12 glass rounded-3xl p-8 lg:p-10 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-accent-600/10 to-primary-600/10 animate-gradient-shift" style={{ backgroundSize: '200% 200%' }} />
          <div className="relative z-10">
            <Cloud className="w-12 h-12 text-primary-400 mx-auto mb-4 animate-float" />
            <h3 className="font-display font-bold text-2xl lg:text-3xl text-white mb-3">
              Spremni za Orion Telekom hosting?
            </h3>
            <p className="text-dark-300 mb-6 max-w-xl mx-auto">
              Iskusite vrhunske performanse, pouzdanost i podršku na srpskom jeziku.
            </p>
            <a href="#contact" className="btn-accent text-base">
              <Zap className="w-5 h-5" />
              Zatražite Ponudu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
