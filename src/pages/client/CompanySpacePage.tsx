import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Briefcase, Building2 } from 'lucide-react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import Button from '../../components/ui/Button';
import { mockClients } from '../../data/mock';

const enterpriseClient = mockClients.find(c => c.id === 'c15')!;

export default function CompanySpacePage() {
  const navigate = useNavigate();
  const [activeRecruteur, setActiveRecruteur] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
      <DashboardSidebar />

      <div className="flex-1">
        <div style={{ backgroundColor: '#0B1F3A' }} className="px-8 pt-8 pb-16">
          <div className="flex items-center gap-3 mb-2">
            <Building2 size={24} style={{ color: '#F5A623' }} />
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
                Espace Entreprise
              </h1>
              <p className="text-sm" style={{ color: 'rgba(247,243,236,0.5)' }}>{enterpriseClient.nom}</p>
            </div>
          </div>
        </div>

        <div className="px-8 pb-16" style={{ marginTop: -48 }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Recruteurs */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #F7F3EC', backgroundColor: '#FEFDFB' }}>
                  <div className="flex items-center gap-2">
                    <Users size={16} style={{ color: '#F5A623' }} />
                    <h2 className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                      Recruteurs ({enterpriseClient.recruteurs?.length})
                    </h2>
                  </div>
                  <button className="text-xs font-bold" style={{ color: '#F5A623' }}>
                    <Plus size={14} />
                  </button>
                </div>
                <div className="divide-y" style={{ borderColor: '#F7F3EC' }}>
                  {enterpriseClient.recruteurs?.map(r => (
                    <button
                      key={r.id}
                      onClick={() => setActiveRecruteur(r.id)}
                      className="w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors"
                      style={{
                        backgroundColor: activeRecruteur === r.id ? '#FFF8EC' : 'transparent',
                        borderLeft: activeRecruteur === r.id ? '3px solid #F5A623' : '3px solid transparent',
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ backgroundColor: '#0B1F3A', color: '#F5A623', fontFamily: 'Space Grotesk' }}
                      >
                        {r.nom.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>{r.nom}</p>
                        <p className="text-xs" style={{ color: '#5C6B7A' }}>{r.poste}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Missions centralisées */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
                <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #F7F3EC', backgroundColor: '#FEFDFB' }}>
                  <h2 className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                    Missions de l'équipe
                  </h2>
                  <Button variant="primary" size="sm" onClick={() => navigate('/entreprise/publier')}>
                    <Plus size={14} /> Nouvelle mission
                  </Button>
                </div>

                {/* Stats rapides */}
                <div className="grid grid-cols-3 gap-0 border-b" style={{ borderColor: '#F7F3EC' }}>
                  {[
                    { label: 'Missions actives', val: '4', color: '#F5A623' },
                    { label: 'Total en escrow', val: '820 000 F', color: '#1FAE7A' },
                    { label: 'Freelances actifs', val: '4', color: '#3B82F6' },
                  ].map(({ label, val, color }, i) => (
                    <div key={label} className="p-4 text-center" style={{ borderRight: i < 2 ? '1px solid #F7F3EC' : 'none' }}>
                      <p className="text-lg font-bold" style={{ fontFamily: 'JetBrains Mono', color }}>{val}</p>
                      <p className="text-xs" style={{ color: '#5C6B7A' }}>{label}</p>
                    </div>
                  ))}
                </div>

                {/* Liste missions vide state pour démo */}
                <div className="p-8 text-center">
                  <Briefcase size={40} className="mx-auto mb-3" style={{ color: '#E8E4DC' }} />
                  <p className="font-bold mb-1" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                    {activeRecruteur
                      ? `Missions de ${enterpriseClient.recruteurs?.find(r => r.id === activeRecruteur)?.nom}`
                      : 'Toutes les missions de l\'équipe'}
                  </p>
                  <p className="text-sm mb-6" style={{ color: '#5C6B7A' }}>
                    Sélectionnez un recruteur ou publiez une nouvelle mission.
                  </p>
                  <Button variant="primary" onClick={() => navigate('/entreprise/publier')}>
                    Publier un besoin
                  </Button>
                </div>
              </div>

              {/* Facturation */}
              <div className="rounded-2xl p-5 mt-4" style={{ backgroundColor: '#0B1F3A', border: '1px solid #142A4D' }}>
                <h3 className="font-bold text-sm mb-3" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
                  Facturation consolidée
                </h3>
                <p className="text-sm mb-3" style={{ color: 'rgba(247,243,236,0.5)' }}>
                  Toutes les transactions de votre entreprise en un seul endroit.
                </p>
                <div className="flex gap-3">
                  <div className="flex-1 rounded-xl p-3 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                    <p className="text-xl font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>1 240 000</p>
                    <p className="text-xs" style={{ color: 'rgba(247,243,236,0.4)' }}>FCFA — Total 2025</p>
                  </div>
                  <div className="flex-1 rounded-xl p-3 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                    <p className="text-xl font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#1FAE7A' }}>8</p>
                    <p className="text-xs" style={{ color: 'rgba(247,243,236,0.4)' }}>Missions facturées</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
