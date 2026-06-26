import { useState } from 'react';
import { CheckCircle, XCircle, Clock, ChevronRight, Shield, FileText, Camera, Smartphone } from 'lucide-react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import { mockFreelances } from '../../data/mock';
import type { Badge, StatutVerification } from '../../types';

const BADGE_OPTIONS: { val: Badge; label: string; desc: string }[] = [
  { val: 'verifie', label: 'Vérifié', desc: 'Profil vérifié, bon niveau général.' },
  { val: 'expert', label: 'Expert', desc: 'Expertise confirmée, portfolio solide.' },
  { val: 'premium', label: 'Premium', desc: 'Excellence démontrée, références clients.' },
];

type Decision = { statut: StatutVerification; badge?: Badge; motif?: string };

export default function VerificationQueuePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const [assigning, setAssigning] = useState(false);
  const [chosenBadge, setChosenBadge] = useState<Badge>('verifie');
  const [motif, setMotif] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  // Show freelances with en_attente status (newly registered via onboarding)
  const queue = mockFreelances.filter(f => f.statutVerification === 'en_attente');
  const selectedFreelance = queue.find(f => f.id === selected);

  async function handleApprove() {
    if (!selected) return;
    setAssigning(true);
    await new Promise(r => setTimeout(r, 800));
    setDecisions(prev => ({ ...prev, [selected]: { statut: 'verifie', badge: chosenBadge } }));
    setAssigning(false);
    setSelected(null);
    setShowRejectForm(false);
  }

  async function handleReject() {
    if (!selected) return;
    setAssigning(true);
    await new Promise(r => setTimeout(r, 800));
    setDecisions(prev => ({ ...prev, [selected]: { statut: 'rejete', motif } }));
    setAssigning(false);
    setSelected(null);
    setMotif('');
    setShowRejectForm(false);
  }

  const pending = queue.filter(f => !decisions[f.id]);
  const processed = queue.filter(f => !!decisions[f.id]);

  const inputStyle = {
    width: '100%', borderRadius: 10, padding: '10px 14px', fontSize: 13,
    outline: 'none', backgroundColor: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.1)',
    fontFamily: 'Inter', color: '#F7F3EC', resize: 'none' as const,
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
      <DashboardSidebar />

      <div className="flex-1">
        <div style={{ backgroundColor: '#0B1F3A' }} className="px-8 pt-8 pb-16">
          <div className="flex items-center gap-3">
            <Shield size={24} style={{ color: '#F5A623' }} />
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
                File de vérification
              </h1>
              <p className="text-sm mt-0.5" style={{ color: 'rgba(247,243,236,0.5)' }}>
                {pending.length} dossier{pending.length > 1 ? 's' : ''} en attente · {processed.length} traités
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 pb-16" style={{ marginTop: -48 }}>
          {queue.length === 0 ? (
            <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
              <CheckCircle size={40} className="mx-auto mb-3" style={{ color: '#1FAE7A' }} />
              <p className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Aucun dossier en attente</p>
              <p className="text-sm mt-1" style={{ color: '#5C6B7A' }}>Tous les profils ont été traités.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Liste */}
              <div className="lg:col-span-1 space-y-3">
                {pending.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#5C6B7A', fontFamily: 'Space Grotesk' }}>
                      En attente ({pending.length})
                    </p>
                    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                      {pending.map((f, i) => (
                        <button
                          key={f.id}
                          onClick={() => { setSelected(f.id); setChosenBadge('verifie'); setShowRejectForm(false); setMotif(''); }}
                          className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all"
                          style={{
                            backgroundColor: selected === f.id ? '#FFF8EC' : 'transparent',
                            borderLeft: selected === f.id ? '3px solid #F5A623' : '3px solid transparent',
                            borderBottom: i < pending.length - 1 ? '1px solid #F7F3EC' : 'none',
                          }}
                        >
                          <img src={f.photo} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" alt={f.nom} />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm truncate" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{f.nom}</p>
                            <p className="text-xs" style={{ color: '#5C6B7A' }}>{f.vertical} · {f.ville}</p>
                          </div>
                          <div className="flex-shrink-0 flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                              style={{ backgroundColor: '#FFF8EC', color: '#F5A623', fontFamily: 'Space Grotesk' }}>
                              Nouveau
                            </span>
                            <ChevronRight size={14} style={{ color: '#5C6B7A' }} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {processed.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#5C6B7A', fontFamily: 'Space Grotesk' }}>
                      Traités ({processed.length})
                    </p>
                    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                      {processed.map((f, i) => {
                        const dec = decisions[f.id];
                        return (
                          <div key={f.id} className="flex items-center gap-3 px-4 py-3.5"
                            style={{ borderBottom: i < processed.length - 1 ? '1px solid #F7F3EC' : 'none', opacity: 0.7 }}>
                            <img src={f.photo} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" alt={f.nom} />
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-sm truncate" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{f.nom}</p>
                            </div>
                            {dec?.statut === 'rejete' ? (
                              <XCircle size={16} style={{ color: '#EF4444' }} />
                            ) : (
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                                style={{ backgroundColor: '#ECFDF5', color: '#1FAE7A' }}>{dec?.badge}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Panneau détail */}
              <div className="lg:col-span-2">
                {!selectedFreelance ? (
                  <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                    <Clock size={40} className="mx-auto mb-3" style={{ color: '#E8E4DC' }} />
                    <p className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Sélectionnez un dossier</p>
                    <p className="text-sm mt-1" style={{ color: '#5C6B7A' }}>pour examiner les documents et prendre une décision.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Profil header */}
                    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                      <div className="p-6 flex items-start gap-5">
                        <img src={selectedFreelance.photo} className="w-20 h-20 rounded-2xl object-cover flex-shrink-0" alt={selectedFreelance.nom} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{selectedFreelance.nom}</p>
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                              style={{ backgroundColor: '#FFF8EC', color: '#F5A623', fontFamily: 'Space Grotesk' }}>
                              Nouveau profil
                            </span>
                          </div>
                          <p className="text-sm" style={{ color: '#5C6B7A' }}>
                            {selectedFreelance.vertical} · {selectedFreelance.ville} · Inscrit le {new Date(selectedFreelance.dateInscription).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                          <p className="text-sm mt-3 leading-relaxed" style={{ color: '#0B1F3A' }}>{selectedFreelance.bio}</p>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {selectedFreelance.competences.map(c => (
                              <span key={c} className="px-2 py-0.5 rounded-lg text-xs" style={{ backgroundColor: '#F7F3EC', color: '#0B1F3A' }}>{c}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Portfolio preview */}
                      <div className="px-6 pb-6">
                        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#5C6B7A' }}>Portfolio</p>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedFreelance.portfolio.slice(0, 3).map((p, i) => (
                            <div key={i} className="rounded-xl overflow-hidden aspect-video" style={{ backgroundColor: '#F7F3EC' }}>
                              <img src={p.image} className="w-full h-full object-cover" alt={p.titre} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Documents soumis */}
                    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                      <div className="px-6 py-4" style={{ borderBottom: '1px solid #F7F3EC', backgroundColor: '#FEFDFB' }}>
                        <h3 className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                          Documents soumis
                        </h3>
                      </div>
                      <div className="p-6 space-y-3">
                        {/* Pièce d'identité */}
                        <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: '#F7F3EC', border: '1px solid #E8E4DC' }}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: '#0B1F3A' }}>
                            <FileText size={16} style={{ color: '#F5A623' }} />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm" style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>Pièce d'identité (CNI)</p>
                            <p className="text-xs" style={{ color: '#5C6B7A', fontFamily: 'JetBrains Mono' }}>
                              cni_{selectedFreelance.id}.jpg — 1.2 Mo
                            </p>
                          </div>
                          <CheckCircle size={16} style={{ color: '#1FAE7A' }} />
                        </div>

                        {/* Selfie */}
                        <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: '#F7F3EC', border: '1px solid #E8E4DC' }}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: '#0B1F3A' }}>
                            <Camera size={16} style={{ color: '#F5A623' }} />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm" style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>Selfie de vérification</p>
                            <p className="text-xs" style={{ color: '#5C6B7A', fontFamily: 'JetBrains Mono' }}>
                              selfie_{selectedFreelance.id}.jpg — 0.8 Mo
                            </p>
                          </div>
                          <CheckCircle size={16} style={{ color: '#1FAE7A' }} />
                        </div>

                        {/* Mobile Money */}
                        <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: '#F7F3EC', border: '1px solid #E8E4DC' }}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: '#0B1F3A' }}>
                            <Smartphone size={16} style={{ color: '#F5A623' }} />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm" style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>Numéro Mobile Money vérifié</p>
                            <p className="text-xs" style={{ color: '#5C6B7A', fontFamily: 'JetBrains Mono' }}>+229 97 ·· ·· ·· — OTP confirmé</p>
                          </div>
                          <CheckCircle size={16} style={{ color: '#1FAE7A' }} />
                        </div>
                      </div>
                    </div>

                    {/* Test pratique */}
                    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                      <div className="px-6 py-4" style={{ borderBottom: '1px solid #F7F3EC', backgroundColor: '#FEFDFB' }}>
                        <h3 className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                          Réponse au test pratique
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="rounded-xl p-4" style={{ backgroundColor: '#F7F3EC', border: '1px solid #E8E4DC' }}>
                          <p className="text-sm leading-relaxed" style={{ color: '#5C6B7A', fontFamily: 'Inter' }}>
                            {selectedFreelance.vertical === 'developpement'
                              ? 'Pour développer une API REST e-commerce avec Mobile Money, j\'utiliserais Laravel + PostgreSQL côté backend et un système de webhooks pour les notifications de paiement. En priorité : authentification sécurisée, gestion du catalogue produits avec pagination, puis intégration de l\'API CinetPay pour MTN et Moov. Je documenterais l\'API avec Swagger dès le début.'
                              : selectedFreelance.vertical === 'design'
                              ? 'Mon processus pour ce restaurant débuterait par 3 sessions terrain : observer la clientèle actuelle, interviewer le gérant et les habitués, analyser la concurrence locale. Ensuite je produirais 2 directions visuelles opposées pour stimuler le choix. Présentation : moodboards, logo en contexte (enseigne, menus, emballages), puis itérations selon retours.'
                              : 'Pour tripler les ventes en 3 mois, je proposerais : 1 post/jour avec alternance contenu inspirationnel et produit, 3 stories interactives par semaine (sondages, questions), 1 live produit mensuel, et 1 collaboration micro-influenceur/mois avec du contenu UGC. KPIs : taux engagement, clics vers DM, volume de commandes trackées par code promo.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Decision */}
                    <div className="rounded-2xl p-6" style={{ backgroundColor: '#0B1F3A' }}>
                      {showRejectForm ? (
                        <>
                          <h3 className="font-bold mb-3" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
                            Motif de rejet
                          </h3>
                          <p className="text-sm mb-3" style={{ color: 'rgba(247,243,236,0.5)' }}>
                            Ce message sera communiqué au freelance pour qu'il puisse corriger son dossier.
                          </p>
                          <textarea
                            value={motif}
                            onChange={e => setMotif(e.target.value)}
                            rows={4}
                            placeholder="Ex: Documents illisibles — veuillez soumettre des photos plus nettes. La réponse au test pratique est trop courte (moins de 200 mots)."
                            style={inputStyle}
                            onFocus={e => (e.target.style.borderColor = 'rgba(239,68,68,0.5)')}
                            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                          />
                          <div className="flex gap-3 mt-4">
                            <button
                              onClick={() => { setShowRejectForm(false); setMotif(''); }}
                              className="flex-1 py-2.5 rounded-xl font-bold text-sm"
                              style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(247,243,236,0.6)', fontFamily: 'Space Grotesk' }}
                            >
                              Annuler
                            </button>
                            <button
                              onClick={handleReject}
                              disabled={assigning || motif.trim().length < 10}
                              className="flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                              style={{
                                backgroundColor: motif.trim().length >= 10 ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.04)',
                                color: motif.trim().length >= 10 ? '#EF4444' : 'rgba(247,243,236,0.3)',
                                border: `1px solid ${motif.trim().length >= 10 ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.06)'}`,
                                fontFamily: 'Space Grotesk',
                                opacity: assigning ? 0.7 : 1,
                              }}
                            >
                              <XCircle size={16} /> {assigning ? 'Envoi…' : 'Confirmer le rejet'}
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
                            Attribuer un badge
                          </h3>
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            {BADGE_OPTIONS.map(({ val, label, desc }) => (
                              <button
                                key={val}
                                onClick={() => setChosenBadge(val)}
                                className="p-3 rounded-xl text-left transition-all"
                                style={{
                                  backgroundColor: chosenBadge === val ? 'rgba(245,166,35,0.15)' : 'rgba(255,255,255,0.04)',
                                  border: `1.5px solid ${chosenBadge === val ? '#F5A623' : 'rgba(255,255,255,0.08)'}`,
                                }}
                              >
                                <p className="font-bold text-sm" style={{ color: chosenBadge === val ? '#F5A623' : '#F7F3EC', fontFamily: 'Space Grotesk' }}>
                                  {label}
                                </p>
                                <p className="text-xs mt-1" style={{ color: 'rgba(247,243,236,0.45)' }}>{desc}</p>
                              </button>
                            ))}
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => setShowRejectForm(true)}
                              disabled={assigning}
                              className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-opacity flex items-center justify-center gap-2"
                              style={{ backgroundColor: 'rgba(239,68,68,0.15)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', fontFamily: 'Space Grotesk' }}
                            >
                              <XCircle size={16} /> Rejeter le dossier
                            </button>
                            <button
                              onClick={handleApprove}
                              disabled={assigning}
                              className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-opacity flex items-center justify-center gap-2"
                              style={{ backgroundColor: '#F5A623', color: '#0B1F3A', fontFamily: 'Space Grotesk', opacity: assigning ? 0.7 : 1 }}
                            >
                              <CheckCircle size={16} /> {assigning ? 'Validation…' : `Valider — ${chosenBadge}`}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
