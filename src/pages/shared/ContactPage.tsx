import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const SUBJECTS = [
  'Question générale',
  'Problème technique',
  'Signaler un abus',
  'Partenariat',
  'Presse & médias',
  'Autre',
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  }

  return (
    <div style={{ backgroundColor: '#F7F3EC', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ backgroundColor: '#0B1F3A' }} className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ backgroundColor: 'rgba(124,58,237,0.2)', color: '#A78BFA', fontFamily: 'JetBrains Mono' }}
          >
            Contactez-nous
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC', letterSpacing: '-0.02em' }}
          >
            On est là pour vous{' '}
            <span style={{ color: '#F5A623' }}>aider</span>
          </h1>
          <p className="text-base" style={{ color: 'rgba(247,243,236,0.6)', fontFamily: 'Inter' }}>
            Une question, un problème ou une suggestion ? Notre équipe répond sous 24h.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Info cards */}
          <div className="flex flex-col gap-5">
            {[
              {
                icon: Mail,
                title: 'Email',
                value: 'contact@talentbj.com',
                sub: 'Réponse sous 24h',
              },
              {
                icon: Phone,
                title: 'Téléphone',
                value: '+229 01 64 61 38 61',
                sub: 'Lun–Ven, 8h–18h',
              },
              {
                icon: MapPin,
                title: 'Adresse',
                value: 'Cotonou, Bénin',
                sub: 'Haie Vive, Quartier Ganhi',
              },
            ].map(({ icon: Icon, title, value, sub }) => (
              <div
                key={title}
                className="rounded-2xl p-5 flex items-start gap-4"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(11,31,58,0.08)', boxShadow: '0 2px 16px rgba(11,31,58,0.06)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(124,58,237,0.1)' }}
                >
                  <Icon size={18} style={{ color: '#7C3AED' }} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#7C3AED', fontFamily: 'JetBrains Mono', fontSize: 10 }}>
                    {title}
                  </p>
                  <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{value}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(11,31,58,0.45)', fontFamily: 'Inter' }}>{sub}</p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div
              className="rounded-2xl overflow-hidden flex-1 min-h-40 flex items-center justify-center"
              style={{ backgroundColor: '#E8E2D9', border: '1px solid rgba(11,31,58,0.08)' }}
            >
              <div className="text-center px-4">
                <MapPin size={28} style={{ color: 'rgba(11,31,58,0.25)' }} className="mx-auto mb-2" />
                <p className="text-xs" style={{ color: 'rgba(11,31,58,0.4)', fontFamily: 'Inter' }}>Cotonou, Bénin</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className="lg:col-span-2 rounded-2xl p-8"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(11,31,58,0.08)', boxShadow: '0 2px 24px rgba(11,31,58,0.07)' }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'rgba(31,174,122,0.12)' }}
                >
                  <CheckCircle size={32} style={{ color: '#1FAE7A' }} />
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  Message envoyé !
                </h2>
                <p className="text-sm" style={{ color: 'rgba(11,31,58,0.5)', fontFamily: 'Inter' }}>
                  Notre équipe vous répondra dans les 24h.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' }); }}
                  className="mt-8 px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{ backgroundColor: '#7C3AED', color: '#FFFFFF', fontFamily: 'Space Grotesk' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F5A623'; e.currentTarget.style.color = '#0B1F3A'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#7C3AED'; e.currentTarget.style.color = '#FFFFFF'; }}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  Envoyer un message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold" style={{ fontFamily: 'Inter', color: '#0B1F3A' }}>Nom complet</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Jean Kouassi"
                      className="px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ backgroundColor: '#F7F3EC', border: '1.5px solid rgba(11,31,58,0.12)', color: '#0B1F3A', fontFamily: 'Inter' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#7C3AED'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(11,31,58,0.12)'; }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold" style={{ fontFamily: 'Inter', color: '#0B1F3A' }}>Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="jean@exemple.com"
                      className="px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ backgroundColor: '#F7F3EC', border: '1.5px solid rgba(11,31,58,0.12)', color: '#0B1F3A', fontFamily: 'Inter' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#7C3AED'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(11,31,58,0.12)'; }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold" style={{ fontFamily: 'Inter', color: '#0B1F3A' }}>Sujet</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="px-4 py-3 rounded-xl text-sm outline-none transition-all appearance-none"
                    style={{ backgroundColor: '#F7F3EC', border: '1.5px solid rgba(11,31,58,0.12)', color: '#0B1F3A', fontFamily: 'Inter' }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#7C3AED'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(11,31,58,0.12)'; }}
                  >
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold" style={{ fontFamily: 'Inter', color: '#0B1F3A' }}>Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Décrivez votre demande en détail..."
                    className="px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                    style={{ backgroundColor: '#F7F3EC', border: '1.5px solid rgba(11,31,58,0.12)', color: '#0B1F3A', fontFamily: 'Inter' }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#7C3AED'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(11,31,58,0.12)'; }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="self-end flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all"
                  style={{ backgroundColor: '#7C3AED', color: '#FFFFFF', fontFamily: 'Space Grotesk', opacity: loading ? 0.7 : 1 }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.backgroundColor = '#F5A623'; e.currentTarget.style.color = '#0B1F3A'; } }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#7C3AED'; e.currentTarget.style.color = '#FFFFFF'; }}
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 rounded-full animate-spin inline-block" style={{ borderColor: '#FFFFFF', borderTopColor: 'transparent' }} />
                  ) : (
                    <Send size={15} />
                  )}
                  {loading ? 'Envoi...' : 'Envoyer le message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
