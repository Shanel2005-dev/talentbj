import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  CheckCircle, ArrowRight, Code, Palette, Megaphone, Upload,
  FileText, Camera, Smartphone, RefreshCw, Briefcase, Calculator,
  GitBranch, Globe, TrendingUp, BarChart2,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';

type Step = 'profil' | 'competences' | 'portfolio' | 'identite' | 'test' | 'soumis';
type Vertical = 'developpement' | 'design' | 'marketing' | 'comptabilite' | '';

const STEPS: { id: Step; label: string }[] = [
  { id: 'profil', label: 'Profil' },
  { id: 'competences', label: 'Compétences' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'identite', label: 'Identité' },
  { id: 'test', label: 'Test' },
  { id: 'soumis', label: 'Soumis' },
];

const VERTICALS = [
  { value: 'developpement' as Vertical, label: 'Développement', Icon: Code },
  { value: 'design' as Vertical, label: 'Design', Icon: Palette },
  { value: 'marketing' as Vertical, label: 'Marketing', Icon: Megaphone },
  { value: 'comptabilite' as Vertical, label: 'Comptabilité', Icon: Calculator },
] as const;

const COMPETENCES_CONFIG: Record<string, {
  label: string; placeholder: string; hint: string;
  tarif1: string; tarif2: string;
}> = {
  developpement: {
    label: 'Technologies & outils *',
    placeholder: 'Ex: React, Django, PostgreSQL, REST API, Docker (séparés par des virgules)',
    hint: 'Chaque technologie est incluse dans l\'algorithme de matching.',
    tarif1: 'Taux horaire (FCFA/h)',
    tarif2: 'Tarif forfait projet (FCFA)',
  },
  design: {
    label: 'Logiciels & compétences *',
    placeholder: 'Ex: Figma, Illustrator, Photoshop, After Effects, Canva',
    hint: 'Listez vos outils de création et les types de design que vous pratiquez.',
    tarif1: 'Taux horaire (FCFA/h)',
    tarif2: 'Identité visuelle complète (FCFA)',
  },
  marketing: {
    label: 'Canaux & techniques maîtrisés *',
    placeholder: 'Ex: SEO, Google Ads, Facebook Ads, Emailing, Copywriting, Analytics',
    hint: 'Listez les canaux et stratégies marketing que vous maîtrisez.',
    tarif1: 'Taux horaire (FCFA/h)',
    tarif2: 'Gestion campagne/mois (FCFA)',
  },
  comptabilite: {
    label: 'Logiciels & compétences comptables *',
    placeholder: 'Ex: Sage, QuickBooks, Excel avancé, OHADA, Déclaration TVA, Paie',
    hint: 'Listez vos logiciels et domaines d\'expertise en comptabilité.',
    tarif1: 'Taux horaire (FCFA/h)',
    tarif2: 'Bilan annuel (FCFA)',
  },
};

const TEST_QUESTIONS: Record<string, string> = {
  developpement: 'Un client vous demande de créer une API REST pour une boutique en ligne avec paiement Mobile Money. Décrivez votre approche technique : architecture, technologies choisies, et les 3 premiers éléments que vous implémenteriez.',
  design: 'Un restaurant à Cotonou veut refaire son identité visuelle pour attirer une clientèle jeune. Décrivez votre processus de recherche, les étapes de votre démarche, et comment vous présenteriez vos concepts au client.',
  marketing: 'Une boutique de mode sur Instagram veut tripler ses ventes en 3 mois. Décrivez la stratégie social media que vous proposeriez, avec les types de contenus, la fréquence de publication, et les indicateurs de succès.',
  comptabilite: 'Un commerçant à Cotonou tient sa comptabilité dans des cahiers. Il réalise un chiffre d\'affaires mensuel d\'environ 5 millions FCFA. Décrivez comment vous l\'aideriez à structurer sa comptabilité, les documents essentiels à mettre en place, et les outils que vous recommanderiez.',
};

const OTP_LENGTH = 6;

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { setStatutVerification } = useAuthStore();
  const [step, setStep] = useState<Step>('profil');
  const [vertical, setVertical] = useState<Vertical>('');
  const [testAnswer, setTestAnswer] = useState('');

  // Identité state
  const [docReceived, setDocReceived] = useState(false);
  const [selfieReceived, setSelfieReceived] = useState(false);
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [otpValue, setOtpValue] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { register } = useForm<{ nom: string; bio: string; ville: string; competences: string }>();

  const currentIdx = STEPS.findIndex(s => s.id === step);
  const cfg = vertical ? COMPETENCES_CONFIG[vertical] : COMPETENCES_CONFIG.developpement;

  async function sendOtp() {
    if (phone.trim().length < 8) return;
    setOtpSending(true);
    await new Promise(r => setTimeout(r, 1000));
    setOtpSending(false);
    setOtpSent(true);
    setOtpCountdown(30);
    countdownRef.current = setInterval(() => {
      setOtpCountdown(prev => {
        if (prev <= 1) { clearInterval(countdownRef.current!); return 0; }
        return prev - 1;
      });
    }, 1000);
  }

  function verifyOtp() {
    if (otpValue.length === OTP_LENGTH) setOtpVerified(true);
  }

  function canAdvanceFromIdentite() {
    return docReceived && selfieReceived && otpVerified;
  }

  function handleSubmitDossier() {
    setStatutVerification('en_attente');
    setStep('soumis');
  }

  const inputStyle = {
    width: '100%', borderRadius: 12, padding: '12px 16px', fontSize: 14,
    outline: 'none', backgroundColor: '#FEFDFB', border: '1.5px solid #DDD8CE',
    fontFamily: 'Inter', color: '#0B1F3A',
  };

  // Vertical label for dynamic titles
  const verticalLabel = VERTICALS.find(v => v.value === vertical)?.label ?? '';

  return (
    <div style={{ backgroundColor: '#F7F3EC', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#0B1F3A' }} className="px-6 pt-10 pb-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
            Créer mon profil vérifié
          </h1>
          <div className="flex items-center gap-1.5 flex-wrap">
            {STEPS.map((s, i) => {
              const done = i < currentIdx;
              const active = s.id === step;
              return (
                <div key={s.id} className="flex items-center gap-1.5">
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: done ? 'rgba(31,174,122,0.2)' : active ? '#F5A623' : 'rgba(255,255,255,0.08)',
                      color: done ? '#1FAE7A' : active ? '#0B1F3A' : 'rgba(247,243,236,0.35)',
                      fontFamily: 'Space Grotesk',
                    }}
                  >
                    {done ? <CheckCircle size={10} /> : null}
                    {s.label}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-3 h-px" style={{ backgroundColor: done ? '#1FAE7A' : 'rgba(255,255,255,0.12)' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-16" style={{ marginTop: -32 }}>
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', boxShadow: '0 4px 20px rgba(11,31,58,0.08)' }}>

          {/* ── STEP 1 — Profil ── */}
          {step === 'profil' && (
            <div className="p-8">
              <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Votre profil</h2>
              <p className="text-sm mb-6" style={{ color: '#5C6B7A' }}>Les informations de base que les clients verront en premier.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Nom complet *</label>
                  <input {...register('nom', { required: true })} placeholder="Ex: Koffi Mensah" style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Ville *</label>
                  <input {...register('ville', { required: true })} placeholder="Cotonou, Porto-Novo..." style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Domaine de spécialisation *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {VERTICALS.map(({ value, label, Icon }) => (
                      <button key={value} type="button" onClick={() => setVertical(value)}
                        className="p-3 rounded-xl text-center transition-all"
                        style={{
                          border: `2px solid ${vertical === value ? '#F5A623' : '#E8E4DC'}`,
                          backgroundColor: vertical === value ? '#FFF8EC' : '#FEFDFB',
                        }}
                      >
                        <Icon size={20} style={{ color: vertical === value ? '#F5A623' : '#5C6B7A' }} className="mx-auto mb-1" />
                        <p className="text-xs font-bold" style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>{label}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Bio professionnelle *</label>
                  <textarea {...register('bio', { required: true })} rows={4}
                    placeholder="Décrivez votre expertise, vos expériences et ce qui vous distingue..."
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
                  />
                </div>
              </div>
              <Button variant="primary" size="lg" fullWidth onClick={() => setStep('competences')} className="mt-6"
                disabled={!vertical}>
                Continuer <ArrowRight size={16} />
              </Button>
              {!vertical && (
                <p className="text-xs text-center mt-2" style={{ color: '#F5A623' }}>Choisissez votre spécialisation pour continuer</p>
              )}
            </div>
          )}

          {/* ── STEP 2 — Compétences (adapté par spécialisation) ── */}
          {step === 'competences' && (
            <div className="p-8">
              <div className="flex items-center gap-2 mb-1">
                {vertical === 'developpement' && <Code size={18} style={{ color: '#F5A623' }} />}
                {vertical === 'design' && <Palette size={18} style={{ color: '#F5A623' }} />}
                {vertical === 'marketing' && <TrendingUp size={18} style={{ color: '#F5A623' }} />}
                {vertical === 'comptabilite' && <Calculator size={18} style={{ color: '#F5A623' }} />}
                <h2 className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  Compétences — {verticalLabel}
                </h2>
              </div>
              <p className="text-sm mb-6" style={{ color: '#5C6B7A' }}>{cfg.hint}</p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>{cfg.label}</label>
                  <input {...register('competences', { required: true })}
                    placeholder={cfg.placeholder} style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
                  />
                </div>

                {/* Champ supplémentaire selon spécialisation */}
                {vertical === 'design' && (
                  <div>
                    <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Style graphique principal</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Minimaliste', 'Coloré / Pop', 'Luxe / Élégant', 'Illustratif', 'Corporate', 'Africain contemporain'].map(s => (
                        <button key={s} type="button"
                          className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                          style={{ border: '1.5px solid #E8E4DC', backgroundColor: '#FEFDFB', color: '#5C6B7A', fontFamily: 'Space Grotesk' }}
                          onMouseEnter={e => { (e.currentTarget).style.borderColor = '#F5A623'; (e.currentTarget).style.color = '#F5A623'; }}
                          onMouseLeave={e => { (e.currentTarget).style.borderColor = '#E8E4DC'; (e.currentTarget).style.color = '#5C6B7A'; }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {vertical === 'marketing' && (
                  <div>
                    <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Budget campagne max géré (FCFA)</label>
                    <input placeholder="Ex: 500 000 FCFA" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                  </div>
                )}

                {vertical === 'comptabilite' && (
                  <div>
                    <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Services proposés</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Tenue de comptabilité', 'Déclaration fiscale', 'Établissement de bilan', 'Gestion de paie', 'Audit interne', 'Conseil financier'].map(s => (
                        <button key={s} type="button"
                          className="px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all"
                          style={{ border: '1.5px solid #E8E4DC', backgroundColor: '#FEFDFB', color: '#5C6B7A', fontFamily: 'Space Grotesk' }}
                          onMouseEnter={e => { (e.currentTarget).style.borderColor = '#F5A623'; (e.currentTarget).style.color = '#F5A623'; }}
                          onMouseLeave={e => { (e.currentTarget).style.borderColor = '#E8E4DC'; (e.currentTarget).style.color = '#5C6B7A'; }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Tarif</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder={cfg.tarif1} style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                    <input placeholder={cfg.tarif2} style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setStep('profil')}>Retour</Button>
                <Button variant="primary" size="lg" onClick={() => setStep('portfolio')} className="flex-1">
                  Continuer <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* ── STEP 3 — Portfolio (adapté par spécialisation) ── */}
          {step === 'portfolio' && (
            <div className="p-8">
              <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                {vertical === 'comptabilite' ? 'Références & expériences' : 'Votre portfolio'}
              </h2>
              <p className="text-sm mb-6" style={{ color: '#5C6B7A' }}>
                {vertical === 'developpement' && 'Partagez vos projets : dépôts GitHub, applications déployées, ou travaux techniques.'}
                {vertical === 'design' && 'Ajoutez 3 réalisations visuelles qui représentent votre style et votre niveau.'}
                {vertical === 'marketing' && 'Présentez 3 campagnes ou projets marketing avec les résultats obtenus.'}
                {vertical === 'comptabilite' && 'Décrivez 3 types de missions réalisées (données anonymisées, sans informations confidentielles).'}
              </p>

              {/* Développement : GitHub + URLs */}
              {vertical === 'developpement' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>
                      <GitBranch size={14} className="inline mr-1" />Profil GitHub / GitLab
                    </label>
                    <input placeholder="https://github.com/votre-profil" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                  </div>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-4 rounded-xl space-y-2" style={{ border: '1.5px solid #E8E4DC', backgroundColor: '#FEFDFB' }}>
                      <p className="text-xs font-bold" style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>Projet {i}</p>
                      <input placeholder="Nom du projet" style={{ ...inputStyle, padding: '10px 14px' }}
                        onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                      <div className="grid grid-cols-2 gap-2">
                        <input placeholder="Lien GitHub/repo" style={{ ...inputStyle, padding: '10px 14px' }}
                          onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                        <input placeholder={`URL live (optionnel)`} style={{ ...inputStyle, padding: '10px 14px' }}
                          onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Design : uploads visuels */}
              {vertical === 'design' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>
                      <Globe size={14} className="inline mr-1" />Behance / Dribbble / Portfolio en ligne (optionnel)
                    </label>
                    <input placeholder="https://www.behance.net/votre-profil" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                  </div>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-4 rounded-xl" style={{ border: '2px dashed #E8E4DC', backgroundColor: '#FEFDFB' }}>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F7F3EC' }}>
                          <Upload size={18} style={{ color: '#5C6B7A' }} />
                        </div>
                        <div>
                          <p className="font-bold text-sm" style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>Réalisation {i}</p>
                          <p className="text-xs" style={{ color: '#5C6B7A' }}>JPG, PNG — max 5 Mo</p>
                        </div>
                      </div>
                      <input placeholder="Titre de la réalisation" style={{ ...inputStyle, padding: '10px 14px' }}
                        onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                    </div>
                  ))}
                </div>
              )}

              {/* Marketing : campagnes + résultats */}
              {vertical === 'marketing' && (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-4 rounded-xl space-y-2" style={{ border: '1.5px solid #E8E4DC', backgroundColor: '#FEFDFB' }}>
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart2 size={14} style={{ color: '#F5A623' }} />
                        <p className="text-xs font-bold" style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>Campagne / Mission {i}</p>
                      </div>
                      <input placeholder="Nom du projet ou de la marque" style={{ ...inputStyle, padding: '10px 14px' }}
                        onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                      <div className="grid grid-cols-2 gap-2">
                        <input placeholder="Canal (Facebook, SEO...)" style={{ ...inputStyle, padding: '10px 14px' }}
                          onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                        <input placeholder="Résultat clé (ex: +40% ventes)" style={{ ...inputStyle, padding: '10px 14px' }}
                          onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Comptabilité : références anonymisées */}
              {vertical === 'comptabilite' && (
                <div className="space-y-4">
                  <div className="flex gap-3 p-3 rounded-xl" style={{ backgroundColor: '#FFF8EC', border: '1px solid rgba(245,166,35,0.25)' }}>
                    <CheckCircle size={14} style={{ color: '#F5A623', flexShrink: 0, marginTop: 2 }} />
                    <p className="text-xs" style={{ color: '#5C6B7A' }}>
                      Ne mentionnez pas les noms de vos clients — décrivez le secteur, la taille de l'entreprise et la mission réalisée.
                    </p>
                  </div>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-4 rounded-xl space-y-2" style={{ border: '1.5px solid #E8E4DC', backgroundColor: '#FEFDFB' }}>
                      <p className="text-xs font-bold" style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>Mission {i}</p>
                      <div className="grid grid-cols-2 gap-2">
                        <input placeholder="Secteur (Commerce, BTP...)" style={{ ...inputStyle, padding: '10px 14px' }}
                          onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                        <input placeholder="Type de mission (Bilan, TVA...)" style={{ ...inputStyle, padding: '10px 14px' }}
                          onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                      </div>
                      <textarea placeholder="Description courte de la mission et de votre contribution" rows={2}
                        style={{ ...inputStyle, resize: 'none', padding: '10px 14px' }}
                        onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setStep('competences')}>Retour</Button>
                <Button variant="primary" size="lg" onClick={() => setStep('identite')} className="flex-1">
                  Continuer <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* ── STEP 4 — Vérification d'identité ── */}
          {step === 'identite' && (
            <div className="p-8">
              <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Vérification d'identité</h2>
              <p className="text-sm mb-6" style={{ color: '#5C6B7A' }}>
                Ces documents permettent à notre équipe de vérifier votre identité avant validation de votre profil.
                Vos données sont traitées de façon confidentielle.
              </p>

              <div className="space-y-4">
                {/* Document d'identité */}
                <div>
                  <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>
                    Pièce d'identité (CNI ou Passeport) *
                  </label>
                  {docReceived ? (
                    <div className="flex items-center gap-3 p-4 rounded-xl"
                      style={{ backgroundColor: 'rgba(31,174,122,0.08)', border: '1.5px solid rgba(31,174,122,0.3)' }}>
                      <CheckCircle size={18} style={{ color: '#1FAE7A', flexShrink: 0 }} />
                      <p className="text-sm font-semibold" style={{ color: '#1FAE7A' }}>Document reçu ✓</p>
                      <button onClick={() => setDocReceived(false)} className="ml-auto text-xs" style={{ color: '#5C6B7A' }}>Changer</button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => setDocReceived(true)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all"
                      style={{ border: '2px dashed #DDD8CE', backgroundColor: '#FEFDFB' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = '#F5A623')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = '#DDD8CE')}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F7F3EC' }}>
                        <FileText size={18} style={{ color: '#5C6B7A' }} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-sm" style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>Choisir un fichier</p>
                        <p className="text-xs" style={{ color: '#5C6B7A' }}>JPG, PNG ou PDF — max 5 Mo</p>
                      </div>
                    </button>
                  )}
                </div>

                {/* Selfie */}
                <div>
                  <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>
                    Selfie tenant votre pièce d'identité *
                  </label>
                  {selfieReceived ? (
                    <div className="flex items-center gap-3 p-4 rounded-xl"
                      style={{ backgroundColor: 'rgba(31,174,122,0.08)', border: '1.5px solid rgba(31,174,122,0.3)' }}>
                      <CheckCircle size={18} style={{ color: '#1FAE7A', flexShrink: 0 }} />
                      <p className="text-sm font-semibold" style={{ color: '#1FAE7A' }}>Photo reçue ✓</p>
                      <button onClick={() => setSelfieReceived(false)} className="ml-auto text-xs" style={{ color: '#5C6B7A' }}>Changer</button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => setSelfieReceived(true)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all"
                      style={{ border: '2px dashed #DDD8CE', backgroundColor: '#FEFDFB' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = '#F5A623')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = '#DDD8CE')}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F7F3EC' }}>
                        <Camera size={18} style={{ color: '#5C6B7A' }} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-sm" style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>Prendre une photo</p>
                        <p className="text-xs" style={{ color: '#5C6B7A' }}>Visage et document visible, bonne lumière</p>
                      </div>
                    </button>
                  )}
                </div>

                {/* OTP Mobile Money */}
                <div>
                  <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>
                    Numéro Mobile Money (MTN ou Moov) *
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <input value={phone} onChange={e => setPhone(e.target.value)}
                        placeholder="+229 97 00 00 00" style={{ ...inputStyle, width: '100%' }}
                        disabled={otpVerified}
                        onFocus={e => (e.target.style.borderColor = '#F5A623')}
                        onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
                      />
                    </div>
                    {!otpVerified && (
                      <button onClick={sendOtp}
                        disabled={otpSending || phone.trim().length < 8 || otpCountdown > 0}
                        className="flex-shrink-0 px-4 rounded-xl text-sm font-bold flex items-center gap-2"
                        style={{
                          backgroundColor: otpCountdown > 0 || phone.trim().length < 8 ? '#E8E4DC' : '#F5A623',
                          color: otpCountdown > 0 || phone.trim().length < 8 ? '#5C6B7A' : '#0B1F3A',
                          fontFamily: 'Space Grotesk', opacity: otpSending ? 0.7 : 1,
                        }}
                      >
                        {otpSending ? <RefreshCw size={14} className="animate-spin" /> : <Smartphone size={14} />}
                        {otpCountdown > 0 ? `${otpCountdown}s` : 'Envoyer le code'}
                      </button>
                    )}
                    {otpVerified && (
                      <div className="flex items-center gap-2 px-4 rounded-xl"
                        style={{ backgroundColor: 'rgba(31,174,122,0.08)', border: '1.5px solid rgba(31,174,122,0.3)' }}>
                        <CheckCircle size={16} style={{ color: '#1FAE7A' }} />
                        <span className="text-sm font-bold" style={{ color: '#1FAE7A' }}>Vérifié</span>
                      </div>
                    )}
                  </div>
                  {otpSent && !otpVerified && (
                    <div className="mt-3">
                      <p className="text-xs mb-2" style={{ color: '#5C6B7A' }}>Entrez le code à 6 chiffres reçu par SMS :</p>
                      <div className="flex gap-2">
                        <input value={otpValue}
                          onChange={e => setOtpValue(e.target.value.replace(/\D/g, '').slice(0, OTP_LENGTH))}
                          placeholder="000000" maxLength={OTP_LENGTH}
                          style={{ ...inputStyle, width: 140, fontFamily: 'JetBrains Mono', letterSpacing: 4, fontSize: 18, textAlign: 'center' }}
                          onFocus={e => (e.target.style.borderColor = '#F5A623')}
                          onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
                        />
                        <button onClick={verifyOtp} disabled={otpValue.length < OTP_LENGTH}
                          className="px-4 rounded-xl text-sm font-bold"
                          style={{
                            backgroundColor: otpValue.length === OTP_LENGTH ? '#0B1F3A' : '#E8E4DC',
                            color: otpValue.length === OTP_LENGTH ? '#F7F3EC' : '#5C6B7A',
                            fontFamily: 'Space Grotesk',
                          }}
                        >
                          Confirmer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Button variant="outline" onClick={() => setStep('portfolio')}>Retour</Button>
                <Button variant="primary" size="lg"
                  disabled={!canAdvanceFromIdentite()}
                  onClick={() => setStep('test')}
                  className="flex-1"
                >
                  Passer le test pratique <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* ── STEP 5 — Test pratique (adapté par spécialisation) ── */}
          {step === 'test' && (
            <div className="p-8">
              <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                Test de compétences — {verticalLabel}
              </h2>
              <p className="text-sm mb-6" style={{ color: '#5C6B7A' }}>
                Ce test simule une situation réelle. Pas de piège — nous voulons voir votre approche professionnelle.
                Votre réponse sera examinée par notre équipe lors de la validation de votre dossier.
              </p>
              <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: '#F7F3EC', border: '1px solid #E8E4DC' }}>
                <p className="font-bold text-sm mb-2" style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>Question pratique</p>
                <p className="text-sm leading-relaxed" style={{ color: '#5C6B7A' }}>
                  {vertical ? TEST_QUESTIONS[vertical] : TEST_QUESTIONS.developpement}
                </p>
              </div>
              <textarea value={testAnswer} onChange={e => setTestAnswer(e.target.value)}
                rows={8} placeholder="Votre réponse..."
                style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
              />
              <p className="text-xs mt-1.5 mb-6" style={{ color: '#5C6B7A', fontFamily: 'JetBrains Mono' }}>
                {testAnswer.length} / 200 caractères minimum
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('identite')}>Retour</Button>
                <Button variant="primary" size="lg"
                  onClick={handleSubmitDossier}
                  disabled={testAnswer.trim().length < 200}
                  className="flex-1"
                >
                  Soumettre mon dossier <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* ── STEP 6 — Soumis ── */}
          {step === 'soumis' && (
            <div className="p-8 text-center">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: 'rgba(31,174,122,0.1)', border: '2px solid rgba(31,174,122,0.3)' }}>
                <Briefcase size={36} style={{ color: '#1FAE7A' }} />
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                Dossier soumis avec succès
              </h2>
              <div className="max-w-sm mx-auto">
                <div className="rounded-2xl p-5 mb-6 text-left"
                  style={{ backgroundColor: '#FFF8EC', border: '1.5px solid rgba(245,166,35,0.3)' }}>
                  <p className="text-sm leading-relaxed" style={{ color: '#0B1F3A' }}>
                    Votre dossier est en cours de vérification par notre équipe. Vous recevrez une notification dans les prochaines <strong>24h</strong>.
                  </p>
                  <p className="text-sm mt-3 leading-relaxed" style={{ color: '#5C6B7A' }}>
                    Vous pourrez accéder à votre espace freelance et postuler aux missions dès que votre profil sera validé.
                  </p>
                </div>
                <div className="space-y-2 mb-8">
                  {['Identité vérifiée par notre équipe', 'Test pratique examiné', 'Portfolio analysé'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-left" style={{ color: '#5C6B7A' }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#F7F3EC', border: '1px solid #E8E4DC' }}>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#DDD8CE' }} />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
                <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/')}>
                  Retour à l'accueil <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
