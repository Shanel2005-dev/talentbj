import { useNavigate } from 'react-router-dom';
import { TrendingUp, Shield, Smartphone, ArrowRight, Star } from 'lucide-react';
import VerificationSeal from '../../components/ui/VerificationSeal';
import Button from '../../components/ui/Button';

const AVANTAGES = [
  {
    Icon: Smartphone, titre: 'Paiement Mobile Money',
    desc: 'Recevez vos paiements directement sur MTN Money ou Moov Money. Fini les galères de virement international ou de PayPal inaccessible.',
  },
  {
    Icon: TrendingUp, titre: 'Missions qui viennent à vous',
    desc: 'Notre moteur de matching vous recommande automatiquement pour les missions qui correspondent à votre profil. Vous ne cherchez plus, les missions vous trouvent.',
  },
  {
    Icon: Shield, titre: 'Paiement garanti par escrow',
    desc: 'Les fonds sont bloqués avant que vous commenciez. Impossible de travailler gratuitement : l\'argent est là, sécurisé, jusqu\'à la validation de votre livraison.',
  },
];

const TEMOIGNAGES = [
  {
    nom: 'Koffi Mensah', metier: 'Développeur Django', ville: 'Cotonou', seed: 'f01',
    text: 'En 2 mois sur TalentBJ, j\'ai gagné autant qu\'en 6 mois de démarchage WhatsApp. Le matching m\'apporte des clients qui ont vraiment besoin de mes compétences.',
    note: 5,
  },
  {
    nom: 'Adeline Akpo', metier: 'Designer UI/UX', ville: 'Cotonou', seed: 'f11',
    text: 'Le badge Premium que j\'ai obtenu a fait tripler mes demandes. Les clients voient que mon niveau est certifié, pas juste déclaré.',
    note: 5,
  },
  {
    nom: 'Sandrine Gbaguidi', metier: 'Social Media Manager', ville: 'Cotonou', seed: 'f21',
    text: 'Je recommande TalentBJ à tous les freelances béninois. L\'escrow protège vraiment, j\'ai été payée sans exception sur chaque mission.',
    note: 5,
  },
];

export default function FreelanceLandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#F7F3EC' }}>
      {/* Hero */}
      <section style={{ backgroundColor: '#0B1F3A' }} className="py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-14">
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{ backgroundColor: 'rgba(245,166,35,0.15)', color: '#F5A623', fontFamily: 'Space Grotesk' }}
            >
              Pour les talents du numérique
            </div>
            <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC', lineHeight: 1.15 }}>
              Devenez un freelance<br />
              <span style={{ color: '#F5A623' }}>vérifié et visible</span>
            </h1>
            <p className="text-lg mb-8" style={{ color: 'rgba(247,243,236,0.65)', fontFamily: 'Inter' }}>
              Obtenez le Sceau de Vérification TalentBJ et recevez des missions qualifiées directement, payées en Mobile Money, avec escrow intégré.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" onClick={() => navigate('/freelance/inscription')}>
                Créer mon profil vérifié <ArrowRight size={18} />
              </Button>
              <Button variant="ghost" size="lg" onClick={() => navigate('/comment-ca-marche')}>
                Comment fonctionne la vérification ?
              </Button>
            </div>

            <div className="flex gap-8 mt-10">
              {[
                { val: '2 000+', label: 'Freelances vérifiés' },
                { val: '98%', label: 'Paiements garantis' },
                { val: '500+', label: 'Clients actifs' },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p className="text-xl font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>{val}</p>
                  <p className="text-xs" style={{ color: 'rgba(247,243,236,0.45)' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0">
            <VerificationSeal size={240} variant="large" animated />
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#F5A623', fontFamily: 'Space Grotesk' }}>
              Pourquoi TalentBJ
            </p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
              Ce que vous n'avez pas ailleurs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AVANTAGES.map(({ Icon, titre, desc }) => (
              <div key={titre} className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#0B1F3A' }}>
                  <Icon size={22} style={{ color: '#F5A623' }} />
                </div>
                <h3 className="font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{titre}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C6B7A' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Étapes de vérification */}
      <section style={{ backgroundColor: '#0B1F3A' }} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#F5A623', fontFamily: 'Space Grotesk' }}>
              Votre parcours de vérification
            </p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
              4 étapes vers le Sceau
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: 1, t: 'Profil', d: 'Nom, photo, ville, bio et verticale. 5 minutes pour compléter.' },
              { n: 2, t: 'Portfolio', d: 'Ajoutez 3 réalisations représentatives de votre meilleur travail.' },
              { n: 3, t: 'Test pratique', d: 'Un exercice adapté à votre vertical (1h max). Pas de piège, que du concret.' },
              { n: 4, t: 'Sceau attribué', d: 'Notre équipe valide et vous attribue votre badge sous 48h ouvrées.' },
            ].map(({ n, t, d }) => (
              <div
                key={n}
                className="rounded-2xl p-5"
                style={{ backgroundColor: '#142A4D', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold mb-3"
                  style={{ backgroundColor: '#F5A623', color: '#0B1F3A', fontFamily: 'JetBrains Mono' }}
                >
                  0{n}
                </div>
                <h3 className="font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>{t}</h3>
                <p className="text-sm" style={{ color: 'rgba(247,243,236,0.55)' }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages freelances */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
              Ils ont obtenu leur Sceau
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEMOIGNAGES.map(({ nom, metier, ville, seed, text, note }) => (
              <div key={nom} className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: note }).map((_, i) => (
                    <Star key={i} size={13} style={{ color: '#F5A623', fill: '#F5A623' }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#5C6B7A' }}>"{text}"</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid #F7F3EC' }}>
                  <img src={`https://picsum.photos/seed/${seed}/40`} className="w-10 h-10 rounded-full object-cover" alt={nom} />
                  <div>
                    <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{nom}</p>
                    <p className="text-xs" style={{ color: '#5C6B7A' }}>{metier} · {ville}</p>
                  </div>
                  <div className="ml-auto">
                    <VerificationSeal size={28} variant="mini" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#0B1F3A' }} className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
          Prêt à décrocher vos premières missions ?
        </h2>
        <p className="mb-8" style={{ color: 'rgba(247,243,236,0.6)' }}>Inscription gratuite · Pas de commission avant la 1ère mission</p>
        <Button variant="primary" size="lg" onClick={() => navigate('/freelance/inscription')}>
          Créer mon profil — Gratuit <ArrowRight size={18} />
        </Button>
      </section>
    </div>
  );
}
