import { Link } from 'react-router-dom';
import { MapPin, Star, CheckCircle, Check } from 'lucide-react';
import type { Freelance } from '../../types';
import VerificationSeal from '../ui/VerificationSeal';
import MatchScoreBadge from '../ui/MatchScoreBadge';

const VERTICAL_LABELS: Record<string, string> = {
  developpement: 'Développement',
  design: 'Design',
  marketing: 'Marketing',
  comptabilite: 'Comptabilité',
};

const BADGE_CONFIG = {
  premium: { label: 'Premium', bg: '#0B1F3A', text: '#F5A623', border: '#F5A623' },
  expert: { label: 'Expert', bg: '#F5F3FF', text: '#7C3AED', border: '#C4B5FD' },
  verifie: { label: 'Vérifié', bg: '#ECFDF5', text: '#1FAE7A', border: '#6EE7B7' },
};

interface FreelanceCardProps {
  freelance: Freelance;
  matchScore?: number;
  matchRaison?: string;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export default function FreelanceCard({ freelance, matchScore, matchRaison, selectable, selected, onSelect }: FreelanceCardProps) {
  const badge = freelance.badge ? BADGE_CONFIG[freelance.badge] : null;
  const noteAvg = freelance.avis.length > 0
    ? (freelance.avis.reduce((s, a) => s + a.note, 0) / freelance.avis.length).toFixed(1)
    : null;

  const tarif = freelance.tarifHoraire
    ? `${freelance.tarifHoraire.toLocaleString('fr-FR')} FCFA/h`
    : `À partir de ${freelance.tarifForfait?.toLocaleString('fr-FR')} FCFA`;

  const cardContent = (
    <>
      {/* Photo + overlay */}
      <div className="relative h-40 overflow-hidden" style={{ backgroundColor: '#142A4D' }}>
        <img
          src={freelance.photo}
          alt={freelance.nom}
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
        />

        {/* Vertical badge */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor: '#0B1F3A', color: '#F5A623', fontFamily: 'Space Grotesk', fontSize: 10 }}
        >
          {VERTICAL_LABELS[freelance.vertical]}
        </div>

        {/* Verification seal if verified */}
        {(freelance.badge === 'expert' || freelance.badge === 'premium') && (
          <div className="absolute top-3 right-3">
            <VerificationSeal size={36} variant="mini" />
          </div>
        )}

        {/* Selection checkmark overlay */}
        {selectable && (
          <div
            className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{
              backgroundColor: selected ? '#1FAE7A' : 'rgba(255,255,255,0.3)',
              border: `2px solid ${selected ? '#1FAE7A' : 'rgba(255,255,255,0.6)'}`,
            }}
          >
            {selected && <Check size={14} color="#fff" strokeWidth={3} />}
          </div>
        )}

        {/* Disponibilité */}
        {!freelance.disponible && (
          <div
            className="absolute bottom-0 left-0 right-0 px-3 py-1.5 text-xs font-semibold text-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#9CA3AF' }}
          >
            Actuellement indisponible
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3
              className="font-bold text-base truncate"
              style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}
            >
              {freelance.nom}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={11} style={{ color: '#5C6B7A', flexShrink: 0 }} />
              <span className="text-xs truncate" style={{ color: '#5C6B7A' }}>{freelance.ville}</span>
            </div>
          </div>

          {/* Match score OR badge */}
          {matchScore ? (
            <MatchScoreBadge score={matchScore} size="sm" />
          ) : badge ? (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: badge.bg, color: badge.text, border: `1px solid ${badge.border}`, fontFamily: 'Space Grotesk' }}
            >
              {badge.label}
            </span>
          ) : null}
        </div>

        {/* Compétences */}
        <div className="flex flex-wrap gap-1 mb-3">
          {freelance.competences.slice(0, 3).map(c => (
            <span
              key={c}
              className="px-2 py-0.5 rounded-md text-xs"
              style={{ backgroundColor: '#F7F3EC', color: '#5C6B7A', fontFamily: 'Inter' }}
            >
              {c}
            </span>
          ))}
          {freelance.competences.length > 3 && (
            <span className="px-2 py-0.5 rounded-md text-xs" style={{ color: '#5C6B7A' }}>
              +{freelance.competences.length - 3}
            </span>
          )}
        </div>

        {/* Match reason */}
        {matchRaison && (
          <p className="text-xs mb-3 leading-relaxed" style={{ color: '#F5A623', fontFamily: 'Inter' }}>
            {matchRaison}
          </p>
        )}

        {/* Stats */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid #F7F3EC' }}
        >
          <div className="flex items-center gap-1">
            {noteAvg && (
              <>
                <Star size={12} style={{ color: '#F5A623', fill: '#F5A623' }} />
                <span className="text-xs font-bold" style={{ color: '#0B1F3A', fontFamily: 'JetBrains Mono' }}>
                  {noteAvg}
                </span>
                <span className="text-xs" style={{ color: '#5C6B7A' }}>({freelance.avis.length})</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle size={11} style={{ color: '#1FAE7A' }} />
            <span className="text-xs font-bold" style={{ color: '#5C6B7A', fontFamily: 'JetBrains Mono' }}>
              {freelance.nombreMissions}
            </span>
            <span className="text-xs" style={{ color: '#5C6B7A' }}>missions</span>
          </div>
        </div>

        {/* Tarif */}
        <div className="mt-2">
          <span
            className="text-sm font-bold"
            style={{ fontFamily: 'JetBrains Mono', color: '#0B1F3A' }}
          >
            {tarif}
          </span>
        </div>
      </div>
    </>
  );

  const sharedStyle = {
    backgroundColor: selected ? '#F0FDF9' : '#fff',
    border: selected ? '2px solid #1FAE7A' : '1px solid #E8E4DC',
    boxShadow: selected
      ? '0 0 0 3px rgba(31,174,122,0.15), 0 2px 12px rgba(11,31,58,0.06)'
      : '0 2px 12px rgba(11,31,58,0.06)',
    textDecoration: 'none',
  };

  if (selectable) {
    return (
      <div
        onClick={() => onSelect?.(freelance.id)}
        className="block rounded-2xl overflow-hidden transition-all cursor-pointer group"
        style={{ ...sharedStyle, userSelect: 'none' }}
        role="checkbox"
        aria-checked={selected}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      to={`/freelance/${freelance.id}`}
      className="block rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl group"
      style={{ ...sharedStyle, border: '1px solid #E8E4DC' }}
    >
      {cardContent}
    </Link>
  );
}
