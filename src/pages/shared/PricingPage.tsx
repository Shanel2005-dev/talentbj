import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const CLIENT_PLANS = [
  {
    name: 'Starter',
    price: 'Gratuit',
    sub: 'Pour tester la plateforme',
    color: '#0B1F3A',
    border: 'rgba(11,31,58,0.12)',
    features: [
      '1 mission publiée par mois',
      'Matching IA (3 profils)',
      'Messagerie incluse',
      'Support par email',
    ],
    cta: "Commencer gratuitement",
    ctaBg: '#0B1F3A',
    ctaColor: '#F7F3EC',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '9 900 FCFA',
    sub: 'Par mission publiée',
    color: '#7C3AED',
    border: '#7C3AED',
    features: [
      'Missions illimitées',
      'Matching IA prioritaire (5 profils)',
      'Escrow sécurisé inclus',
      'Support prioritaire 24h',
      'Badge "Client vérifié"',
    ],
    cta: "Choisir Pro",
    ctaBg: '#7C3AED',
    ctaColor: '#FFFFFF',
    highlight: true,
  },
  {
    name: 'Entreprise',
    price: 'Sur devis',
    sub: 'Pour les structures et équipes',
    color: '#F5A623',
    border: 'rgba(245,166,35,0.4)',
    features: [
      'Compte multi-utilisateurs',
      'Tableau de bord RH dédié',
      'Contrats et factures automatiques',
      'Account manager dédié',
      'Intégration API possible',
    ],
    cta: "Nous contacter",
    ctaBg: '#F5A623',
    ctaColor: '#0B1F3A',
    highlight: false,
  },
];

const FREELANCE_FEES = [
  { label: 'Commission plateforme', value: '8%', note: 'Prélevée sur chaque paiement reçu' },
  { label: 'Inscription & vérification', value: 'Gratuit', note: 'Profil + badge de vérification offert' },
  { label: 'Retrait Mobile Money', value: '1%', note: 'Orange Money, MTN, Moov' },
  { label: 'Retrait virement BCEAO', value: '0.5%', note: 'Délai 2–3 jours ouvrés' },
];

const FAQS = [
  {
    q: "Comment fonctionne l'escrow ?",
    a: "Le client dépose le budget avant la mission. Les fonds sont libérés au freelance uniquement après validation de la livraison. Zéro risque des deux côtés.",
  },
  {
    q: "La commission est-elle négociable ?",
    a: "Non, la commission de 8% est fixe et transparente. Elle finance la vérification des profils, le support et la sécurité des paiements.",
  },
  {
    q: "Puis-je publier une mission sans payer ?",
    a: "Oui, avec le plan Starter vous pouvez publier 1 mission par mois gratuitement et recevoir 3 propositions de freelances vérifiés.",
  },
];

export default function PricingPage() {
  return (
    <div style={{ backgroundColor: '#F7F3EC', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ backgroundColor: '#0B1F3A' }} className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ backgroundColor: 'rgba(245,166,35,0.15)', color: '#F5A623', fontFamily: 'JetBrains Mono' }}
          >
            Tarifs
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC', letterSpacing: '-0.02em' }}
          >
            Simple, transparent,{' '}
            <span style={{ color: '#F5A623' }}>sans surprise</span>
          </h1>
          <p className="text-base" style={{ color: 'rgba(247,243,236,0.6)', fontFamily: 'Inter' }}>
            Aucun abonnement caché. Vous ne payez que ce que vous utilisez.
          </p>
        </div>
      </section>

      {/* Plans clients */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ backgroundColor: 'rgba(124,58,237,0.1)', color: '#7C3AED', fontFamily: 'JetBrains Mono' }}
          >
            Pour les clients
          </span>
          <h2 className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A', letterSpacing: '-0.01em' }}>
            Choisissez votre formule
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {CLIENT_PLANS.map(({ name, price, sub, border, features, cta, ctaBg, ctaColor, highlight, color }) => (
            <div
              key={name}
              className="rounded-2xl p-7 flex flex-col"
              style={{
                backgroundColor: '#FFFFFF',
                border: `2px solid ${border}`,
                boxShadow: highlight ? '0 8px 40px rgba(124,58,237,0.15)' : '0 2px 16px rgba(11,31,58,0.06)',
                position: 'relative',
              }}
            >
              {highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: '#7C3AED', color: '#FFFFFF', fontFamily: 'JetBrains Mono', whiteSpace: 'nowrap' }}
                >
                  Le plus populaire
                </div>
              )}
              <p className="font-bold text-sm mb-1 uppercase tracking-wider" style={{ fontFamily: 'JetBrains Mono', color, fontSize: 11 }}>
                {name}
              </p>
              <p className="text-3xl font-extrabold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                {price}
              </p>
              <p className="text-xs mb-6" style={{ color: 'rgba(11,31,58,0.45)', fontFamily: 'Inter' }}>{sub}</p>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: '#0B1F3A', fontFamily: 'Inter' }}>
                    <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#1FAE7A' }} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={name === 'Entreprise' ? '/contact' : '/inscription'}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
                style={{ backgroundColor: ctaBg, color: ctaColor, fontFamily: 'Space Grotesk' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                {cta} <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Freelance fees */}
      <section className="px-6 py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ backgroundColor: 'rgba(245,166,35,0.12)', color: '#F5A623', fontFamily: 'JetBrains Mono' }}
            >
              Pour les freelances
            </span>
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A', letterSpacing: '-0.01em' }}>
              Inscription gratuite, commission transparente
            </h2>
            <p className="text-sm" style={{ color: 'rgba(11,31,58,0.5)', fontFamily: 'Inter' }}>
              Vous ne payez qu'en cas de succès. Zéro frais d'abonnement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FREELANCE_FEES.map(({ label, value, note }) => (
              <div
                key={label}
                className="rounded-2xl p-5 flex items-center gap-4"
                style={{ backgroundColor: '#F7F3EC', border: '1px solid rgba(11,31,58,0.07)' }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#0B1F3A' }}
                >
                  <p className="font-extrabold text-sm" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>{value}</p>
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{label}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(11,31,58,0.45)', fontFamily: 'Inter' }}>{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { icon: ShieldCheck, title: 'Paiement 100% sécurisé', desc: "Vos fonds sont protégés par notre système d'escrow. Libération uniquement après validation.", color: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
            { icon: Zap, title: 'Remboursement garanti', desc: "Si le freelance ne livre pas, vous êtes intégralement remboursé. Aucune question posée.", color: '#1FAE7A', bg: 'rgba(31,174,122,0.08)' },
          ].map(({ icon: Icon, title, desc, color, bg }) => (
            <div
              key={title}
              className="rounded-2xl p-6 flex gap-4"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(11,31,58,0.07)', boxShadow: '0 2px 16px rgba(11,31,58,0.05)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                <Icon size={20} style={{ color }} />
              </div>
              <div>
                <h3 className="font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(11,31,58,0.55)', fontFamily: 'Inter' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="px-6 pb-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto py-16">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
            Questions fréquentes sur les tarifs
          </h2>
          <div className="flex flex-col gap-4">
            {FAQS.map(({ q, a }) => (
              <div
                key={q}
                className="rounded-2xl p-6"
                style={{ backgroundColor: '#F7F3EC', border: '1px solid rgba(11,31,58,0.07)' }}
              >
                <p className="font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{q}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(11,31,58,0.6)', fontFamily: 'Inter' }}>{a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/faq" className="text-sm font-semibold" style={{ color: '#7C3AED', fontFamily: 'Inter' }}>
              Voir toutes les questions →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#0B1F3A' }} className="py-16 px-6 text-center">
        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
          Prêt à démarrer ?
        </h2>
        <p className="text-sm mb-8" style={{ color: 'rgba(247,243,236,0.5)', fontFamily: 'Inter' }}>
          Inscription gratuite en moins de 2 minutes.
        </p>
        <Link
          to="/inscription"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm"
          style={{ backgroundColor: '#F5A623', color: '#0B1F3A', fontFamily: 'Space Grotesk' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#7C3AED'; e.currentTarget.style.color = '#FFFFFF'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F5A623'; e.currentTarget.style.color = '#0B1F3A'; }}
        >
          Créer mon compte gratuitement <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}
