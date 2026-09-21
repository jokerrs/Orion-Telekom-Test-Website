import { useState, useRef, useEffect } from 'react';
import { Gauge, Activity, Download, Upload, Clock, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

type TestPhase = 'idle' | 'testing' | 'done';

interface TestResult {
  download: number;
  upload: number;
  latency: number;
  jitter: number;
}

export default function SpeedTest() {
  const [phase, setPhase] = useState<TestPhase>('idle');
  const [progress, setProgress] = useState(0);
  const [currentMetric, setCurrentMetric] = useState('');
  const [result, setResult] = useState<TestResult | null>(null);
  const [server, setServer] = useState('Orion Telekom — Beograd');
  const animRef = useRef<number | undefined>(undefined);

  const servers = [
    'Orion Telekom — Beograd',
    'Orion Telekom — Novi Sad',
    'Orion Telekom — Niš',
  ];

  const runTest = () => {
    if (phase === 'testing') return;
    setPhase('testing');
    setProgress(0);
    setResult(null);

    const phases = [
      { name: 'Povezivanje na server...', end: 15 },
      { name: 'Testiranje latencije...', end: 30 },
      { name: 'Testiranje download brzine...', end: 60 },
      { name: 'Testiranje upload brzine...', end: 85 },
      { name: 'Računanje rezultata...', end: 100 },
    ];

    let currentPhaseIdx = 0;
    let currentProgress = 0;
    setCurrentMetric(phases[0].name);

    const step = () => {
      currentProgress += 0.5 + Math.random() * 1.5;
      if (currentProgress >= phases[currentPhaseIdx].end && currentPhaseIdx < phases.length - 1) {
        currentPhaseIdx++;
        setCurrentMetric(phases[currentPhaseIdx].name);
      }
      setProgress(Math.min(100, currentProgress));

      if (currentProgress < 100) {
        animRef.current = requestAnimationFrame(step);
      } else {
        setResult({
          download: parseFloat((Math.random() * 400 + 600).toFixed(1)),
          upload: parseFloat((Math.random() * 200 + 300).toFixed(1)),
          latency: Math.floor(Math.random() * 8 + 8),
          jitter: parseFloat((Math.random() * 3 + 0.5).toFixed(1)),
        });
        setPhase('done');
        setCurrentMetric('');
      }
    };
    animRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const reset = () => {
    setPhase('idle');
    setProgress(0);
    setResult(null);
    setCurrentMetric('');
  };

  return (
    <section id="speedtest" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary-600/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-4">
            <Gauge className="w-3.5 h-3.5 text-primary-400" />
            <span className="text-xs font-mono text-dark-300 tracking-wide">SPEED TEST ALAT</span>
          </div>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4">
            Test <span className="text-gradient">Brzine</span> Servera
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Izmerite download i upload brzinu, latenciju i jitter vašeg Orion hosting servera.
          </p>
        </div>

        {/* Speed test card */}
        <div className="glass rounded-3xl p-8 lg:p-12 glow-primary">
          {/* Server selector */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-8 border-b border-dark-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-500/15 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <p className="text-xs text-dark-500">Izaberi server</p>
                <select
                  value={server}
                  onChange={(e) => setServer(e.target.value)}
                  disabled={phase === 'testing'}
                  className="bg-transparent text-white font-medium text-sm outline-none cursor-pointer disabled:opacity-50"
                >
                  {servers.map((s) => (
                    <option key={s} value={s} className="bg-dark-900">{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-dark-400">
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
              SERVER DOSTUPAN
            </div>
          </div>

          {/* Gauge / Results area */}
          <div className="flex flex-col items-center gap-8">
            {phase === 'idle' && (
              <div className="flex flex-col items-center gap-6 animate-scale-in">
                <button
                  onClick={runTest}
                  className="relative w-44 h-44 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center hover:scale-105 transition-transform duration-300 glow-primary group"
                >
                  <div className="absolute inset-0 rounded-full border-2 border-primary-500/30 animate-pulse-ring" />
                  <div className="absolute inset-2 rounded-full border-2 border-primary-500/20 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
                  <div className="flex flex-col items-center">
                    <Gauge className="w-12 h-12 text-white mb-2 group-hover:rotate-180 transition-transform duration-700" />
                    <span className="text-white font-display font-bold text-lg">START</span>
                  </div>
                </button>
                <p className="text-dark-400 text-sm">Kliknite da započnete test brzine</p>
              </div>
            )}

            {phase === 'testing' && (
              <div className="flex flex-col items-center gap-6 w-full max-w-md animate-fade-in">
                <div className="relative w-44 h-44">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(30,41,59,0.8)" strokeWidth="6" />
                    <circle
                      cx="50" cy="50" r="44" fill="none" stroke="url(#gradient)" strokeWidth="6"
                      strokeLinecap="round" strokeDasharray={`${276.46 * progress / 100} 276.46`}
                      className="transition-all duration-100"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1d67f5" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-mono font-bold text-3xl text-white">{Math.round(progress)}%</span>
                    <RefreshCw className="w-5 h-5 text-primary-400 animate-spin-slow mt-2" />
                  </div>
                </div>
                <p className="text-primary-400 font-mono text-sm text-center">{currentMetric}</p>
              </div>
            )}

            {phase === 'done' && result && (
              <div className="w-full flex flex-col items-center gap-6 animate-scale-in">
                <div className="flex items-center gap-2 text-accent-400">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="font-display font-bold text-xl">Test završen!</span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                  {[
                    { icon: Download, label: 'Download', value: result.download, unit: 'Mbps', color: 'primary' },
                    { icon: Upload, label: 'Upload', value: result.upload, unit: 'Mbps', color: 'accent' },
                    { icon: Clock, label: 'Latencija', value: result.latency, unit: 'ms', color: 'primary' },
                    { icon: Activity, label: 'Jitter', value: result.jitter, unit: 'ms', color: 'accent' },
                  ].map((m) => (
                    <div key={m.label} className="bg-dark-800/60 rounded-2xl p-5 border border-dark-700/50 text-center hover:scale-105 transition-transform">
                      <m.icon className={`w-6 h-6 mx-auto mb-3 ${m.color === 'accent' ? 'text-accent-400' : 'text-primary-400'}`} />
                      <p className="text-xs text-dark-400 mb-1">{m.label}</p>
                      <p className={`font-mono font-bold text-2xl ${m.color === 'accent' ? 'text-accent-400' : 'text-primary-400'}`}>
                        {m.value}
                      </p>
                      <p className="text-[10px] text-dark-500 font-mono">{m.unit}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-accent-500/10 border border-accent-500/20">
                  <AlertTriangle className="w-4 h-4 text-accent-400" />
                  <p className="text-xs text-dark-300">
                    Server: <span className="text-white font-medium">{server}</span> — Odlične performanse!
                  </p>
                </div>

                <button onClick={reset} className="btn-secondary text-sm">
                  <RefreshCw className="w-4 h-4" />
                  Testiraj ponovo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
