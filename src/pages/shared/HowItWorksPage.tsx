import { useNavigate } from 'react-router-dom';
import { Search, Shield, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';
import VerificationSeal from '../../components/ui/VerificationSeal';
import EscrowTimeline from '../../components/ui/EscrowTimeline';
import MatchScoreBadge from '../../components/ui/MatchScoreBadge';
import Button from '../../components/ui/Button';

const ESCROW_DEMO = [
  { etape: 'depose' as const, label: 'Déposé', date: '2025-01-10', complete: true },
  { etape: 'en_cours' as const, label: 'En cours', date: '2025-01-12', complete: true },
  { etape: 'livre' as const, label: 'Livré', date: '2025-01-20', complete: false },
  { etape: 'valide' as const, label: 'Validé', date: undefined, complete: false },
];

export default function HowItWorksPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#F7F3EC' }}>
      {/* Hero */}
      <section style={{ backgroundColor: '#0B1F3A' }} className="py-20 px-6 text-center">
        <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#F5A623', fontFamily: 'Space Grotesk' }}>
          Comment ça marche
        </p>
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
          Simple, sécurisé,<br />
          <span style={{ color: '#F5A623' }}>fait pour l'Afrique de l'Ouest</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(247,243,236,0.65)' }}>
          TalentBJ combine un moteur de matching IA, un système d'escrow intégré et une vérification humaine des freelances pour des missions qui aboutissent vraiment.
        </p>
      </section>

      {/* Matching */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Search size={20} style={{ color: '#F5A623' }} />
                <span className="font-bold text-sm uppercase tracking-wide" style={{ color: '#F5A623', fontFamily: 'Space Grotesk' }}>01 — Matching IA</span>
              </div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                Décrivez votre besoin en français naturel
              </h2>
              <p className="text-lg mb-4" style={{ color: '#5C6B7A' }}>
                Pas de formulaire à remplir. Écrivez ce dont vous avez besoin comme vous l'expliqueriez à un ami. Notre IA analyse votre description et calcule un score de compatibilité pour chaque freelance.
              </p>
              <ul className="space-y-3">
                {[
                  'Analyse sémantique de votre besoin',
                  'Score de compatibilité 0-100 pour chaque freelance',
                  'Classement par taux de réussite + pertinence',
                  'Résultats en moins de 2 secondes',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#0B1F3A' }}>
                    <CheckCircle size={14} style={{ color: '#1FAE7A', flexShrink: 0 }} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              {[
                { nom: 'Koffi Mensah', metier: 'Développeur Full-Stack', score: 94, seed: 'f01' },
                { nom: 'Ibrahim Coulibaly', metier: 'Développeur Backend', score: 87, seed: 'f03' },
                { nom: 'Jean Akossi', metier: 'Développeur Django', score: 76, seed: 'f05' },
              ].map(({ nom, metier, score, seed }) => (
                <div key={nom} className="flex items-center gap-4 p-4 rounded-2xl" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                  <img src={`https://picsum.photos/seed/${seed}/48`} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" alt={nom} />
                  <div className="flex-1">
                    <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{nom}</p>
                    <p className="text-xs" style={{ color: '#5C6B7A' }}>{metier}</p>
                  </div>
                  <MatchScoreBadge score={score} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vérification */}
      <section style={{ backgroundColor: '#0B1F3A' }} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex items-center justify-center">
              <VerificationSeal size={200} variant="large" animated />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield size={20} style={{ color: '#F5A623' }} />
                <span className="font-bold text-sm uppercase tracking-wide" style={{ color: '#F5A623', fontFamily: 'Space Grotesk' }}>02 — Sceau de vérification</span>
              </div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
                Chaque freelance est vérifié par notre équipe
              </h2>
              <p className="mb-6" style={{ color: 'rgba(247,243,236,0.65)' }}>
                Pas de profil fictif, pas de compétences inventées. Notre équipe étudie le dossier de chaque freelance avant d'attribuer le Sceau de Vérification.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { badge: 'Vérifié', desc: 'Profil vérifié, bon niveau', color: '#F5A623' },
                  { badge: 'Expert', desc: 'Portfolio solide, références', color: '#3B82F6' },
                  { badge: 'Premium', desc: 'Excellence démontrée', color: '#1FAE7A' },
                ].map(({ badge, desc, color }) => (
                  <div key={badge} className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="font-bold text-sm mb-1" style={{ color, fontFamily: 'Space Grotesk' }}>{badge}</p>
                    <p className="text-xs" style={{ color: 'rgba(247,243,236,0.4)' }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Escrow */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CreditCard size={20} style={{ color: '#F5A623' }} />
                <span className="font-bold text-sm uppercase tracking-wide" style={{ color: '#F5A623', fontFamily: 'Space Grotesk' }}>03 — Escrow intégré</span>
              </div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                Les fonds sont bloqués, personne ne peut perdre
              </h2>
              <p className="text-lg mb-4" style={{ color: '#5C6B7A' }}>
                Le client dépose les fonds avant le début du travail. Ils sont bloqués en escrow jusqu'à la validation de la livraison. Le freelance est payé dès validation.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Fonds déposés avant le début de la mission',
                  'Freelance démarre avec la garantie de paiement',
                  'Client valide la livraison avant déblocage',
                  'En cas de litige, notre équipe tranche',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#0B1F3A' }}>
                    <CheckCircle size={14} style={{ color: '#1FAE7A', flexShrink: 0 }} /> {item}
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-2xl" style={{ backgroundColor: '#F7F3EC', border: '1px solid #E8E4DC' }}>
                <p className="text-xs font-bold mb-3" style={{ color: '#5C6B7A', fontFamily: 'Space Grotesk' }}>EXEMPLE ESCROW EN TEMPS RÉEL</p>
                <EscrowTimeline etapes={ESCROW_DEMO} />
              </div>
            </div>
            <div>
              <div className="space-y-3">
                {[
                  { step: '01', titre: 'Client publie et dépose', desc: 'Le client décrit son besoin et dépose les fonds en escrow via Mobile Money.' },
                  { step: '02', titre: 'Matching & démarrage', desc: 'Le freelance accepte la mission. Les fonds sont bloqués — il peut commencer sereinement.' },
                  { step: '03', titre: 'Livraison', desc: 'Le freelance livre son travail. Le client reçoit une notification pour valider.' },
                  { step: '04', titre: 'Validation & paiement', desc: 'Le client valide. Les fonds sont libérés instantanément sur le Mobile Money du freelance.' },
                ].map(({ step, titre, desc }) => (
                  <div key={step} className="flex gap-4 p-4 rounded-xl" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: '#0B1F3A', color: '#F5A623', fontFamily: 'JetBrains Mono' }}>
                      {step}
                    </div>
                    <div>
                      <p className="font-bold text-sm mb-0.5" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{titre}</p>
                      <p className="text-xs leading-relaxed" style={{ color: '#5C6B7A' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: '#0B1F3A' }} className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Combien TalentBJ prend de commission ?',
                a: '10% de commission sur chaque mission validée, prélevée automatiquement sur le paiement du freelance. Aucun frais caché pour les clients.',
              },
              {
                q: 'Que se passe-t-il si je ne suis pas satisfait du travail ?',
                a: 'Vous pouvez ouvrir un litige. Notre équipe étudie le dossier, consulte les deux parties et rend une décision sous 48h. Les fonds restent bloqués en escrow jusqu\'à résolution.',
              },
              {
                q: 'Quels opérateurs Mobile Money sont acceptés ?',
                a: 'MTN Mobile Money et Moov Money pour le Bénin. D\'autres opérateurs West Africa sont en cours d\'intégration (Wave, Orange Money).',
              },
              {
                q: 'Comment est calculé le score de matching ?',
                a: 'Notre algorithme analyse la correspondance compétences/besoin, le taux de réussite historique du freelance, sa disponibilité, et son niveau de badge pour générer un score de 0 à 100.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl p-5" style={{ backgroundColor: '#142A4D', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#F5A623' }}>{q}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(247,243,236,0.6)' }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
          Prêt à commencer ?
        </h2>
        <p className="mb-8" style={{ color: '#5C6B7A' }}>Rejoignez 2 000+ freelances et 500+ clients sur TalentBJ.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" onClick={() => navigate('/client/publier')}>
            Publier un besoin <ArrowRight size={18} />
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('/devenir-freelance')}>
            Devenir freelance
          </Button>
        </div>
      </section>
    </div>
  );
}
