import { useNavigate } from 'react-router-dom';
import { Users, Clock, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import { useMissionStore } from '../../store/missionStore';
import { useAuthStore } from '../../store/authStore';
import type { CandidatureSpontanee, Mission } from '../../types';

const STATUT_CONFIG: Record<CandidatureSpontanee['statut'], { label: string; bg: string; color: string }> = {
  en_attente: { label: 'En attente', bg: 'rgba(245,166,35,0.1)', color: '#F5A623' },
  acceptee: { label: 'Retenue !', bg: 'rgba(31,174,122,0.1)', color: '#1FAE7A' },
  non_retenue: { label: 'Non retenue', bg: '#F7F3EC', color: '#5C6B7A' },
};

export default function FreelanceCandidaturesPage() {
  const navigate = useNavigate();
  const { freelanceId } = useAuthStore();
  const { getCandidaturesByFreelanceId, getMissionById } = useMissionStore();

  const candidatures = freelanceId ? getCandidaturesByFreelanceId(freelanceId) : [];
  const active = candidatures.filter(c => c.statut === 'en_attente');
  const archived = candidatures.filter(c => c.statut !== 'en_attente');

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
      <DashboardSidebar />

      <div className="flex-1">
        <div style={{ backgroundColor: '#0B1F3A' }} className="px-8 pt-8 pb-16">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
            Mes candidatures
          </h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(247,243,236,0.5)' }}>
            Candidatures spontanées soumises aux missions ouvertes
          </p>
        </div>

        <div className="px-8 pb-16" style={{ marginTop: -48 }}>
          {active.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} style={{ color: '#F5A623' }} />
                <h2 className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  En attente de réponse
                </h2>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{ backgroundColor: '#F5A623', color: '#0B1F3A', fontFamily: 'JetBrains Mono' }}
                >
                  {active.length}
                </span>
              </div>
              <div className="space-y-4">
                {active.map(c => (
                  <CandidatureRow
                    key={c.id}
                    candidature={c}
                    getMissionById={getMissionById}
                    navigate={navigate}
                  />
                ))}
              </div>
            </div>
          )}

          {archived.length > 0 && (
            <div>
              <h2 className="font-bold mb-3" style={{ fontFamily: 'Space Grotesk', color: '#5C6B7A' }}>
                Historique
              </h2>
              <div className="space-y-3">
                {archived.map(c => (
                  <CandidatureRow
                    key={c.id}
                    candidature={c}
                    getMissionById={getMissionById}
                    navigate={navigate}
                    compact
                  />
                ))}
              </div>
            </div>
          )}

          {candidatures.length === 0 && (
            <div className="text-center py-20">
              <Users size={48} className="mx-auto mb-4" style={{ color: '#E8E4DC' }} />
              <p className="font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                Aucune candidature envoyée
              </p>
              <p className="text-sm mb-6" style={{ color: '#5C6B7A' }}>
                Parcourez les missions disponibles et soumettez votre première candidature.
              </p>
              <button
                onClick={() => navigate('/freelance/missions')}
                className="flex items-center gap-1.5 mx-auto text-sm font-semibold"
                style={{ color: '#F5A623' }}
              >
                Voir les missions <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CandidatureRow({
  candidature,
  getMissionById,
  navigate,
  compact,
}: {
  candidature: CandidatureSpontanee;
  getMissionById: (id: string) => Mission | undefined;
  navigate: ReturnType<typeof useNavigate>;
  compact?: boolean;
}) {
  const mission = getMissionById(candidature.missionId);
  const cfg = STATUT_CONFIG[candidature.statut];

  if (!mission) return null;

  return (
    <div
      className="rounded-2xl p-5 cursor-pointer transition-all hover:shadow-md"
      style={{
        backgroundColor: candidature.statut === 'acceptee' ? 'rgba(31,174,122,0.04)' : '#fff',
        border: candidature.statut === 'acceptee' ? '1.5px solid rgba(31,174,122,0.3)' : '1px solid #E8E4DC',
        boxShadow: '0 2px 8px rgba(11,31,58,0.04)',
      }}
      onClick={() => navigate(`/freelance/missions/${mission.id}`)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ backgroundColor: cfg.bg, color: cfg.color, fontFamily: 'Space Grotesk' }}
            >
              {candidature.statut === 'acceptee' ? <CheckCircle size={10} /> : candidature.statut === 'non_retenue' ? <XCircle size={10} /> : <Clock size={10} />}
              {cfg.label}
            </span>
          </div>
          <h3 className="font-bold text-sm mb-0.5" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
            {mission.titre}
          </h3>
          {!compact && (
            <p className="text-xs mb-2 line-clamp-2" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
              {candidature.message}
            </p>
          )}
          <p className="text-xs" style={{ color: '#5C6B7A' }}>
            Soumise le {new Date(candidature.dateSoumission).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-bold text-sm" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>
            {candidature.prixPropose.toLocaleString('fr-FR')} F
          </p>
          <p className="text-xs" style={{ color: '#5C6B7A' }}>{candidature.delaiPropose}</p>
          <ChevronRight size={14} className="ml-auto mt-2" style={{ color: '#5C6B7A' }} />
        </div>
      </div>
    </div>
  );
}
