import { useState } from 'react';
import { AlertCircle, ChevronRight, CheckCircle } from 'lucide-react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import { mockLitiges, getMissionById } from '../../data/mock';

export default function DisputesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<Record<string, string>>({});
  const [decisionText, setDecisionText] = useState('');
  const [resolving, setResolving] = useState(false);

  const selectedLitige = mockLitiges.find(l => l.id === selected);
  const mission = selectedLitige ? getMissionById(selectedLitige.missionId) : null;

  const open = mockLitiges.filter(l => l.statut === 'ouvert' && !decisions[l.id]);
  const resolved = mockLitiges.filter(l => l.statut !== 'ouvert' || !!decisions[l.id]);

  async function handleResolve(winner: 'client' | 'freelance' | 'partage') {
    if (!selected) return;
    setResolving(true);
    await new Promise(r => setTimeout(r, 800));
    setDecisions(prev => ({ ...prev, [selected]: winner }));
    setResolving(false);
    setSelected(null);
    setDecisionText('');
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
      <DashboardSidebar />

      <div className="flex-1">
        <div style={{ backgroundColor: '#0B1F3A' }} className="px-8 pt-8 pb-16">
          <div className="flex items-center gap-3">
            <AlertCircle size={24} style={{ color: '#EF4444' }} />
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
                Gestion des litiges
              </h1>
              <p className="text-sm mt-0.5" style={{ color: 'rgba(247,243,236,0.5)' }}>
                {open.length} litige{open.length > 1 ? 's' : ''} en attente · {resolved.length} résolu{resolved.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 pb-16" style={{ marginTop: -48 }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Liste litiges */}
            <div className="lg:col-span-1 space-y-3">
              {open.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#5C6B7A', fontFamily: 'Space Grotesk' }}>
                    Ouverts ({open.length})
                  </p>
                  <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                    {open.map((l, i) => {
                      const m = getMissionById(l.missionId);
                      return (
                        <button key={l.id} onClick={() => setSelected(l.id)}
                          className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all"
                          style={{
                            backgroundColor: selected === l.id ? '#FFF8EC' : 'transparent',
                            borderLeft: selected === l.id ? '3px solid #EF4444' : '3px solid transparent',
                            borderBottom: i < open.length - 1 ? '1px solid #F7F3EC' : 'none',
                          }}
                        >
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#EF4444' }} />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm truncate" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                              {m?.titre ?? l.missionId}
                            </p>
                            <p className="text-xs truncate" style={{ color: '#5C6B7A' }}>{l.motif}</p>
                          </div>
                          <ChevronRight size={14} style={{ color: '#5C6B7A', flexShrink: 0 }} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {resolved.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#5C6B7A', fontFamily: 'Space Grotesk' }}>
                    Résolus ({resolved.length})
                  </p>
                  <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                    {resolved.map((l, i) => {
                      const m = getMissionById(l.missionId);
                      const dec = decisions[l.id] || l.resolution;
                      return (
                        <div key={l.id} className="flex items-center gap-3 px-4 py-3.5"
                          style={{ borderBottom: i < resolved.length - 1 ? '1px solid #F7F3EC' : 'none', opacity: 0.6 }}>
                          <CheckCircle size={14} style={{ color: '#1FAE7A', flexShrink: 0 }} />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm truncate" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                              {m?.titre ?? l.missionId}
                            </p>
                          </div>
                          <span className="text-xs" style={{ color: '#5C6B7A' }}>{dec || 'Résolu'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Détail litige */}
            <div className="lg:col-span-2">
              {!selectedLitige ? (
                <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                  <AlertCircle size={40} className="mx-auto mb-3" style={{ color: '#E8E4DC' }} />
                  <p className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Sélectionnez un litige</p>
                  <p className="text-sm mt-1" style={{ color: '#5C6B7A' }}>pour voir la conversation et rendre une décision.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Infos mission */}
                  <div className="rounded-2xl p-5" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{mission?.titre}</p>
                        <p className="text-sm mt-0.5" style={{ color: '#5C6B7A' }}>{selectedLitige.motif}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>
                          {mission?.budget.toLocaleString('fr-FR')} FCFA
                        </p>
                        <p className="text-xs" style={{ color: '#5C6B7A' }}>en escrow</p>
                      </div>
                    </div>
                    <p className="text-xs" style={{ color: '#5C6B7A', fontFamily: 'JetBrains Mono' }}>
                      Ouvert le {selectedLitige.dateOuverture}
                    </p>
                  </div>

                  {/* Conversation */}
                  <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                    <div className="px-5 py-4" style={{ borderBottom: '1px solid #F7F3EC', backgroundColor: '#FEFDFB' }}>
                      <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Conversation</p>
                    </div>
                    <div className="p-5 space-y-4 max-h-64 overflow-y-auto">
                      {selectedLitige.messages.map((msg, i) => (
                        <div key={i} className={`flex gap-3 ${msg.role === 'client' ? 'flex-row-reverse' : ''}`}>
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                            style={{ backgroundColor: msg.role === 'client' ? '#0B1F3A' : '#F5A623', color: msg.role === 'client' ? '#F5A623' : '#0B1F3A' }}
                          >
                            {msg.auteur[0]}
                          </div>
                          <div className={`max-w-xs flex flex-col ${msg.role === 'client' ? 'items-end' : 'items-start'}`}>
                            <p className="text-xs mb-1" style={{ color: '#5C6B7A' }}>{msg.auteur}</p>
                            <div
                              className="px-3 py-2 rounded-xl text-sm"
                              style={{
                                backgroundColor: msg.role === 'client' ? '#0B1F3A' : '#F7F3EC',
                                color: msg.role === 'client' ? '#F7F3EC' : '#0B1F3A',
                                borderRadius: msg.role === 'client' ? '12px 2px 12px 12px' : '2px 12px 12px 12px',
                              }}
                            >
                              {msg.message}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Formulaire décision */}
                  <div className="rounded-2xl p-6" style={{ backgroundColor: '#0B1F3A' }}>
                    <h3 className="font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
                      Décision administrative
                    </h3>
                    <textarea
                      value={decisionText}
                      onChange={e => setDecisionText(e.target.value)}
                      rows={3}
                      placeholder="Motivez votre décision (optionnel)..."
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none mb-4"
                      style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#F7F3EC', fontFamily: 'Inter', resize: 'none' }}
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <button onClick={() => handleResolve('client')} disabled={resolving}
                        className="py-2.5 rounded-xl font-bold text-sm transition-opacity"
                        style={{ backgroundColor: 'rgba(59,130,246,0.2)', color: '#3B82F6', border: '1px solid rgba(59,130,246,0.3)', fontFamily: 'Space Grotesk' }}>
                        Donner raison au client
                      </button>
                      <button onClick={() => handleResolve('partage')} disabled={resolving}
                        className="py-2.5 rounded-xl font-bold text-sm transition-opacity"
                        style={{ backgroundColor: 'rgba(245,166,35,0.15)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.3)', fontFamily: 'Space Grotesk' }}>
                        Partager les fonds
                      </button>
                      <button onClick={() => handleResolve('freelance')} disabled={resolving}
                        className="py-2.5 rounded-xl font-bold text-sm transition-opacity"
                        style={{ backgroundColor: 'rgba(31,174,122,0.15)', color: '#1FAE7A', border: '1px solid rgba(31,174,122,0.3)', fontFamily: 'Space Grotesk' }}>
                        {resolving ? 'Traitement…' : 'Donner raison au freelance'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
