import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle, XCircle, Clock, ChevronRight, Star, AlertTriangle } from 'lucide-react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import Button from '../../components/ui/Button';
import { useMissionStore } from '../../store/missionStore';
import { getFreelanceById } from '../../data/mock';
import type { Invitation } from '../../types';

const STATUT_CONFIG = {
  en_attente: { label: 'En attente', icon: Clock, bg: 'rgba(245,166,35,0.1)', color: '#F5A623' },
  acceptee_avec_proposition: { label: 'Proposition reçue', icon: CheckCircle, bg: 'rgba(31,174,122,0.1)', color: '#1FAE7A' },
  refusee: { label: 'Refusée', icon: XCircle, bg: '#F7F3EC', color: '#5C6B7A' },
};

export default function ClientInvitationsPage() {
  const { id: missionId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { getMissionById, getInvitationsByMissionId, requestConfirmation } = useMissionStore();

  const mission = missionId ? getMissionById(missionId) : undefined;
  const invitations = missionId ? getInvitationsByMissionId(missionId) : [];

  const [selectedInvitationId, setSelectedInvitationId] = useState<string | null>(null);
  const [assigning, setAssigning] = useState(false);
  const [assigned, setAssigned] = useState(false);

  const accepted = invitations.filter(i => i.statut === 'acceptee_avec_proposition');
  const pending = invitations.filter(i => i.statut === 'en_attente');
  const refused = invitations.filter(i => i.statut === 'refusee');

  // All refused → need repli (open candidatures)
  const allRefused = invitations.length > 0 && invitations.every(i => i.statut === 'refusee');

  async function handleAssign() {
    if (!missionId || !selectedInvitationId || !mission) return;
    const inv = invitations.find(i => i.id === selectedInvitationId);
    if (!inv) return;
    setAssigning(true);
    await new Promise(r => setTimeout(r, 900));
    requestConfirmation(missionId, inv.freelanceId, inv.prixPropose ?? mission.budget, inv.delaiPropose ?? mission.delai, 'invitation');
    setAssigning(false);
    setAssigned(true);
  }

  if (!mission) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
        <DashboardSidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="font-bold" style={{ color: '#0B1F3A' }}>Mission introuvable</p>
        </div>
      </div>
    );
  }

  if (assigned) {
    const inv = invitations.find(i => i.id === selectedInvitationId);
    const freelance = inv ? getFreelanceById(inv.freelanceId) : undefined;
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
        <DashboardSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div
            className="max-w-md w-full mx-6 p-10 rounded-3xl text-center"
            style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', boxShadow: '0 4px 24px rgba(11,31,58,0.08)' }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#FFF8EC' }}>
              <Clock size={32} style={{ color: '#F5A623' }} />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
              Proposition acceptée !
            </h2>
            <p className="text-sm mb-2" style={{ color: '#5C6B7A' }}>
              Vous avez sélectionné <strong>{freelance?.nom ?? 'le freelance'}</strong> pour "{mission.titre}".
            </p>
            <p className="text-sm mb-6 p-3 rounded-xl" style={{ color: '#0B1F3A', backgroundColor: '#FFF8EC', fontFamily: 'Inter' }}>
              En attente de la <strong>confirmation finale du freelance</strong>. Le paiement escrow sera disponible dès sa confirmation.
            </p>
            <div className="flex flex-col gap-3">
              <Button variant="primary" fullWidth onClick={() => navigate(`/client/mission/${missionId}`)}>
                Suivre la mission <ChevronRight size={15} />
              </Button>
              <Button variant="outline" fullWidth onClick={() => navigate('/client/dashboard')}>
                Tableau de bord
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
      <DashboardSidebar />

      <div className="flex-1">
        <div style={{ backgroundColor: '#0B1F3A' }} className="px-8 pt-6 pb-16">
          <button
            onClick={() => navigate('/client/dashboard')}
            className="flex items-center gap-2 text-sm mb-4 transition-opacity hover:opacity-70"
            style={{ color: 'rgba(247,243,236,0.5)' }}
          >
            <ArrowLeft size={15} /> Tableau de bord
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Mail size={20} style={{ color: '#F5A623' }} />
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
              Invitations — {mission.titre}
            </h1>
          </div>
          <p className="text-sm" style={{ color: 'rgba(247,243,236,0.5)' }}>
            {invitations.length} freelance{invitations.length > 1 ? 's' : ''} invité{invitations.length > 1 ? 's' : ''} · Budget : {mission.budget.toLocaleString('fr-FR')} FCFA
          </p>
        </div>

        <div className="px-8 pb-16 max-w-4xl" style={{ marginTop: -48 }}>

          {/* Repli alert — all refused */}
          {allRefused && (
            <div
              className="rounded-2xl p-5 mb-6 flex items-start gap-4"
              style={{ backgroundColor: '#FFF8EC', border: '2px solid #F5A623' }}
            >
              <AlertTriangle size={20} style={{ color: '#F5A623', flexShrink: 0, marginTop: 2 }} />
              <div>
                <p className="font-bold text-sm mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  Tous les freelances ont refusé votre invitation
                </p>
                <p className="text-sm mb-3" style={{ color: '#5C6B7A' }}>
                  Vous pouvez consulter les candidatures spontanées reçues ou laisser la mission ouverte pour de nouvelles candidatures.
                </p>
                <Button variant="primary" onClick={() => navigate(`/client/mission/${missionId}/candidatures`)}>
                  Voir les candidatures spontanées <ChevronRight size={15} />
                </Button>
              </div>
            </div>
          )}

          {/* Accepted proposals — comparison */}
          {accepted.length > 0 && (
            <div className="mb-6">
              <h2 className="font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                Propositions reçues — comparez et choisissez
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accepted.map(inv => (
                  <ProposalCard
                    key={inv.id}
                    invitation={inv}
                    selected={selectedInvitationId === inv.id}
                    onSelect={() => setSelectedInvitationId(inv.id === selectedInvitationId ? null : inv.id)}
                  />
                ))}
              </div>

              {selectedInvitationId && (
                <div className="mt-5 flex items-center gap-4">
                  <Button variant="primary" loading={assigning} onClick={handleAssign}>
                    Confirmer l'attribution <ChevronRight size={15} />
                  </Button>
                  <button
                    onClick={() => navigate(`/client/mission/${missionId}/candidatures`)}
                    className="text-sm font-semibold"
                    style={{ color: '#5C6B7A' }}
                  >
                    Voir aussi les candidatures spontanées →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Pending */}
          {pending.length > 0 && (
            <div className="mb-6">
              <h2 className="font-bold mb-3" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                En attente de réponse
              </h2>
              <div className="space-y-3">
                {pending.map(inv => <StatusCard key={inv.id} invitation={inv} statut="en_attente" />)}
              </div>
            </div>
          )}

          {/* Refused */}
          {refused.length > 0 && (
            <div>
              <h2 className="font-bold mb-3" style={{ fontFamily: 'Space Grotesk', color: '#5C6B7A' }}>
                Invitations refusées
              </h2>
              <div className="space-y-3">
                {refused.map(inv => <StatusCard key={inv.id} invitation={inv} statut="refusee" />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProposalCard({ invitation, selected, onSelect }: {
  invitation: Invitation;
  selected: boolean;
  onSelect: () => void;
}) {
  const freelance = getFreelanceById(invitation.freelanceId);
  const noteAvg = freelance && freelance.avis.length > 0
    ? (freelance.avis.reduce((s, a) => s + a.note, 0) / freelance.avis.length).toFixed(1)
    : null;

  return (
    <div
      onClick={onSelect}
      className="rounded-2xl p-5 cursor-pointer transition-all"
      style={{
        backgroundColor: selected ? '#F0FDF9' : '#fff',
        border: selected ? '2px solid #1FAE7A' : '1px solid #E8E4DC',
        boxShadow: selected ? '0 0 0 3px rgba(31,174,122,0.12)' : '0 2px 8px rgba(11,31,58,0.04)',
      }}
    >
      <div className="flex items-start gap-3 mb-4">
        {freelance && (
          <img
            src={freelance.photo}
            alt={freelance.nom}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
              {freelance?.nom ?? invitation.freelanceId}
            </p>
            {selected && <CheckCircle size={14} style={{ color: '#1FAE7A' }} />}
          </div>
          {noteAvg && (
            <div className="flex items-center gap-1">
              <Star size={11} style={{ color: '#F5A623', fill: '#F5A623' }} />
              <span className="text-xs font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#0B1F3A' }}>{noteAvg}</span>
              <span className="text-xs" style={{ color: '#5C6B7A' }}>({freelance?.avis.length})</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl p-3" style={{ backgroundColor: '#F7F3EC' }}>
          <p className="text-xs" style={{ color: '#5C6B7A' }}>Prix proposé</p>
          <p className="font-bold text-base" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>
            {invitation.prixPropose?.toLocaleString('fr-FR')} F
          </p>
        </div>
        <div className="rounded-xl p-3" style={{ backgroundColor: '#F7F3EC' }}>
          <p className="text-xs" style={{ color: '#5C6B7A' }}>Délai</p>
          <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
            {invitation.delaiPropose}
          </p>
        </div>
      </div>

      {invitation.message && (
        <p className="text-xs leading-relaxed line-clamp-3" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
          "{invitation.message}"
        </p>
      )}

      {freelance && (
        <div className="mt-3 flex flex-wrap gap-1">
          {freelance.competences.slice(0, 3).map(c => (
            <span key={c} className="px-2 py-0.5 rounded-md text-xs" style={{ backgroundColor: '#E8E4DC', color: '#5C6B7A' }}>{c}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusCard({ invitation, statut }: { invitation: Invitation; statut: Invitation['statut'] }) {
  const freelance = getFreelanceById(invitation.freelanceId);
  const cfg = STATUT_CONFIG[statut];
  const Icon = cfg.icon;

  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-4"
      style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}
    >
      {freelance && (
        <img src={freelance.photo} alt={freelance.nom} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
          {freelance?.nom ?? invitation.freelanceId}
        </p>
        <p className="text-xs" style={{ color: '#5C6B7A' }}>
          Invité le {new Date(invitation.dateEnvoi).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
        </p>
      </div>
      <span
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0"
        style={{ backgroundColor: cfg.bg, color: cfg.color, fontFamily: 'Space Grotesk' }}
      >
        <Icon size={11} />
        {cfg.label}
      </span>
    </div>
  );
}
