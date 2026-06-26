import { useParams, useNavigate } from 'react-router-dom';
import { Code, Palette, Megaphone, Calculator, ArrowRight } from 'lucide-react';
import FreelanceCard from '../../components/freelance/FreelanceCard';
import Button from '../../components/ui/Button';
import { getFreelancesByVertical } from '../../data/mock';
import type { Vertical } from '../../types';

const VERTICAL_META: Record<string, {
  label: string;
  desc: string;
  Icon: typeof Code;
  color: string;
  competences: string[];
}> = {
  developpement: {
    label: 'Développement',
    desc: 'Applications web, APIs, bases de données, Mobile Money, e-commerce. Nos développeurs maîtrisent les frameworks modernes et les réalités du marché africain.',
    Icon: Code,
    color: '#3B82F6',
    competences: ['React', 'Django', 'Node.js', 'PostgreSQL', 'Flutter', 'API REST', 'Mobile Money', 'WordPress'],
  },
  design: {
    label: 'Design',
    desc: 'Identité visuelle, UI/UX, motion design, impression. Des designers qui comprennent les codes culturels et esthétiques d\'Afrique de l\'Ouest.',
    Icon: Palette,
    color: '#EC4899',
    competences: ['Figma', 'Identité visuelle', 'UI/UX', 'Illustration', 'Motion', 'Packaging', 'Photoshop', 'Canva Pro'],
  },
  marketing: {
    label: 'Marketing',
    desc: 'Social media, SEO, contenu, publicité digitale. Des experts qui parlent à votre audience locale avec authenticité et efficacité.',
    Icon: Megaphone,
    color: '#8B5CF6',
    competences: ['Instagram', 'Facebook Ads', 'SEO', 'Copywriting', 'Email Marketing', 'TikTok', 'WhatsApp Marketing', 'Analyse'],
  },
  comptabilite: {
    label: 'Comptabilité & Fiscalité',
    desc: 'Tenue de comptabilité OHADA, déclarations DGI et CNSS, bilans, paie, audit interne. Des experts du droit fiscal et comptable béninois et UEMOA.',
    Icon: Calculator,
    color: '#0D9488',
    competences: ['OHADA', 'SYSCOHADA', 'DGI', 'CNSS', 'Paie', 'Audit', 'Bilan annuel', 'Déclaration fiscale'],
  },
};

export default function VerticalPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const meta = VERTICAL_META[slug ?? ''];
  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F3EC' }}>
        <div className="text-center">
          <p className="font-bold text-lg mb-4" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
            Verticale "{slug}" introuvable
          </p>
          <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  const freelances = getFreelancesByVertical(slug as Vertical);
  const { label, desc, Icon, color, competences } = meta;

  return (
    <div style={{ backgroundColor: '#F7F3EC' }}>
      {/* Hero */}
      <section style={{ backgroundColor: '#0B1F3A' }} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: `${color}20`, border: `1px solid ${color}30` }}
          >
            <Icon size={18} style={{ color }} />
            <span className="font-bold text-sm" style={{ color, fontFamily: 'Space Grotesk' }}>{label}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC', maxWidth: 600, lineHeight: 1.15 }}>
            Freelances {label.toLowerCase()} vérifiés
          </h1>
          <p className="text-lg mb-8" style={{ color: 'rgba(247,243,236,0.65)', maxWidth: 500 }}>{desc}</p>
          <Button variant="primary" size="lg" onClick={() => navigate('/client/publier')}>
            Publier un besoin en {label.toLowerCase()} <ArrowRight size={18} />
          </Button>
        </div>
      </section>

      {/* Compétences disponibles */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: '#5C6B7A', fontFamily: 'Space Grotesk' }}>
            Compétences disponibles
          </p>
          <div className="flex flex-wrap gap-2">
            {competences.map(c => (
              <button
                key={c}
                onClick={() => navigate('/client/publier')}
                className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all"
                style={{
                  backgroundColor: '#fff',
                  border: '1.5px solid #E8E4DC',
                  color: '#0B1F3A',
                  fontFamily: 'Inter',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = color;
                  e.currentTarget.style.color = color;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E8E4DC';
                  e.currentTarget.style.color = '#0B1F3A';
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Freelances */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
              {freelances.length} freelances vérifiés
            </h2>
            <p className="text-sm" style={{ color: '#5C6B7A' }}>
              Triés par taux de réussite
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {freelances
              .sort((a, b) => b.tauxReussite - a.tauxReussite)
              .map(f => (
                <FreelanceCard key={f.id} freelance={f} />
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#0B1F3A' }} className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
          Besoin d'un expert en {label.toLowerCase()} ?
        </h2>
        <p className="mb-8" style={{ color: 'rgba(247,243,236,0.6)' }}>
          Décrivez votre besoin, notre IA vous trouve les 5 meilleurs profils en secondes.
        </p>
        <Button variant="primary" size="lg" onClick={() => navigate('/client/publier')}>
          Décrire mon besoin maintenant <ArrowRight size={18} />
        </Button>
      </section>
    </div>
  );
}
