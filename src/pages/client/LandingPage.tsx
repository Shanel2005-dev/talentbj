import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Code, Palette, Megaphone, Star, CheckCircle,
  Shield, Zap, BadgeCheck, Lock, Clock, Sparkles, ChevronRight,
} from 'lucide-react';
import VerificationSeal from '../../components/ui/VerificationSeal';
import StampStep from '../../components/ui/StampStep';
import FreelanceCard from '../../components/freelance/FreelanceCard';
import type { Freelance } from '../../types';

/* ─── Brand tokens ─── */
const C = {
  navy: '#0B1F3A',
  navyDeep: '#060F1C',
  navyMid: '#142A4D',
  gold: '#F5A623',
  goldLight: '#FFCF77',
  purple: '#7C3AED',
  green: '#1FAE7A',
  cream: '#F7F3EC',
  muted: 'rgba(247,243,236,0.55)',
  dimmed: 'rgba(247,243,236,0.25)',
};

/* ─── Mock match card data ─── */
const MATCH_CARD = {
  name: 'Kofi Assogba',
  role: 'Développeur React · Node.js',
  city: 'Cotonou, Bénin',
  photo: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=120&h=120&fit=crop&q=80',
  score: 94,
  note: 4.9,
  missions: 23,
  skills: ['React', 'Node.js', 'Mobile Money API', 'PostgreSQL'],
  excerpt: '"Livré 3 projets similaires en moins de 5 jours. Qualité irréprochable."',
};

/* ─── Verticals ─── */
const VERTICALS = [
  {
    slug: 'dev-web', label: 'Développement web & mobile', Icon: Code,
    tags: ['React', 'Django', 'Flutter', 'Node.js', 'PHP'],
    gradient: 'linear-gradient(135deg, #0F2540 0%, #1E3A5F 100%)',
    glow: 'rgba(37,99,235,0.15)',
  },
  {
    slug: 'design-uiux', label: 'Design graphique & UI/UX', Icon: Palette,
    tags: ['Figma', 'Branding', 'Motion', 'Illustration', 'UX Research'],
    gradient: 'linear-gradient(135deg, #1A0D33 0%, #2D1B4E 100%)',
    glow: 'rgba(124,58,237,0.15)',
  },
  {
    slug: 'marketing-digital', label: 'Marketing digital & CM', Icon: Megaphone,
    tags: ['Facebook Ads', 'SEO', 'Community', 'Google Ads', 'Copywriting'],
    gradient: 'linear-gradient(135deg, #0A2018 0%, #1A3A2E 100%)',
    glow: 'rgba(31,174,122,0.15)',
  },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    nom: 'Fanou Agbodji', role: 'Gérante boutique e-commerce, Cotonou', seed: 'test1', note: 5,
    text: 'En 24h j\'avais 3 profils vérifiés correspondant exactement à mon besoin. Le paiement Mobile Money et l\'escrow m\'ont rassurée : mon argent était protégé jusqu\'à la livraison.',
  },
  {
    nom: 'Rodrigue Assogba', role: 'CTO, FinTech Hub Bénin', seed: 'test2', note: 5,
    text: 'Le score de matching est vraiment pertinent. On nous a recommandé un DevOps expert qui avait déjà travaillé sur des projets similaires. Résultat impeccable.',
  },
  {
    nom: 'Sènan Kpètin', role: 'Entrepreneur, Porto-Novo', seed: 'test3', note: 5,
    text: 'Fini les arnaques WhatsApp. TalentBJ m\'a mis en contact avec un freelance vérifié, l\'escrow a protégé mes fonds, et j\'ai reçu exactement ce que j\'avais demandé.',
  },
];

/* ═══════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [scoreAnim, setScoreAnim] = useState(0);

  /* Animate match score on mount */
  useEffect(() => {
    let frame: ReturnType<typeof setTimeout>;
    let v = 0;
    const tick = () => {
      v = Math.min(v + 3, MATCH_CARD.score);
      setScoreAnim(v);
      if (v < MATCH_CARD.score) frame = setTimeout(tick, 18);
    };
    frame = setTimeout(tick, 600);
    return () => clearTimeout(frame);
  }, []);

  function handleEarlyAccess(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <div style={{ backgroundColor: C.cream, fontFamily: 'Inter, sans-serif' }}>

      {/* ═══════════════════════════════════
          HERO — full screen split
      ═══════════════════════════════════ */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ── Photo background ── */}
        <img
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&q=80"
          onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1400&q=80'; }}
          alt=""
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center center',
            zIndex: 0,
          }}
        />

        {/* ── Gradient overlay : opaque left → semi-transparent right ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to right, rgba(11,31,58,0.82), rgba(11,31,58,0.50))',
        }} />

        {/* ── Subtle dot grid ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }} />

        {/* ── Gold glow top-right ── */}
        <div style={{
          position: 'absolute', top: -150, right: -100, width: 600, height: 600, zIndex: 1,
          background: `radial-gradient(circle, rgba(245,166,35,0.10) 0%, transparent 65%)`,
        }} />

        {/* ── Content ── */}
        <div
          className="flex-1 flex items-center w-full max-w-7xl mx-auto px-6 lg:px-16"
          style={{ position: 'relative', zIndex: 2, paddingTop: 80, paddingBottom: 60 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

            {/* ── LEFT : Copy ── */}
            <div className="flex flex-col">

              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full mb-8"
                style={{
                  background: 'rgba(245,166,35,0.10)',
                  border: '1px solid rgba(245,166,35,0.35)',
                }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: C.gold }} />
                <span style={{ color: C.gold, fontSize: 12, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, letterSpacing: '0.03em' }}>
                  Bêta privée — Inscrivez-vous en avant-première
                </span>
              </div>

              {/* H1 */}
              <h1
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(2.4rem, 5vw, 3.75rem)',
                  fontWeight: 800,
                  lineHeight: 1.08,
                  letterSpacing: '-0.025em',
                  color: '#FFFFFF',
                  marginBottom: 24,
                }}
              >
                Trouvez le talent
                <br />
                <span style={{
                  background: `linear-gradient(90deg, ${C.gold} 0%, ${C.goldLight} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  qu'il vous faut.
                </span>
                <br />
                En moins de 24h.
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  color: C.muted,
                  fontSize: '1.1rem',
                  lineHeight: 1.75,
                  marginBottom: 40,
                  maxWidth: 480,
                }}
              >
                TalentBJ connecte les entrepreneurs béninois aux meilleurs freelances vérifiés par IA — développeurs, designers, marketeurs.{' '}
                <span style={{ color: 'rgba(247,243,236,0.8)', fontWeight: 500 }}>Paiement sécurisé via Mobile Money.</span>
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <button
                  onClick={() => navigate('/client/publier')}
                  className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-base transition-all"
                  style={{
                    background: `linear-gradient(90deg, ${C.gold} 0%, ${C.goldLight} 100%)`,
                    color: C.navy,
                    fontFamily: 'Space Grotesk, sans-serif',
                    boxShadow: '0 4px 24px rgba(245,166,35,0.35)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(245,166,35,0.45)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(245,166,35,0.35)'; }}
                >
                  Trouver un talent <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => navigate('/devenir-freelance')}
                  className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-base transition-all"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    color: '#FFFFFF',
                    border: '1.5px solid rgba(255,255,255,0.2)',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.13)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                >
                  Je suis freelance <ChevronRight size={16} />
                </button>
              </div>

              {/* Trust micro-signals */}
              <div className="flex flex-wrap items-center gap-5">
                {[
                  { icon: BadgeCheck, text: 'Identité vérifiée' },
                  { icon: Lock, text: 'Escrow Mobile Money' },
                  { icon: Zap, text: 'Matching en < 24h' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <Icon size={13} style={{ color: C.green }} />
                    <span style={{ color: C.dimmed, fontSize: 13 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT : Match card product preview ── */}
            <div className="hidden lg:flex flex-col items-end gap-3">

              {/* Label */}
              <div className="flex items-center gap-2 mb-1 self-start">
                <Sparkles size={13} style={{ color: C.gold }} />
                <span style={{ color: C.gold, fontSize: 12, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>
                  Aperçu du matching en temps réel
                </span>
              </div>

              {/* ── Main match card ── */}
              <div
                className="w-full rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(10,22,40,0.80)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(245,166,35,0.25)',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
                }}
              >
                {/* Card header */}
                <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: C.green }} />
                    <span style={{ color: C.muted, fontSize: 12, fontFamily: 'Space Grotesk, sans-serif' }}>Meilleur profil pour votre besoin</span>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: 'rgba(31,174,122,0.15)', color: C.green, fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    IA Match
                  </span>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <div className="flex items-start gap-4 mb-5">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={MATCH_CARD.photo}
                        alt={MATCH_CARD.name}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />
                      <div
                        className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: C.green, border: '2px solid rgba(10,22,40,0.9)' }}
                      >
                        <CheckCircle size={13} className="text-white" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p style={{ color: '#FFFFFF', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16 }}>
                        {MATCH_CARD.name}
                      </p>
                      <p style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>{MATCH_CARD.role}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} size={11} style={{ color: C.gold, fill: C.gold }} />
                          ))}
                        </div>
                        <span style={{ color: C.gold, fontSize: 12, fontWeight: 700 }}>{MATCH_CARD.note}</span>
                        <span style={{ color: C.dimmed, fontSize: 12 }}>· {MATCH_CARD.missions} missions</span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="flex-shrink-0 text-center">
                      <div
                        className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(245,166,35,0.15) 0%, rgba(245,166,35,0.05) 100%)',
                          border: '1.5px solid rgba(245,166,35,0.35)',
                        }}
                      >
                        <span style={{ color: C.gold, fontSize: 22, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', lineHeight: 1 }}>
                          {scoreAnim}
                        </span>
                        <span style={{ color: 'rgba(245,166,35,0.6)', fontSize: 11 }}>%</span>
                      </div>
                      <span style={{ color: C.dimmed, fontSize: 11, marginTop: 4, display: 'block' }}>compatibilité</span>
                    </div>
                  </div>

                  {/* Score bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span style={{ color: C.dimmed, fontSize: 11 }}>Score de matching</span>
                      <span style={{ color: C.gold, fontSize: 11, fontWeight: 600 }}>{scoreAnim}% · Excellent</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${scoreAnim}%`,
                          background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`,
                          transition: 'width 0.1s linear',
                        }}
                      />
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {MATCH_CARD.skills.map(s => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(247,243,236,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Excerpt */}
                  <p style={{ color: C.dimmed, fontSize: 12, fontStyle: 'italic', marginBottom: 16, lineHeight: 1.6 }}>
                    {MATCH_CARD.excerpt}
                  </p>

                  {/* Card CTAs */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate('/client/publier')}
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`,
                        color: C.navy,
                        fontFamily: 'Space Grotesk, sans-serif',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                    >
                      Voir le profil
                    </button>
                    <button
                      onClick={() => navigate('/client/publier')}
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.07)',
                        color: '#FFFFFF',
                        border: '1px solid rgba(255,255,255,0.15)',
                        fontFamily: 'Space Grotesk, sans-serif',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'; }}
                    >
                      Contacter
                    </button>
                  </div>
                </div>
              </div>

              {/* Other profiles hint */}
              <button
                onClick={() => navigate('/client/publier')}
                className="self-start flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: C.muted,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.10)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div className="flex -space-x-1.5">
                  {['1560250097-0b93528c311a', '1494790108377-be9c29b29330'].map(id => (
                    <img
                      key={id}
                      src={`https://images.unsplash.com/photo-${id}?w=32&h=32&fit=crop&q=80`}
                      className="w-6 h-6 rounded-full object-cover"
                      style={{ outline: '2px solid rgba(10,22,40,0.9)' }}
                    />
                  ))}
                </div>
                +2 autres profils correspondants <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          EARLY ACCESS BANNER
      ═══════════════════════════════════ */}
      <section style={{ background: `linear-gradient(90deg, ${C.navyDeep} 0%, ${C.navyMid} 100%)`, borderTop: `1px solid rgba(245,166,35,0.15)`, borderBottom: `1px solid rgba(245,166,35,0.15)` }}>
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ backgroundColor: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.25)' }}>
            <Clock size={13} style={{ color: C.gold }} />
            <span style={{ color: C.gold, fontSize: 12, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>Lancement bientôt</span>
          </div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.75rem', fontWeight: 700, color: '#FFFFFF', marginBottom: 12 }}>
            Inscrivez-vous en avant-première
          </h2>
          <p style={{ color: C.muted, marginBottom: 28, fontSize: '0.95rem' }}>
            Soyez parmi les premiers à accéder à TalentBJ. Places limitées pour la bêta privée.
          </p>
          {submitted ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl" style={{ backgroundColor: 'rgba(31,174,122,0.15)', border: '1px solid rgba(31,174,122,0.3)' }}>
              <CheckCircle size={16} style={{ color: C.green }} />
              <span style={{ color: C.green, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>Parfait ! Vous serez notifié au lancement.</span>
            </div>
          ) : (
            <form onSubmit={handleEarlyAccess} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="flex-1 px-5 py-3.5 rounded-xl outline-none text-sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.07)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.15)' }}
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl font-bold text-sm transition-all"
                style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`, color: C.navy, fontFamily: 'Space Grotesk, sans-serif' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                Rejoindre la liste
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════
          3 VERTICALES
      ═══════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: C.cream }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p style={{ color: C.gold, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 12 }}>
              3 verticales spécialisées
            </p>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2rem', fontWeight: 700, color: C.navy }}>
              Experts dans leur domaine, vérifiés par TalentBJ
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VERTICALS.map(({ slug, label, Icon, tags, gradient, glow }) => (
              <div
                key={slug}
                className="rounded-2xl p-7 cursor-pointer transition-all group"
                style={{ background: gradient, border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}
                onClick={() => navigate(`/verticale/${slug}`)}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Glow */}
                <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: glow, filter: 'blur(30px)' }} />

                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: 'rgba(245,166,35,0.15)' }}>
                  <Icon size={22} style={{ color: C.gold }} />
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', color: C.cream, fontWeight: 700, fontSize: '1rem', marginBottom: 6 }}>{label}</h3>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {tags.map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-md" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(247,243,236,0.65)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: C.gold, fontFamily: 'Space Grotesk, sans-serif' }}>
                  Explorer <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          COMMENT ÇA MARCHE
      ═══════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: C.navy }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p style={{ color: C.gold, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 12 }}>
              Processus simple
            </p>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2rem', fontWeight: 700, color: C.cream }}>
              Votre mission, de A à Z
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StampStep number={1} titre="Décrire" description="Décrivez votre besoin en langage naturel. Notre moteur analyse la description et calcule un score de compatibilité pour chaque freelance disponible." icon={<Zap size={22} style={{ color: C.gold }} />} />
            <StampStep number={2} titre="Comparer" description="Comparez les profils avec leur score de matching, avis vérifiés et portfolio. Choisissez en toute confiance, sans risque." icon={<Star size={22} style={{ color: C.gold }} />} />
            <StampStep number={3} titre="Valider" description="Déposez les fonds en escrow via Mobile Money. Le freelance travaille, vous validez, les fonds sont libérés automatiquement." icon={<Shield size={22} style={{ color: C.gold }} />} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SCEAU DE VÉRIFICATION
      ═══════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: C.cream }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-shrink-0">
              <VerificationSeal size={200} variant="large" animated className="seal-animate" />
            </div>
            <div className="flex-1">
              <p style={{ color: C.gold, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 14 }}>
                Le Sceau de Vérification TalentBJ
              </p>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.9rem', fontWeight: 700, color: C.navy, marginBottom: 16 }}>
                La confiance, visible et mesurable
              </h2>
              <p style={{ color: '#5C6B7A', lineHeight: 1.75, marginBottom: 24, fontSize: '0.95rem' }}>
                Contrairement à un simple "5 ans d'expérience" non vérifiable, chaque freelance TalentBJ porte des signaux de confiance concrets : identité contrôlée, compétences testées, historique auditable.
              </p>
              <div className="space-y-3">
                {[
                  "Identité vérifiée — pièce d'identité contrôlée par notre équipe",
                  "Compétences testées — niveau validé sur exercice pratique",
                  "Historique certifié — toutes les missions sur TalentBJ, auditables",
                  "Avis authentiques — uniquement par des clients réels ayant payé",
                ].map(label => (
                  <div key={label} className="flex items-start gap-3">
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: C.green }} />
                    <p style={{ color: C.navy, fontSize: '0.9rem' }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          TÉMOIGNAGES
      ═══════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: C.navy }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p style={{ color: C.gold, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 12 }}>
              Ils nous font confiance
            </p>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2rem', fontWeight: 700, color: C.cream }}>
              Des vrais résultats, des vrais clients
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ nom, role, seed, text, note }) => (
              <div
                key={nom}
                className="rounded-2xl p-6"
                style={{ backgroundColor: C.navyMid, border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: note }).map((_, i) => (
                    <Star key={i} size={13} style={{ color: C.gold, fill: C.gold }} />
                  ))}
                </div>
                <p style={{ color: 'rgba(247,243,236,0.75)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 20 }}>
                  "{text}"
                </p>
                <div className="flex items-center gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
                  <img src={`https://picsum.photos/seed/${seed}/40`} className="w-10 h-10 rounded-full object-cover" alt={nom} />
                  <div>
                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', color: C.cream, fontWeight: 700, fontSize: '0.9rem' }}>{nom}</p>
                    <p style={{ color: C.dimmed, fontSize: '0.75rem' }}>{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FREELANCES EN VEDETTE
      ═══════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: C.cream }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p style={{ color: C.gold, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 12 }}>
              Profils Premium
            </p>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2rem', fontWeight: 700, color: C.navy }}>
              Freelances d'excellence
            </h2>
          </div>
          <FeaturedFreelances navigate={navigate} />
        </div>
      </section>

      {/* ═══════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: `linear-gradient(135deg, ${C.navyDeep} 0%, ${C.navy} 60%, #0F2847 100%)` }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-8" style={{ background: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.25)' }}>
            <Sparkles size={24} style={{ color: C.gold }} />
          </div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: 16, letterSpacing: '-0.02em' }}>
            Prêt à travailler avec les meilleurs ?
          </h2>
          <p style={{ color: C.muted, fontSize: '1rem', marginBottom: 40, lineHeight: 1.7 }}>
            Inscription gratuite. Premier matching en moins de 2 minutes. Paiement sécurisé via Mobile Money.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/client/publier')}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all"
              style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`, color: C.navy, fontFamily: 'Space Grotesk, sans-serif', boxShadow: '0 4px 24px rgba(245,166,35,0.3)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Je cherche un talent <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/devenir-freelance')}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)', color: '#FFFFFF', border: '1.5px solid rgba(255,255,255,0.2)', fontFamily: 'Space Grotesk, sans-serif' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'; }}
            >
              Je suis freelance →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Featured freelances loader ─── */
function FeaturedFreelances({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [freelances, setFreelances] = useState<Freelance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('../../api/freelances').then(({ fetchFreelancesPremium }) => {
      fetchFreelancesPremium().then(data => { setFreelances(data); setLoading(false); });
    });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3].map(i => <div key={i} className="h-72 rounded-2xl animate-pulse" style={{ backgroundColor: '#E8E4DC' }} />)}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {freelances.slice(0, 6).map(f => <FreelanceCard key={f.id} freelance={f} />)}
      </div>
      <div className="text-center">
        <button
          onClick={() => navigate('/client/resultats', { state: { description: 'développeur' } })}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all"
          style={{ backgroundColor: C.navy, color: C.cream, fontFamily: 'Space Grotesk, sans-serif' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0F2847'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.navy; }}
        >
          Voir tous les freelances <ArrowRight size={16} />
        </button>
      </div>
    </>
  );
}
