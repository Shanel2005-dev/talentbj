import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Clock, MapPin, CheckCircle, Lock, ChevronRight, AlertCircle, Mail, XCircle } from 'lucide-react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import MatchScoreBadge from '../../components/ui/MatchScoreBadge';
import Button from '../../components/ui/Button';
import { useMissionStore } from '../../store/missionStore';
import { useAuthStore } from '../../store/authStore';

const VERTICAL_LABELS: Record<string, string> = {
  developpement: 'Développement web & mobile',
  design: 'Design & UI/UX',
  marketing: 'Marketing digital & CM',
};

const VERTICAL_COLORS: Record<string, string> = {
  developpement: '#1E3A5F',
  design: '#2D1B4E',
  marketing: '#1A3A2E',
};

export default function FreelanceMissionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { statutVerification, freelanceId } = useAuthStore();
  const enAttente = statutVerification === 'en_attente';

  const { getMissionById, getInvitationsByMissionId, getCandidaturesByMissionId, submitCandidature, updateInvitationStatut } = useMissionStore();

  const mission = id ? getMissionById(id) : undefined;
  const invitations = id ? getInvitationsByMissionId(id) : [];
  const candidatures = id ? getCandidaturesByMissionId(id) : [];

  // Invitation for current freelance on this mission
  const myInvitation = freelanceId ? invitations.find(i => i.freelanceId === freelanceId) : undefined;
  // Already submitted candidature
  const myExistingCandidature = freelanceId ? candidatures.find(c => c.freelanceId === freelanceId) : undefined;

  const [showCandidatureForm, setShowCandidatureForm] = useState(false);
  const [prix, setPrix] = useState('');
  const [delai, setDelai] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Invitation response state
  const [showInviteResponse, setShowInviteResponse] = useState(false);
  const [invitePrix, setInvitePrix] = useState('');
  const [inviteDelai, setInviteDelai] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [inviteResponding, setInviteResponding] = useState(false);
  const [inviteResponseDone, setInviteResponseDone] = useState<'accepted' | 'refused' | null>(null);

  const score = 87;

  if (!mission) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
        <DashboardSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Mission introuvable</p>
            <button onClick={() => navigate('/freelance/missions')} className="text-sm font-semibold" style={{ color: '#F5A623' }}>
              ← Retour aux missions
            </button>
          </div>
        </div>
      </div>
    );
  }

  async function handleSubmitCandidature() {
    if (!mission || !freelanceId || !prix || !delai || message.length < 50) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    submitCandidature({
      id: `cs-${mission.id}-${freelanceId}-${Date.now()}`,
      missionId: mission.id,
      freelanceId,
      prixPropose: parseInt(prix, 10),
      delaiPropose: delai,
      message,
      statut: 'en_attente',
      dateSoumission: new Date().toISOString().slice(0, 10),
    });
    setSubmitting(false);
    setSubmitted(true);
  }

  async function handleAcceptInvitation() {
    if (!mission || !myInvitation || !invitePrix || !inviteDelai || inviteMessage.length < 30) return;
    setInviteResponding(true);
    await new Promise(r => setTimeout(r, 1000));
    updateInvitationStatut(myInvitation.id, 'acceptee_avec_proposition', {
      prixPropose: parseInt(invitePrix, 10),
      delaiPropose: inviteDelai,
      message: inviteMessage,
    });
    setInviteResponding(false);
    setInviteResponseDone('accepted');
  }

  async function handleRefuseInvitation() {
    if (!myInvitation) return;
    setInviteResponding(true);
    await new Promise(r => setTimeout(r, 600));
    updateInvitationStatut(myInvitation.id, 'refusee');
    setInviteResponding(false);
    setInviteResponseDone('refused');
  }

  const isInvited = !!myInvitation;
  const invitationAlreadyAnswered = myInvitation?.statut !== 'en_attente';

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
      <DashboardSidebar />

      <div className="flex-1">
        {/* Header */}
        <div style={{ backgroundColor: '#0B1F3A' }} className="px-8 pt-6 pb-16">
          <button
            onClick={() => navigate('/freelance/missions')}
            className="flex items-center gap-2 text-sm font-semibold mb-5 transition-opacity hover:opacity-70"
            style={{ color: 'rgba(247,243,236,0.5)' }}
          >
            <ArrowLeft size={15} /> Retour aux missions
          </button>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: VERTICAL_COLORS[mission.vertical] ?? '#1E3A5F',
                    color: '#F5A623',
                    fontFamily: 'Space Grotesk',
                  }}
                >
                  {VERTICAL_LABELS[mission.vertical] ?? mission.vertical}
                </span>
                {isInvited && (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: 'rgba(245,166,35,0.25)', color: '#F5A623' }}
                  >
                    <Mail size={11} /> Vous êtes invité
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
                {mission.titre}
              </h1>

              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(247,243,236,0.55)' }}>
                  <Clock size={13} /> {mission.delai}
                </span>
                <span className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(247,243,236,0.55)' }}>
                  <MapPin size={13} /> Bénin / Télétravail
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'rgba(31,174,122,0.2)', color: '#1FAE7A' }}>
                  {mission.statut === 'ouverte' ? 'Mission ouverte' : 'Invitation envoyée'}
                </span>
              </div>
            </div>

            <div className="flex-shrink-0 text-right">
              <p className="text-3xl font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>
                {mission.budget.toLocaleString('fr-FR')}
              </p>
              <p className="text-xs" style={{ color: 'rgba(247,243,236,0.4)' }}>FCFA</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-16" style={{ marginTop: -48 }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Main */}
            <div className="lg:col-span-2 space-y-5">

              {/* Score IA */}
              <div
                className="rounded-2xl px-5 py-4 flex items-center gap-4"
                style={{ backgroundColor: '#fff', border: '1.5px solid #F5A623', boxShadow: '0 4px 16px rgba(245,166,35,0.1)' }}
              >
                <MatchScoreBadge score={score} />
                <div>
                  <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                    Votre score de compatibilité avec cette mission
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#5C6B7A' }}>
                    Basé sur vos compétences, votre vertical et votre historique TalentBJ.
                  </p>
                </div>
              </div>

              {/* Invitation response section */}
              {isInvited && !invitationAlreadyAnswered && (
                <div
                  className="rounded-2xl p-6"
                  style={{ backgroundColor: '#FFF8EC', border: '2px solid #F5A623' }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <Mail size={20} style={{ color: '#F5A623', flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <p className="font-bold text-base" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                        Invitation du client — Répondez dans 48h
                      </p>
                      <p className="text-sm mt-1" style={{ color: '#5C6B7A' }}>
                        Le client vous a sélectionné parmi ses meilleurs matchs IA. Acceptez en proposant votre tarif et délai.
                      </p>
                    </div>
                  </div>

                  {inviteResponseDone === 'accepted' ? (
                    <div className="rounded-xl p-4 text-center" style={{ backgroundColor: 'rgba(31,174,122,0.1)', border: '1px solid rgba(31,174,122,0.3)' }}>
                      <CheckCircle size={28} className="mx-auto mb-2" style={{ color: '#1FAE7A' }} />
                      <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#1FAE7A' }}>Proposition envoyée !</p>
                      <p className="text-xs mt-1" style={{ color: '#5C6B7A' }}>Le client compare les propositions et reviendra vers vous.</p>
                    </div>
                  ) : inviteResponseDone === 'refused' ? (
                    <div className="rounded-xl p-4 text-center" style={{ backgroundColor: '#F7F3EC', border: '1px solid #E8E4DC' }}>
                      <XCircle size={28} className="mx-auto mb-2" style={{ color: '#5C6B7A' }} />
                      <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#5C6B7A' }}>Invitation refusée</p>
                      <p className="text-xs mt-1" style={{ color: '#5C6B7A' }}>Vous avez décliné cette invitation.</p>
                    </div>
                  ) : showInviteResponse ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold block mb-1" style={{ color: '#0B1F3A' }}>Votre prix (FCFA)</label>
                          <input
                            type="number"
                            value={invitePrix}
                            onChange={e => setInvitePrix(e.target.value)}
                            placeholder={`${mission.budget.toLocaleString('fr-FR')}`}
                            className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                            style={{ border: '1.5px solid #E8E4DC', fontFamily: 'JetBrains Mono', color: '#0B1F3A' }}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold block mb-1" style={{ color: '#0B1F3A' }}>Délai proposé</label>
                          <input
                            type="text"
                            value={inviteDelai}
                            onChange={e => setInviteDelai(e.target.value)}
                            placeholder="Ex: 2 semaines"
                            className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                            style={{ border: '1.5px solid #E8E4DC', fontFamily: 'Inter', color: '#0B1F3A' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold block mb-1" style={{ color: '#0B1F3A' }}>Message au client</label>
                        <textarea
                          value={inviteMessage}
                          onChange={e => setInviteMessage(e.target.value)}
                          rows={4}
                          placeholder="Présentez votre approche, vos références similaires et pourquoi vous êtes le bon choix..."
                          className="w-full rounded-xl px-3 py-2.5 text-sm outline-none resize-none"
                          style={{ border: '1.5px solid #E8E4DC', fontFamily: 'Inter', color: '#0B1F3A' }}
                        />
                        <p className="text-xs mt-0.5" style={{ color: inviteMessage.length < 30 ? '#9CA3AF' : '#1FAE7A' }}>
                          {inviteMessage.length}/30 caractères minimum
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="primary"
                          loading={inviteResponding}
                          disabled={!invitePrix || !inviteDelai || inviteMessage.length < 30}
                          onClick={handleAcceptInvitation}
                        >
                          Envoyer ma proposition <ChevronRight size={15} />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleRefuseInvitation}
                          loading={inviteResponding}
                        >
                          Refuser
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <Button variant="primary" onClick={() => setShowInviteResponse(true)}>
                        Accepter et proposer mon tarif <ChevronRight size={15} />
                      </Button>
                      <Button variant="outline" onClick={handleRefuseInvitation} loading={inviteResponding}>
                        Refuser l'invitation
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Already answered invitation */}
              {isInvited && invitationAlreadyAnswered && (
                <div
                  className="rounded-2xl px-5 py-4 flex items-center gap-3"
                  style={{
                    backgroundColor: myInvitation.statut === 'acceptee_avec_proposition' ? 'rgba(31,174,122,0.08)' : '#F7F3EC',
                    border: `1px solid ${myInvitation.statut === 'acceptee_avec_proposition' ? 'rgba(31,174,122,0.3)' : '#E8E4DC'}`,
                  }}
                >
                  {myInvitation.statut === 'acceptee_avec_proposition' ? (
                    <CheckCircle size={18} style={{ color: '#1FAE7A', flexShrink: 0 }} />
                  ) : (
                    <XCircle size={18} style={{ color: '#5C6B7A', flexShrink: 0 }} />
                  )}
                  <div>
                    <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                      {myInvitation.statut === 'acceptee_avec_proposition' ? 'Proposition envoyée' : 'Invitation refusée'}
                    </p>
                    {myInvitation.statut === 'acceptee_avec_proposition' && myInvitation.prixPropose && (
                      <p className="text-xs mt-0.5" style={{ color: '#5C6B7A' }}>
                        {myInvitation.prixPropose.toLocaleString('fr-FR')} FCFA · {myInvitation.delaiPropose}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                <h2 className="font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  Description du projet
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: '#374151', fontFamily: 'Inter' }}>
                  {mission.description}
                </p>
              </div>

              {/* Compétences requises */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                <h2 className="font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  Compétences requises
                </h2>
                <div className="flex flex-wrap gap-2">
                  {mission.competencesRequises.map(c => (
                    <span
                      key={c}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold"
                      style={{ backgroundColor: '#F7F3EC', color: '#0B1F3A', border: '1px solid #E8E4DC' }}
                    >
                      <CheckCircle size={12} style={{ color: '#1FAE7A' }} />
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Escrow */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#0B1F3A', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 className="font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
                  Paiement sécurisé par escrow
                </h2>
                <div className="space-y-3">
                  {[
                    { n: 1, label: 'Le client dépose le budget sur l\'escrow TalentBJ via Mobile Money' },
                    { n: 2, label: 'Vous réalisez la mission dans les conditions définies' },
                    { n: 3, label: 'Le client valide la livraison dans l\'espace mission' },
                    { n: 4, label: 'Les fonds sont libérés automatiquement — retrait MTN ou Moov' },
                  ].map(({ n, label }) => (
                    <div key={n} className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                        style={{ backgroundColor: 'rgba(245,166,35,0.2)', color: '#F5A623', fontFamily: 'JetBrains Mono' }}
                      >
                        {n}
                      </div>
                      <p className="text-sm" style={{ color: 'rgba(247,243,236,0.7)', fontFamily: 'Inter' }}>{label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <Lock size={13} style={{ color: '#1FAE7A' }} />
                  <p className="text-xs" style={{ color: '#1FAE7A' }}>Votre paiement est garanti avant de commencer la mission</p>
                </div>
              </div>
            </div>

            {/* Sidebar — CTA (only for open missions without invitation) */}
            {!isInvited && (
              <div className="space-y-4">
                <div className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#5C6B7A', fontFamily: 'Space Grotesk' }}>
                    Budget client
                  </p>
                  <p className="text-3xl font-bold mb-0.5" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>
                    {mission.budget.toLocaleString('fr-FR')} F
                  </p>
                  <p className="text-xs mb-4" style={{ color: '#5C6B7A' }}>
                    Paiement escrow — libéré à la validation
                  </p>

                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={13} style={{ color: '#5C6B7A' }} />
                    <span className="text-sm" style={{ color: '#0B1F3A' }}>{mission.delai}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-5">
                    <Briefcase size={13} style={{ color: '#5C6B7A' }} />
                    <span className="text-sm" style={{ color: '#0B1F3A' }}>
                      Publié le {new Date(mission.datePublication).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                    </span>
                  </div>

                  {/* CTA section */}
                  {submitted || myExistingCandidature ? (
                    <div className="rounded-xl p-4 text-center" style={{ backgroundColor: 'rgba(31,174,122,0.1)', border: '1px solid rgba(31,174,122,0.3)' }}>
                      <CheckCircle size={24} className="mx-auto mb-2" style={{ color: '#1FAE7A' }} />
                      <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#1FAE7A' }}>Candidature envoyée !</p>
                      <p className="text-xs mt-1" style={{ color: '#5C6B7A' }}>Le client examinera votre candidature.</p>
                    </div>
                  ) : enAttente ? (
                    <div className="rounded-xl p-4" style={{ backgroundColor: '#FFF8EC', border: '1.5px solid rgba(245,166,35,0.4)' }}>
                      <div className="flex items-start gap-3 mb-3">
                        <AlertCircle size={18} style={{ color: '#F5A623', flexShrink: 0, marginTop: 1 }} />
                        <div>
                          <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                            Profil en cours de vérification
                          </p>
                          <p className="text-xs mt-1" style={{ color: '#5C6B7A' }}>
                            Vous pourrez postuler dès que votre dossier sera validé (sous 24h).
                          </p>
                        </div>
                      </div>
                      <button
                        disabled
                        className="w-full py-3 rounded-xl font-bold text-sm"
                        style={{ backgroundColor: '#E8E4DC', color: '#5C6B7A', fontFamily: 'Space Grotesk', cursor: 'not-allowed' }}
                      >
                        Postuler à cette mission
                      </button>
                    </div>
                  ) : showCandidatureForm ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-bold block mb-1" style={{ color: '#0B1F3A' }}>Votre prix (FCFA)</label>
                          <input
                            type="number" value={prix} onChange={e => setPrix(e.target.value)}
                            placeholder={mission.budget.toString()}
                            className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                            style={{ border: '1.5px solid #E8E4DC', fontFamily: 'JetBrains Mono', color: '#0B1F3A' }}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold block mb-1" style={{ color: '#0B1F3A' }}>Délai</label>
                          <input
                            type="text" value={delai} onChange={e => setDelai(e.target.value)}
                            placeholder="Ex: 2 semaines"
                            className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                            style={{ border: '1.5px solid #E8E4DC', fontFamily: 'Inter', color: '#0B1F3A' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold block mb-1" style={{ color: '#0B1F3A' }}>Message</label>
                        <textarea
                          value={message} onChange={e => setMessage(e.target.value)} rows={3}
                          placeholder="Présentez votre approche..."
                          className="w-full rounded-xl px-3 py-2.5 text-sm outline-none resize-none"
                          style={{ border: '1.5px solid #E8E4DC', fontFamily: 'Inter', color: '#0B1F3A' }}
                        />
                        <p className="text-xs" style={{ color: message.length < 50 ? '#9CA3AF' : '#1FAE7A' }}>
                          {message.length}/50 min
                        </p>
                      </div>
                      <Button
                        variant="primary" size="lg" fullWidth loading={submitting}
                        disabled={!prix || !delai || message.length < 50}
                        onClick={handleSubmitCandidature}
                      >
                        Envoyer ma candidature
                      </Button>
                    </div>
                  ) : (
                    <Button variant="primary" size="lg" fullWidth onClick={() => setShowCandidatureForm(true)}>
                      Postuler à cette mission <ChevronRight size={16} />
                    </Button>
                  )}
                </div>

                {/* Tips */}
                <div className="rounded-2xl p-5" style={{ backgroundColor: '#FFF8EC', border: '1px solid rgba(245,166,35,0.25)' }}>
                  <p className="font-bold text-sm mb-3" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                    Conseils pour postuler
                  </p>
                  <div className="space-y-2">
                    {['Mentionnez vos réalisations similaires', 'Précisez votre disponibilité exacte', 'Proposez une approche concrète'].map(tip => (
                      <div key={tip} className="flex items-start gap-2">
                        <ChevronRight size={12} className="flex-shrink-0 mt-0.5" style={{ color: '#F5A623' }} />
                        <p className="text-xs" style={{ color: '#5C6B7A' }}>{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sidebar for invited missions — budget recap only */}
            {isInvited && (
              <div className="space-y-4">
                <div className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#5C6B7A', fontFamily: 'Space Grotesk' }}>
                    Budget client
                  </p>
                  <p className="text-3xl font-bold mb-0.5" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>
                    {mission.budget.toLocaleString('fr-FR')} F
                  </p>
                  <p className="text-xs mb-5" style={{ color: '#5C6B7A' }}>Budget de référence — vous pouvez proposer votre tarif</p>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={13} style={{ color: '#5C6B7A' }} />
                    <span className="text-sm" style={{ color: '#0B1F3A' }}>{mission.delai}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={13} style={{ color: '#5C6B7A' }} />
                    <span className="text-sm" style={{ color: '#0B1F3A' }}>
                      Publié le {new Date(mission.datePublication).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl p-5" style={{ backgroundColor: '#FFF8EC', border: '1px solid rgba(245,166,35,0.25)' }}>
                  <p className="font-bold text-sm mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                    Invitation prioritaire
                  </p>
                  <p className="text-xs" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
                    Le client vous a sélectionné via le matching IA. Votre réponse est prioritaire sur les candidatures spontanées.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
