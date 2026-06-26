import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import VerificationSeal from '../../components/ui/VerificationSeal';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';

function AuthLeftPanel() {
  return (
    <div className="hidden lg:flex lg:w-2/5 flex-col justify-between p-12" style={{ backgroundColor: '#0B1F3A' }}>
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="TalentBJ" style={{ width: 36, height: 36 }} />
        <span className="text-lg font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
          Talent<span style={{ color: '#C49B35' }}>BJ</span>
        </span>
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC', lineHeight: 1.2 }}>
          La plateforme des freelances<br />
          <span style={{ color: '#F5A623' }}>vérifiés d'Afrique de l'Ouest</span>
        </h2>
        <p className="mb-8" style={{ color: 'rgba(247,243,236,0.6)', fontFamily: 'Inter' }}>
          Matching IA · Escrow intégré · Mobile Money · Sceau de vérification
        </p>
        <VerificationSeal size={120} variant="large" animated />
      </div>
      <div className="flex gap-6">
        {[
          { val: '2 000+', label: 'Freelances' },
          { val: '98%', label: 'Paiements OK' },
          { val: '500+', label: 'Clients' },
        ].map(({ val, label }) => (
          <div key={label}>
            <p className="text-xl font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>{val}</p>
            <p className="text-xs" style={{ color: 'rgba(247,243,236,0.4)' }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputStyle = {
    width: '100%', borderRadius: 12, padding: '12px 16px', fontSize: 14,
    outline: 'none', backgroundColor: '#FEFDFB', border: '1.5px solid #DDD8CE',
    fontFamily: 'Inter', color: '#0B1F3A',
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const name = email.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    login('client', name, email);
    setLoading(false);
    navigate('/client/dashboard');
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F7F3EC' }}>
      <AuthLeftPanel />

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Titre */}
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
            Bon retour !
          </h1>
          <p className="text-sm mb-8" style={{ color: '#5C6B7A' }}>
            Connectez-vous pour accéder à votre espace.{' '}
            <Link to="/inscription" className="font-semibold" style={{ color: '#F5A623' }}>
              Créer un compte →
            </Link>
          </p>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Email</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="koffi@exemple.com" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#F5A623')}
                onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold" style={{ color: '#0B1F3A' }}>Mot de passe</label>
                <button type="button" className="text-xs font-semibold" style={{ color: '#F5A623' }}>
                  Mot de passe oublié ?
                </button>
              </div>
              <input
                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#F5A623')}
                onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
              />
            </div>
            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
              Se connecter <ArrowRight size={16} />
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}
