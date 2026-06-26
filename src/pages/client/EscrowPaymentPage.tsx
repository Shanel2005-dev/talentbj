import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, Shield, Lock, CheckCircle, ChevronRight, RefreshCw } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useMissionStore } from '../../store/missionStore';
import { getFreelanceById } from '../../data/mock';

type Provider = 'mtn' | 'moov';
type Step = 'provider' | 'phone' | 'confirm' | 'otp';

const PROVIDERS = [
  {
    id: 'mtn' as Provider,
    name: 'MTN Mobile Money',
    short: 'MTN MoMo',
    color: '#FFC107',
    bg: '#FFFBEB',
    prefix: '96 / 97',
    logo: '🟡',
  },
  {
    id: 'moov' as Provider,
    name: 'Moov Money',
    short: 'Moov Money',
    color: '#0066CC',
    bg: '#EFF6FF',
    prefix: '95 / 66',
    logo: '🔵',
  },
];

const FEES_RATE = 0.015; // 1.5% frais TalentBJ
const OTP_DURATION = 30;

export default function EscrowPaymentPage() {
  const { id: missionId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMissionById, activateMission } = useMissionStore();

  const mission = missionId ? getMissionById(missionId) : undefined;
  const freelance = mission?.freelanceId ? getFreelanceById(mission.freelanceId) : undefined;

  const [step, setStep] = useState<Step>('provider');
  const [success, setSuccess] = useState(false);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpCountdown, setOtpCountdown] = useState(OTP_DURATION);
  const [otpError, setOtpError] = useState('');
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fees = mission ? Math.round(mission.budget * FEES_RATE) : 0;
  const total = mission ? mission.budget + fees : 0;

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  function startCountdown() {
    setOtpCountdown(OTP_DURATION);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setOtpCountdown(c => {
        if (c <= 1) { clearInterval(timerRef.current!); return 0; }
        return c - 1;
      });
    }, 1000);
  }

  async function handleSendOtp() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStep('otp');
    startCountdown();
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  }

  async function handleResendOtp() {
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    startCountdown();
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  }

  async function handleConfirmOtp() {
    const code = otp.join('');
    if (code.length !== 6) { setOtpError('Entrez les 6 chiffres reçus.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    if (missionId) activateMission(missionId);
    setSuccess(true);
  }

  function handleOtpChange(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    setOtpError('');
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function validatePhone() {
    if (phone.replace(/\s/g, '').length < 8) {
      setPhoneError('Numéro invalide — 8 chiffres minimum.');
      return false;
    }
    setPhoneError('');
    return true;
  }

  if (!mission) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F3EC' }}>
        <p style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>Mission introuvable.</p>
      </div>
    );
  }

  const selectedProvider = PROVIDERS.find(p => p.id === provider);

  // ── SUCCESS ──────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F7F3EC' }}>
        <div
          className="w-full max-w-md rounded-3xl p-10 text-center"
          style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', boxShadow: '0 8px 40px rgba(11,31,58,0.1)' }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: '#ECFDF5' }}
          >
            <CheckCircle size={40} style={{ color: '#1FAE7A' }} />
          </div>

          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#1FAE7A', fontFamily: 'Space Grotesk' }}>
            Paiement confirmé
          </p>
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
            Budget sécurisé en escrow !
          </h2>
          <p className="text-sm mb-6" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
            {total.toLocaleString('fr-FR')} FCFA ont été débités de votre compte {selectedProvider?.short} et placés en escrow sécurisé. {freelance?.nom ?? 'Le freelance'} peut maintenant démarrer la mission.
          </p>

          {/* Recap */}
          <div
            className="rounded-2xl p-4 mb-6 text-left"
            style={{ backgroundColor: '#F7F3EC', border: '1px solid #E8E4DC' }}
          >
            {[
              { label: 'Mission', val: mission.titre.length > 40 ? mission.titre.slice(0, 40) + '…' : mission.titre },
              { label: 'Freelance', val: freelance?.nom ?? '—' },
              { label: 'Budget escrow', val: `${mission.budget.toLocaleString('fr-FR')} FCFA` },
              { label: 'Frais TalentBJ (1.5%)', val: `${fees.toLocaleString('fr-FR')} FCFA` },
              { label: 'Total débité', val: `${total.toLocaleString('fr-FR')} FCFA` },
              { label: 'Via', val: selectedProvider?.name ?? '' },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between py-1.5" style={{ borderBottom: '1px solid #E8E4DC' }}>
                <span className="text-xs" style={{ color: '#5C6B7A' }}>{label}</span>
                <span className="text-xs font-bold" style={{ color: '#0B1F3A', fontFamily: 'JetBrains Mono' }}>{val}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Button variant="primary" fullWidth onClick={() => navigate(`/client/mission/${missionId}`)}>
              Suivre la mission <ChevronRight size={15} />
            </Button>
            <Button variant="outline" fullWidth onClick={() => navigate('/client/dashboard')}>
              Tableau de bord
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F7F3EC', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#0B1F3A', paddingBottom: 48 }}>
        <div className="max-w-lg mx-auto px-6 pt-8 pb-4">
          <button
            onClick={() => step === 'provider' ? navigate(`/client/mission/${missionId}`) : setStep(
              step === 'otp' ? 'confirm' : step === 'confirm' ? 'phone' : step === 'phone' ? 'provider' : 'provider'
            )}
            className="flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-70"
            style={{ color: 'rgba(247,243,236,0.5)' }}
          >
            <ArrowLeft size={15} /> Retour
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Lock size={14} style={{ color: '#1FAE7A' }} />
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1FAE7A', fontFamily: 'Space Grotesk' }}>
              Paiement sécurisé — Escrow TalentBJ
            </p>
          </div>
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
            {step === 'provider' ? 'Choisir votre opérateur'
              : step === 'phone' ? 'Votre numéro Mobile Money'
              : step === 'confirm' ? 'Confirmer le paiement'
              : 'Code de confirmation'}
          </h1>
          <p className="text-sm" style={{ color: 'rgba(247,243,236,0.5)', fontFamily: 'Inter' }}>
            {mission.titre} — {mission.budget.toLocaleString('fr-FR')} FCFA
          </p>

          {/* Progress dots */}
          <div className="flex gap-2 mt-4">
            {(['provider', 'phone', 'confirm', 'otp'] as const).map((s, i) => (
              <div
                key={s}
                className="h-1.5 rounded-full flex-1 transition-all"
                style={{
                  backgroundColor: ['provider', 'phone', 'confirm', 'otp'].indexOf(step) >= i
                    ? '#F5A623' : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 pb-16" style={{ marginTop: -32 }}>
        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', boxShadow: '0 4px 24px rgba(11,31,58,0.08)' }}
        >

          {/* ── ÉTAPE 1 : CHOIX OPÉRATEUR ── */}
          {step === 'provider' && (
            <>
              <div className="space-y-3 mb-6">
                {PROVIDERS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setProvider(p.id)}
                    className="w-full p-4 rounded-2xl text-left transition-all"
                    style={{
                      backgroundColor: provider === p.id ? p.bg : '#FEFDFB',
                      border: `2px solid ${provider === p.id ? p.color : '#E8E4DC'}`,
                      boxShadow: provider === p.id ? `0 0 0 3px ${p.color}25` : 'none',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{p.logo}</span>
                      <div className="flex-1">
                        <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                          {p.name}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: '#5C6B7A' }}>
                          Préfixes : {p.prefix}
                        </p>
                      </div>
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{
                          borderColor: provider === p.id ? p.color : '#DDD8CE',
                          backgroundColor: provider === p.id ? p.color : 'transparent',
                        }}
                      >
                        {provider === p.id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Récap montant */}
              <div
                className="rounded-xl p-4 mb-6"
                style={{ backgroundColor: '#F7F3EC', border: '1px solid #E8E4DC' }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-sm" style={{ color: '#5C6B7A' }}>Budget mission</span>
                  <span className="text-sm font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#0B1F3A' }}>
                    {mission.budget.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
                <div className="flex justify-between mb-3" style={{ borderBottom: '1px solid #E8E4DC', paddingBottom: 8 }}>
                  <span className="text-sm" style={{ color: '#5C6B7A' }}>Frais plateforme (1.5%)</span>
                  <span className="text-sm font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#5C6B7A' }}>
                    {fees.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-bold" style={{ color: '#0B1F3A' }}>Total à débiter</span>
                  <span className="text-base font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>
                    {total.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                fullWidth
                disabled={!provider}
                onClick={() => setStep('phone')}
              >
                Continuer <ChevronRight size={15} />
              </Button>
            </>
          )}

          {/* ── ÉTAPE 2 : NUMÉRO DE TÉLÉPHONE ── */}
          {step === 'phone' && selectedProvider && (
            <>
              <div
                className="flex items-center gap-3 p-3 rounded-xl mb-5"
                style={{ backgroundColor: selectedProvider.bg, border: `1px solid ${selectedProvider.color}40` }}
              >
                <span className="text-xl">{selectedProvider.logo}</span>
                <div>
                  <p className="text-xs font-bold" style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>
                    {selectedProvider.name}
                  </p>
                  <p className="text-xs" style={{ color: '#5C6B7A' }}>Préfixes Bénin : {selectedProvider.prefix}</p>
                </div>
              </div>

              <div className="mb-5">
                <label className="text-sm font-bold block mb-2" style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>
                  Numéro de téléphone
                </label>
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-2 px-3 py-3 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: '#F7F3EC', border: '1.5px solid #E8E4DC', fontFamily: 'JetBrains Mono', color: '#0B1F3A', fontSize: 14 }}
                  >
                    <Smartphone size={14} style={{ color: '#5C6B7A' }} />
                    +229
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => { setPhone(e.target.value); setPhoneError(''); }}
                    placeholder="96 00 00 00"
                    maxLength={10}
                    className="flex-1 rounded-xl px-4 py-3 text-sm outline-none"
                    style={{
                      border: `1.5px solid ${phoneError ? '#DC2626' : '#E8E4DC'}`,
                      fontFamily: 'JetBrains Mono',
                      color: '#0B1F3A',
                      backgroundColor: '#FEFDFB',
                      letterSpacing: 2,
                    }}
                    onFocus={e => (e.target.style.borderColor = selectedProvider.color)}
                    onBlur={e => (e.target.style.borderColor = phoneError ? '#DC2626' : '#E8E4DC')}
                  />
                </div>
                {phoneError && <p className="text-xs mt-1.5" style={{ color: '#DC2626' }}>{phoneError}</p>}
                <p className="text-xs mt-2" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
                  Un code de confirmation vous sera envoyé par SMS.
                </p>
              </div>

              <Button
                variant="primary"
                fullWidth
                onClick={() => { if (validatePhone()) setStep('confirm'); }}
              >
                Continuer <ChevronRight size={15} />
              </Button>
            </>
          )}

          {/* ── ÉTAPE 3 : CONFIRMATION ── */}
          {step === 'confirm' && selectedProvider && (
            <>
              <p className="text-sm font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                Vérifiez les détails avant de confirmer
              </p>

              <div
                className="rounded-xl p-4 mb-5"
                style={{ backgroundColor: '#F7F3EC', border: '1px solid #E8E4DC' }}
              >
                {[
                  { label: 'Mission', val: mission.titre.length > 35 ? mission.titre.slice(0, 35) + '…' : mission.titre },
                  { label: 'Freelance', val: freelance?.nom ?? '—' },
                  { label: 'Numéro', val: `+229 ${phone}` },
                  { label: 'Opérateur', val: selectedProvider.name },
                  { label: 'Budget escrow', val: `${mission.budget.toLocaleString('fr-FR')} FCFA` },
                  { label: 'Frais (1.5%)', val: `${fees.toLocaleString('fr-FR')} FCFA` },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between py-2" style={{ borderBottom: '1px solid #E8E4DC' }}>
                    <span className="text-xs" style={{ color: '#5C6B7A' }}>{label}</span>
                    <span className="text-xs font-bold" style={{ color: '#0B1F3A', fontFamily: 'JetBrains Mono' }}>{val}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-3">
                  <span className="text-sm font-bold" style={{ color: '#0B1F3A' }}>Total débité</span>
                  <span className="text-base font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>
                    {total.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
              </div>

              <div
                className="flex items-start gap-3 p-3 rounded-xl mb-5"
                style={{ backgroundColor: 'rgba(31,174,122,0.08)', border: '1px solid rgba(31,174,122,0.2)' }}
              >
                <Shield size={16} style={{ color: '#1FAE7A', flexShrink: 0, marginTop: 1 }} />
                <p className="text-xs" style={{ color: '#1FAE7A', fontFamily: 'Inter' }}>
                  Les fonds sont sécurisés en escrow et ne seront libérés qu'après votre validation de la livraison.
                </p>
              </div>

              <Button variant="primary" fullWidth loading={loading} onClick={handleSendOtp}>
                Envoyer le code OTP <ChevronRight size={15} />
              </Button>
            </>
          )}

          {/* ── ÉTAPE 4 : OTP ── */}
          {step === 'otp' && selectedProvider && (
            <>
              <p className="text-sm mb-1" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
                Code envoyé au{' '}
                <span className="font-bold" style={{ color: '#0B1F3A', fontFamily: 'JetBrains Mono' }}>
                  +229 {phone}
                </span>
              </p>
              <p className="text-xs mb-6" style={{ color: '#5C6B7A' }}>
                Entrez les 6 chiffres reçus par SMS de {selectedProvider.short}.
              </p>

              {/* OTP inputs */}
              <div className="flex gap-2 justify-center mb-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    className="w-11 h-14 text-center text-xl font-bold rounded-xl outline-none"
                    style={{
                      border: `2px solid ${otpError ? '#DC2626' : digit ? selectedProvider.color : '#E8E4DC'}`,
                      fontFamily: 'JetBrains Mono',
                      color: '#0B1F3A',
                      backgroundColor: digit ? `${selectedProvider.color}10` : '#FEFDFB',
                      transition: 'all 0.15s',
                    }}
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-xs text-center mb-3" style={{ color: '#DC2626' }}>{otpError}</p>
              )}

              {/* Countdown / Renvoyer */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {otpCountdown > 0 ? (
                  <p className="text-xs" style={{ color: '#5C6B7A', fontFamily: 'JetBrains Mono' }}>
                    Renvoi disponible dans{' '}
                    <span style={{ color: selectedProvider.color, fontWeight: 700 }}>{otpCountdown}s</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="flex items-center gap-1.5 text-xs font-semibold"
                    style={{ color: selectedProvider.color }}
                  >
                    <RefreshCw size={12} /> Renvoyer le code
                  </button>
                )}
              </div>

              <Button
                variant="primary"
                fullWidth
                loading={loading}
                disabled={otp.join('').length < 6}
                onClick={handleConfirmOtp}
              >
                Confirmer le paiement
              </Button>

              <p className="text-xs text-center mt-3" style={{ color: '#9CA3AF', fontFamily: 'Inter' }}>
                (Simulation — tout code à 6 chiffres est accepté)
              </p>
            </>
          )}
        </div>

        {/* Sécurité */}
        {!success && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-1.5">
              <Lock size={12} style={{ color: '#5C6B7A' }} />
              <span className="text-xs" style={{ color: '#5C6B7A' }}>Chiffrement SSL</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield size={12} style={{ color: '#5C6B7A' }} />
              <span className="text-xs" style={{ color: '#5C6B7A' }}>Fonds garantis</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={12} style={{ color: '#5C6B7A' }} />
              <span className="text-xs" style={{ color: '#5C6B7A' }}>Remboursement litige</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
