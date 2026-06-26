import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, AlertCircle, TrendingUp, ArrowRight } from 'lucide-react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import Button from '../../components/ui/Button';
import { mockFreelances, mockMissions, mockLitiges } from '../../data/mock';
import { useAuthStore } from '../../store/authStore';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { role } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (role !== 'admin') { navigate('/'); return; }
    setTimeout(() => setMounted(true), 100);
  }, [role]);

  const totalFreelances = mockFreelances.length;
  const missionsActives = mockMissions.filter(m => m.statut === 'en_cours').length;
  const litigesOuverts = mockLitiges.filter(l => l.statut === 'ouvert').length;
  const totalBudgets = mockMissions.reduce((s, m) => s + m.budget, 0);

  const VERTICAL_LABEL_MAP: Record<string, string> = {
    developpement: 'Développement', design: 'Design', marketing: 'Marketing', comptabilite: 'Comptabilité',
  };
  const verticalStats = ['developpement', 'design', 'marketing', 'comptabilite'].map(v => ({
    v,
    count: mockFreelances.filter(f => f.vertical === v).length,
    label: VERTICAL_LABEL_MAP[v],
  }));
  const maxCount = Math.max(...verticalStats.map(s => s.count));

  const missionStats = ['ouverte', 'en_cours', 'livree', 'validee'].map(s => ({
    s,
    count: mockMissions.filter(m => m.statut === s).length,
    label: s === 'ouverte' ? 'Ouverte' : s === 'en_cours' ? 'En cours' : s === 'livree' ? 'Livrée' : 'Validée',
    color: s === 'ouverte' ? '#F5A623' : s === 'en_cours' ? '#3B82F6' : s === 'livree' ? '#CA8A04' : '#1FAE7A',
  }));
  const maxMission = Math.max(...missionStats.map(s => s.count));

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
      <DashboardSidebar />

      <div className="flex-1">
        <div style={{ backgroundColor: '#0B1F3A' }} className="px-8 pt-8 pb-16">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
            Dashboard Admin
          </h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(247,243,236,0.5)' }}>
            Vue d'ensemble de la plateforme TalentBJ
          </p>
        </div>

        <div className="px-8 pb-16" style={{ marginTop: -48 }}>
          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Freelances inscrits', val: totalFreelances, Icon: Users, color: '#F5A623', large: true },
              { label: 'Missions actives', val: missionsActives, Icon: Briefcase, color: '#3B82F6', large: true },
              { label: 'Litiges ouverts', val: litigesOuverts, Icon: AlertCircle, color: '#EF4444', large: true },
              { label: 'Volume total FCFA', val: `${(totalBudgets / 1_000_000).toFixed(1)}M`, Icon: TrendingUp, color: '#1FAE7A', large: false },
            ].map(({ label, val, Icon, color, large }) => (
              <div key={label} className="rounded-2xl p-5" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', boxShadow: '0 2px 12px rgba(11,31,58,0.05)' }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs" style={{ color: '#5C6B7A' }}>{label}</p>
                  <Icon size={16} style={{ color }} />
                </div>
                <p className="font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#0B1F3A', fontSize: large ? 22 : 18 }}>
                  {val}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Freelances par vertical — bar chart CSS */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  Freelances par verticale
                </h2>
                <Button variant="ghost" size="sm" onClick={() => navigate('/admin/verifications')}>
                  Vérifier <ArrowRight size={12} />
                </Button>
              </div>
              <div className="space-y-4">
                {verticalStats.map(({ v, count, label }) => (
                  <div key={v}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-semibold" style={{ color: '#0B1F3A' }}>{label}</span>
                      <span className="text-sm font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>{count}</span>
                    </div>
                    <div className="h-2.5 rounded-full" style={{ backgroundColor: '#F7F3EC' }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: mounted ? `${(count / maxCount) * 100}%` : '0%',
                          backgroundColor: v === 'developpement' ? '#F5A623' : v === 'design' ? '#3B82F6' : v === 'comptabilite' ? '#0D9488' : '#1FAE7A',
                          transition: 'width 0.8s ease',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Missions par statut */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  Missions par statut
                </h2>
                <Button variant="ghost" size="sm" onClick={() => navigate('/admin/litiges')}>
                  Litiges <ArrowRight size={12} />
                </Button>
              </div>
              <div className="space-y-4">
                {missionStats.map(({ s, count, label, color }) => (
                  <div key={s}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-semibold" style={{ color: '#0B1F3A' }}>{label}</span>
                      <span className="text-sm font-bold" style={{ fontFamily: 'JetBrains Mono', color }}>{count}</span>
                    </div>
                    <div className="h-2.5 rounded-full" style={{ backgroundColor: '#F7F3EC' }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: mounted ? `${(count / maxMission) * 100}%` : '0%',
                          backgroundColor: color,
                          transition: 'width 0.8s ease 0.1s',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'File de vérification', sub: `${mockFreelances.filter(f => f.badge === 'verifie').length} freelances en attente`, href: '/admin/verifications', color: '#F5A623' },
              { label: 'Litiges ouverts', sub: `${litigesOuverts} litiges à traiter`, href: '/admin/litiges', color: '#EF4444' },
              { label: 'Statistiques avancées', sub: 'Bientôt disponible', href: '#', color: '#5C6B7A' },
            ].map(({ label, sub, href, color }) => (
              <button
                key={label}
                onClick={() => href !== '#' && navigate(href)}
                className="rounded-2xl p-5 text-left transition-all"
                style={{
                  backgroundColor: '#0B1F3A',
                  border: '1px solid #142A4D',
                  opacity: href === '#' ? 0.5 : 1,
                  cursor: href === '#' ? 'default' : 'pointer',
                }}
              >
                <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: color }} />
                <p className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>{label}</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(247,243,236,0.45)' }}>{sub}</p>
                {href !== '#' && (
                  <div className="flex items-center gap-1 mt-3">
                    <span className="text-xs font-semibold" style={{ color }}>Accéder</span>
                    <ArrowRight size={12} style={{ color }} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
