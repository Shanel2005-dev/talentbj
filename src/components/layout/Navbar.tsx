import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Settings, LayoutDashboard, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useState, useRef, useEffect } from 'react';

const ROLE_LABELS: Record<string, string> = {
  client: 'Client',
  freelance: 'Freelance',
  entreprise: 'Entreprise',
  admin: 'Admin',
};

const ROLE_COLORS: Record<string, { bg: string; text: string }> = {
  client: { bg: 'rgba(245,166,35,0.15)', text: '#F5A623' },
  freelance: { bg: 'rgba(31,174,122,0.15)', text: '#1FAE7A' },
  entreprise: { bg: 'rgba(245,166,35,0.12)', text: '#F5A623' },
  admin: { bg: 'rgba(239,68,68,0.15)', text: '#EF4444' },
};

export default function Navbar() {
  const { name, role, freelanceId, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const navLinks =
    role === 'freelance'
      ? [
          { to: '/freelance/missions', label: 'Missions disponibles' },
          { to: '/devenir-freelance', label: 'Ma verticale' },
          { to: '/comment-ca-marche', label: 'Comment ça marche' },
        ]
      : role === 'admin'
      ? [
          { to: '/admin/dashboard', label: 'Dashboard' },
          { to: '/admin/verifications', label: 'Vérifications' },
          { to: '/admin/litiges', label: 'Litiges' },
        ]
      : role === 'client' || role === 'entreprise'
      ? [
          { to: '/', label: 'Trouver un talent' },
          { to: '/client/publier', label: 'Publier un besoin' },
          { to: '/client/dashboard', label: 'Mes missions' },
        ]
      : [
          { to: '/', label: 'Trouver un talent' },
          { to: '/devenir-freelance', label: 'Devenir freelance' },
          { to: '/comment-ca-marche', label: 'Comment ça marche' },
          { to: '/tarifs', label: 'Tarifs' },
          { to: '/faq', label: 'FAQ' },
        ];

  const dashboardPath =
    role === 'freelance' ? '/freelance/dashboard'
    : role === 'admin' ? '/admin/dashboard'
    : role === 'entreprise' ? '/entreprise/dashboard'
    : '/client/dashboard';

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    setOpen(false);
    navigate('/');
  }

  return (
    <nav
      className="sticky top-0 z-50"
      style={{ backgroundColor: '#0B1F3A', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 grid items-center" style={{ gridTemplateColumns: '1fr auto 1fr' }}>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <img src="/logo.svg" alt="TalentBJ" className="w-9 h-9" />
          <span
            className="font-extrabold text-xl"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F7F3EC', letterSpacing: '-0.01em' }}
          >
            Talent<span style={{ color: '#C49B35' }}>BJ</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center justify-center gap-1">
          {navLinks.map(({ to, label }) => {
            const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
            return (
              <Link
                key={to} to={to}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  color: active ? '#A78BFA' : 'rgba(247,243,236,0.65)',
                  backgroundColor: active ? 'rgba(124,58,237,0.12)' : 'transparent',
                  fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#F7F3EC'; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(247,243,236,0.65)'; }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right zone */}
        <div className="flex items-center gap-3 justify-end">
          {!role ? (
            <>
              <Link
                to="/connexion"
                className="text-sm font-semibold hidden sm:block transition-all px-4 py-2 rounded-full"
                style={{ color: '#FFFFFF', backgroundColor: 'rgba(124,58,237,0.15)', border: '1.5px solid rgba(124,58,237,0.4)', fontFamily: 'Inter, sans-serif' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F5A623'; e.currentTarget.style.color = '#0B1F3A'; e.currentTarget.style.borderColor = '#F5A623'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(124,58,237,0.15)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'; }}
              >
                Se connecter
              </Link>
              <Link
                to="/inscription"
                className="text-sm font-bold px-4 py-2 rounded-full transition-all"
                style={{
                  backgroundColor: '#F5A623',
                  color: '#0B1F3A',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#7C3AED'; e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F5A623'; e.currentTarget.style.color = '#0B1F3A'; }}
              >
                S'inscrire
              </Link>
            </>
          ) : (
            <div className="relative" ref={ref}>
              <button
                onClick={() => setOpen(v => !v)}
                className="flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-xl transition-all"
                style={{
                  border: '1px solid rgba(255,255,255,0.15)',
                  backgroundColor: open ? 'rgba(255,255,255,0.08)' : 'transparent',
                }}
              >
                {/* Avatar */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: '#F5A623', color: '#0B1F3A', fontFamily: 'Space Grotesk' }}
                >
                  {initials}
                </div>
                {/* Name */}
                <span className="hidden sm:block" style={{ color: '#F7F3EC' }}>
                  {name?.split(' ')[0]}
                </span>
                {/* Role badge */}
                {role && (
                  <span
                    className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: ROLE_COLORS[role]?.bg,
                      color: ROLE_COLORS[role]?.text,
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 10,
                    }}
                  >
                    {ROLE_LABELS[role]}
                  </span>
                )}
                <ChevronDown size={14} style={{ color: 'rgba(247,243,236,0.5)' }} />
              </button>

              {open && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl py-2 z-50"
                  style={{
                    backgroundColor: '#142A4D',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Header */}
                  <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <p className="font-bold text-sm truncate" style={{ color: '#F7F3EC', fontFamily: 'Space Grotesk' }}>
                      {name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#5C6B7A' }}>
                      {role ? ROLE_LABELS[role] : ''}
                    </p>
                  </div>

                  {/* Links */}
                  <div className="py-1">
                    <Link to={dashboardPath} onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
                      style={{ color: 'rgba(247,243,236,0.8)' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <LayoutDashboard size={15} style={{ color: '#F5A623' }} />
                      Mon dashboard
                    </Link>
                    {role === 'freelance' && freelanceId && (
                      <Link to={`/freelance/${freelanceId}`} onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
                        style={{ color: 'rgba(247,243,236,0.8)' }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <User size={15} style={{ color: '#F5A623' }} />
                        Mon profil public
                      </Link>
                    )}
                    {role === 'freelance' && (
                      <Link to="/freelance/profil/edition" onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
                        style={{ color: 'rgba(247,243,236,0.8)' }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <Settings size={15} style={{ color: '#F5A623' }} />
                        Modifier mon profil
                      </Link>
                    )}
                  </div>

                  {/* Logout */}
                  <div className="border-t pt-1" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
                      style={{ color: '#F87171' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <LogOut size={15} />
                      Se déconnecter
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
