import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Zap, Globe, ArrowRight, Star, Target, Lock, Smartphone } from 'lucide-react';

const STATS = [
  { value: '500+', label: 'Freelances vérifiés' },
  { value: '1 200+', label: 'Missions réalisées' },
  { value: '3', label: 'Pays couverts' },
  { value: '98%', label: 'Taux de satisfaction' },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Confiance avant tout',
    desc: 'Chaque freelance est vérifié manuellement : identité, compétences, références. Zéro profil fantôme.',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.08)',
  },
  {
    icon: Zap,
    title: 'Rapidité & précision',
    desc: 'Notre algorithme de matching IA connecte un client à 3 freelances qualifiés en moins de 5 minutes.',
    color: '#F5A623',
    bg: 'rgba(245,166,35,0.1)',
  },
  {
    icon: Users,
    title: 'Communauté locale',
    desc: "TalentBJ valorise les talents d'Afrique de l'Ouest. Nous créons des emplois durables dans notre région.",
    color: '#1FAE7A',
    bg: 'rgba(31,174,122,0.1)',
  },
  {
    icon: Globe,
    title: 'Paiement adapté',
    desc: 'Mobile Money, Orange Money, MTN, virement BCEAO — des solutions pensées pour notre contexte.',
    color: '#F5A623',
    bg: 'rgba(245,166,35,0.1)',
  },
];

const TEAM = [
  { name: 'Chano Dossou', role: 'Fondateur & CEO', initials: 'CD', color: '#7C3AED' },
  { name: 'Afia Mensah', role: 'CTO', initials: 'AM', color: '#F5A623' },
  { name: 'Brice Ahounou', role: 'Head of Growth', initials: 'BA', color: '#1FAE7A' },
  { name: 'Ines Sow', role: 'Lead Design', initials: 'IS', color: '#EF4444' },
];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#F7F3EC', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ backgroundColor: '#0B1F3A' }} className="py-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #7C3AED 0%, transparent 60%)' }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ backgroundColor: 'rgba(245,166,35,0.15)', color: '#F5A623', fontFamily: 'JetBrains Mono' }}
          >
            À propos
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC', letterSpacing: '-0.02em' }}
          >
            Nous construisons l'avenir du{' '}
            <span style={{ color: '#F5A623' }}>travail indépendant</span>{' '}
            en Afrique
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(247,243,236,0.6)', fontFamily: 'Inter' }}>
            TalentBJ est né à Cotonou avec une conviction simple : les meilleurs talents africains méritent
            une plateforme qui leur ressemble — fiable, locale et pensée pour leur réalité.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6" style={{ backgroundColor: '#0B1F3A', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-extrabold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#F5A623' }}>
                {value}
              </p>
              <p className="text-xs" style={{ color: 'rgba(247,243,236,0.5)', fontFamily: 'Inter' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ backgroundColor: 'rgba(124,58,237,0.1)', color: '#7C3AED', fontFamily: 'JetBrains Mono' }}
            >
              Notre mission
            </span>
            <h2
              className="text-3xl font-bold mb-5 leading-tight"
              style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A', letterSpacing: '-0.01em' }}
            >
              Connecter les entreprises aux meilleurs freelances vérifiés d'Afrique de l'Ouest
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(11,31,58,0.6)', fontFamily: 'Inter' }}>
              En 2023, les entrepreneurs béninois, togolais et ivoiriens perdaient du temps et de l'argent à
              trouver des prestataires fiables. Les plateformes internationales ignoraient notre contexte
              (Mobile Money, OHADA, langues locales).
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(11,31,58,0.6)', fontFamily: 'Inter' }}>
              TalentBJ a changé ça. Matching IA, vérification manuelle, paiement sécurisé par escrow —
              tout est conçu pour que chaque mission se termine bien.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Target, text: 'Matching précis par IA', color: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
              { icon: Lock, text: 'Paiement escrow sécurisé', color: '#1FAE7A', bg: 'rgba(31,174,122,0.08)' },
              { icon: ShieldCheck, text: 'Freelances vérifiés', color: '#F5A623', bg: 'rgba(245,166,35,0.1)' },
              { icon: Smartphone, text: 'Mobile Money intégré', color: '#0B1F3A', bg: 'rgba(11,31,58,0.07)' },
            ].map(({ icon: Icon, text, color, bg }) => (
              <div
                key={text}
                className="rounded-2xl p-5 flex flex-col gap-3"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(11,31,58,0.07)', boxShadow: '0 2px 12px rgba(11,31,58,0.05)' }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: bg }}>
                  <Icon size={17} style={{ color }} />
                </div>
                <p className="text-sm font-semibold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ backgroundColor: 'rgba(245,166,35,0.12)', color: '#F5A623', fontFamily: 'JetBrains Mono' }}
            >
              Nos valeurs
            </span>
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A', letterSpacing: '-0.01em' }}
            >
              Ce qui nous guide chaque jour
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="rounded-2xl p-6 flex gap-4"
                style={{ backgroundColor: '#F7F3EC', border: '1px solid rgba(11,31,58,0.06)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: bg }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <h3 className="font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(11,31,58,0.55)', fontFamily: 'Inter' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ backgroundColor: 'rgba(124,58,237,0.1)', color: '#7C3AED', fontFamily: 'JetBrains Mono' }}
          >
            L'équipe
          </span>
          <h2
            className="text-3xl font-bold"
            style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A', letterSpacing: '-0.01em' }}
          >
            Des gens passionnés par l'Afrique numérique
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TEAM.map(({ name, role, initials, color }) => (
            <div
              key={name}
              className="rounded-2xl p-6 text-center"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(11,31,58,0.07)', boxShadow: '0 2px 16px rgba(11,31,58,0.05)' }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-lg font-extrabold"
                style={{ backgroundColor: color, color: '#FFFFFF', fontFamily: 'Space Grotesk' }}
              >
                {initials}
              </div>
              <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{name}</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(11,31,58,0.45)', fontFamily: 'Inter' }}>{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 pb-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-2xl mx-auto py-16 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} fill="#F5A623" style={{ color: '#F5A623' }} />
            ))}
          </div>
          <blockquote
            className="text-xl font-semibold mb-6 leading-relaxed"
            style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A', fontStyle: 'italic' }}
          >
            "TalentBJ a transformé la façon dont je trouve des clients. En 3 mois, j'ai réalisé 12 missions et
            doublé mon chiffre d'affaires."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: '#7C3AED', color: '#FFFFFF', fontFamily: 'Space Grotesk' }}
            >
              KA
            </div>
            <div className="text-left">
              <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Koffi Agbossou</p>
              <p className="text-xs" style={{ color: 'rgba(11,31,58,0.45)', fontFamily: 'Inter' }}>Développeur React · Lomé, Togo</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#0B1F3A' }} className="py-20 px-6 text-center">
        <h2
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC', letterSpacing: '-0.01em' }}
        >
          Rejoignez l'aventure TalentBJ
        </h2>
        <p className="text-sm mb-8" style={{ color: 'rgba(247,243,236,0.55)', fontFamily: 'Inter' }}>
          Client ou freelance, vous êtes au bon endroit.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/inscription"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all"
            style={{ backgroundColor: '#F5A623', color: '#0B1F3A', fontFamily: 'Space Grotesk' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#7C3AED'; e.currentTarget.style.color = '#FFFFFF'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F5A623'; e.currentTarget.style.color = '#0B1F3A'; }}
          >
            S'inscrire gratuitement <ArrowRight size={15} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all"
            style={{ color: '#FFFFFF', border: '1.5px solid rgba(255,255,255,0.3)', fontFamily: 'Space Grotesk' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#F5A623'; e.currentTarget.style.color = '#F5A623'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#FFFFFF'; }}
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  );
}
