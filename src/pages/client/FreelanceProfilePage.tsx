import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, CheckCircle, ExternalLink, ChevronLeft, Scale } from 'lucide-react';
import VerificationSeal from '../../components/ui/VerificationSeal';
import SkillBadge from '../../components/freelance/SkillBadge';
import Button from '../../components/ui/Button';
import { fetchFreelanceById } from '../../api/freelances';
import type { Freelance } from '../../types';
import { useAuthStore } from '../../store/authStore';

const BADGE_CONFIG = {
  premium: { label: 'Premium', bg: '#FFF8EC', text: '#F5A623', border: '#F5A623' },
  expert: { label: 'Expert', bg: '#F5F3FF', text: '#7C3AED', border: '#C4B5FD' },
  verifie: { label: 'Vérifié', bg: '#ECFDF5', text: '#1FAE7A', border: '#6EE7B7' },
};

const VERTICAL_LABELS: Record<string, string> = {
  developpement: 'Développement web & mobile',
  design: 'Design graphique & UI/UX',
  marketing: 'Marketing digital & CM',
  comptabilite: 'Comptabilité & Fiscalité',
};

export default function FreelanceProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role } = useAuthStore();
  const [freelance, setFreelance] = useState<Freelance | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'avis'>('portfolio');
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchFreelanceById(id).then(f => {
      setFreelance(f);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F3EC' }}>
        <div className="w-8 h-8 border-2 border-seal-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!freelance) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F3EC' }}>
        <div className="text-center">
          <p className="text-xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Profil introuvable</p>
          <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  const badge = freelance.badge ? BADGE_CONFIG[freelance.badge] : null;
  const noteAvg = freelance.avis.length > 0
    ? (freelance.avis.reduce((s, a) => s + a.note, 0) / freelance.avis.length).toFixed(1)
    : null;

  const tarif = freelance.tarifHoraire
    ? `${freelance.tarifHoraire.toLocaleString('fr-FR')} FCFA/h`
    : `${freelance.tarifForfait?.toLocaleString('fr-FR')} FCFA / projet`;

  return (
    <div style={{ backgroundColor: '#F7F3EC', minHeight: '100vh' }}>

      {/* Header hero */}
      <div style={{ backgroundColor: '#0B1F3A' }}>
        <div className="max-w-5xl mx-auto px-6 py-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm mb-6 transition-colors"
            style={{ color: 'rgba(247,243,236,0.5)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F7F3EC')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,243,236,0.5)')}
          >
            <ChevronLeft size={16} /> Retour aux résultats
          </button>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Photo + seal */}
            <div className="relative flex-shrink-0">
              <img
                src={freelance.photo}
                alt={freelance.nom}
                className="w-24 h-24 rounded-2xl object-cover"
                style={{ border: '3px solid rgba(245,166,35,0.4)' }}
              />
              {(freelance.badge === 'expert' || freelance.badge === 'premium') && (
                <div className="absolute -bottom-2 -right-2">
                  <VerificationSeal size={36} variant="mini" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
                  {freelance.nom}
                </h1>
                {badge && (
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: badge.bg, color: badge.text, border: `1px solid ${badge.border}`, fontFamily: 'Space Grotesk' }}
                  >
                    {badge.label}
                  </span>
                )}
                {freelance.numeroOrdre && (
                  <span
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: 'rgba(92,107,122,0.12)', color: '#5C6B7A', border: '1px solid rgba(92,107,122,0.3)', fontFamily: 'Space Grotesk' }}
                  >
                    <Scale size={11} /> Profession réglementée
                  </span>
                )}
                {!freelance.disponible && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(156,163,175,0.2)', color: '#9CA3AF' }}>
                    Indisponible
                  </span>
                )}
              </div>

              <p className="text-sm mb-2" style={{ color: '#F5A623', fontFamily: 'Space Grotesk' }}>
                {VERTICAL_LABELS[freelance.vertical]}
              </p>

              <div className="flex items-center gap-4 text-sm" style={{ color: 'rgba(247,243,236,0.55)' }}>
                <span className="flex items-center gap-1">
                  <MapPin size={13} /> {freelance.ville}
                </span>
                {noteAvg && (
                  <span className="flex items-center gap-1">
                    <Star size={13} style={{ color: '#F5A623', fill: '#F5A623' }} />
                    <span style={{ fontFamily: 'JetBrains Mono', color: '#F7F3EC' }}>{noteAvg}</span>
                    <span>({freelance.avis.length} avis)</span>
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <CheckCircle size={13} style={{ color: '#1FAE7A' }} />
                  <span style={{ fontFamily: 'JetBrains Mono', color: 'rgba(247,243,236,0.55)' }}>{freelance.nombreMissions}</span>
                  {' '}missions
                </span>
              </div>
            </div>

            {/* Right CTA */}
            <div className="sm:ml-auto flex flex-col items-end gap-3">
              <div className="text-right">
                <p className="text-2xl font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>
                  {tarif}
                </p>
                <p className="text-xs" style={{ color: 'rgba(247,243,236,0.45)' }}>Paiement sécurisé via escrow</p>
              </div>
              {(role === 'client' || role === 'entreprise') && freelance.disponible && (
                <Button variant="primary" size="lg" onClick={() => setShowContact(true)}>
                  Publier un besoin pour l'inviter →
                </Button>
              )}
              {!role && (
                <Button variant="primary" size="lg" onClick={() => navigate('/connexion')}>
                  Se connecter pour contacter
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Bio */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
              <h2 className="font-bold mb-3" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>À propos</h2>
              <p className="text-sm leading-relaxed" style={{ color: '#5C6B7A' }}>{freelance.bio}</p>
            </div>

            {/* Compétences */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
              <h2 className="font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Compétences</h2>
              <div className="flex flex-wrap gap-2">
                {freelance.competences.map(c => <SkillBadge key={c} skill={c} />)}
              </div>
            </div>

            {/* Tabs — Portfolio / Avis */}
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
              <div className="flex" style={{ borderBottom: '1px solid #F7F3EC' }}>
                {(['portfolio', 'avis'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="flex-1 py-3 text-sm font-bold transition-all capitalize"
                    style={{
                      color: activeTab === tab ? '#F5A623' : '#5C6B7A',
                      borderBottom: activeTab === tab ? '2px solid #F5A623' : '2px solid transparent',
                      fontFamily: 'Space Grotesk',
                    }}
                  >
                    {tab === 'portfolio' ? `Portfolio (${freelance.portfolio.length})` : `Avis (${freelance.avis.length})`}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'portfolio' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {freelance.portfolio.map(item => (
                      <div
                        key={item.id}
                        className="group rounded-xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
                        style={{ border: '1px solid #E8E4DC' }}
                      >
                        <div className="relative overflow-hidden h-36">
                          <img
                            src={item.image} alt={item.titre}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <ExternalLink size={16} className="text-white" />
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{item.titre}</p>
                          <p className="text-xs mt-1 leading-relaxed" style={{ color: '#5C6B7A' }}>{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-5">
                    {freelance.avis.map(avis => (
                      <div key={avis.id} className="flex gap-4 pb-5" style={{ borderBottom: '1px solid #F7F3EC' }}>
                        <img
                          src={`https://picsum.photos/seed/${avis.avatarSeed}/40`}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          alt={avis.auteur}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                              {avis.auteur}
                            </p>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: avis.note }).map((_, i) => (
                                <Star key={i} size={11} style={{ color: '#F5A623', fill: '#F5A623' }} />
                              ))}
                              <span className="text-xs ml-1" style={{ color: '#5C6B7A', fontFamily: 'JetBrains Mono' }}>
                                {avis.date}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm leading-relaxed" style={{ color: '#5C6B7A' }}>{avis.commentaire}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">

            {/* Stats card */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#0B1F3A', border: '1px solid #142A4D' }}>
              <h3 className="font-bold text-sm mb-4" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
                Performance
              </h3>
              {[
                { label: 'Taux de réussite', val: `${freelance.tauxReussite}%`, color: '#1FAE7A' },
                { label: 'Missions réalisées', val: String(freelance.nombreMissions), color: '#F5A623' },
                { label: 'Note moyenne', val: noteAvg ? `${noteAvg}/5` : 'N/A', color: '#F5A623' },
                { label: 'Disponibilité', val: freelance.disponible ? 'Disponible' : 'Indisponible', color: freelance.disponible ? '#1FAE7A' : '#9CA3AF' },
              ].map(({ label, val, color }) => (
                <div key={label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-xs" style={{ color: 'rgba(247,243,236,0.5)' }}>{label}</span>
                  <span className="text-sm font-bold" style={{ fontFamily: 'JetBrains Mono', color }}>{val}</span>
                </div>
              ))}

              {/* Taux de réussite bar */}
              <div className="mt-4">
                <div className="h-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${freelance.tauxReussite}%`, backgroundColor: '#1FAE7A', transition: 'width 1s ease' }}
                  />
                </div>
              </div>
            </div>

            {/* Numéro d'ordre professionnel */}
            {freelance.numeroOrdre && (
              <div className="rounded-2xl p-4" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Scale size={14} style={{ color: '#5C6B7A' }} />
                  <p className="text-xs font-bold" style={{ fontFamily: 'Space Grotesk', color: '#5C6B7A' }}>
                    Profession réglementée
                  </p>
                </div>
                <p className="text-xs" style={{ color: '#5C6B7A' }}>N° d'ordre professionnel</p>
                <p className="font-bold text-sm mt-0.5" style={{ fontFamily: 'JetBrains Mono', color: '#0B1F3A' }}>
                  {freelance.numeroOrdre}
                </p>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: '#9CA3AF' }}>
                  Déclaré par le freelance — non vérifié par TalentBJ
                </p>
              </div>
            )}

            {/* Sceau */}
            {(freelance.badge === 'expert' || freelance.badge === 'premium') && (
              <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: '#FFF8EC', border: '1.5px solid #F5A623' }}>
                <VerificationSeal size={72} animated className="mx-auto mb-3" />
                <p className="font-bold text-sm mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  Profil {badge?.label} TalentBJ
                </p>
                <p className="text-xs leading-relaxed" style={{ color: '#5C6B7A' }}>
                  Identité vérifiée · Compétences testées · Historique certifié
                </p>
              </div>
            )}

            {/* CTA + explanation */}
            {(role === 'client' || role === 'entreprise') && freelance.disponible && (
              <>
                <div className="rounded-2xl p-4" style={{ backgroundColor: '#FFF8EC', border: '1px solid rgba(245,166,35,0.2)' }}>
                  <p className="text-xs font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                    Comment travailler avec {freelance.nom} ?
                  </p>
                  <ol className="space-y-1">
                    {['Publiez votre besoin précis', 'Le matching IA identifie les meilleurs profils', 'Invitez jusqu\'à 2 freelances (dont celui-ci)', 'Comparez les propositions et choisissez'].map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: '#5C6B7A' }}>
                        <span className="font-bold flex-shrink-0" style={{ color: '#F5A623', fontFamily: 'JetBrains Mono' }}>{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <Button variant="primary" size="lg" fullWidth onClick={() => setShowContact(true)}>
                  Publier un besoin pour l'inviter →
                </Button>
              </>
            )}
            {!role && (
              <Button variant="secondary" size="lg" fullWidth onClick={() => navigate('/connexion')}>
                Se connecter pour contacter
              </Button>
            )}

            <p className="text-xs text-center" style={{ color: '#5C6B7A' }}>
              Paiement sécurisé par escrow Mobile Money
            </p>
          </div>
        </div>
      </div>

      {/* Modal publier besoin */}
      {showContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(11,31,58,0.8)' }}
          onClick={() => setShowContact(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl p-8"
            style={{ backgroundColor: '#fff' }}
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
              Inviter {freelance.nom}
            </h3>
            <p className="text-sm mb-6" style={{ color: '#5C6B7A' }}>
              Décrivez votre besoin. Une fois la mission créée, {freelance.nom} sera automatiquement invité et vous pourrez aussi comparer avec d'autres profils.
            </p>
            <div className="flex gap-3">
              <Button
                variant="primary"
                fullWidth
                onClick={() => navigate(
                  role === 'entreprise' ? '/entreprise/publier' : '/client/publier',
                  { state: { fromFreelanceId: freelance.id, fromFreelanceNom: freelance.nom, vertical: freelance.vertical } },
                )}
              >
                Publier mon besoin
              </Button>
              <Button variant="outline" onClick={() => setShowContact(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
