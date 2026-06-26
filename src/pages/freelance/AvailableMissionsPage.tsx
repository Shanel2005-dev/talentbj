import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Star, Clock, Filter, Mail } from 'lucide-react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import MatchScoreBadge from '../../components/ui/MatchScoreBadge';
import { useMissionStore } from '../../store/missionStore';
import { useAuthStore } from '../../store/authStore';
import type { Mission } from '../../types';

const VERTICAL_LABELS: Record<string, string> = {
  developpement: 'Développement',
  design: 'Design',
  marketing: 'Marketing',
};

export default function AvailableMissionsPage() {
  const navigate = useNavigate();
  const { freelanceId } = useAuthStore();
  const { missions } = useMissionStore();
  const [filter, setFilter] = useState<'toutes' | 'recommandees' | 'invitations'>('toutes');

  // Show mission if:
  //  - statut === 'ouverte', OR
  //  - statut === 'invitation_envoyee' AND current freelance is in freelancesInvitesIds
  const visibleMissions = missions.filter(m => {
    if (m.statut === 'ouverte') return true;
    if (m.statut === 'invitation_envoyee' && freelanceId && m.freelancesInvitesIds?.includes(freelanceId)) return true;
    return false;
  });

  const invitedMissions = visibleMissions.filter(
    m => m.statut === 'invitation_envoyee' && freelanceId && m.freelancesInvitesIds?.includes(freelanceId)
  );
  const openMissions = visibleMissions.filter(m => m.statut === 'ouverte');
  const recommended = openMissions.slice(0, 4);

  const displayed = filter === 'recommandees' ? recommended
    : filter === 'invitations' ? invitedMissions
    : visibleMissions;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
      <DashboardSidebar />

      <div className="flex-1">
        <div style={{ backgroundColor: '#0B1F3A' }} className="px-8 pt-8 pb-16">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
            Missions disponibles
          </h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(247,243,236,0.5)' }}>
            Missions recommandées pour votre profil + toutes les missions ouvertes
          </p>
        </div>

        <div className="px-8 pb-16" style={{ marginTop: -48 }}>
          {/* Invitations prioritaires */}
          {invitedMissions.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Mail size={16} style={{ color: '#F5A623', fill: 'rgba(245,166,35,0.15)' }} />
                <h2 className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  Vous êtes invité — répondez dans 48h
                </h2>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{ backgroundColor: '#F5A623', color: '#0B1F3A', fontFamily: 'JetBrains Mono' }}
                >
                  {invitedMissions.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {invitedMissions.map(m => (
                  <MissionCard key={m.id} mission={m} navigate={navigate} invited />
                ))}
              </div>
            </div>
          )}

          {/* Missions recommandées */}
          {recommended.length > 0 && filter !== 'invitations' && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Star size={16} style={{ color: '#F5A623', fill: '#F5A623' }} />
                <h2 className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  Recommandées pour vous
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommended.map(m => (
                  <MissionCard key={m.id} mission={m} score={Math.floor(Math.random() * 20) + 78} navigate={navigate} highlighted />
                ))}
              </div>
            </div>
          )}

          {/* Filtre */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
              {filter === 'invitations' ? 'Mes invitations' : 'Toutes les missions ouvertes'}
            </h2>
            <div className="flex items-center gap-2">
              <Filter size={14} style={{ color: '#5C6B7A' }} />
              {(['toutes', 'recommandees', 'invitations'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-3 py-1 rounded-full text-xs font-bold transition-all"
                  style={{
                    backgroundColor: filter === f ? '#0B1F3A' : '#F7F3EC',
                    color: filter === f ? '#F5A623' : '#5C6B7A',
                    fontFamily: 'Space Grotesk',
                  }}
                >
                  {f === 'toutes' ? 'Toutes' : f === 'recommandees' ? 'Recommandées' : `Invitations${invitedMissions.length > 0 ? ` (${invitedMissions.length})` : ''}`}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {displayed.map(m => (
              <MissionCard
                key={m.id}
                mission={m}
                navigate={navigate}
                invited={freelanceId ? m.freelancesInvitesIds?.includes(freelanceId) : false}
              />
            ))}
          </div>

          {displayed.length === 0 && (
            <div className="text-center py-16">
              <Briefcase size={48} className="mx-auto mb-4" style={{ color: '#E8E4DC' }} />
              <p className="font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Aucune mission disponible</p>
              <p className="text-sm" style={{ color: '#5C6B7A' }}>Revenez bientôt — de nouvelles missions sont publiées chaque jour.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MissionCard({ mission, score, navigate, highlighted, invited }: {
  mission: Mission;
  score?: number;
  navigate: (path: string) => void;
  highlighted?: boolean;
  invited?: boolean;
}) {
  return (
    <div
      className="rounded-2xl p-5 transition-all cursor-pointer"
      style={{
        backgroundColor: '#fff',
        border: invited ? '2px solid #F5A623' : highlighted ? '1.5px solid #F5A623' : '1px solid #E8E4DC',
        boxShadow: invited || highlighted ? '0 4px 16px rgba(245,166,35,0.12)' : '0 2px 8px rgba(11,31,58,0.04)',
      }}
      onClick={() => navigate(`/freelance/missions/${mission.id}`)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ backgroundColor: '#F7F3EC', color: '#5C6B7A', fontFamily: 'Space Grotesk' }}
            >
              {VERTICAL_LABELS[mission.vertical] || mission.vertical}
            </span>
            {score && <MatchScoreBadge score={score} />}
            {invited && (
              <span
                className="px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1"
                style={{ backgroundColor: '#F5A623', color: '#0B1F3A', fontFamily: 'Space Grotesk' }}
              >
                <Mail size={10} />
                Vous êtes invité
              </span>
            )}
          </div>
          <h3 className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
            {mission.titre}
          </h3>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-bold text-sm" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>
            {mission.budget.toLocaleString('fr-FR')} F
          </p>
          <div className="flex items-center gap-1 justify-end mt-1">
            <Clock size={10} style={{ color: '#5C6B7A' }} />
            <span className="text-xs" style={{ color: '#5C6B7A' }}>{mission.delai}</span>
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: '#5C6B7A' }}>
        {mission.description}
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        {mission.competencesRequises.slice(0, 4).map(c => (
          <span key={c} className="px-2 py-0.5 rounded-lg text-xs" style={{ backgroundColor: '#F7F3EC', color: '#0B1F3A', fontFamily: 'Inter' }}>
            {c}
          </span>
        ))}
        {mission.competencesRequises.length > 4 && (
          <span className="text-xs" style={{ color: '#5C6B7A' }}>+{mission.competencesRequises.length - 4}</span>
        )}
      </div>
    </div>
  );
}
