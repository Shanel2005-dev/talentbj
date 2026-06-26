import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0B1F3A', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="TalentBJ" className="w-9 h-9" />
              <span className="font-extrabold text-xl" style={{ fontFamily: 'Space Grotesk', color: '#F7F3EC' }}>
                Talent<span style={{ color: '#C49B35' }}>BJ</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(247,243,236,0.55)' }}>
              La marketplace de référence pour les talents numériques et business vérifiés d'Afrique de l'Ouest.
            </p>
            <div className="flex flex-col gap-2 text-sm" style={{ color: 'rgba(247,243,236,0.45)' }}>
              <div className="flex items-center gap-2">
                <Mail size={13} />
                <span>contact@talentbj.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} />
                <span>+229 01 64 61 38 61</span>
              </div>
            </div>
          </div>

          {/* Plateforme */}
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ fontFamily: 'Space Grotesk', color: '#F5A623', fontSize: 11 }}>
              Plateforme
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Trouver un talent' },
                { to: '/client/publier', label: 'Publier un besoin' },
                { to: '/comment-ca-marche', label: 'Comment ça marche' },
                { to: '/devenir-freelance', label: 'Devenir freelance vérifié' },
                { to: '/tarifs', label: 'Tarifs' },
                { to: '/faq', label: 'FAQ' },
                { to: '/a-propos', label: 'À propos' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm transition-colors hover:text-amber-400"
                    style={{ color: 'rgba(247,243,236,0.55)' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Verticales */}
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ fontFamily: 'Space Grotesk', color: '#F5A623', fontSize: 11 }}>
              Verticales
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: '/verticale/dev-web', label: 'Développement web & mobile' },
                { to: '/verticale/design-uiux', label: 'Design & UI/UX' },
                { to: '/verticale/marketing-digital', label: 'Marketing digital' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm transition-colors hover:text-amber-400"
                    style={{ color: 'rgba(247,243,236,0.55)' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ fontFamily: 'Space Grotesk', color: '#F5A623', fontSize: 11 }}>
              Légal & Sécurité
            </h4>
            <ul className="space-y-2.5">
              {[
                'Conditions d\'utilisation',
                'Politique de confidentialité',
                'Fonctionnement de l\'escrow',
                'Résolution des litiges',
              ].map(label => (
                <li key={label}>
                  <span className="text-sm cursor-pointer transition-colors hover:text-amber-400"
                    style={{ color: 'rgba(247,243,236,0.55)' }}>
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(247,243,236,0.35)' }}>
            © 2025 TalentBJ — Tous droits réservés · Cotonou, Bénin
          </p>
          <div className="flex items-center gap-3">
            {['Bénin', 'Togo', 'Côte d\'Ivoire'].map(pays => (
              <span
                key={pays}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{ backgroundColor: 'rgba(245,166,35,0.1)', color: '#F5A623', fontFamily: 'JetBrains Mono', fontSize: 10 }}
              >
                {pays}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
