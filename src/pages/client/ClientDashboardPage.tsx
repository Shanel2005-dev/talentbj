import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, TrendingUp, Clock, CheckCircle, Briefcase, Mail, ChevronRight, Users } from 'lucide-react';
import EscrowTimeline from '../../components/ui/EscrowTimeline';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import Button from '../../components/ui/Button';
import { useMissionStore } from '../../store/missionStore';
import { useAuthStore } from '../../store/authStore';

const STATUT_LABELS: Record<string, string> = {
  ouverte: 'Ouverte', invitation_envoyee: 'Invitation envoyée',
  en_attente_confirmation_freelance: 'Attente confirmation',
  attribuee: 'Attribuée', en_cours: 'En cours', livree: 'Livrée', validee: 'Validée',
};
const STATUT_COLORS: Record<string, { bg: string; text: string }> = {
  ouverte: { bg: '#FFF8EC', text: '#F5A623' },
  invitation_envoyee: { bg: '#EFF6FF', text: '#3B82F6' },
  en_attente_confirmation_freelance: { bg: '#FEF3C7', text: '#D97706' },
  attribuee: { bg: '#FFF0F9', text: '#DB2777' },
  en_cours: { bg: '#EFF6FF', text: '#3B82F6' },
  livree: { bg: '#FEF9C3', text: '#CA8A04' },
  validee: { bg: '#ECFDF5', text: '#1FAE7A' },
};

function missionLink(missionId: string, statut: string): string {
  if (statut === 'invitation_envoyee') return `/client/mission/${missionId}/invitations`;
  return `/client/mission/${missionId}`;
}

export default function ClientDashboardPage() {
  const navigate = useNavigate();
  const { role, name } = useAuthStore();
  const allMissions = useMissionStore(s => s.missions);
  const allCandidatures = useMissionStore(s => s.candidatures);
  const missions = allMissions.filter(m => m.clientId === 'c01');
  const [tabFilter, setTabFilter] = useState<'all' | 'en_cours' | 'ouverte' | 'validee'>('all');

  useEffect(() => {
    if (!role) navigate('/connexion');
  }, [role, navigate]);

  if (!role) return null;

  if (role !== 'client' && role !== 'entreprise') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F3EC' }}>
        <div className="text-center">
          <p className="text-lg font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
            Accès réservé aux clients
          </p>
          <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  const filtered = tabFilter === 'all' ? missions : missions.filter(m => m.statut === tabFilter);

  const stats = {
    total: missions.length,
    enCours: missions.filter(m => m.statut === 'en_cours').length,
    escrowTotal: missions.filter(m => m.statut === 'en_cours').reduce((s, m) => s + m.budget, 0),
    validees: missions.filter(m => m.statut === 'validee').length,
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
      <DashboardSidebar />

      <div className="flex-1 min-w-0 overflow-x-hidden">
        {/* Header */}
        <div style={{ backgroundColor: '#0B1F3A' }} className="px-4 sm:px-8 pt-6 sm:pt-8 pb-16">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-1" style={{ color: 'rgba(247,243,236,0.5)', fontFamily: 'Inter' }}>
                Bienvenue,
              </p>
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
                {name}
              </h1>
            </div>
            <Button variant="primary" onClick={() => navigate('/client/publier')}>
              <Plus size={16} /> Nouveau besoin
            </Button>
          </div>
        </div>

        <div className="px-4 sm:px-8 pb-16" style={{ marginTop: -48 }}>
          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Missions totales', val: stats.total, Icon: Briefcase, color: '#F5A623', large: true },
              { label: 'En cours', val: stats.enCours, Icon: Clock, color: '#3B82F6', large: true },
              { label: 'En escrow', val: `${stats.escrowTotal.toLocaleString('fr-FR')} F`, Icon: TrendingUp, color: '#F5A623', large: false },
              { label: 'Validées', val: stats.validees, Icon: CheckCircle, color: '#1FAE7A', large: true },
            ].map(({ label, val, Icon, color, large }) => (
              <div
                key={label}
                className="rounded-2xl p-5"
                style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', boxShadow: '0 2px 12px rgba(11,31,58,0.05)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>{label}</p>
                  <Icon size={16} style={{ color }} />
                </div>
                <p
                  className="font-bold"
                  style={{ fontFamily: 'JetBrains Mono', color: '#0B1F3A', fontSize: large ? 22 : 17 }}
                >
                  {val}
                </p>
              </div>
            ))}
          </div>

          {/* Missions */}
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 sm:px-6 py-4" style={{ borderBottom: '1px solid #F7F3EC', backgroundColor: '#FEFDFB' }}>
              <h2 className="font-bold flex-shrink-0" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Mes missions</h2>
              <div className="flex gap-2 overflow-x-auto pb-0.5">
                {(['all', 'en_cours', 'ouverte', 'validee'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTabFilter(t)}
                    className="px-3 py-1 rounded-full text-xs font-bold transition-all flex-shrink-0"
                    style={{
                      backgroundColor: tabFilter === t ? '#0B1F3A' : '#F7F3EC',
                      color: tabFilter === t ? '#F5A623' : '#5C6B7A',
                      fontFamily: 'Space Grotesk',
                    }}
                  >
                    {t === 'all' ? 'Toutes' : STATUT_LABELS[t]}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="p-12 text-center">
                <Briefcase size={40} className="mx-auto mb-3" style={{ color: '#E8E4DC' }} />
                <p className="font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  Aucune mission ici
                </p>
                <Button variant="primary" onClick={() => navigate('/client/publier')}>
                  Publier mon premier besoin
                </Button>
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: '#F7F3EC' }}>
                {filtered.map(mission => {
                  const sc = STATUT_COLORS[mission.statut] ?? { bg: '#F7F3EC', text: '#5C6B7A' };
                  const isInvitation = mission.statut === 'invitation_envoyee';
                  return (
                    <Link
                      key={mission.id}
                      to={missionLink(mission.id, mission.statut)}
                      className="block px-3 sm:px-6 py-4 transition-colors"
                      style={{ textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FEFDFB')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {(() => {
                        const pendingCandidatures = mission.statut === 'ouverte'
                          ? allCandidatures.filter(c => c.missionId === mission.id && c.statut === 'en_attente').length
                          : 0;
                        return pendingCandidatures > 0 ? (
                          <div className="flex items-center gap-1.5 mb-2 text-xs font-bold" style={{ color: '#1FAE7A' }}>
                            <Users size={12} />
                            {pendingCandidatures} candidature{pendingCandidatures > 1 ? 's' : ''} spontanée{pendingCandidatures > 1 ? 's' : ''} reçue{pendingCandidatures > 1 ? 's' : ''}
                          </div>
                        ) : null;
                      })()}
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <p className="font-bold text-sm truncate" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                          {mission.titre}
                        </p>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-bold"
                            style={{ backgroundColor: sc.bg, color: sc.text, fontFamily: 'Space Grotesk' }}
                          >
                            {STATUT_LABELS[mission.statut] ?? mission.statut}
                          </span>
                          {isInvitation && (
                            <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#3B82F6' }}>
                              <Mail size={12} /> Voir invitations <ChevronRight size={12} />
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs mb-3" style={{ color: '#5C6B7A', fontFamily: 'JetBrains Mono' }}>
                        {mission.budget.toLocaleString('fr-FR')} FCFA · {mission.delai} · {mission.datePublication}
                      </p>
                      <p className="text-xs font-semibold mb-1" style={{ color: '#5C6B7A', fontFamily: 'Space Grotesk' }}>
                        Statut escrow :
                      </p>
                      <EscrowTimeline etapes={mission.etapesEscrow} compact />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
