import { useEffect, useState } from 'react';
import { Activity, Server, Gauge, ArrowRight, Cpu, HardDrive, Wifi, Zap } from 'lucide-react';

export default function Hero() {
  const [uptime, setUptime] = useState(99.98);
  const [latency, setLatency] = useState(12);
  const [load, setLoad] = useState(0.24);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((prev) => {
        const delta = (Math.random() - 0.5) * 0.004;
        return Math.min(99.99, Math.max(99.95, prev + delta));
      });
      setLatency(Math.floor(Math.random() * 8) + 9);
      setLoad(parseFloat((Math.random() * 0.3 + 0.15).toFixed(2)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Activity, label: 'Uptime', value: `${uptime.toFixed(2)}%`, color: 'accent' },
    { icon: Gauge, label: 'Latencija', value: `${latency}ms`, color: 'primary' },
    { icon: Server, label: 'Opterećenje', value: `${load}`, color: 'primary' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      {/* Animated background layers */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/95 to-dark-950" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary-600/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent-600/15 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light w-fit animate-fade-in-down">
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-accent-400 animate-pulse-ring" />
              <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-accent-500" />
            </span>
            <span className="text-xs font-mono text-dark-300 tracking-wide">SISTEM RADI OPTIMALNO</span>
          </div>

          <h1 className="font-display font-bold text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-white animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            Test platforma za
            <br />
            <span className="text-gradient">Orion Telekom</span>
            <br />
            hosting
          </h1>

          <p className="text-lg text-dark-300 max-w-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            Proverite brzinu, stabilnost i performanse vašeg hosting servera u
            realnom vremenu. Napredna dijagnostika sa detaljnim izveštajima.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <a href="#speedtest" className="btn-primary text-base">
              <Zap className="w-5 h-5" />
              Pokreni Test Brzine
            </a>
            <a href="#status" className="btn-secondary text-base">
              Pregled Sistema
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="flex items-center gap-6 pt-4 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <div className="flex -space-x-2">
              {['bg-primary-500', 'bg-accent-500', 'bg-primary-700', 'bg-accent-700'].map((bg, i) => (
                <div key={i} className={`w-9 h-9 rounded-full ${bg} border-2 border-dark-950 flex items-center justify-center`}>
                  <Server className="w-4 h-4 text-white" />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <p className="text-white font-medium">2.847+ aktivnih testova</p>
              <p className="text-dark-400">u poslednjih 24 sata</p>
            </div>
          </div>
        </div>

        {/* Right — live dashboard mockup */}
        <div className="relative animate-scale-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
          <div className="glass rounded-3xl p-6 glow-primary">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs font-mono text-dark-400 ml-2">orion-telekom — live</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-400 animate-blink" />
                <span className="text-[10px] font-mono text-accent-400">LIVE</span>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-dark-800/60 rounded-xl p-3 border border-dark-700/50">
                  <stat.icon className={`w-4 h-4 mb-2 ${stat.color === 'accent' ? 'text-accent-400' : 'text-primary-400'}`} />
                  <p className="text-[10px] text-dark-400 mb-0.5">{stat.label}</p>
                  <p className={`font-mono font-semibold text-sm ${stat.color === 'accent' ? 'text-accent-400' : 'text-primary-400'}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Chart mockup */}
            <div className="bg-dark-800/60 rounded-xl p-4 border border-dark-700/50 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-dark-400">Mrežni promet (poslednjih 60s)</span>
                <span className="text-xs font-mono text-accent-400">↑ 847 Mb/s</span>
              </div>
              <div className="flex items-end gap-1 h-20">
                {[40, 65, 50, 80, 45, 70, 55, 90, 60, 75, 50, 85, 65, 70, 55, 80, 45, 60, 75, 50].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-primary-600/40 to-primary-400/80 transition-all duration-700"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Resource bars */}
            <div className="space-y-2.5">
              {[
                { icon: Cpu, label: 'CPU', value: 23, color: 'primary' },
                { icon: HardDrive, label: 'Disk', value: 47, color: 'accent' },
                { icon: Wifi, label: 'Mreža', value: 68, color: 'primary' },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <r.icon className="w-4 h-4 text-dark-400 flex-shrink-0" />
                  <span className="text-xs text-dark-300 w-10">{r.label}</span>
                  <div className="flex-1 h-2 bg-dark-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${r.color === 'accent' ? 'bg-gradient-to-r from-accent-600 to-accent-400' : 'bg-gradient-to-r from-primary-600 to-primary-400'}`}
                      style={{ width: `${r.value}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-dark-400 w-8 text-right">{r.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 animate-float" style={{ animationDelay: '1s' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-accent-400" />
              </div>
              <div>
                <p className="text-xs text-dark-400">Srednji odziv</p>
                <p className="font-mono font-bold text-white">12ms</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-subtle">
        <span className="text-[10px] font-mono text-dark-500 tracking-widest">SCROLL</span>
        <div className="w-5 h-9 rounded-full border-2 border-dark-700 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-dark-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
