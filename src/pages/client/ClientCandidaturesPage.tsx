import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, CheckCircle, Clock, ChevronRight, Star } from 'lucide-react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import Button from '../../components/ui/Button';
import { useMissionStore } from '../../store/missionStore';
import { getFreelanceById } from '../../data/mock';
import type { CandidatureSpontanee } from '../../types';

export default function ClientCandidaturesPage() {
  const { id: missionId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { getMissionById, getCandidaturesByMissionId, updateCandidatureStatut, requestConfirmation } = useMissionStore();

  const mission = missionId ? getMissionById(missionId) : undefined;
  const candidatures = missionId ? getCandidaturesByMissionId(missionId) : [];

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [assigning, setAssigning] = useState(false);
  const [assigned, setAssigned] = useState(false);

  const pending = candidatures.filter(c => c.statut === 'en_attente');
  const rest = candidatures.filter(c => c.statut !== 'en_attente');

  async function handleAssign() {
    if (!missionId || !selectedId || !mission) return;
    const c = candidatures.find(x => x.id === selectedId);
    if (!c) return;
    setAssigning(true);
    await new Promise(r => setTimeout(r, 900));
    updateCandidatureStatut(c.id, 'acceptee');
    candidatures
      .filter(x => x.id !== c.id && x.statut === 'en_attente')
      .forEach(x => updateCandidatureStatut(x.id, 'non_retenue'));
    requestConfirmation(missionId, c.freelanceId, c.prixPropose, c.delaiPropose, 'candidature');
    setAssigning(false);
    setAssigned(true);
  }

  if (!mission) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
        <DashboardSidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="font-bold" style={{ color: '#0B1F3A' }}>Mission introuvable</p>
        </div>
      </div>
    );
  }

  if (assigned) {
    const c = candidatures.find(x => x.id === selectedId);
    const freelance = c ? getFreelanceById(c.freelanceId) : undefined;
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
        <DashboardSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div
            className="max-w-md w-full mx-6 p-10 rounded-3xl text-center"
            style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', boxShadow: '0 4px 24px rgba(11,31,58,0.08)' }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#FFF8EC' }}>
              <Clock size={32} style={{ color: '#F5A623' }} />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
              Candidature acceptée !
            </h2>
            <p className="text-sm mb-2" style={{ color: '#5C6B7A' }}>
              Vous avez sélectionné <strong>{freelance?.nom ?? 'le freelance'}</strong> pour "{mission.titre}".
            </p>
            <p className="text-sm mb-6 p-3 rounded-xl" style={{ color: '#0B1F3A', backgroundColor: '#FFF8EC', fontFamily: 'Inter' }}>
              En attente de la <strong>confirmation finale du freelance</strong>. Le paiement escrow sera disponible dès sa confirmation.
            </p>
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
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
      <DashboardSidebar />

      <div className="flex-1">
        <div style={{ backgroundColor: '#0B1F3A' }} className="px-8 pt-6 pb-16">
          <button
            onClick={() => navigate(`/client/mission/${missionId}/invitations`)}
            className="flex items-center gap-2 text-sm mb-4 transition-opacity hover:opacity-70"
            style={{ color: 'rgba(247,243,236,0.5)' }}
          >
            <ArrowLeft size={15} /> Retour aux invitations
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Users size={20} style={{ color: '#F5A623' }} />
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
              Candidatures — {mission.titre}
            </h1>
          </div>
          <p className="text-sm" style={{ color: 'rgba(247,243,236,0.5)' }}>
            {candidatures.length} candidature{candidatures.length > 1 ? 's' : ''} spontanée{candidatures.length > 1 ? 's' : ''} reçue{candidatures.length > 1 ? 's' : ''}
          </p>
        </div>

        <div className="px-8 pb-16 max-w-4xl" style={{ marginTop: -48 }}>

          {pending.length === 0 && rest.length === 0 && (
            <div className="text-center py-20">
              <Users size={48} className="mx-auto mb-4" style={{ color: '#E8E4DC' }} />
              <p className="font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                Aucune candidature spontanée
              </p>
              <p className="text-sm mb-6" style={{ color: '#5C6B7A' }}>
                Cette mission est ouverte mais n'a pas encore reçu de candidatures spontanées.
              </p>
            </div>
          )}

          {pending.length > 0 && (
            <div className="mb-6">
              <h2 className="font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                Candidatures en attente — sélectionnez un freelance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pending.map(c => (
                  <CandidatureCard
                    key={c.id}
                    candidature={c}
                    selected={selectedId === c.id}
                    onSelect={() => setSelectedId(c.id === selectedId ? null : c.id)}
                  />
                ))}
              </div>

              {selectedId && (
                <div className="mt-5">
                  <Button variant="primary" loading={assigning} onClick={handleAssign}>
                    Attribuer la mission <ChevronRight size={15} />
                  </Button>
                </div>
              )}
            </div>
          )}

          {rest.length > 0 && (
            <div>
              <h2 className="font-bold mb-3" style={{ fontFamily: 'Space Grotesk', color: '#5C6B7A' }}>
                Candidatures traitées
              </h2>
              <div className="space-y-3">
                {rest.map(c => {
                  const freelance = getFreelanceById(c.freelanceId);
                  return (
                    <div key={c.id} className="rounded-2xl p-4 flex items-center gap-4" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                      {freelance && (
                        <img src={freelance.photo} alt={freelance.nom} className="w-10 h-10 rounded-full object-cover" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                          {freelance?.nom}
                        </p>
                        <p className="text-xs" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>
                          {c.prixPropose.toLocaleString('fr-FR')} FCFA · {c.delaiPropose}
                        </p>
                      </div>
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: c.statut === 'acceptee' ? 'rgba(31,174,122,0.1)' : '#F7F3EC',
                          color: c.statut === 'acceptee' ? '#1FAE7A' : '#5C6B7A',
                          fontFamily: 'Space Grotesk',
                        }}
                      >
                        {c.statut === 'acceptee' ? 'Retenue' : 'Non retenue'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CandidatureCard({ candidature, selected, onSelect }: {
  candidature: CandidatureSpontanee;
  selected: boolean;
  onSelect: () => void;
}) {
  const freelance = getFreelanceById(candidature.freelanceId);
  const noteAvg = freelance && freelance.avis.length > 0
    ? (freelance.avis.reduce((s, a) => s + a.note, 0) / freelance.avis.length).toFixed(1)
    : null;

  return (
    <div
      onClick={onSelect}
      className="rounded-2xl p-5 cursor-pointer transition-all"
      style={{
        backgroundColor: selected ? '#F0FDF9' : '#fff',
        border: selected ? '2px solid #1FAE7A' : '1px solid #E8E4DC',
        boxShadow: selected ? '0 0 0 3px rgba(31,174,122,0.12)' : '0 2px 8px rgba(11,31,58,0.04)',
      }}
    >
      <div className="flex items-start gap-3 mb-4">
        {freelance && (
          <img src={freelance.photo} alt={freelance.nom} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
              {freelance?.nom ?? candidature.freelanceId}
            </p>
            {selected && <CheckCircle size={14} style={{ color: '#1FAE7A' }} />}
          </div>
          {noteAvg && (
            <div className="flex items-center gap-1">
              <Star size={11} style={{ color: '#F5A623', fill: '#F5A623' }} />
              <span className="text-xs font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#0B1F3A' }}>{noteAvg}</span>
              <span className="text-xs" style={{ color: '#5C6B7A' }}>({freelance?.avis.length})</span>
            </div>
          )}
        </div>
        <span
          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: 'rgba(245,166,35,0.1)', color: '#F5A623' }}
        >
          <Clock size={10} /> En attente
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl p-3" style={{ backgroundColor: '#F7F3EC' }}>
          <p className="text-xs" style={{ color: '#5C6B7A' }}>Prix proposé</p>
          <p className="font-bold text-base" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>
            {candidature.prixPropose.toLocaleString('fr-FR')} F
          </p>
        </div>
        <div className="rounded-xl p-3" style={{ backgroundColor: '#F7F3EC' }}>
          <p className="text-xs" style={{ color: '#5C6B7A' }}>Délai</p>
          <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
            {candidature.delaiPropose}
          </p>
        </div>
      </div>

      <p className="text-xs leading-relaxed line-clamp-3" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
        "{candidature.message}"
      </p>

      <p className="text-xs mt-2" style={{ color: '#5C6B7A' }}>
        Candidature du {new Date(candidature.dateSoumission).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
      </p>
    </div>
  );
}
