import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Search, Briefcase, User, Building2, CheckCircle } from 'lucide-react';
import VerificationSeal from '../../components/ui/VerificationSeal';
import Button from '../../components/ui/Button';
import { useAuthStore, type AuthStore } from '../../store/authStore';
import type { AuthRole } from '../../types';

type Step = 'choose' | 'client-form' | 'freelance-form';
type ClientType = 'client' | 'entreprise';

const inputStyle = {
  width: '100%', borderRadius: 12, padding: '12px 16px', fontSize: 14,
  outline: 'none', backgroundColor: '#FEFDFB', border: '1.5px solid #DDD8CE',
  fontFamily: 'Inter', color: '#0B1F3A',
};

const CLIENT_PERKS = [
  'Accès à 2 000+ freelances vérifiés',
  'Matching IA selon votre besoin',
  'Paiement sécurisé par escrow',
  'Suivi de mission en temps réel',
];

const FREELANCE_PERKS = [
  'Profil vérifié par notre équipe',
  'Missions adaptées à vos compétences',
  'Paiement garanti avant livraison',
  'Retrait Mobile Money (MTN & Moov)',
];

function LeftPanel({ type }: { type: 'client' | 'freelance' }) {
  const perks = type === 'client' ? CLIENT_PERKS : FREELANCE_PERKS;
  const title = type === 'client'
    ? <><span style={{ color: '#F5A623' }}>Trouvez le talent</span><br />qu'il vous faut</>
    : <>Développez votre<br /><span style={{ color: '#F5A623' }}>activité freelance</span></>;

  return (
    <div className="hidden lg:flex lg:w-2/5 flex-col justify-between p-12" style={{ backgroundColor: '#0B1F3A' }}>
      <div className="flex items-center gap-2">
        <VerificationSeal size={32} variant="mini" />
        <span className="text-lg font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>TalentBJ</span>
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC', lineHeight: 1.25 }}>
          {title}
        </h2>
        <p className="mb-8" style={{ color: 'rgba(247,243,236,0.6)', fontFamily: 'Inter', fontSize: 14 }}>
          Inscription gratuite · Paiement sécurisé · Mobile Money intégré
        </p>
        <div className="space-y-3">
          {perks.map(item => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle size={16} style={{ color: '#1FAE7A', flexShrink: 0 }} />
              <p className="text-sm" style={{ color: 'rgba(247,243,236,0.8)' }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-6">
        {[{ val: '2 000+', label: 'Freelances' }, { val: '98%', label: 'Paiements OK' }, { val: '500+', label: 'Clients' }].map(({ val, label }) => (
          <div key={label}>
            <p className="text-xl font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>{val}</p>
            <p className="text-xs" style={{ color: 'rgba(247,243,236,0.4)' }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChooseScreen({ onChoose }: { onChoose: (path: 'client' | 'freelance') => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ backgroundColor: '#F7F3EC' }}>
      <div className="flex items-center gap-2 mb-12">
        <VerificationSeal size={36} variant="mini" />
        <span className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>TalentBJ</span>
      </div>

      <h1 className="text-3xl font-bold text-center mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
        Rejoignez TalentBJ
      </h1>
      <p className="text-center mb-10" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
        Choisissez votre profil pour commencer
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
        {/* Client card */}
        <button
          onClick={() => onChoose('client')}
          className="group text-left rounded-2xl p-8 transition-all duration-200"
          style={{
            backgroundColor: '#fff',
            border: '2px solid #E8E4DC',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#F5A623';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(245,166,35,0.12)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#E8E4DC';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
          }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: '#FFF8EC' }}>
            <Search size={26} style={{ color: '#F5A623' }} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
            Je cherche un talent
          </h2>
          <p className="text-sm leading-relaxed mb-5" style={{ color: '#5C6B7A' }}>
            Trouvez des freelances vérifiés pour vos projets. Particulier ou entreprise.
          </p>
          <span
            className="inline-flex items-center gap-1 text-sm font-bold"
            style={{ color: '#F5A623', fontFamily: 'Space Grotesk' }}
          >
            S'inscrire comme client <ArrowRight size={15} />
          </span>
        </button>

        {/* Freelance card */}
        <button
          onClick={() => onChoose('freelance')}
          className="group text-left rounded-2xl p-8 transition-all duration-200"
          style={{
            backgroundColor: '#fff',
            border: '2px solid #E8E4DC',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#1FAE7A';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(31,174,122,0.12)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#E8E4DC';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
          }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: 'rgba(31,174,122,0.08)' }}>
            <Briefcase size={26} style={{ color: '#1FAE7A' }} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
            Je propose mes services
          </h2>
          <p className="text-sm leading-relaxed mb-5" style={{ color: '#5C6B7A' }}>
            Créez votre profil freelance, recevez des missions et développez votre activité.
          </p>
          <span
            className="inline-flex items-center gap-1 text-sm font-bold"
            style={{ color: '#1FAE7A', fontFamily: 'Space Grotesk' }}
          >
            S'inscrire comme freelance <ArrowRight size={15} />
          </span>
        </button>
      </div>

      <p className="mt-10 text-sm" style={{ color: '#5C6B7A' }}>
        Déjà inscrit ?{' '}
        <Link to="/connexion" className="font-semibold" style={{ color: '#F5A623' }}>
          Se connecter →
        </Link>
      </p>
    </div>
  );
}

function ClientForm({
  onBack,
  navigate,
  login,
}: {
  onBack: () => void;
  navigate: ReturnType<typeof useNavigate>;
  login: AuthStore['login'];
}) {
  const [clientType, setClientType] = useState<ClientType>('client');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas.'); return; }
    if (password.length < 8) { setError('Le mot de passe doit faire au moins 8 caractères.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    login(clientType, nom, email);
    setLoading(false);
    if (clientType === 'entreprise') navigate('/entreprise/dashboard');
    else navigate('/client/dashboard');
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F7F3EC' }}>
      <LeftPanel type="client" />
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <button onClick={onBack} className="flex items-center gap-1 text-sm font-semibold mb-6" style={{ color: '#5C6B7A' }}>
            <ArrowLeft size={15} /> Retour
          </button>

          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
            Créer mon compte client
          </h1>
          <p className="text-sm mb-7" style={{ color: '#5C6B7A' }}>
            Déjà inscrit ?{' '}
            <Link to="/connexion" className="font-semibold" style={{ color: '#F5A623' }}>
              Se connecter →
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Particulier vs Entreprise */}
            <div>
              <p className="text-sm font-semibold mb-2" style={{ color: '#0B1F3A' }}>Type de compte</p>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { val: 'client' as ClientType, label: 'Particulier', sub: 'Mission ponctuelle', Icon: User },
                  { val: 'entreprise' as ClientType, label: 'Entreprise', sub: 'Multi-recruteurs', Icon: Building2 },
                ]).map(({ val, label, sub, Icon }) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setClientType(val)}
                    className="flex items-center gap-3 p-4 rounded-xl text-left transition-all"
                    style={{
                      border: `2px solid ${clientType === val ? '#F5A623' : '#E8E4DC'}`,
                      backgroundColor: clientType === val ? '#FFF8EC' : '#FEFDFB',
                    }}
                  >
                    <Icon size={18} style={{ color: clientType === val ? '#F5A623' : '#5C6B7A', flexShrink: 0 }} />
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>{label}</p>
                      <p className="text-xs" style={{ color: '#5C6B7A' }}>{sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>
                {clientType === 'entreprise' ? 'Nom de l\'entreprise *' : 'Nom complet *'}
              </label>
              <input
                required value={nom} onChange={e => setNom(e.target.value)}
                placeholder={clientType === 'entreprise' ? 'Tech Africa SARL' : 'Koffi Mensah'}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#F5A623')}
                onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
              />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Email professionnel *</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="koffi@exemple.com" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#F5A623')}
                onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Mot de passe *</label>
                <input
                  type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="8 car. min." style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#F5A623')}
                  onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Confirmer *</label>
                <input
                  type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
                  placeholder="••••••••" style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#F5A623')}
                  onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
                />
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626' }}>
                {error}
              </div>
            )}

            <p className="text-xs" style={{ color: '#5C6B7A' }}>
              En créant un compte, vous acceptez nos{' '}
              <span className="font-semibold" style={{ color: '#F5A623' }}>Conditions d'utilisation</span>.
            </p>

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
              Créer mon compte <ArrowRight size={16} />
            </Button>
          </form>

          {/* Démo */}
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid #E8E4DC' }}>
            <p className="text-xs text-center mb-2" style={{ color: '#5C6B7A' }}>Tester sans créer de compte</p>
            <div className="grid grid-cols-2 gap-2">
              {([
                { r: 'client' as AuthRole, label: 'Demo Particulier' },
                { r: 'entreprise' as AuthRole, label: 'Demo Entreprise' },
              ]).map(({ r, label }) => {
                const demos: Record<string, { name: string; email: string }> = {
                  client: { name: 'Olusegun Adeyemi', email: 'olusegun@demo.bj' },
                  entreprise: { name: 'Amara Diallo', email: 'amara@techafrica.bj' },
                };
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      const d = demos[r!];
                      login(r!, d.name, d.email);
                      if (r === 'entreprise') navigate('/entreprise/dashboard');
                      else navigate('/client/dashboard');
                    }}
                    className="py-2 rounded-xl text-xs font-bold transition-all"
                    style={{ backgroundColor: '#F7F3EC', color: '#0B1F3A', border: '1px solid #E8E4DC', fontFamily: 'Space Grotesk' }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FreelanceForm({
  onBack,
  navigate,
  login,
}: {
  onBack: () => void;
  navigate: ReturnType<typeof useNavigate>;
  login: AuthStore['login'];
}) {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas.'); return; }
    if (password.length < 8) { setError('Le mot de passe doit faire au moins 8 caractères.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    login('freelance', nom, email, 'f01');
    setLoading(false);
    navigate('/freelance/inscription');
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F7F3EC' }}>
      <LeftPanel type="freelance" />
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <button onClick={onBack} className="flex items-center gap-1 text-sm font-semibold mb-6" style={{ color: '#5C6B7A' }}>
            <ArrowLeft size={15} /> Retour
          </button>

          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
            Créer mon profil freelance
          </h1>
          <p className="text-sm mb-7" style={{ color: '#5C6B7A' }}>
            Déjà inscrit ?{' '}
            <Link to="/connexion" className="font-semibold" style={{ color: '#F5A623' }}>
              Se connecter →
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Nom complet *</label>
              <input
                required value={nom} onChange={e => setNom(e.target.value)}
                placeholder="Koffi Mensah" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#1FAE7A')}
                onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
              />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Email *</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="koffi@exemple.com" style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#1FAE7A')}
                onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Mot de passe *</label>
                <input
                  type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="8 car. min." style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#1FAE7A')}
                  onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Confirmer *</label>
                <input
                  type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
                  placeholder="••••••••" style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#1FAE7A')}
                  onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
                />
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626' }}>
                {error}
              </div>
            )}

            <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(31,174,122,0.06)', border: '1px solid rgba(31,174,122,0.2)' }}>
              <p className="text-xs font-semibold mb-1" style={{ color: '#1FAE7A' }}>Étape suivante</p>
              <p className="text-xs" style={{ color: '#5C6B7A' }}>
                Après l'inscription, vous complèterez votre profil (compétences, portfolio, tarif) avant de recevoir des missions.
              </p>
            </div>

            <p className="text-xs" style={{ color: '#5C6B7A' }}>
              En créant un compte, vous acceptez nos{' '}
              <span className="font-semibold" style={{ color: '#F5A623' }}>Conditions d'utilisation</span>.
            </p>

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
              Créer mon compte & compléter mon profil <ArrowRight size={16} />
            </Button>
          </form>

          {/* Démo */}
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid #E8E4DC' }}>
            <p className="text-xs text-center mb-2" style={{ color: '#5C6B7A' }}>Tester sans créer de compte</p>
            <button
              type="button"
              onClick={() => {
                login('freelance', 'Koffi Mensah', 'koffi@demo.bj', 'f01', 'verifie');
                navigate('/freelance/dashboard');
              }}
              className="w-full py-2 rounded-xl text-xs font-bold transition-all"
              style={{ backgroundColor: '#F7F3EC', color: '#0B1F3A', border: '1px solid #E8E4DC', fontFamily: 'Space Grotesk' }}
            >
              Demo Freelance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [step, setStep] = useState<Step>('choose');

  if (step === 'client-form') {
    return <ClientForm onBack={() => setStep('choose')} navigate={navigate} login={login} />;
  }
  if (step === 'freelance-form') {
    return <FreelanceForm onBack={() => setStep('choose')} navigate={navigate} login={login} />;
  }

  return <ChooseScreen onChoose={path => setStep(path === 'client' ? 'client-form' : 'freelance-form')} />;
}
