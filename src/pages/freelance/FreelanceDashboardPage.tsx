import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Clock, CheckCircle, Smartphone, ArrowRight, AlertCircle, PackageCheck, ShieldCheck, X, Search } from 'lucide-react';
import { joursRestantsAvantLiberationAuto } from '../../utils/escrowDelay';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import EscrowTimeline from '../../components/ui/EscrowTimeline';
import VerificationSeal from '../../components/ui/VerificationSeal';
import Button from '../../components/ui/Button';
import { useMissionStore } from '../../store/missionStore';
import { useAuthStore } from '../../store/authStore';

export default function FreelanceDashboardPage() {
  const navigate = useNavigate();
  const { statutVerification } = useAuthStore();
  const enAttente = statutVerification === 'en_attente';

  const allMissions = useMissionStore(s => s.missions);
  const { deliverMission, confirmEngagement, cancelEngagement } = useMissionStore();
  const missions = allMissions.filter(m => m.freelanceId === 'f01');

  const enAttenteConfirmation = missions.filter(m => m.statut === 'en_attente_confirmation_freelance');
  const activeMissions = missions.filter(m => ['attribuee', 'en_cours', 'livree'].includes(m.statut));
  const enCoursOnly = missions.filter(m => m.statut === 'en_cours');
  const validees = missions.filter(m => m.statut === 'validee');
  const revenus = validees.reduce((s, m) => s + m.budget * 0.9, 0);
  const pendingEscrow = enCoursOnly.reduce((s, m) => s + m.budget, 0);

  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);
  const [delivering, setDelivering] = useState<string | null>(null);
  const [delivered, setDelivered] = useState<Set<string>>(new Set());
  const [confirming, setConfirming] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<string | null>(null);

  async function handleConfirm(missionId: string) {
    setConfirming(missionId);
    await new Promise(r => setTimeout(r, 1000));
    confirmEngagement(missionId);
    setConfirming(null);
  }

  async function handleCancel(missionId: string) {
    setCancelling(missionId);
    await new Promise(r => setTimeout(r, 800));
    cancelEngagement(missionId);
    setCancelling(null);
  }

  async function handleDeliver(missionId: string) {
    setDelivering(missionId);
    await new Promise(r => setTimeout(r, 1200));
    deliverMission(missionId);
    setDelivered(prev => new Set([...prev, missionId]));
    setDelivering(null);
  }

  async function handleWithdraw() {
    setWithdrawing(true);
    await new Promise(r => setTimeout(r, 2000));
    setWithdrawing(false);
    setWithdrawn(true);
  }

  // ── Écran d'attente de validation ──
  if (enAttente) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
        <DashboardSidebar />
        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="max-w-md w-full text-center">
            {/* Icône animée */}
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8"
              style={{ backgroundColor: '#FFF8EC', border: '2px solid rgba(245,166,35,0.35)' }}>
              <AlertCircle size={44} style={{ color: '#F5A623' }} />
            </div>

            <h1 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
              Dossier en cours de vérification
            </h1>
            <p className="text-sm mb-8 leading-relaxed" style={{ color: '#5C6B7A' }}>
              Notre équipe examine votre profil, vos documents d'identité et votre test pratique.
              Vous recevrez une notification dans les <strong style={{ color: '#0B1F3A' }}>24h</strong> suivant la soumission.
            </p>

            {/* Étapes de vérification */}
            <div className="rounded-2xl p-5 mb-8 text-left space-y-4"
              style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
              {[
                { label: 'Identité vérifiée par notre équipe', desc: 'Documents CNI/Passeport + selfie' },
                { label: 'Test pratique examiné', desc: 'Évaluation de votre réponse technique' },
                { label: 'Portfolio analysé', desc: 'Qualité et cohérence de vos réalisations' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: '#FFF8EC', border: '2px solid #F5A623' }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F5A623' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>{item.label}</p>
                    <p className="text-xs" style={{ color: '#5C6B7A' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action secondaire : explorer les missions */}
            <p className="text-xs mb-3" style={{ color: '#5C6B7A' }}>
              En attendant, vous pouvez explorer les missions disponibles.
            </p>
            <Button variant="outline" onClick={() => navigate('/freelance/missions')}>
              <Search size={15} /> Explorer les missions
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const STATUT_LABELS: Record<string, string> = {
    ouverte: 'Ouverte', attribuee: 'Attribuée', en_cours: 'En cours', livree: 'Livrée', validee: 'Validée',
  };
  const STATUT_COLORS: Record<string, { bg: string; text: string }> = {
    attribuee: { bg: '#FFF0F9', text: '#DB2777' },
    en_cours: { bg: '#EFF6FF', text: '#3B82F6' },
    livree: { bg: '#FEF9C3', text: '#CA8A04' },
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
      <DashboardSidebar />

      <div className="flex-1">
        {/* Header */}
        <div style={{ backgroundColor: '#0B1F3A' }} className="px-8 pt-8 pb-16">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm mb-1" style={{ color: 'rgba(247,243,236,0.5)' }}>Mon espace freelance</p>
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
                Koffi Mensah
              </h1>
            </div>
            <VerificationSeal size={44} variant="default" />
          </div>
        </div>

        <div className="px-8 pb-16" style={{ marginTop: -48 }}>

          {/* Bannière vérification en attente */}
          {enAttente && (
            <div
              className="rounded-2xl px-5 py-4 mb-6 flex items-start gap-4"
              style={{ backgroundColor: '#FFF8EC', border: '1.5px solid #F5A623' }}
            >
              <AlertCircle size={20} style={{ color: '#F5A623', flexShrink: 0, marginTop: 2 }} />
              <div>
                <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  Dossier en cours de vérification
                </p>
                <p className="text-sm mt-0.5" style={{ color: '#5C6B7A' }}>
                  Notre équipe examine votre profil, vos documents et votre test pratique. Vous serez notifié dans les <strong>24h</strong>.
                </p>
              </div>
            </div>
          )}

          {/* ── Confirmations en attente ── */}
          {enAttenteConfirmation.map(m => (
            <div
              key={m.id}
              className="rounded-2xl mb-4 overflow-hidden"
              style={{ border: '2px solid #F5A623', boxShadow: '0 4px 20px rgba(245,166,35,0.18)' }}
            >
              <div className="px-5 py-3 flex items-center gap-2" style={{ backgroundColor: '#F5A623' }}>
                <ShieldCheck size={16} style={{ color: '#0B1F3A' }} />
                <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  Action requise — Confirmation de mission
                </p>
              </div>
              <div className="p-5" style={{ backgroundColor: '#FFF8EC' }}>
                <p className="font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  {m.titre}
                </p>
                <p className="text-sm mb-4" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
                  Le client a accepté votre proposition. Confirmez votre engagement pour démarrer la mission.
                </p>
                <div className="flex flex-wrap gap-3 mb-5">
                  <div className="rounded-xl px-4 py-2.5" style={{ backgroundColor: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.3)' }}>
                    <p className="text-xs mb-0.5" style={{ color: '#5C6B7A' }}>Prix accepté</p>
                    <p className="font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623', fontSize: 16 }}>
                      {(m.prixFinal ?? m.budget).toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                  <div className="rounded-xl px-4 py-2.5" style={{ backgroundColor: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.3)' }}>
                    <p className="text-xs mb-0.5" style={{ color: '#5C6B7A' }}>Délai</p>
                    <p className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A', fontSize: 14 }}>
                      {m.delaiFinal ?? m.delai}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    loading={confirming === m.id}
                    onClick={() => handleConfirm(m.id)}
                  >
                    <ShieldCheck size={15} /> Confirmer mon engagement
                  </Button>
                  <Button
                    variant="outline"
                    loading={cancelling === m.id}
                    onClick={() => handleCancel(m.id)}
                  >
                    <X size={14} /> Je ne suis plus disponible
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Missions en cours', val: enCoursOnly.length, Icon: Clock, color: '#3B82F6', large: true },
              { label: 'Missions validées', val: validees.length, Icon: CheckCircle, color: '#1FAE7A', large: true },
              { label: 'En escrow', val: `${pendingEscrow.toLocaleString('fr-FR')} F`, Icon: TrendingUp, color: '#F5A623', large: false },
              { label: 'Revenus totaux', val: `${Math.round(revenus).toLocaleString('fr-FR')} F`, Icon: Smartphone, color: '#1FAE7A', large: false },
            ].map(({ label, val, Icon, color, large }) => (
              <div key={label} className="rounded-2xl p-5" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', boxShadow: '0 2px 12px rgba(11,31,58,0.05)' }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs" style={{ color: '#5C6B7A' }}>{label}</p>
                  <Icon size={16} style={{ color }} />
                </div>
                <p className="font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#0B1F3A', fontSize: large ? 22 : 17 }}>
                  {val}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Missions en cours */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #F7F3EC', backgroundColor: '#FEFDFB' }}>
                  <h2 className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                    Mes missions actives
                  </h2>
                  <Button variant="primary" size="sm" onClick={() => navigate('/freelance/missions')}>
                    Voir les offres
                  </Button>
                </div>

                {activeMissions.length === 0 ? (
                  <div className="p-10 text-center">
                    <p className="font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Aucune mission active</p>
                    <p className="text-sm mb-6" style={{ color: '#5C6B7A' }}>Consultez les missions disponibles et postulez.</p>
                    <Button variant="primary" onClick={() => navigate('/freelance/missions')}>
                      Voir les missions <ArrowRight size={14} />
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y" style={{ borderColor: '#F7F3EC' }}>
                    {activeMissions.map(m => {
                      const isDelivering = delivering === m.id;
                      const isDelivered = delivered.has(m.id) || m.statut === 'livree';
                      const sc = STATUT_COLORS[m.statut] ?? { bg: '#F7F3EC', text: '#5C6B7A' };
                      return (
                        <div key={m.id} className="px-6 py-5">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div>
                              <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{m.titre}</p>
                              <p className="text-xs mt-0.5" style={{ color: '#5C6B7A', fontFamily: 'JetBrains Mono' }}>
                                {(m.prixFinal ?? m.budget).toLocaleString('fr-FR')} FCFA · {m.delaiFinal ?? m.delai}
                              </p>
                            </div>
                            <span
                              className="px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0"
                              style={{ backgroundColor: sc.bg, color: sc.text, fontFamily: 'Space Grotesk' }}
                            >
                              {STATUT_LABELS[m.statut]}
                            </span>
                          </div>
                          <div className="mb-4">
                            <p className="text-xs mb-2" style={{ color: '#5C6B7A', fontFamily: 'Space Grotesk', fontWeight: 600 }}>Statut escrow :</p>
                            <EscrowTimeline etapes={m.etapesEscrow} compact />
                          </div>
                          {/* Action selon statut */}
                          {m.statut === 'attribuee' && (
                            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ backgroundColor: '#FFF0F9', border: '1px solid rgba(219,39,119,0.2)' }}>
                              <Clock size={14} style={{ color: '#DB2777' }} />
                              <span className="text-sm font-semibold" style={{ color: '#DB2777', fontFamily: 'Space Grotesk' }}>
                                En attente du paiement escrow du client
                              </span>
                            </div>
                          )}
                          {m.statut === 'en_cours' && (
                            isDelivered ? (
                              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ backgroundColor: '#ECFDF5' }}>
                                <CheckCircle size={15} style={{ color: '#1FAE7A' }} />
                                <span className="text-sm font-semibold" style={{ color: '#1FAE7A', fontFamily: 'Space Grotesk' }}>
                                  Livraison envoyée — en attente de validation client
                                </span>
                              </div>
                            ) : (
                              <Button
                                variant="primary"
                                size="sm"
                                loading={isDelivering}
                                onClick={() => handleDeliver(m.id)}
                              >
                                <PackageCheck size={15} /> Marquer comme livré
                              </Button>
                            )
                          )}
                          {m.statut === 'livree' && (() => {
                            const jours = m.dateLivraison ? joursRestantsAvantLiberationAuto(m.dateLivraison) : null;
                            const isUrgent = jours !== null && jours <= 2 && jours > 0;
                            const isOverdue = jours === 0;
                            return (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ backgroundColor: '#FEF9C3', border: '1px solid rgba(202,138,4,0.25)' }}>
                                  <CheckCircle size={14} style={{ color: '#CA8A04' }} />
                                  <span className="text-sm font-semibold" style={{ color: '#CA8A04', fontFamily: 'Space Grotesk' }}>
                                    Livraison envoyée — en attente de validation client
                                  </span>
                                </div>
                                {jours !== null && (
                                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                                    style={{
                                      backgroundColor: isOverdue ? '#FEF2F2' : isUrgent ? '#FFF8EC' : 'rgba(92,107,122,0.06)',
                                      border: `1px solid ${isOverdue ? 'rgba(185,28,28,0.2)' : isUrgent ? 'rgba(245,166,35,0.3)' : 'rgba(92,107,122,0.15)'}`,
                                    }}
                                  >
                                    <Clock size={12} style={{ color: isOverdue ? '#B91C1C' : isUrgent ? '#F5A623' : '#5C6B7A', flexShrink: 0 }} />
                                    <span className="text-xs" style={{ color: '#5C6B7A', fontFamily: 'Space Grotesk' }}>
                                      {isOverdue
                                        ? 'Délai dépassé — libération automatique en cours de traitement'
                                        : <>Fonds libérés automatiquement dans{' '}
                                            <strong style={{ fontFamily: 'JetBrains Mono', color: isUrgent ? '#F5A623' : '#5C6B7A' }}>
                                              {jours}j
                                            </strong>
                                            {' '}si le client ne répond pas</>
                                      }
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Historique */}
              {validees.length > 0 && (
                <div className="rounded-2xl overflow-hidden mt-4" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                  <div className="px-6 py-4" style={{ borderBottom: '1px solid #F7F3EC', backgroundColor: '#FEFDFB' }}>
                    <h2 className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Missions validées</h2>
                  </div>
                  <div className="divide-y" style={{ borderColor: '#F7F3EC' }}>
                    {validees.map(m => (
                      <div key={m.id} className="flex items-center gap-4 px-6 py-3">
                        <CheckCircle size={16} style={{ color: '#1FAE7A', flexShrink: 0 }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{m.titre}</p>
                          <p className="text-xs" style={{ color: '#5C6B7A' }}>{m.datePublication}</p>
                        </div>
                        <p className="font-bold text-sm flex-shrink-0" style={{ fontFamily: 'JetBrains Mono', color: '#1FAE7A' }}>
                          +{Math.round(m.budget * 0.9).toLocaleString('fr-FR')} F
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Retrait Mobile Money */}
            <div className="space-y-4">
              <div className="rounded-2xl p-5" style={{ backgroundColor: '#0B1F3A' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone size={18} style={{ color: '#F5A623' }} />
                  <h3 className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>Retrait Mobile Money</h3>
                </div>

                {withdrawn ? (
                  <div className="text-center py-4">
                    <CheckCircle size={36} className="mx-auto mb-2" style={{ color: '#1FAE7A' }} />
                    <p className="font-bold text-sm mb-1" style={{ color: '#1FAE7A', fontFamily: 'Space Grotesk' }}>Retrait initié !</p>
                    <p className="text-xs" style={{ color: 'rgba(247,243,236,0.5)' }}>Votre paiement MTN Money sera reçu sous 24h.</p>
                  </div>
                ) : (
                  <>
                    <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                      <p className="text-xs mb-1" style={{ color: 'rgba(247,243,236,0.45)' }}>Solde disponible</p>
                      <p className="text-2xl font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>
                        {Math.round(revenus).toLocaleString('fr-FR')} F
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(247,243,236,0.3)' }}>après commission 10%</p>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="rounded-xl p-3 flex items-center gap-3" style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1.5px solid #F5A623' }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#F5A623', color: '#0B1F3A' }}>MTN</div>
                        <div>
                          <p className="text-sm font-bold" style={{ color: '#F7F3EC' }}>MTN Money</p>
                          <p className="text-xs" style={{ color: 'rgba(247,243,236,0.4)', fontFamily: 'JetBrains Mono' }}>+229 97 00 00 01</p>
                        </div>
                        <div className="ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#F5A623' }}>
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F5A623' }} />
                        </div>
                      </div>
                      <div className="rounded-xl p-3 flex items-center gap-3" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#1FAE7A', color: '#fff' }}>MV</div>
                        <div>
                          <p className="text-sm font-bold" style={{ color: '#F7F3EC' }}>Moov Money</p>
                          <p className="text-xs" style={{ color: 'rgba(247,243,236,0.4)', fontFamily: 'JetBrains Mono' }}>Non configuré</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleWithdraw}
                      disabled={withdrawing || revenus === 0 || enAttente}
                      className="w-full py-3 rounded-xl font-bold text-sm transition-opacity"
                      style={{
                        backgroundColor: revenus > 0 && !enAttente ? '#F5A623' : '#5C6B7A',
                        color: '#0B1F3A',
                        fontFamily: 'Space Grotesk',
                        opacity: withdrawing || enAttente ? 0.6 : 1,
                        cursor: enAttente ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {withdrawing ? 'Traitement…' : enAttente ? 'Disponible après validation' : `Retirer ${Math.round(revenus).toLocaleString('fr-FR')} FCFA`}
                    </button>
                  </>
                )}
              </div>

              <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                <VerificationSeal size={64} variant="default" className="mx-auto mb-3" />
                <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Badge Expert</p>
                <p className="text-xs mt-1" style={{ color: '#5C6B7A' }}>Vérifié par TalentBJ · Développement</p>
                <button className="text-xs font-semibold mt-3" style={{ color: '#F5A623' }} onClick={() => navigate('/freelance/profil/edition')}>
                  Éditer mon profil →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
