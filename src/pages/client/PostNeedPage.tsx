import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Code, Palette, Megaphone, Calculator, ArrowRight, Lightbulb, User, Building2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useMissionStore } from '../../store/missionStore';
import type { Vertical } from '../../types';

const schema = z.object({
  description: z.string().min(30, 'Décrivez votre besoin en au moins 30 caractères.'),
  vertical: z.enum(['developpement', 'design', 'marketing', 'comptabilite']).optional(),
  budget: z.preprocess(v => (v === '' || v == null ? undefined : Number(v)), z.number().min(10000, 'Budget minimum 10 000 FCFA').optional()),
  delai: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const VERTICAL_OPTIONS = [
  { value: 'developpement', label: 'Développement web & mobile', Icon: Code, desc: 'Apps, sites, API, DevOps' },
  { value: 'design', label: 'Design & UI/UX', Icon: Palette, desc: 'Identité visuelle, interfaces, motion' },
  { value: 'marketing', label: 'Marketing digital & CM', Icon: Megaphone, desc: 'Réseaux sociaux, SEO, publicité' },
  { value: 'comptabilite', label: 'Comptabilité & Fiscalité', Icon: Calculator, desc: 'OHADA, DGI, CNSS, bilan, paie' },
] as const;

const DELAI_OPTIONS = ['1 semaine', '2 semaines', '1 mois', '2 mois', '3 mois ou plus', 'À définir'];

const EXAMPLES = [
  'Je cherche un développeur Django pour créer un site e-commerce avec paiement Mobile Money. 200 produits, espace client, tableau de bord admin.',
  'J\'ai besoin d\'un graphiste pour créer l\'identité visuelle complète de ma startup fintech : logo, charte, templates réseaux sociaux.',
  'Je cherche un community manager pour gérer mes pages Facebook et Instagram 3 mois : 1 post par jour, réponse aux commentaires, rapport mensuel.',
];

interface LocationState {
  fromFreelanceId?: string;
  fromFreelanceNom?: string;
  vertical?: string;
}

export default function PostNeedPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useAuthStore();
  const { createMission, sendInvitation } = useMissionStore();
  const ctx = (location.state as LocationState) || {};
  const isEntreprise = location.pathname.startsWith('/entreprise');
  const [selectedVertical, setSelectedVertical] = useState<string>(ctx.vertical ?? '');

  const {
    register, handleSubmit, setValue, watch,
    formState: { errors },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<FormData>({ resolver: zodResolver(schema) as any });

  const descValue = watch('description') || '';

  // Guard
  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F3EC' }}>
        <div className="text-center max-w-sm">
          <p className="text-lg font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Connexion requise</p>
          <p className="text-sm mb-6" style={{ color: '#5C6B7A' }}>Connectez-vous pour publier un besoin.</p>
          <Button onClick={() => navigate('/connexion')}>Se connecter</Button>
        </div>
      </div>
    );
  }

  function onSubmit(data: FormData) {
    const missionId = `m-new-${Date.now()}`;
    const today = new Date().toISOString().slice(0, 10);

    // Create mission in store
    createMission({
      id: missionId,
      titre: data.description.slice(0, 60) + (data.description.length > 60 ? '...' : ''),
      description: data.description,
      budget: data.budget ?? 0,
      delai: data.delai ?? 'À définir',
      vertical: (selectedVertical || 'developpement') as Vertical,
      statut: 'ouverte',
      clientId: 'c01',
      etapesEscrow: [],
      datePublication: today,
      competencesRequises: [],
    });

    // Auto-invite if coming from a freelance profile
    if (ctx.fromFreelanceId) {
      sendInvitation({
        id: `inv-auto-${missionId}`,
        missionId,
        freelanceId: ctx.fromFreelanceId,
        statut: 'en_attente',
        dateEnvoi: today,
      });
    }

    navigate('/client/resultats', {
      state: {
        description: data.description,
        vertical: selectedVertical || undefined,
        budget: data.budget || undefined,
        delai: data.delai || undefined,
        missionId,
      },
    });
  }

  const fieldStyle = {
    width: '100%',
    borderRadius: 12,
    padding: '12px 16px',
    fontSize: 14,
    outline: 'none',
    backgroundColor: '#FEFDFB',
    border: '1.5px solid #DDD8CE',
    fontFamily: 'Inter, sans-serif',
    color: '#0B1F3A',
    transition: 'border-color 0.15s',
  };

  return (
    <div style={{ backgroundColor: '#F7F3EC', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#0B1F3A', paddingBottom: 48 }}>
        <div className="max-w-3xl mx-auto px-6 pt-12 pb-4">
          <div className="flex items-center gap-2 mb-2">
            {isEntreprise
              ? <Building2 size={16} style={{ color: '#F5A623' }} />
              : null}
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: '#F5A623', fontFamily: 'Space Grotesk' }}>
              {isEntreprise ? 'Espace Entreprise — Nouvelle mission' : 'Étape 1 — Décrire votre besoin'}
            </p>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
            Publiez votre mission
          </h1>
          <p style={{ color: 'rgba(247,243,236,0.6)', fontFamily: 'Inter' }}>
            Notre moteur de matching analysera votre description et vous recommandera les meilleurs freelances en quelques secondes.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6" style={{ marginTop: -32 }}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <form onSubmit={(handleSubmit as any)(onSubmit)} className="space-y-5 pb-16">

          {/* Bannière contexte freelance ciblé */}
          {ctx.fromFreelanceNom && (
            <div
              className="rounded-2xl px-5 py-4 flex items-center gap-4"
              style={{ backgroundColor: '#FFF8EC', border: '1.5px solid #F5A623' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#F5A623' }}
              >
                <User size={18} style={{ color: '#0B1F3A' }} />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                  Invitation automatique : {ctx.fromFreelanceNom}
                </p>
                <p className="text-xs" style={{ color: '#5C6B7A' }}>
                  {ctx.fromFreelanceNom} sera automatiquement invité à votre mission. Vous pourrez aussi inviter un 2ème profil.
                </p>
              </div>
            </div>
          )}

          {/* Description principale */}
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', boxShadow: '0 4px 20px rgba(11,31,58,0.06)' }}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #F7F3EC', backgroundColor: '#FEFDFB' }}>
              <h2 className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                Décrivez votre besoin en langage naturel
              </h2>
              <p className="text-sm mt-0.5" style={{ color: '#5C6B7A' }}>
                Plus vous êtes précis, meilleur sera le matching.
              </p>
            </div>
            <div className="p-6">
              <textarea
                {...register('description')}
                rows={6}
                placeholder="Ex : Je cherche un développeur Django pour créer mon site e-commerce avec paiement Mobile Money, gestion des stocks et espace client. Budget autour de 200 000 FCFA, délai 4 semaines..."
                style={{ ...fieldStyle, resize: 'none', lineHeight: 1.6 }}
                onFocus={e => (e.target.style.borderColor = '#F5A623')}
                onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
              />
              <div className="flex items-center justify-between mt-2">
                {errors.description && (
                  <p className="text-xs" style={{ color: '#DC2626' }}>{errors.description.message}</p>
                )}
                <p className="text-xs ml-auto" style={{ color: '#5C6B7A', fontFamily: 'JetBrains Mono' }}>
                  {descValue.length} caractères
                </p>
              </div>

              {/* Exemples */}
              <div className="mt-4">
                <p className="text-xs font-semibold mb-2 flex items-center gap-1" style={{ color: '#5C6B7A' }}>
                  <Lightbulb size={12} /> Exemples de descriptions :
                </p>
                <div className="space-y-2">
                  {EXAMPLES.map((ex, i) => (
                    <button
                      key={i} type="button"
                      onClick={() => setValue('description', ex)}
                      className="block w-full text-left text-xs px-3 py-2 rounded-lg transition-all hover:shadow-sm"
                      style={{ backgroundColor: '#F7F3EC', color: '#5C6B7A', border: '1px solid #E8E4DC' }}
                    >
                      {ex.slice(0, 90)}...
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Verticale */}
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #F7F3EC', backgroundColor: '#FEFDFB' }}>
              <h2 className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                Domaine du projet <span style={{ color: '#5C6B7A', fontWeight: 400, fontSize: 13 }}>(facultatif — affine le matching)</span>
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {VERTICAL_OPTIONS.map(({ value, label, Icon, desc }) => (
                <button
                  key={value} type="button"
                  onClick={() => {
                    setSelectedVertical(selectedVertical === value ? '' : value);
                    setValue('vertical', selectedVertical === value ? undefined : value as Vertical);
                  }}
                  className="p-4 rounded-xl text-left transition-all"
                  style={{
                    border: `2px solid ${selectedVertical === value ? '#F5A623' : '#E8E4DC'}`,
                    backgroundColor: selectedVertical === value ? '#FFF8EC' : '#FEFDFB',
                  }}
                >
                  <Icon size={20} style={{ color: selectedVertical === value ? '#F5A623' : '#5C6B7A' }} className="mb-2" />
                  <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{label}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#5C6B7A' }}>{desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Budget & Délai */}
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #F7F3EC', backgroundColor: '#FEFDFB' }}>
              <h2 className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                Budget & Délai <span style={{ color: '#5C6B7A', fontWeight: 400, fontSize: 13 }}>(facultatifs)</span>
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>
                  Budget maximum (FCFA)
                </label>
                <input
                  {...register('budget')}
                  type="number"
                  placeholder="Ex: 200 000"
                  style={fieldStyle}
                  onFocus={e => (e.target.style.borderColor = '#F5A623')}
                  onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
                />
                {errors.budget && <p className="text-xs mt-1" style={{ color: '#DC2626' }}>{errors.budget.message}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Délai souhaité</label>
                <select
                  {...register('delai')}
                  style={{ ...fieldStyle, appearance: 'none' }}
                  onFocus={e => (e.target.style.borderColor = '#F5A623')}
                  onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
                >
                  <option value="">Choisir un délai...</option>
                  {DELAI_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" variant="primary" size="lg" fullWidth>
            Trouver les meilleurs profils <ArrowRight size={18} />
          </Button>

          <p className="text-center text-xs" style={{ color: '#5C6B7A' }}>
            Gratuit · Résultats instantanés · Aucun engagement avant de contacter un freelance
          </p>
        </form>
      </div>
    </div>
  );
}
