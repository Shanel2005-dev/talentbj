import { useState } from 'react';
import { Save, User, Code, Palette, Megaphone } from 'lucide-react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import Button from '../../components/ui/Button';
import VerificationSeal from '../../components/ui/VerificationSeal';
import { mockFreelances } from '../../data/mock';

const freelance = mockFreelances[0]; // f01

export default function FreelanceProfileEditPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [bio, setBio] = useState(freelance.bio);
  const [tarif, setTarif] = useState(String(freelance.tarifHoraire ?? ''));
  const [disponible, setDisponible] = useState(freelance.disponible);

  const inputStyle = {
    width: '100%', borderRadius: 12, padding: '12px 16px', fontSize: 14,
    outline: 'none', backgroundColor: '#FEFDFB', border: '1.5px solid #DDD8CE',
    fontFamily: 'Inter', color: '#0B1F3A',
  };

  async function handleSave() {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
      <DashboardSidebar />

      <div className="flex-1">
        <div style={{ backgroundColor: '#0B1F3A' }} className="px-8 pt-8 pb-16">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
            Éditer mon profil
          </h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(247,243,236,0.5)' }}>
            Ces informations sont visibles par les clients qui consultent votre profil.
          </p>
        </div>

        <div className="px-8 pb-16" style={{ marginTop: -48 }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Aperçu profil */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', boxShadow: '0 4px 20px rgba(11,31,58,0.06)' }}>
                <div className="relative h-28" style={{ backgroundColor: '#142A4D' }}>
                  <div className="absolute -bottom-8 left-5">
                    <img src={freelance.photo} className="w-16 h-16 rounded-2xl object-cover" style={{ border: '3px solid #fff' }} alt={freelance.nom} />
                  </div>
                  <div className="absolute bottom-2 right-4">
                    <VerificationSeal size={36} variant="mini" />
                  </div>
                </div>
                <div className="pt-10 px-5 pb-5">
                  <p className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{freelance.nom}</p>
                  <p className="text-sm" style={{ color: '#5C6B7A' }}>{freelance.ville}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: '#FFF8EC', color: '#F5A623', fontFamily: 'Space Grotesk' }}
                    >
                      {freelance.badge}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold`}
                      style={{
                        backgroundColor: disponible ? '#ECFDF5' : '#F7F3EC',
                        color: disponible ? '#1FAE7A' : '#5C6B7A',
                      }}
                    >
                      {disponible ? 'Disponible' : 'Indisponible'}
                    </span>
                  </div>
                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid #F7F3EC' }}>
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#0B1F3A' }}>{freelance.tauxReussite}%</p>
                        <p className="text-xs" style={{ color: '#5C6B7A' }}>Taux réussite</p>
                      </div>
                      <div>
                        <p className="font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#0B1F3A' }}>{freelance.nombreMissions}</p>
                        <p className="text-xs" style={{ color: '#5C6B7A' }}>Missions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-2 space-y-4">
              {/* Informations de base */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                <div className="flex items-center gap-2 mb-5">
                  <User size={16} style={{ color: '#F5A623' }} />
                  <h2 className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Informations de base</h2>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Nom complet</label>
                      <input defaultValue={freelance.nom} style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                    </div>
                    <div>
                      <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Ville</label>
                      <input defaultValue={freelance.ville} style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Bio professionnelle</label>
                    <textarea rows={4} value={bio} onChange={e => setBio(e.target.value)}
                      style={{ ...inputStyle, resize: 'none' }}
                      onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')}
                    />
                    <p className="text-xs mt-1" style={{ color: '#5C6B7A', fontFamily: 'JetBrains Mono' }}>{bio.length} / 300</p>
                  </div>
                </div>
              </div>

              {/* Vertical + compétences */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                <div className="flex items-center gap-2 mb-5">
                  <Code size={16} style={{ color: '#F5A623' }} />
                  <h2 className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Spécialisation</h2>
                </div>
                <div className="mb-4">
                  <label className="text-sm font-semibold block mb-2" style={{ color: '#0B1F3A' }}>Verticale</label>
                  <div className="flex gap-3">
                    {[
                      { v: 'developpement', l: 'Développement', I: Code },
                      { v: 'design', l: 'Design', I: Palette },
                      { v: 'marketing', l: 'Marketing', I: Megaphone },
                    ].map(({ v, l, I }) => (
                      <div key={v}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
                        style={{
                          border: `2px solid ${freelance.vertical === v ? '#F5A623' : '#E8E4DC'}`,
                          backgroundColor: freelance.vertical === v ? '#FFF8EC' : '#FEFDFB',
                        }}
                      >
                        <I size={14} style={{ color: freelance.vertical === v ? '#F5A623' : '#5C6B7A' }} />
                        <span style={{ fontWeight: 600, color: '#0B1F3A' }}>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Compétences</label>
                  <input defaultValue={freelance.competences.join(', ')} style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                  <p className="text-xs mt-1" style={{ color: '#5C6B7A' }}>Séparées par des virgules</p>
                </div>
              </div>

              {/* Tarifs + disponibilité */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                <h2 className="font-bold mb-5" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Tarifs & disponibilité</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Taux horaire (FCFA/h)</label>
                    <input value={tarif} onChange={e => setTarif(e.target.value)} type="number" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0B1F3A' }}>Tarif forfait (FCFA)</label>
                    <input defaultValue={freelance.tarifForfait} type="number" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#F5A623')} onBlur={e => (e.target.style.borderColor = '#DDD8CE')} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: '#F7F3EC', border: '1px solid #E8E4DC' }}>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>Disponible aux nouvelles missions</p>
                    <p className="text-xs mt-0.5" style={{ color: '#5C6B7A' }}>Apparaît dans les résultats de matching</p>
                  </div>
                  <button
                    onClick={() => setDisponible(!disponible)}
                    className="w-12 h-6 rounded-full transition-all flex items-center px-1"
                    style={{ backgroundColor: disponible ? '#1FAE7A' : '#D1D5DB' }}
                  >
                    <div
                      className="w-4 h-4 rounded-full bg-white transition-transform"
                      style={{ transform: disponible ? 'translateX(24px)' : 'translateX(0)' }}
                    />
                  </button>
                </div>
              </div>

              {/* Save button */}
              <div className="flex items-center gap-3">
                {saved && (
                  <p className="text-sm font-semibold" style={{ color: '#1FAE7A' }}>Profil mis à jour !</p>
                )}
                <Button variant="primary" size="lg" loading={saving} onClick={handleSave} className="ml-auto">
                  <Save size={16} /> Enregistrer les modifications
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
