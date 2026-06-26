import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    label: 'Général',
    items: [
      {
        q: "Qu'est-ce que TalentBJ ?",
        a: "TalentBJ est une marketplace de freelances vérifiés basée au Bénin, pensée pour l'Afrique de l'Ouest. Elle connecte des clients (entreprises, startups, particuliers) à des freelances qualifiés dans le digital, le design, le marketing, la comptabilité et plus encore.",
      },
      {
        q: "Dans quels pays est disponible TalentBJ ?",
        a: "TalentBJ est actuellement disponible au Bénin, au Togo et en Côte d'Ivoire. Nous prévoyons d'étendre la plateforme à d'autres pays d'Afrique de l'Ouest courant 2025.",
      },
      {
        q: "TalentBJ est-il gratuit ?",
        a: "L'inscription est entièrement gratuite pour les clients et les freelances. Les clients peuvent publier jusqu'à 1 mission par mois gratuitement. Pour plus de missions, des formules payantes sont disponibles.",
      },
    ],
  },
  {
    label: 'Pour les clients',
    items: [
      {
        q: "Comment fonctionne le matching ?",
        a: "Après avoir décrit votre besoin, notre algorithme analyse les compétences, disponibilités et avis des freelances pour vous proposer les 3 à 5 profils les plus adaptés. Tout se passe en quelques minutes.",
      },
      {
        q: "Comment suis-je protégé si le freelance ne livre pas ?",
        a: "Grâce à notre système d'escrow, votre budget est bloqué sur un compte sécurisé pendant toute la mission. Il n'est libéré au freelance qu'après votre validation. En cas de litige, notre équipe intervient et vous remboursez intégralement si nécessaire.",
      },
      {
        q: "Puis-je contacter un freelance avant de le recruter ?",
        a: "Oui. Une messagerie sécurisée est disponible dès la mise en relation. Vous pouvez discuter du projet, poser des questions et évaluer la compatibilité avant de valider la mission.",
      },
      {
        q: "Quels modes de paiement sont acceptés ?",
        a: "Nous acceptons Orange Money, MTN Mobile Money, Moov Money, ainsi que les virements bancaires BCEAO. Les cartes Visa/Mastercard arrivent prochainement.",
      },
    ],
  },
  {
    label: 'Pour les freelances',
    items: [
      {
        q: "Comment devenir freelance vérifié sur TalentBJ ?",
        a: "Créez votre profil, renseignez vos compétences et expériences, puis soumettez votre dossier de vérification (pièce d'identité + portfolio). Notre équipe valide les profils sous 48h. Une fois vérifié, vous obtenez le badge qui vous distingue.",
      },
      {
        q: "Quelle commission prend TalentBJ ?",
        a: "TalentBJ prend une commission de 8% sur chaque paiement reçu. Elle finance la vérification des profils, la sécurité des paiements et le support client. Aucun frais mensuel ou d'abonnement.",
      },
      {
        q: "Comment je reçois mon argent ?",
        a: "Les fonds sont versés sur votre compte TalentBJ après validation du client. Vous pouvez retirer via Mobile Money (1% de frais) ou virement BCEAO (0.5% de frais) sous 2 à 3 jours ouvrés.",
      },
      {
        q: "Puis-je travailler avec des clients en dehors du Bénin ?",
        a: "Oui. TalentBJ couvre le Bénin, le Togo et la Côte d'Ivoire. Les clients de ces trois pays peuvent vous recruter. Des missions internationales seront possibles avec le lancement de notre offre Diaspora.",
      },
    ],
  },
  {
    label: 'Sécurité & Litiges',
    items: [
      {
        q: "Comment fonctionne la résolution de litiges ?",
        a: "En cas de désaccord entre client et freelance, chaque partie soumet ses arguments et preuves dans un espace dédié. Notre équipe arbitre sous 5 jours ouvrés et prend une décision contraignante basée sur les éléments fournis.",
      },
      {
        q: "Mes données personnelles sont-elles protégées ?",
        a: "Oui. TalentBJ respecte les réglementations RGPD et les normes locales. Vos données ne sont jamais revendues à des tiers. Vous pouvez demander leur suppression à tout moment depuis votre compte.",
      },
      {
        q: "Un freelance peut-il me contacter en dehors de la plateforme ?",
        a: "Nos conditions d'utilisation interdisent le contournement de la plateforme. Toute transaction réalisée hors TalentBJ ne bénéficie d'aucune protection. En cas de signalement, le compte concerné est suspendu.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all cursor-pointer"
      style={{ backgroundColor: '#FFFFFF', border: `1.5px solid ${open ? '#7C3AED' : 'rgba(11,31,58,0.08)'}` }}
      onClick={() => setOpen(v => !v)}
    >
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <p className="font-semibold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{q}</p>
        <ChevronDown
          size={18}
          style={{ color: '#7C3AED', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        />
      </div>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(11,31,58,0.6)', fontFamily: 'Inter' }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].label);

  return (
    <div style={{ backgroundColor: '#F7F3EC', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ backgroundColor: '#0B1F3A' }} className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ backgroundColor: 'rgba(124,58,237,0.2)', color: '#A78BFA', fontFamily: 'JetBrains Mono' }}
          >
            FAQ
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC', letterSpacing: '-0.02em' }}
          >
            Questions{' '}
            <span style={{ color: '#F5A623' }}>fréquentes</span>
          </h1>
          <p className="text-base" style={{ color: 'rgba(247,243,236,0.6)', fontFamily: 'Inter' }}>
            Tout ce que vous devez savoir sur TalentBJ.
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="max-w-4xl mx-auto px-6 py-16">

        {/* Catégories */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {CATEGORIES.map(({ label }) => (
            <button
              key={label}
              onClick={() => setActiveCategory(label)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={{
                backgroundColor: activeCategory === label ? '#7C3AED' : '#FFFFFF',
                color: activeCategory === label ? '#FFFFFF' : '#0B1F3A',
                border: `1.5px solid ${activeCategory === label ? '#7C3AED' : 'rgba(11,31,58,0.12)'}`,
                fontFamily: 'Inter',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Questions */}
        {CATEGORIES.filter(c => c.label === activeCategory).map(({ label, items }) => (
          <div key={label} className="flex flex-col gap-3">
            {items.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>
        ))}

        {/* CTA contact */}
        <div
          className="mt-14 rounded-2xl p-8 text-center"
          style={{ backgroundColor: '#0B1F3A' }}
        >
          <p className="font-bold text-lg mb-2" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
            Vous ne trouvez pas votre réponse ?
          </p>
          <p className="text-sm mb-6" style={{ color: 'rgba(247,243,236,0.5)', fontFamily: 'Inter' }}>
            Notre équipe répond sous 24h.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all"
            style={{ backgroundColor: '#F5A623', color: '#0B1F3A', fontFamily: 'Space Grotesk' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#7C3AED'; e.currentTarget.style.color = '#FFFFFF'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F5A623'; e.currentTarget.style.color = '#0B1F3A'; }}
          >
            Contacter l'équipe <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
