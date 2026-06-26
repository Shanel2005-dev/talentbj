import { useNavigate } from 'react-router-dom';
import { Mail, Clock, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import { useMissionStore } from '../../store/missionStore';
import { useAuthStore } from '../../store/authStore';
import type { Invitation, Mission } from '../../types';

const STATUT_LABELS: Record<Invitation['statut'], string> = {
  en_attente: 'En attente de réponse',
  acceptee_avec_proposition: 'Proposition envoyée',
  refusee: 'Refusée',
};

const STATUT_COLORS: Record<Invitation['statut'], { bg: string; color: string }> = {
  en_attente: { bg: 'rgba(245,166,35,0.1)', color: '#F5A623' },
  acceptee_avec_proposition: { bg: 'rgba(31,174,122,0.1)', color: '#1FAE7A' },
  refusee: { bg: '#F7F3EC', color: '#5C6B7A' },
};

export default function FreelanceInvitationsPage() {
  const navigate = useNavigate();
  const { freelanceId } = useAuthStore();
  const { getInvitationsByFreelanceId, getMissionById } = useMissionStore();

  const invitations = freelanceId ? getInvitationsByFreelanceId(freelanceId) : [];
  const pending = invitations.filter(i => i.statut === 'en_attente');
  const answered = invitations.filter(i => i.statut !== 'en_attente');

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
      <DashboardSidebar />

      <div className="flex-1">
        <div style={{ backgroundColor: '#0B1F3A' }} className="px-8 pt-8 pb-16">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
            Mes invitations
          </h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(247,243,236,0.5)' }}>
            Les clients vous ont sélectionné via le matching IA — répondez sous 48h.
          </p>
        </div>

        <div className="px-8 pb-16" style={{ marginTop: -48 }}>
          {/* En attente */}
          {pending.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Mail size={16} style={{ color: '#F5A623' }} />
                <h2 className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  À traiter
                </h2>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{ backgroundColor: '#F5A623', color: '#0B1F3A', fontFamily: 'JetBrains Mono' }}
                >
                  {pending.length}
                </span>
              </div>
              <div className="space-y-4">
                {pending.map(inv => (
                  <InvitationCard key={inv.id} invitation={inv} getMissionById={getMissionById} navigate={navigate} />
                ))}
              </div>
            </div>
          )}

          {/* Traitées */}
          {answered.length > 0 && (
            <div>
              <h2 className="font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                Historique
              </h2>
              <div className="space-y-3">
                {answered.map(inv => (
                  <InvitationCard key={inv.id} invitation={inv} getMissionById={getMissionById} navigate={navigate} compact />
                ))}
              </div>
            </div>
          )}

          {invitations.length === 0 && (
            <div className="text-center py-20">
              <Mail size={48} className="mx-auto mb-4" style={{ color: '#E8E4DC' }} />
              <p className="font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                Aucune invitation pour l'instant
              </p>
              <p className="text-sm" style={{ color: '#5C6B7A' }}>
                Complétez votre profil pour apparaître dans les résultats de matching IA des clients.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InvitationCard({
  invitation,
  getMissionById,
  navigate,
  compact,
}: {
  invitation: Invitation;
  getMissionById: (id: string) => Mission | undefined;
  navigate: ReturnType<typeof useNavigate>;
  compact?: boolean;
}) {
  const mission = getMissionById(invitation.missionId);
  const statut = STATUT_COLORS[invitation.statut];

  if (!mission) return null;

  return (
    <div
      className="rounded-2xl p-5 cursor-pointer transition-all hover:shadow-md"
      style={{
        backgroundColor: '#fff',
        border: invitation.statut === 'en_attente' ? '2px solid #F5A623' : '1px solid #E8E4DC',
        boxShadow: invitation.statut === 'en_attente' ? '0 4px 16px rgba(245,166,35,0.1)' : '0 2px 8px rgba(11,31,58,0.04)',
      }}
      onClick={() => navigate(`/freelance/missions/${mission.id}`)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ backgroundColor: statut.bg, color: statut.color, fontFamily: 'Space Grotesk' }}
            >
              {invitation.statut === 'acceptee_avec_proposition' ? (
                <span className="flex items-center gap-1"><CheckCircle size={10} /> {STATUT_LABELS[invitation.statut]}</span>
              ) : invitation.statut === 'refusee' ? (
                <span className="flex items-center gap-1"><XCircle size={10} /> {STATUT_LABELS[invitation.statut]}</span>
              ) : (
                <span className="flex items-center gap-1"><Clock size={10} /> {STATUT_LABELS[invitation.statut]}</span>
              )}
            </span>
          </div>
          <h3 className="font-bold text-sm mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
            {mission.titre}
          </h3>
          {!compact && (
            <p className="text-xs line-clamp-2 mb-2" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
              {mission.description}
            </p>
          )}
          <p className="text-xs" style={{ color: '#5C6B7A' }}>
            Invité le {new Date(invitation.dateEnvoi).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
            {invitation.dateReponse && ` · Répondu le ${new Date(invitation.dateReponse).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}`}
          </p>
          {invitation.statut === 'acceptee_avec_proposition' && invitation.prixPropose && (
            <p className="text-xs font-bold mt-1" style={{ fontFamily: 'JetBrains Mono', color: '#1FAE7A' }}>
              Votre proposition : {invitation.prixPropose.toLocaleString('fr-FR')} FCFA · {invitation.delaiPropose}
            </p>
          )}
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-bold text-sm" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>
            {mission.budget.toLocaleString('fr-FR')} F
          </p>
          {invitation.statut === 'en_attente' && (
            <div className="flex items-center gap-1 mt-2" style={{ color: '#F5A623' }}>
              <span className="text-xs font-bold">Répondre</span>
              <ChevronRight size={12} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
