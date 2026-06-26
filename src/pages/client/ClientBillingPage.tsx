import { useState } from 'react';
import { FileText, Download, CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';

interface Invoice {
  id: string;
  numero: string;
  mission: string;
  freelance: string;
  montant: number;
  commission: number;
  date: string;
  statut: 'payee' | 'en_attente' | 'litige';
}

const mockInvoices: Invoice[] = [
  {
    id: 'inv01', numero: 'TBJ-2024-0042',
    mission: 'Stratégie SEO boutique mode africaine', freelance: 'Aminata Diallo',
    montant: 95000, commission: 9500, date: '2024-11-30', statut: 'payee',
  },
  {
    id: 'inv02', numero: 'TBJ-2024-0038',
    mission: 'Identité visuelle FANOU Marketplace', freelance: 'Kofi Asante',
    montant: 150000, commission: 15000, date: '2024-10-15', statut: 'payee',
  },
  {
    id: 'inv03', numero: 'TBJ-2024-0051',
    mission: 'Refonte dashboard commercial FANOU', freelance: 'Koffi Mensah',
    montant: 180000, commission: 18000, date: '2024-12-18', statut: 'en_attente',
  },
  {
    id: 'inv04', numero: 'TBJ-2024-0029',
    mission: 'Campagne réseaux sociaux Noël', freelance: 'Fatou Ndiaye',
    montant: 60000, commission: 6000, date: '2024-09-05', statut: 'payee',
  },
];

const STATUT_CONFIG = {
  payee:      { label: 'Payée',      bg: '#ECFDF5', color: '#1FAE7A', Icon: CheckCircle },
  en_attente: { label: 'En attente', bg: '#EFF6FF', color: '#3B82F6', Icon: Clock },
  litige:     { label: 'Litige',     bg: '#FEF2F2', color: '#EF4444', Icon: AlertCircle },
};

export default function ClientBillingPage() {
  const [filter, setFilter] = useState<'toutes' | 'payee' | 'en_attente'>('toutes');

  const filtered = filter === 'toutes' ? mockInvoices : mockInvoices.filter(i => i.statut === filter);
  const totalPaye = mockInvoices.filter(i => i.statut === 'payee').reduce((s, i) => s + i.montant, 0);
  const totalCommissions = mockInvoices.reduce((s, i) => s + i.commission, 0);
  const totalEnAttente = mockInvoices.filter(i => i.statut === 'en_attente').reduce((s, i) => s + i.montant, 0);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F7F3EC' }}>
      <DashboardSidebar />

      <div className="flex-1">
        {/* Header */}
        <div style={{ backgroundColor: '#0B1F3A' }} className="px-8 pt-8 pb-16">
          <p className="text-sm mb-1" style={{ color: 'rgba(247,243,236,0.5)' }}>Mon espace client</p>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
            Facturation
          </h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(247,243,236,0.4)' }}>
            Historique des paiements et factures TalentBJ
          </p>
        </div>

        <div className="px-8 pb-16" style={{ marginTop: -48 }}>
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total dépensé', val: `${totalPaye.toLocaleString('fr-FR')} FCFA`, Icon: CheckCircle, color: '#1FAE7A' },
              { label: 'Commissions TalentBJ (10%)', val: `${totalCommissions.toLocaleString('fr-FR')} FCFA`, Icon: TrendingUp, color: '#F5A623' },
              { label: 'En escrow (en attente)', val: `${totalEnAttente.toLocaleString('fr-FR')} FCFA`, Icon: Clock, color: '#3B82F6' },
            ].map(({ label, val, Icon, color }) => (
              <div key={label} className="rounded-2xl p-5" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC', boxShadow: '0 2px 12px rgba(11,31,58,0.05)' }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs" style={{ color: '#5C6B7A' }}>{label}</p>
                  <Icon size={16} style={{ color }} />
                </div>
                <p className="font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#0B1F3A', fontSize: 17 }}>
                  {val}
                </p>
              </div>
            ))}
          </div>

          {/* Factures */}
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #E8E4DC' }}>
            {/* Toolbar */}
            <div className="px-6 py-4 flex items-center justify-between flex-wrap gap-3" style={{ borderBottom: '1px solid #F7F3EC', backgroundColor: '#FEFDFB' }}>
              <h2 className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>
                Mes factures ({filtered.length})
              </h2>
              <div className="flex items-center gap-2">
                {(['toutes', 'payee', 'en_attente'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      backgroundColor: filter === f ? '#0B1F3A' : '#F7F3EC',
                      color: filter === f ? '#F5A623' : '#5C6B7A',
                      fontFamily: 'Space Grotesk',
                    }}
                  >
                    {f === 'toutes' ? 'Toutes' : f === 'payee' ? 'Payées' : 'En attente'}
                  </button>
                ))}
              </div>
            </div>

            {/* Table header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-semibold" style={{ color: '#5C6B7A', backgroundColor: '#FAFAF9', borderBottom: '1px solid #F7F3EC' }}>
              <div className="col-span-2">N° Facture</div>
              <div className="col-span-4">Mission · Freelance</div>
              <div className="col-span-2 text-right">Montant HT</div>
              <div className="col-span-2 text-right">Commission</div>
              <div className="col-span-1 text-center">Statut</div>
              <div className="col-span-1 text-center">PDF</div>
            </div>

            {/* Rows */}
            <div className="divide-y" style={{ borderColor: '#F7F3EC' }}>
              {filtered.length === 0 ? (
                <div className="py-12 text-center">
                  <FileText size={32} className="mx-auto mb-3" style={{ color: '#E8E4DC' }} />
                  <p className="font-bold" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Aucune facture</p>
                </div>
              ) : filtered.map(inv => {
                const { label, bg, color, Icon } = STATUT_CONFIG[inv.statut];
                return (
                  <div key={inv.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                    {/* Numéro */}
                    <div className="col-span-12 md:col-span-2">
                      <p className="text-xs font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#0B1F3A' }}>{inv.numero}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#5C6B7A', fontFamily: 'JetBrains Mono' }}>{inv.date}</p>
                    </div>

                    {/* Mission + freelance */}
                    <div className="col-span-12 md:col-span-4">
                      <p className="text-sm font-semibold truncate" style={{ color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>{inv.mission}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#5C6B7A' }}>{inv.freelance}</p>
                    </div>

                    {/* Montant */}
                    <div className="col-span-5 md:col-span-2 text-right">
                      <p className="text-sm font-bold" style={{ fontFamily: 'JetBrains Mono', color: '#0B1F3A' }}>
                        {inv.montant.toLocaleString('fr-FR')} F
                      </p>
                    </div>

                    {/* Commission */}
                    <div className="col-span-5 md:col-span-2 text-right">
                      <p className="text-sm" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>
                        -{inv.commission.toLocaleString('fr-FR')} F
                      </p>
                    </div>

                    {/* Statut */}
                    <div className="col-span-6 md:col-span-1 flex justify-center">
                      <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: bg, color }}>
                        <Icon size={10} />
                        <span className="hidden lg:inline">{label}</span>
                      </span>
                    </div>

                    {/* Download */}
                    <div className="col-span-6 md:col-span-1 flex justify-center">
                      <button
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: '#5C6B7A' }}
                        title="Télécharger PDF"
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F7F3EC')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                        onClick={() => alert(`Téléchargement de ${inv.numero} — fonctionnalité en cours d'intégration.`)}
                      >
                        <Download size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer note */}
            <div className="px-6 py-3" style={{ borderTop: '1px solid #F7F3EC', backgroundColor: '#FAFAF9' }}>
              <p className="text-xs" style={{ color: '#5C6B7A' }}>
                Les factures PDF sont générées automatiquement après chaque paiement validé. Commission plateforme : 10% HT.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
