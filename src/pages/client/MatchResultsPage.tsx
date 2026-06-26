import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, SortDesc, ArrowLeft, Users, ChevronRight, CheckCircle } from 'lucide-react';
import FreelanceCard from '../../components/freelance/FreelanceCard';
import Button from '../../components/ui/Button';
import { fetchMatchResults } from '../../api/matching';
import { useMissionStore } from '../../store/missionStore';
import type { BesoinClient, MatchResult, Vertical } from '../../types';

const VERTICAL_LABELS: Record<string, string> = { developpement: 'Développement', design: 'Design', marketing: 'Marketing', comptabilite: 'Comptabilité' };

interface LocationState extends BesoinClient {
  missionId?: string;
}

export default function MatchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as LocationState) || { description: '' };
  const besoin: BesoinClient = { description: state.description, vertical: state.vertical, budget: state.budget, delai: state.delai };
  const missionId = state.missionId;

  const { sendInvitation, getMissionById } = useMissionStore();

  const [results, setResults] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'verifie' | 'expert' | 'premium'>('all');
  const [verticalFilter, setVerticalFilter] = useState<Vertical | 'all'>('all');
  const [sort, setSort] = useState<'score' | 'missions' | 'taux'>('score');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [inviteDone, setInviteDone] = useState(false);

  useEffect(() => {
    if (!besoin.description) { navigate('/client/publier'); return; }
    setLoading(true);
    fetchMatchResults(besoin).then(r => {
      setResults(r);
      setLoading(false);
    });
  }, []);

  const mission = missionId ? getMissionById(missionId) : undefined;

  const filtered = results
    .filter(r => filter === 'all' || r.freelance.badge === filter)
    .filter(r => verticalFilter === 'all' || r.freelance.vertical === verticalFilter)
    .sort((a, b) => {
      if (sort === 'score') return b.score - a.score;
      if (sort === 'missions') return b.freelance.nombreMissions - a.freelance.nombreMissions;
      return b.freelance.tauxReussite - a.freelance.tauxReussite;
    });

  function toggleSelect(freelanceId: string) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(freelanceId)) {
        next.delete(freelanceId);
      } else if (next.size < 2) {
        next.add(freelanceId);
      }
      return next;
    });
  }

  function handleInvite() {
    if (!missionId || selectedIds.size === 0) return;
    const today = new Date().toISOString().slice(0, 10);
    let idx = 1;
    selectedIds.forEach(freelanceId => {
      sendInvitation({
        id: `inv-new-${missionId}-${idx++}`,
        missionId,
        freelanceId,
        statut: 'en_attente',
        dateEnvoi: today,
      });
    });
    setInviteDone(true);
  }

  function handleLeaveOpen() {
    navigate('/client/dashboard');
  }

  if (inviteDone) {
    const count = selectedIds.size;
    return (
      <div style={{ backgroundColor: '#F7F3EC', minHeight: '100vh' }} className="flex items-center justify-center">
        <div
          className="max-w-md w-full mx-6 p-10 rounded-3xl text-center"
          style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', boxShadow: '0 4px 24px rgba(11,31,58,0.08)' }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: '#ECFDF5' }}
          >
            <CheckCircle size={32} style={{ color: '#1FAE7A' }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
            {count === 1 ? 'Invitation envoyée !' : `${count} invitations envoyées !`}
          </h2>
          <p className="text-sm mb-2" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
            {count === 1
              ? 'Le freelance a été notifié. Il dispose de 48h pour répondre à votre invitation.'
              : 'Les freelances ont été notifiés. Ils disposent de 48h pour répondre à votre invitation.'}
          </p>
          {mission && (
            <p className="text-xs mb-8" style={{ color: '#5C6B7A', fontFamily: 'JetBrains Mono' }}>
              Mission : {mission.titre}
            </p>
          )}
          <div className="flex flex-col gap-3">
            {missionId && (
              <Button variant="primary" fullWidth onClick={() => navigate(`/client/mission/${missionId}/invitations`)}>
                Voir les invitations <ChevronRight size={16} />
              </Button>
            )}
            <Button variant="outline" fullWidth onClick={() => navigate('/client/dashboard')}>
              Retour au tableau de bord
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F7F3EC', minHeight: '100vh', paddingBottom: missionId ? 120 : 0 }}>

      {/* Header */}
      <div style={{ backgroundColor: '#0B1F3A', paddingBottom: 48 }}>
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm mb-4 transition-colors"
            style={{ color: 'rgba(247,243,236,0.5)', fontFamily: 'Inter' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F7F3EC')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,243,236,0.5)')}
          >
            <ArrowLeft size={15} /> Modifier ma recherche
          </button>
          <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#F5A623', fontFamily: 'Space Grotesk' }}>
            Étape 2 — Comparer les profils
          </p>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
            {loading ? 'Calcul du matching...' : `${results.length} freelances recommandés`}
          </h1>

          {/* Mode invitation banner */}
          {missionId && !loading && (
            <div
              className="mt-3 px-4 py-3 rounded-xl flex items-center gap-3"
              style={{ backgroundColor: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.25)' }}
            >
              <Users size={16} style={{ color: '#F5A623', flexShrink: 0 }} />
              <p className="text-sm" style={{ color: '#F5A623', fontFamily: 'Inter' }}>
                <strong>Mode invitation :</strong> Sélectionnez jusqu'à 2 freelances à inviter pour votre mission.{' '}
                {selectedIds.size > 0 && (
                  <span className="font-bold">{selectedIds.size}/2 sélectionné{selectedIds.size > 1 ? 's' : ''}</span>
                )}
              </p>
            </div>
          )}

          {/* Besoin recap */}
          <div
            className="mt-4 px-4 py-3 rounded-xl text-sm max-w-2xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(247,243,236,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span className="font-semibold" style={{ color: '#F5A623' }}>Votre besoin : </span>
            {besoin.description.length > 120 ? besoin.description.slice(0, 120) + '...' : besoin.description}
            {besoin.vertical && (
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(245,166,35,0.2)', color: '#F5A623' }}>
                {VERTICAL_LABELS[besoin.vertical]}
              </span>
            )}
            {besoin.budget && (
              <span className="ml-2 text-xs" style={{ color: 'rgba(247,243,236,0.45)', fontFamily: 'JetBrains Mono' }}>
                Budget : {besoin.budget.toLocaleString('fr-FR')} FCFA
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6" style={{ marginTop: -32 }}>

        {/* Filters bar */}
        <div
          className="flex flex-wrap gap-3 items-center p-4 rounded-2xl mb-8"
          style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', boxShadow: '0 2px 12px rgba(11,31,58,0.05)' }}
        >
          <div className="flex items-center gap-1.5">
            <Filter size={14} style={{ color: '#5C6B7A' }} />
            <span className="text-xs font-semibold" style={{ color: '#5C6B7A' }}>Filtres :</span>
          </div>

          {/* Badge filter */}
          {['all', 'premium', 'expert', 'verifie'].map(b => (
            <button
              key={b}
              onClick={() => setFilter(b as typeof filter)}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                backgroundColor: filter === b ? '#0B1F3A' : '#F7F3EC',
                color: filter === b ? '#F5A623' : '#5C6B7A',
                border: `1px solid ${filter === b ? '#0B1F3A' : '#E8E4DC'}`,
                fontFamily: 'Space Grotesk',
              }}
            >
              {b === 'all' ? 'Tous' : b.charAt(0).toUpperCase() + b.slice(1)}
            </button>
          ))}

          <div className="h-4 w-px" style={{ backgroundColor: '#E8E4DC' }} />

          {/* Vertical filter */}
          {(['all', 'developpement', 'design', 'marketing', 'comptabilite'] as const).map(v => (
            <button
              key={v}
              onClick={() => setVerticalFilter(v)}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                backgroundColor: verticalFilter === v ? '#F5A623' : '#F7F3EC',
                color: verticalFilter === v ? '#0B1F3A' : '#5C6B7A',
                border: `1px solid ${verticalFilter === v ? '#F5A623' : '#E8E4DC'}`,
                fontFamily: 'Space Grotesk',
              }}
            >
              {v === 'all' ? 'Tous domaines' : VERTICAL_LABELS[v]}
            </button>
          ))}

          {/* Sort */}
          <div className="ml-auto flex items-center gap-2">
            <SortDesc size={14} style={{ color: '#5C6B7A' }} />
            <select
              value={sort}
              onChange={e => setSort(e.target.value as typeof sort)}
              className="text-xs rounded-lg px-2 py-1.5 outline-none"
              style={{ border: '1px solid #E8E4DC', color: '#0B1F3A', fontFamily: 'Inter', backgroundColor: '#F7F3EC' }}
            >
              <option value="score">Meilleur match</option>
              <option value="missions">Plus de missions</option>
              <option value="taux">Taux de réussite</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-80 rounded-2xl animate-pulse" style={{ backgroundColor: '#E8E4DC' }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
              Aucun profil pour ces filtres
            </p>
            <p className="text-sm mb-6" style={{ color: '#5C6B7A' }}>
              Essayez de réinitialiser les filtres ou d'élargir votre recherche.
            </p>
            <Button variant="outline" onClick={() => { setFilter('all'); setVerticalFilter('all'); }}>
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
            {filtered.map(r => (
              <FreelanceCard
                key={r.freelance.id}
                freelance={r.freelance}
                matchScore={r.score}
                matchRaison={r.raison}
                selectable={!!missionId}
                selected={selectedIds.has(r.freelance.id)}
                onSelect={missionId ? toggleSelect : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sticky invitation bar */}
      {missionId && !loading && (
        <div
          className="fixed bottom-0 left-0 right-0 px-6 py-4"
          style={{
            backgroundColor: '#fff',
            borderTop: '1px solid #E8E4DC',
            boxShadow: '0 -4px 20px rgba(11,31,58,0.1)',
          }}
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-3 justify-between">
            <div>
              <p className="text-sm font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                {selectedIds.size === 0
                  ? 'Sélectionnez 1 ou 2 freelances à inviter'
                  : selectedIds.size === 1
                  ? '1 freelance sélectionné'
                  : '2 freelances sélectionnés (maximum atteint)'}
              </p>
              {selectedIds.size < 2 && (
                <p className="text-xs mt-0.5" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
                  Vous pouvez inviter jusqu'à 2 freelances par mission.
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleLeaveOpen}
                className="text-sm font-semibold transition-colors"
                style={{ color: '#5C6B7A', fontFamily: 'Inter' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#0B1F3A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#5C6B7A')}
              >
                Laisser ouverte sans inviter →
              </button>
              <Button
                variant="primary"
                disabled={selectedIds.size === 0}
                onClick={handleInvite}
              >
                Inviter {selectedIds.size > 0 ? `(${selectedIds.size})` : ''} <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
