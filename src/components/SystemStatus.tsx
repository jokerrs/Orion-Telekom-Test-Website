import { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Server, Database, Cloud, Shield, Mail, Globe, Cpu } from 'lucide-react';

type ServiceStatus = 'operational' | 'degraded' | 'maintenance';

interface Service {
  name: string;
  description: string;
  icon: typeof Server;
  status: ServiceStatus;
  latency: number;
  uptime: number;
}

const initialServices: Service[] = [
  { name: 'Web Server', description: 'Apache / Nginx', icon: Globe, status: 'operational', latency: 8, uptime: 99.99 },
  { name: 'Baza Podataka', description: 'MySQL / PostgreSQL', icon: Database, status: 'operational', latency: 15, uptime: 99.98 },
  { name: 'Mail Server', description: 'SMTP / IMAP', icon: Mail, status: 'operational', latency: 22, uptime: 99.95 },
  { name: 'Cloud Storage', description: 'Objektni storage', icon: Cloud, status: 'operational', latency: 18, uptime: 99.97 },
  { name: 'DNS Server', description: 'Rezolucija domena', icon: Server, status: 'operational', latency: 5, uptime: 99.99 },
  { name: 'SSL / Sigurnost', description: 'Sertifikati i zaštita', icon: Shield, status: 'operational', latency: 12, uptime: 100.0 },
  { name: 'PHP Runtime', description: 'PHP 8.2 / 8.3', icon: Cpu, status: 'operational', latency: 10, uptime: 99.96 },
  { name: 'Backup Sistem', description: 'Dnevni backup', icon: Database, status: 'maintenance', latency: 0, uptime: 99.90 },
];

const statusConfig: Record<ServiceStatus, { label: string; color: string; bg: string; border: string; dot: string }> = {
  operational: { label: 'Operativno', color: 'text-accent-400', bg: 'bg-accent-500/10', border: 'border-accent-500/20', dot: 'bg-accent-400' },
  degraded: { label: 'Degradirano', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', dot: 'bg-yellow-400' },
  maintenance: { label: 'Održavanje', color: 'text-primary-400', bg: 'bg-primary-500/10', border: 'border-primary-500/20', dot: 'bg-primary-400' },
};

export default function SystemStatus() {
  const [services, setServices] = useState(initialServices);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setServices((prev) =>
        prev.map((s) => {
          if (s.status === 'maintenance') return s;
          const delta = Math.floor((Math.random() - 0.5) * 6);
          return {
            ...s,
            latency: Math.max(3, s.latency + delta),
            uptime: Math.min(100, Math.max(99.9, s.uptime + (Math.random() - 0.5) * 0.003)),
          };
        })
      );
      setLastUpdate(new Date());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const operationalCount = services.filter((s) => s.status === 'operational').length;
  const allOperational = operationalCount === services.length;

  return (
    <section id="status" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-4">
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
            <span className="text-xs font-mono text-dark-300 tracking-wide">STATUS U REALNOM VREMENU</span>
          </div>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4">
            Status <span className="text-gradient">Sistema</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Pratite rad svih ključnih servisa na Orion Telekom hosting platformi.
          </p>
        </div>

        {/* Overall status banner */}
        <div className={`rounded-2xl p-6 mb-8 border ${allOperational ? 'bg-accent-500/5 border-accent-500/20' : 'bg-yellow-500/5 border-yellow-500/20'} animate-scale-in`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${allOperational ? 'bg-accent-500/15' : 'bg-yellow-500/15'}`}>
                {allOperational ? (
                  <CheckCircle2 className="w-7 h-7 text-accent-400" />
                ) : (
                  <AlertCircle className="w-7 h-7 text-yellow-400" />
                )}
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white">
                  {allOperational ? 'Svi sistemi rade normalno' : 'Neki servisi u održavanju'}
                </h3>
                <p className="text-dark-400 text-sm">
                  {operationalCount} od {services.length} servisa operativno
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-dark-500 font-mono">Poslednje ažuriranje</p>
              <p className="text-sm font-mono text-dark-300">{lastUpdate.toLocaleTimeString('sr-RS')}</p>
            </div>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, idx) => {
            const cfg = statusConfig[service.status];
            return (
              <div
                key={service.name}
                className={`card p-5 hover:scale-[1.02] cursor-default animate-fade-in-up group ${cfg.border}`}
                style={{ animationDelay: `${idx * 0.05}s`, opacity: 0 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${cfg.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <service.icon className={`w-5 h-5 ${cfg.color}`} />
                  </div>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${cfg.bg} border ${cfg.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
                    <span className={`text-[10px] font-mono ${cfg.color}`}>{cfg.label}</span>
                  </div>
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">{service.name}</h4>
                <p className="text-xs text-dark-400 mb-3">{service.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-dark-800">
                  <div>
                    <p className="text-[10px] text-dark-500">Latencija</p>
                    <p className="font-mono text-xs text-white">
                      {service.status === 'maintenance' ? '—' : `${service.latency}ms`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-dark-500">Uptime</p>
                    <p className="font-mono text-xs text-accent-400">{service.uptime.toFixed(2)}%</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
