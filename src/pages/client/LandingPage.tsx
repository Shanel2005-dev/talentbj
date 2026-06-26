import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code, Palette, Megaphone, Star, CheckCircle, Search } from 'lucide-react';
import VerificationSeal from '../../components/ui/VerificationSeal';
import StampStep from '../../components/ui/StampStep';
import FreelanceCard from '../../components/freelance/FreelanceCard';
import Button from '../../components/ui/Button';
import { fetchMatchPreview } from '../../api/matching';
import type { MatchResult } from '../../types';

const PLACEHOLDER_EXAMPLES = [
  'Je cherche un développeur Django pour un site e-commerce avec paiement Mobile Money...',
  'J\'ai besoin d\'un graphiste pour créer l\'identité visuelle de ma startup fintech...',
  'Je cherche un community manager pour gérer mes réseaux sociaux 3 mois...',
  'Développeur Flutter pour une app mobile Android et iOS, budget 300 000 FCFA...',
];

const TESTIMONIALS = [
  {
    nom: 'Fanou Agbodji', role: 'Gérante boutique e-commerce, Cotonou', seed: 'test1',
    text: 'En 24h j\'avais 3 profils vérifiés correspondant exactement à mon besoin. Le paiement Mobile Money et l\'escrow m\'ont rassurée : mon argent était protégé jusqu\'à la livraison.',
    note: 5,
  },
  {
    nom: 'Rodrigue Assogba', role: 'CTO, FinTech Hub Bénin', seed: 'test2',
    text: 'Le score de matching est vraiment pertinent. On nous a recommandé un DevOps expert qui avait déjà travaillé sur des projets similaires. Résultat impeccable.',
    note: 5,
  },
  {
    nom: 'Sènan Kpètin', role: 'Entrepreneur, Porto-Novo', seed: 'test3',
    text: 'Fini les arnaques WhatsApp. TalentBJ m\'a mis en contact avec un freelance vérifié, l\'escrow a protégé mes fonds, et j\'ai reçu exactement ce que j\'avais demandé.',
    note: 5,
  },
];

const VERTICALS = [
  {
    slug: 'dev-web', label: 'Développement web & mobile', Icon: Code, count: 10,
    tags: ['React', 'Django', 'Flutter', 'Node.js', 'PHP'],
    color: '#1E3A5F',
  },
  {
    slug: 'design-uiux', label: 'Design graphique & UI/UX', Icon: Palette, count: 10,
    tags: ['Figma', 'Branding', 'Motion', 'Illustration', 'UX Research'],
    color: '#2D1B4E',
  },
  {
    slug: 'marketing-digital', label: 'Marketing digital & CM', Icon: Megaphone, count: 10,
    tags: ['Facebook Ads', 'SEO', 'Community', 'Google Ads', 'Copywriting'],
    color: '#1A3A2E',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [previewResults, setPreviewResults] = useState<MatchResult[]>([]);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cycling placeholder animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx(i => (i + 1) % PLACEHOLDER_EXAMPLES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Debounced preview matching
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 10) {
      setShowPreview(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoadingPreview(true);
      const results = await fetchMatchPreview(query);
      setPreviewResults(results.slice(0, 2));
      setShowPreview(true);
      setLoadingPreview(false);
    }, 600);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate('/client/resultats', { state: { description: query } });
  }

  return (
    <div style={{ backgroundColor: '#F7F3EC' }}>

      {/* ── HERO — plein écran ── */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        {/* Photo de fond */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1707155466125-a7943a37e8f9?w=1600&auto=format&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
          }}
        />
        {/* Overlay violet-navy */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'rgba(11,31,58,0.55)',
          }}
        />
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-16 sm:py-24 text-center" style={{ position: 'relative', zIndex: 2 }}>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: 'Space Grotesk', color: '#FFFFFF', letterSpacing: '-0.02em' }}
          >
            Trouvez le freelance
            <br /><span style={{
              background: 'linear-gradient(to right, #FFFFFF 0%, #F5A623 60%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>parfait</span><br />
            pour votre projet au Bénin
          </h1>

          {/* ── Barre de recherche style Fiverr ── */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mt-10">
            <div
              className="flex items-center rounded-xl overflow-hidden"
              style={{ backgroundColor: '#FFFFFF', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}
            >
              <Search size={20} className="ml-4 flex-shrink-0" style={{ color: '#9CA3AF' }} />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={PLACEHOLDER_EXAMPLES[placeholderIdx]}
                className="flex-1 px-3 py-4 outline-none text-sm"
                style={{ color: '#0B1F3A', fontFamily: 'Inter', backgroundColor: 'transparent' }}
              />
              <button
                type="submit"
                className="flex-shrink-0 flex items-center justify-center gap-2 px-4 sm:px-6 py-4 font-bold text-sm transition-all"
                style={{ backgroundColor: '#7C3AED', color: '#FFFFFF', fontFamily: 'Space Grotesk', minWidth: 48 }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F5A623'; e.currentTarget.style.color = '#0B1F3A'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#7C3AED'; e.currentTarget.style.color = '#FFFFFF'; }}
              >
                <span className="hidden sm:inline">Rechercher</span>
                <ArrowRight size={20} className="sm:hidden" />
              </button>
            </div>

            {/* Preview results (live) */}
            {(showPreview || loadingPreview) && (
              <div
                className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-20"
                style={{ backgroundColor: '#142A4D', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 16px 40px rgba(0,0,0,0.4)' }}
              >
                {loadingPreview ? (
                  <div className="p-6 text-center">
                    <div className="w-5 h-5 border-2 border-seal-gold border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-xs" style={{ color: 'rgba(247,243,236,0.5)' }}>Calcul du matching...</p>
                  </div>
                ) : (
                  <>
                    <div className="px-4 py-2.5 text-xs font-semibold" style={{ color: '#F5A623', borderBottom: '1px solid rgba(255,255,255,0.06)', fontFamily: 'Space Grotesk' }}>
                      Aperçu — {previewResults.length} profils correspondants
                    </div>
                    {previewResults.map(r => (
                      <div
                        key={r.freelance.id}
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                        onClick={() => navigate('/client/resultats', { state: { description: query } })}
                      >
                        <img src={r.freelance.photo} className="w-9 h-9 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm truncate" style={{ color: '#F7F3EC', fontFamily: 'Space Grotesk' }}>
                            {r.freelance.nom}
                          </p>
                          <p className="text-xs truncate" style={{ color: 'rgba(247,243,236,0.45)' }}>
                            {r.raison}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p
                            className="text-base font-bold"
                            style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}
                          >
                            {r.score}%
                          </p>
                          <p className="text-xs" style={{ color: 'rgba(247,243,236,0.4)' }}>match</p>
                        </div>
                      </div>
                    ))}
                    <div
                      className="px-4 py-3 text-center text-sm font-semibold cursor-pointer transition-colors"
                      style={{ color: '#F5A623', fontFamily: 'Space Grotesk' }}
                      onClick={handleSearch}
                    >
                      Voir tous les résultats →
                    </div>
                  </>
                )}
              </div>
            )}
          </form>

          {/* ── Tags populaires ── */}
          <div className="mt-6 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}>
            <div className="flex items-center gap-2 w-max mx-auto px-1">
              <span className="text-sm font-semibold flex-shrink-0" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter' }}>
                Populaires :
              </span>
              {['React Native', 'Design UI/UX', 'WordPress', 'Marketing Digital', 'Comptabilité OHADA'].map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => { setQuery(tag); navigate('/client/resultats', { state: { description: tag } }); }}
                  className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: '#FFFFFF',
                    border: '1.5px solid rgba(255,255,255,0.4)',
                    fontFamily: 'Inter',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#F5A623';
                    e.currentTarget.style.color = '#0B1F3A';
                    e.currentTarget.style.borderColor = '#F5A623';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LES 3 VERTICALES ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#F5A623', fontFamily: 'Space Grotesk' }}>
              3 verticales spécialisées
            </p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
              Experts dans leur domaine, vérifiés par TalentBJ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VERTICALS.map(({ slug, label, Icon, count, tags, color }) => (
              <div
                key={slug}
                className="rounded-2xl p-6 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl group"
                style={{ backgroundColor: color, border: '1px solid rgba(255,255,255,0.08)' }}
                onClick={() => navigate(`/verticale/${slug}`)}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'rgba(245,166,35,0.2)' }}
                >
                  <Icon size={22} style={{ color: '#F5A623' }} />
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
                  {label}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'rgba(247,243,236,0.5)', fontFamily: 'JetBrains Mono' }}>
                  {count} freelances vérifiés
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map(t => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-md"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(247,243,236,0.7)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: '#F5A623' }}>
                  Explorer <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE — 3 tampons ── */}
      <section style={{ backgroundColor: '#0B1F3A' }} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#F5A623', fontFamily: 'Space Grotesk' }}>
              Processus simple
            </p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
              Votre mission, de A à Z
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <StampStep
              number={1}
              titre="Décrire"
              description="Décrivez votre besoin en langage naturel. Notre moteur analyse la description et calcule un score de compatibilité pour chaque freelance disponible."
              icon={<Search size={22} style={{ color: '#F5A623' }} />}
            />
            <StampStep
              number={2}
              titre="Comparer"
              description="Comparez les profils recommandés avec leur score de matching, leurs avis vérifiés, leur portfolio et leur taux de réussite. Choisissez en confiance."
              icon={<Star size={22} style={{ color: '#F5A623' }} />}
            />
            <StampStep
              number={3}
              titre="Valider"
              description="Déposez les fonds en escrow via Mobile Money. Le freelance travaille, vous validez la livraison, puis les fonds sont libérés automatiquement."
              icon={<CheckCircle size={22} style={{ color: '#F5A623' }} />}
            />
          </div>
        </div>
      </section>

      {/* ── SCEAU DE VÉRIFICATION — section confiance ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            {/* Seal visual */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <VerificationSeal size={220} variant="large" animated className="seal-animate" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#F5A623', fontFamily: 'Space Grotesk' }}>
                Le Sceau de Vérification TalentBJ
              </p>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                La confiance, visible et mesurable
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#5C6B7A' }}>
                Contrairement à un simple "5 ans d'expérience" non vérifiable, chaque freelance TalentBJ
                porte des signaux de confiance concrets : badge de vérification d'identité, test de compétence
                réussi, taux de livraison à temps, et zéro litige.
              </p>

              <div className="space-y-3">
                {[
                  { icon: <CheckCircle size={16} style={{ color: '#1FAE7A' }} />, label: 'Identité vérifiée — pièce d\'identité contrôlée par notre équipe' },
                  { icon: <CheckCircle size={16} style={{ color: '#1FAE7A' }} />, label: 'Compétences testées — niveau validé sur exercice pratique' },
                  { icon: <CheckCircle size={16} style={{ color: '#1FAE7A' }} />, label: 'Historique certifié — toutes les missions sur TalentBJ, auditables' },
                  { icon: <CheckCircle size={16} style={{ color: '#1FAE7A' }} />, label: 'Avis authentiques — uniquement par des clients réels ayant payé' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5">{icon}</span>
                    <p className="text-sm" style={{ color: '#0B1F3A' }}>{label}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/comment-ca-marche')}
                className="mt-8 inline-flex items-center gap-2 font-semibold text-sm transition-all hover:gap-3"
                style={{ color: '#F5A623', fontFamily: 'Space Grotesk' }}
              >
                En savoir plus sur la vérification <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section style={{ backgroundColor: '#0B1F3A' }} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#F5A623', fontFamily: 'Space Grotesk' }}>
              Ils nous font confiance
            </p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
              Des vrais résultats, des vrais clients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ nom, role, seed, text, note }) => (
              <div
                key={nom}
                className="rounded-2xl p-6"
                style={{ backgroundColor: '#142A4D', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: note }).map((_, i) => (
                    <Star key={i} size={14} style={{ color: '#F5A623', fill: '#F5A623' }} />
                  ))}
                </div>

                <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(247,243,236,0.75)', fontFamily: 'Inter' }}>
                  "{text}"
                </p>

                <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <img
                    src={`https://picsum.photos/seed/${seed}/40`}
                    className="w-10 h-10 rounded-full object-cover"
                    alt={nom}
                  />
                  <div>
                    <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>{nom}</p>
                    <p className="text-xs" style={{ color: 'rgba(247,243,236,0.45)' }}>{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREELANCES EN VEDETTE ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#F5A623', fontFamily: 'Space Grotesk' }}>
              Profils Premium
            </p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
              Freelances d'excellence
            </h2>
          </div>
          <FeaturedFreelances />
        </div>
      </section>

      {/* ── DOUBLE CTA ── */}
      <section style={{ backgroundColor: '#0B1F3A' }} className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
            Prêt à commencer ?
          </h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(247,243,236,0.6)' }}>
            Inscription gratuite. Premier matching en moins de 2 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/client/publier')}
            >
              Je cherche un talent <ArrowRight size={18} />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate('/devenir-freelance')}
            >
              Je suis freelance →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Composant interne pour les freelances en vedette
function FeaturedFreelances() {
  const [freelances, setFreelances] = useState<import('../../types').Freelance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('../../api/freelances').then(({ fetchFreelancesPremium }) => {
      fetchFreelancesPremium().then(data => {
        setFreelances(data);
        setLoading(false);
      });
    });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-72 rounded-2xl animate-pulse" style={{ backgroundColor: '#E8E4DC' }} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {freelances.slice(0, 6).map(f => <FreelanceCard key={f.id} freelance={f} />)}
    </div>
  );
}
