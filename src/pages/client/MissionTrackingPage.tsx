import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, CheckCircle, AlertCircle, AlertTriangle, CreditCard, ChevronRight, Mail, Clock, Search } from 'lucide-react';
import { joursRestantsAvantLiberationAuto } from '../../utils/escrowDelay';
import EscrowTimeline from '../../components/ui/EscrowTimeline';
import Button from '../../components/ui/Button';
import { useMissionStore } from '../../store/missionStore';
import { getFreelanceById } from '../../data/mock';

const MOCK_MESSAGES = [
  { auteur: 'Koffi Mensah', role: 'freelance', avatar: 'https://picsum.photos/seed/f01/40', date: '2025-01-12 09:15', text: 'Bonjour, j\'ai bien reçu le brief. Je commence par la structure de la base de données et l\'architecture Django. Je vous partage mon avancement en fin de semaine.' },
  { auteur: 'Vous', role: 'client', avatar: 'https://picsum.photos/seed/cli1/40', date: '2025-01-12 10:30', text: 'Parfait, merci. N\'oubliez pas d\'intégrer le paiement MTN Money selon les specs. Le module Moov est prioritaire.' },
  { auteur: 'Koffi Mensah', role: 'freelance', avatar: 'https://picsum.photos/seed/f01/40', date: '2025-01-14 16:45', text: 'API Django en place. Voici un aperçu du dashboard admin. J\'intègre le Mobile Money cette semaine.' },
];

export default function MissionTrackingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMissionById, getInvitationsByMissionId, getCandidaturesByMissionId, validateMission } = useMissionStore();
  const mission = id ? getMissionById(id) : undefined;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [validating, setValidating] = useState(false);
  const [litigeOuvert, setLitigeOuvert] = useState(false);

  if (!mission) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F3EC' }}>
        <p style={{ color: '#0B1F3A' }}>Mission introuvable</p>
      </div>
    );
  }

  const freelance = mission.freelanceId ? getFreelanceById(mission.freelanceId) : null;
  const invitations = id ? getInvitationsByMissionId(id) : [];
  const pendingCount = invitations.filter(i => i.statut === 'en_attente').length;
  const acceptedCount = invitations.filter(i => i.statut === 'acceptee_avec_proposition').length;
  const candidaturesPending = id ? getCandidaturesByMissionId(id).filter(c => c.statut === 'en_attente').length : 0;

  const isOuverte = mission.statut === 'ouverte';
  const isInvitationEnvoyee = mission.statut === 'invitation_envoyee';
  const isEnAttenteConfirmation = mission.statut === 'en_attente_confirmation_freelance';
  const isAttribuee = mission.statut === 'attribuee';
  const showMessaging = ['en_cours', 'livree', 'validee'].includes(mission.statut);

  const etapes = mission.etapesEscrow;

  function handleSend() {
    if (!message.trim()) return;
    setMessages(prev => [...prev, {
      auteur: 'Vous', role: 'client',
      avatar: 'https://picsum.photos/seed/cli1/40',
      date: new Date().toLocaleString('fr-FR'),
      text: message,
    }]);
    setMessage('');
  }

  async function handleValidate() {
    if (!id) return;
    setValidating(true);
    await new Promise(r => setTimeout(r, 1500));
    validateMission(id);
    setValidating(false);
  }

  const isLivree = mission.statut === 'livree' || mission.statut === 'validee';

  return (
    <div style={{ backgroundColor: '#F7F3EC', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#0B1F3A', paddingBottom: 48 }}>
        <div className="max-w-5xl mx-auto px-6 pt-10 pb-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm mb-4" style={{ color: 'rgba(247,243,236,0.5)' }}>
            <ChevronLeft size={16} /> Retour
          </button>
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
            {mission.titre}
          </h1>
          <p style={{ color: 'rgba(247,243,236,0.5)', fontFamily: 'JetBrains Mono', fontSize: 13 }}>
            Budget : {mission.budget.toLocaleString('fr-FR')} FCFA · Délai : {mission.delai}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-16" style={{ marginTop: -32 }}>

        {/* ── Statut : ouverte ── */}
        {isOuverte && (
          <div className="space-y-4">
            {/* Candidatures spontanées reçues */}
            {candidaturesPending > 0 && (
              <div
                className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between"
                style={{ backgroundColor: '#ECFDF5', border: '2px solid #1FAE7A', boxShadow: '0 4px 16px rgba(31,174,122,0.12)' }}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle size={22} style={{ color: '#1FAE7A', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                      {candidaturesPending} freelance{candidaturesPending > 1 ? 's sont intéressés' : ' est intéressé'} par votre mission !
                    </p>
                    <p className="text-sm" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
                      Des freelances ont postulé spontanément. Consultez leurs propositions et choisissez le meilleur profil.
                    </p>
                  </div>
                </div>
                <Button variant="primary" onClick={() => navigate(`/client/mission/${mission.id}/candidatures`)}>
                  Voir les candidatures <ChevronRight size={15} />
                </Button>
              </div>
            )}

            {/* Invite via matching */}
            <div
              className="rounded-2xl p-8 flex flex-col items-center text-center"
              style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', boxShadow: '0 4px 20px rgba(11,31,58,0.06)' }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FFF8EC' }}>
                <Search size={24} style={{ color: '#F5A623' }} />
              </div>
              <h2 className="text-lg font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                {candidaturesPending > 0 ? 'Invitez aussi vos freelances préférés' : 'Mission publiée — invitez des freelances'}
              </h2>
              <p className="text-sm mb-6 max-w-md" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
                {candidaturesPending > 0
                  ? 'Vous pouvez également inviter jusqu\'à 2 freelances recommandés par notre moteur de matching IA.'
                  : 'Votre besoin est en ligne. Invitez jusqu\'à 2 freelances recommandés par notre moteur de matching pour recevoir leurs propositions.'}
              </p>
              <Button
                variant={candidaturesPending > 0 ? 'outline' : 'primary'}
                onClick={() => navigate('/client/resultats', {
                  state: {
                    description: mission.description,
                    vertical: mission.vertical,
                    budget: mission.budget || undefined,
                    delai: mission.delai || undefined,
                    missionId: mission.id,
                  }
                })}
              >
                Trouver des freelances <ChevronRight size={15} />
              </Button>
            </div>
          </div>
        )}

        {/* ── Statut : invitation_envoyee ── */}
        {isInvitationEnvoyee && (
          <div className="space-y-4">
            {acceptedCount > 0 ? (
              <div
                className="rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between"
                style={{ backgroundColor: '#ECFDF5', border: '2px solid #1FAE7A' }}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle size={22} style={{ color: '#1FAE7A', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                      {acceptedCount} proposition{acceptedCount > 1 ? 's' : ''} reçue{acceptedCount > 1 ? 's' : ''} !
                    </p>
                    <p className="text-sm" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
                      Comparez les offres et choisissez le freelance qui correspond le mieux à votre projet.
                    </p>
                  </div>
                </div>
                <Button variant="primary" onClick={() => navigate(`/client/mission/${mission.id}/invitations`)}>
                  Voir les propositions <ChevronRight size={15} />
                </Button>
              </div>
            ) : (
              <div
                className="rounded-2xl p-6 flex items-start gap-4"
                style={{ backgroundColor: '#FFF8EC', border: '2px solid rgba(245,166,35,0.4)' }}
              >
                <Clock size={22} style={{ color: '#F5A623', flexShrink: 0, marginTop: 2 }} />
                <div className="flex-1">
                  <p className="font-bold text-sm mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                    En attente de réponse
                  </p>
                  <p className="text-sm mb-4" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
                    {pendingCount} freelance{pendingCount > 1 ? 's invités' : ' invité'} — réponse attendue sous 48h.
                    Dès qu'une proposition est reçue, vous pourrez la consulter ici.
                  </p>
                  <Button variant="outline" onClick={() => navigate(`/client/mission/${mission.id}/invitations`)}>
                    <Mail size={14} /> Suivi des invitations
                  </Button>
                </div>
              </div>
            )}

            <div className="rounded-2xl p-5" style={{ backgroundColor: '#0B1F3A' }}>
              <h3 className="font-bold text-sm mb-3" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>Détails de la mission</h3>
              {[
                { label: 'Budget', val: `${mission.budget.toLocaleString('fr-FR')} FCFA` },
                { label: 'Délai', val: mission.delai },
                { label: 'Publié le', val: mission.datePublication },
                { label: 'Statut', val: 'Invitation envoyée' },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-xs" style={{ color: 'rgba(247,243,236,0.45)' }}>{label}</span>
                  <span className="text-xs font-bold" style={{ color: '#F5A623', fontFamily: 'JetBrains Mono' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Statut : en_attente_confirmation_freelance ── */}
        {isEnAttenteConfirmation && (
          <div className="space-y-4">
            <div
              className="rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-4 justify-between"
              style={{ backgroundColor: '#FFF8EC', border: '2px solid #F5A623', boxShadow: '0 4px 16px rgba(245,166,35,0.12)' }}
            >
              <div className="flex items-start gap-3 flex-1">
                <Clock size={22} style={{ color: '#F5A623', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p className="font-bold text-sm mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                    En attente de la confirmation du freelance
                  </p>
                  <p className="text-sm mb-3" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
                    Vous avez accepté la proposition de <strong>{freelance?.nom ?? 'votre freelance'}</strong>.
                    Il doit confirmer son engagement avant que le paiement escrow ne soit disponible.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="rounded-xl px-4 py-2" style={{ backgroundColor: 'rgba(245,166,35,0.1)' }}>
                      <p className="text-xs" style={{ color: '#5C6B7A' }}>Prix convenu</p>
                      <p className="font-bold text-sm" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>
                        {(mission.prixFinal ?? mission.budget).toLocaleString('fr-FR')} FCFA
                      </p>
                    </div>
                    <div className="rounded-xl px-4 py-2" style={{ backgroundColor: 'rgba(245,166,35,0.1)' }}>
                      <p className="text-xs" style={{ color: '#5C6B7A' }}>Délai convenu</p>
                      <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                        {mission.delaiFinal ?? mission.delai}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {freelance && (
                <div className="flex items-center gap-3 rounded-xl p-3 flex-shrink-0" style={{ backgroundColor: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)' }}>
                  <img src={freelance.photo} alt={freelance.nom} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{freelance.nom}</p>
                    <p className="text-xs" style={{ color: '#5C6B7A' }}>En attente de réponse</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 rounded-2xl p-5" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                <h3 className="font-bold text-sm mb-3" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Description</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>{mission.description}</p>
              </div>
              <div className="rounded-2xl p-5" style={{ backgroundColor: '#0B1F3A' }}>
                <h3 className="font-bold text-sm mb-3" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>Détails</h3>
                {[
                  { label: 'Freelance', val: freelance?.nom ?? '—' },
                  { label: 'Prix final', val: `${(mission.prixFinal ?? mission.budget).toLocaleString('fr-FR')} FCFA` },
                  { label: 'Délai final', val: mission.delaiFinal ?? mission.delai },
                  { label: 'Statut', val: 'Attente confirmation' },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-xs" style={{ color: 'rgba(247,243,236,0.45)' }}>{label}</span>
                    <span className="text-xs font-bold" style={{ color: '#F5A623', fontFamily: 'JetBrains Mono' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Statut : attribuee ── paiement requis */}
        {isAttribuee && (
          <div className="space-y-4">
            <div
              className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between"
              style={{ backgroundColor: '#FFF8EC', border: '2px solid #F5A623', boxShadow: '0 4px 16px rgba(245,166,35,0.15)' }}
            >
              <div className="flex items-start gap-3">
                <CreditCard size={20} style={{ color: '#F5A623', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p className="font-bold text-sm mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                    Action requise — Déposez le budget escrow
                  </p>
                  <p className="text-sm" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
                    {freelance?.nom ?? 'Le freelance'} a accepté la mission.
                    Déposez <strong style={{ color: '#F5A623', fontFamily: 'JetBrains Mono' }}>{mission.budget.toLocaleString('fr-FR')} FCFA</strong> en escrow pour qu'il puisse démarrer.
                  </p>
                </div>
              </div>
              <Button variant="primary" onClick={() => navigate(`/client/mission/${mission.id}/payer`)}>
                Payer maintenant <ChevronRight size={15} />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 rounded-2xl p-5" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                <h3 className="font-bold text-sm mb-3" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Description</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>{mission.description}</p>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl p-5" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                  <h3 className="font-bold text-sm mb-4" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Statut escrow</h3>
                  <EscrowTimeline etapes={etapes} />
                </div>
                <div className="rounded-2xl p-5" style={{ backgroundColor: '#0B1F3A' }}>
                  <h3 className="font-bold text-sm mb-3" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>Détails</h3>
                  {[
                    { label: 'Freelance', val: freelance?.nom ?? '—' },
                    { label: 'Budget', val: `${mission.budget.toLocaleString('fr-FR')} FCFA` },
                    { label: 'Délai', val: mission.delai },
                    { label: 'Statut', val: 'Attribuée' },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex justify-between py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="text-xs" style={{ color: 'rgba(247,243,236,0.45)' }}>{label}</span>
                      <span className="text-xs font-bold" style={{ color: '#F5A623', fontFamily: 'JetBrains Mono' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Statut : en_cours / livree / validee ── messagerie complète */}
        {showMessaging && (
          <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left — messagerie */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', boxShadow: '0 4px 20px rgba(11,31,58,0.06)' }}>
                {freelance && (
                  <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid #F7F3EC', backgroundColor: '#FEFDFB' }}>
                    <img src={freelance.photo} className="w-10 h-10 rounded-xl object-cover" alt={freelance.nom} />
                    <div>
                      <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{freelance.nom}</p>
                      <p className="text-xs flex items-center gap-1" style={{ color: '#1FAE7A' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" /> En ligne
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-5 space-y-5 overflow-y-auto" style={{ minHeight: 320, maxHeight: 420 }}>
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === 'client' ? 'flex-row-reverse' : ''}`}>
                      <img src={msg.avatar} className="w-8 h-8 rounded-full object-cover flex-shrink-0" alt={msg.auteur} />
                      <div className={`max-w-xs ${msg.role === 'client' ? 'items-end' : 'items-start'} flex flex-col`}>
                        <div
                          className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
                          style={{
                            backgroundColor: msg.role === 'client' ? '#0B1F3A' : '#F7F3EC',
                            color: msg.role === 'client' ? '#F7F3EC' : '#0B1F3A',
                            borderRadius: msg.role === 'client' ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
                          }}
                        >
                          {msg.text}
                        </div>
                        <p className="text-xs mt-1" style={{ color: '#9CA3AF', fontFamily: 'JetBrains Mono', fontSize: 10 }}>
                          {msg.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 p-4" style={{ borderTop: '1px solid #F7F3EC' }}>
                  <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Votre message..."
                    className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none"
                    style={{ backgroundColor: '#F7F3EC', border: '1px solid #E8E4DC', color: '#0B1F3A', fontFamily: 'Inter' }}
                  />
                  <button
                    onClick={handleSend}
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-80"
                    style={{ backgroundColor: '#F5A623' }}
                  >
                    <Send size={16} style={{ color: '#0B1F3A' }} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right — escrow + infos */}
            <div className="space-y-4">
              <div className="rounded-2xl p-5" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', boxShadow: '0 4px 20px rgba(11,31,58,0.06)' }}>
                <h2 className="font-bold text-sm mb-4" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  Statut des fonds escrow
                </h2>
                <EscrowTimeline etapes={etapes} />
              </div>

              {/* Compte à rebours libération automatique */}
              {mission.statut === 'livree' && mission.dateLivraison && (() => {
                const jours = joursRestantsAvantLiberationAuto(mission.dateLivraison);
                const isOverdue = jours === 0;
                const isUrgent = jours <= 2 && !isOverdue;
                const colors = isOverdue
                  ? { bg: '#FEF2F2', border: 'rgba(185,28,28,0.25)', text: '#B91C1C' }
                  : isUrgent
                  ? { bg: '#FFF8EC', border: 'rgba(245,166,35,0.4)', text: '#F5A623' }
                  : { bg: 'rgba(92,107,122,0.06)', border: 'rgba(92,107,122,0.2)', text: '#5C6B7A' };
                return (
                  <div className="rounded-2xl p-4" style={{ backgroundColor: colors.bg, border: `1.5px solid ${colors.border}` }}>
                    {isOverdue ? (
                      <>
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle size={14} style={{ color: '#B91C1C', flexShrink: 0 }} />
                          <p className="text-xs font-bold" style={{ fontFamily: 'Space Grotesk', color: '#B91C1C' }}>
                            Délai de validation dépassé
                          </p>
                        </div>
                        <p className="text-xs mb-3 leading-relaxed" style={{ color: '#5C6B7A' }}>
                          Le délai de 7 jours est écoulé. Validez le travail, ou ouvrez un litige si vous avez un problème avec la livraison.
                        </p>
                        {litigeOuvert ? (
                          <div className="rounded-xl px-3 py-2" style={{ backgroundColor: '#ECFDF5', border: '1px solid rgba(31,174,122,0.3)' }}>
                            <p className="text-xs font-semibold" style={{ color: '#1FAE7A', fontFamily: 'Space Grotesk' }}>
                              Litige ouvert — notre équipe vous contacte sous 24h.
                            </p>
                          </div>
                        ) : (
                          <Button variant="outline" size="sm" fullWidth onClick={() => setLitigeOuvert(true)}>
                            <AlertTriangle size={12} /> Ouvrir un litige
                          </Button>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-semibold" style={{ color: '#5C6B7A', fontFamily: 'Space Grotesk' }}>
                            Libération automatique dans
                          </p>
                          <Clock size={12} style={{ color: colors.text }} />
                        </div>
                        <p className="font-bold mb-1" style={{ fontFamily: 'JetBrains Mono', color: colors.text, fontSize: 28, lineHeight: 1 }}>
                          {jours}j
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: '#5C6B7A' }}>
                          Si vous ne réagissez pas, les fonds seront automatiquement libérés au freelance dans {jours} jour{jours > 1 ? 's' : ''} — pour le protéger contre l'inaction du client.
                        </p>
                      </>
                    )}
                  </div>
                );
              })()}

              {isLivree && (
                <div
                  className="rounded-2xl p-5"
                  style={{
                    backgroundColor: mission.statut === 'validee' ? '#ECFDF5' : '#FFF8EC',
                    border: `1.5px solid ${mission.statut === 'validee' ? '#1FAE7A' : '#F5A623'}`,
                  }}
                >
                  {mission.statut === 'validee' ? (
                    <div className="text-center">
                      <CheckCircle size={32} className="mx-auto mb-2" style={{ color: '#1FAE7A' }} />
                      <p className="font-bold text-sm mb-1" style={{ fontFamily: 'Space Grotesk', color: '#1FAE7A' }}>
                        Fonds libérés !
                      </p>
                      <p className="text-xs" style={{ color: '#5C6B7A' }}>
                        {mission.budget.toLocaleString('fr-FR')} FCFA transférés au freelance via Mobile Money.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start gap-2 mb-4">
                        <AlertCircle size={16} style={{ color: '#F5A623', flexShrink: 0, marginTop: 2 }} />
                        <p className="text-sm" style={{ color: '#0B1F3A' }}>
                          Le freelance a livré le travail. Vérifiez les livrables avant de valider.
                        </p>
                      </div>
                      <Button variant="primary" fullWidth loading={validating} onClick={handleValidate}>
                        Valider & libérer les fonds
                      </Button>
                    </>
                  )}
                </div>
              )}

              <div className="rounded-2xl p-5" style={{ backgroundColor: '#0B1F3A' }}>
                <h3 className="font-bold text-sm mb-3" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>Détails</h3>
                {[
                  { label: 'Budget', val: `${mission.budget.toLocaleString('fr-FR')} FCFA` },
                  { label: 'Délai', val: mission.delai },
                  { label: 'Publié le', val: mission.datePublication },
                  { label: 'Statut', val: mission.statut },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-xs" style={{ color: 'rgba(247,243,236,0.45)' }}>{label}</span>
                    <span className="text-xs font-bold" style={{ color: '#F5A623', fontFamily: 'JetBrains Mono' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer libération automatique */}
          {['livree', 'en_cours'].includes(mission.statut) && (
            <p className="text-xs text-center px-4" style={{ color: '#9CA3AF', fontFamily: 'Inter' }}>
              Le délai de libération automatique est indicatif dans cette version de démonstration. En production, la libération automatique sera gérée par un système de tâches planifiées côté serveur.
            </p>
          )}
          </div>
        )}
      </div>
    </div>
  );
}
