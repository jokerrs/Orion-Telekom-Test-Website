import { useState } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle2, Phone, Building2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Unesite vaše ime';
    if (!form.email.trim()) {
      e.email = 'Unesite email adresu';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Neispravna email adresa';
    }
    if (!form.message.trim()) e.message = 'Unesite poruku';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', company: '', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-4">
            <Mail className="w-3.5 h-3.5 text-primary-400" />
            <span className="text-xs font-mono text-dark-300 tracking-wide">KONTAKT</span>
          </div>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4">
            Stupite u <span className="text-gradient">kontakt</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Imate pitanje o Orion Telekom hosting uslugama? Pošaljite poruku i odgovaramo u roku od 24h.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info side */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {[
              { icon: Mail, label: 'Email', value: 'info@orion-telekom.rs', color: 'primary' },
              { icon: Phone, label: 'Telefon', value: '+381 11 123 4567', color: 'accent' },
              { icon: Building2, label: 'Adresa', value: 'Bulevar oslobođenja 12, Beograd', color: 'primary' },
            ].map((info) => (
              <div key={info.label} className="glass rounded-2xl p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${info.color === 'accent' ? 'bg-accent-500/15' : 'bg-primary-500/15'}`}>
                  <info.icon className={`w-5 h-5 ${info.color === 'accent' ? 'text-accent-400' : 'text-primary-400'}`} />
                </div>
                <div>
                  <p className="text-xs text-dark-500 mb-0.5">{info.label}</p>
                  <p className="text-white font-medium text-sm">{info.value}</p>
                </div>
              </div>
            ))}

            <div className="glass rounded-2xl p-5 mt-auto">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-400 animate-pulse" />
                <span className="text-xs font-mono text-accent-400">PODRŠKA DOSTUPNA</span>
              </div>
              <p className="text-sm text-dark-300">
                Naš tim podrške je dostupan svakog dana od 08:00 do 22:00.
              </p>
            </div>
          </div>

          {/* Form side */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 lg:p-8 space-y-5">
              {submitted && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent-500/10 border border-accent-500/30 animate-fade-in-down">
                  <CheckCircle2 className="w-5 h-5 text-accent-400 flex-shrink-0" />
                  <p className="text-sm text-accent-400">
                    Poruka uspešno poslata! Javljamo vam se u najkraćem mogućem roku.
                  </p>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-2 text-sm text-dark-300 mb-2">
                    <User className="w-4 h-4" /> Ime i prezime *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    disabled={submitting}
                    className="w-full bg-dark-800/60 border border-dark-700 rounded-xl px-4 py-3 text-white text-sm placeholder-dark-500 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all disabled:opacity-50"
                    placeholder="Petar Petrović"
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-dark-300 mb-2">
                    <Mail className="w-4 h-4" /> Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={submitting}
                    className="w-full bg-dark-800/60 border border-dark-700 rounded-xl px-4 py-3 text-white text-sm placeholder-dark-500 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all disabled:opacity-50"
                    placeholder="petar@primer.rs"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-2 text-sm text-dark-300 mb-2">
                    <Phone className="w-4 h-4" /> Telefon
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    disabled={submitting}
                    className="w-full bg-dark-800/60 border border-dark-700 rounded-xl px-4 py-3 text-white text-sm placeholder-dark-500 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all disabled:opacity-50"
                    placeholder="+381 60 123 4567"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-dark-300 mb-2">
                    <Building2 className="w-4 h-4" /> Kompanija
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    disabled={submitting}
                    className="w-full bg-dark-800/60 border border-dark-700 rounded-xl px-4 py-3 text-white text-sm placeholder-dark-500 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all disabled:opacity-50"
                    placeholder="Vaša kompanija"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-dark-300 mb-2">
                  <MessageSquare className="w-4 h-4" /> Poruka *
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  disabled={submitting}
                  rows={5}
                  className="w-full bg-dark-800/60 border border-dark-700 rounded-xl px-4 py-3 text-white text-sm placeholder-dark-500 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all disabled:opacity-50 resize-none"
                  placeholder="Opišite vaše potrebe za hostingom..."
                />
                {errors.message && <p className="text-xs text-red-400 mt-1.5">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Slanje...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Pošalji Poruku
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
