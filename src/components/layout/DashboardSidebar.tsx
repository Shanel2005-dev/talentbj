import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Briefcase, User, Settings, TrendingUp, AlertCircle,
  ShieldCheck, Users, FileText, Mail, LogOut,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useMissionStore } from '../../store/missionStore';

interface SidebarLink {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export default function DashboardSidebar() {
  const { role, freelanceId, logout } = useAuthStore();
  const { getInvitationsByFreelanceId, getCandidaturesByFreelanceId } = useMissionStore();
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  const pendingInvitations = freelanceId
    ? getInvitationsByFreelanceId(freelanceId).filter(i => i.statut === 'en_attente').length
    : 0;
  const pendingCandidatures = freelanceId
    ? getCandidaturesByFreelanceId(freelanceId).filter(c => c.statut === 'en_attente').length
    : 0;

  const clientLinks: SidebarLink[] = [
    { to: '/client/dashboard', icon: <LayoutDashboard size={18} />, label: 'Tableau de bord' },
    { to: '/client/publier', icon: <Briefcase size={18} />, label: 'Publier un besoin' },
    { to: '/', icon: <TrendingUp size={18} />, label: 'Trouver un talent' },
    { to: '/entreprise/dashboard', icon: <Users size={18} />, label: 'Espace entreprise' },
    { to: '/client/facturation', icon: <FileText size={18} />, label: 'Factures' },
    { to: '/comment-ca-marche', icon: <AlertCircle size={18} />, label: 'Aide' },
  ];

  const freelanceLinks: SidebarLink[] = [
    { to: '/freelance/dashboard', icon: <LayoutDashboard size={18} />, label: 'Tableau de bord' },
    { to: '/freelance/missions', icon: <Briefcase size={18} />, label: 'Missions disponibles' },
    { to: '/freelance/invitations', icon: <Mail size={18} />, label: `Invitations${pendingInvitations > 0 ? ` (${pendingInvitations})` : ''}` },
    { to: '/freelance/candidatures', icon: <FileText size={18} />, label: `Candidatures${pendingCandidatures > 0 ? ` (${pendingCandidatures})` : ''}` },
    { to: freelanceId ? `/freelance/${freelanceId}` : '/freelance/missions', icon: <User size={18} />, label: 'Mon profil public' },
    { to: '/freelance/profil/edition', icon: <Settings size={18} />, label: 'Modifier mon profil' },
    { to: '/comment-ca-marche', icon: <AlertCircle size={18} />, label: 'Aide' },
  ];

  const adminLinks: SidebarLink[] = [
    { to: '/admin/dashboard', icon: <LayoutDashboard size={18} />, label: 'Vue globale' },
    { to: '/admin/verifications', icon: <ShieldCheck size={18} />, label: 'Vérifications' },
    { to: '/admin/litiges', icon: <AlertCircle size={18} />, label: 'Litiges' },
    { to: '/', icon: <Users size={18} />, label: 'Tous les freelances' },
  ];

  const links =
    role === 'freelance' ? freelanceLinks
    : role === 'admin' ? adminLinks
    : clientLinks;

  const mobileLinks = links.slice(0, 4);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-56 min-h-screen py-6 px-3"
        style={{ backgroundColor: '#142A4D', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {links.map(({ to, icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to + label}
              to={to}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-medium transition-all"
              style={{
                color: active ? '#F5A623' : 'rgba(247,243,236,0.6)',
                backgroundColor: active ? 'rgba(245,166,35,0.12)' : 'transparent',
                fontFamily: 'Inter, sans-serif',
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
            >
              <span style={{ color: active ? '#F5A623' : 'rgba(247,243,236,0.4)' }}>{icon}</span>
              {label}
            </Link>
          );
        })}
      </aside>

      {/* Mobile bottom nav */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around"
        style={{ backgroundColor: '#142A4D', borderTop: '1px solid rgba(255,255,255,0.10)', height: 62 }}
      >
        {mobileLinks.map(({ to, icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to + label}
              to={to}
              className="flex flex-col items-center gap-0.5 px-3 py-2"
              style={{ color: active ? '#F5A623' : 'rgba(247,243,236,0.45)' }}
            >
              <span style={{ color: active ? '#F5A623' : 'rgba(247,243,236,0.35)' }}>{icon}</span>
              <span style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 500 }}>
                {label.length > 10 ? label.slice(0, 10) + '…' : label}
              </span>
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-0.5 px-3 py-2"
          style={{ color: '#F87171', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <LogOut size={18} />
          <span style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 500 }}>Quitter</span>
        </button>
      </nav>
    </>
  );
}
