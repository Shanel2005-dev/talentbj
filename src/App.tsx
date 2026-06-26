import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Client pages
import LandingPage from './pages/client/LandingPage';
const PostNeedPage = lazy(() => import('./pages/client/PostNeedPage'));
const MatchResultsPage = lazy(() => import('./pages/client/MatchResultsPage'));
const FreelanceProfilePage = lazy(() => import('./pages/client/FreelanceProfilePage'));
const MissionTrackingPage = lazy(() => import('./pages/client/MissionTrackingPage'));
const ClientDashboardPage = lazy(() => import('./pages/client/ClientDashboardPage'));
const CompanySpacePage = lazy(() => import('./pages/client/CompanySpacePage'));
const ClientBillingPage = lazy(() => import('./pages/client/ClientBillingPage'));
const ClientInvitationsPage = lazy(() => import('./pages/client/ClientInvitationsPage'));
const ClientCandidaturesPage = lazy(() => import('./pages/client/ClientCandidaturesPage'));
const EscrowPaymentPage = lazy(() => import('./pages/client/EscrowPaymentPage'));

// Freelance pages
const FreelanceLandingPage = lazy(() => import('./pages/freelance/FreelanceLandingPage'));
const OnboardingPage = lazy(() => import('./pages/freelance/OnboardingPage'));
const FreelanceProfileEditPage = lazy(() => import('./pages/freelance/FreelanceProfileEditPage'));
const AvailableMissionsPage = lazy(() => import('./pages/freelance/AvailableMissionsPage'));
const FreelanceMissionDetailPage = lazy(() => import('./pages/freelance/FreelanceMissionDetailPage'));
const FreelanceDashboardPage = lazy(() => import('./pages/freelance/FreelanceDashboardPage'));
const FreelanceInvitationsPage = lazy(() => import('./pages/freelance/FreelanceInvitationsPage'));
const FreelanceCandidaturesPage = lazy(() => import('./pages/freelance/FreelanceCandidaturesPage'));

// Admin pages
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const VerificationQueuePage = lazy(() => import('./pages/admin/VerificationQueuePage'));
const DisputesPage = lazy(() => import('./pages/admin/DisputesPage'));

// Shared pages
const LoginPage = lazy(() => import('./pages/shared/LoginPage'));
const RegisterPage = lazy(() => import('./pages/shared/RegisterPage'));
const VerticalPage = lazy(() => import('./pages/shared/VerticalPage'));
const HowItWorksPage = lazy(() => import('./pages/shared/HowItWorksPage'));
const ContactPage = lazy(() => import('./pages/shared/ContactPage'));
const AboutPage = lazy(() => import('./pages/shared/AboutPage'));
const PricingPage = lazy(() => import('./pages/shared/PricingPage'));
const FAQPage = lazy(() => import('./pages/shared/FAQPage'));

const NO_CHROME_ROUTES = ['/connexion', '/inscription', '/freelance/inscription'];
const NO_FOOTER_ROUTES = [
  '/client/dashboard', '/client/mission', '/client/publier', '/client/facturation', '/client/mission',
  '/entreprise/dashboard', '/entreprise/publier', '/freelance/dashboard', '/freelance/missions',
  '/freelance/profil', '/freelance/invitations', '/freelance/candidatures',
  '/admin/dashboard', '/admin/verifications', '/admin/litiges',
];

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F3EC' }}>
      <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: '#F5A623', borderTopColor: 'transparent' }} />
    </div>
  );
}

function AppLayout() {
  const location = useLocation();
  const hideChrome = NO_CHROME_ROUTES.some(r => location.pathname.startsWith(r));
  const hideFooter = NO_FOOTER_ROUTES.some(r => location.pathname.startsWith(r));

  return (
    <div className="flex flex-col min-h-screen">
      {!hideChrome && <Navbar />}
      <main className="flex-1">
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Landing */}
            <Route path="/" element={<LandingPage />} />

            {/* Client */}
            <Route path="/client/publier" element={<PostNeedPage />} />
            <Route path="/client/resultats" element={<MatchResultsPage />} />
            <Route path="/freelance/:id" element={<FreelanceProfilePage />} />
            <Route path="/client/mission/:id" element={<MissionTrackingPage />} />
            <Route path="/client/dashboard" element={<ClientDashboardPage />} />
            <Route path="/entreprise/dashboard" element={<CompanySpacePage />} />
            <Route path="/entreprise/publier" element={<PostNeedPage />} />
            <Route path="/client/facturation" element={<ClientBillingPage />} />
            <Route path="/client/mission/:id/invitations" element={<ClientInvitationsPage />} />
            <Route path="/client/mission/:id/candidatures" element={<ClientCandidaturesPage />} />
            <Route path="/client/mission/:id/payer" element={<EscrowPaymentPage />} />

            {/* Freelance */}
            <Route path="/devenir-freelance" element={<FreelanceLandingPage />} />
            <Route path="/freelance/inscription" element={<OnboardingPage />} />
            <Route path="/freelance/profil/edition" element={<FreelanceProfileEditPage />} />
            <Route path="/freelance/missions" element={<AvailableMissionsPage />} />
            <Route path="/freelance/missions/:id" element={<FreelanceMissionDetailPage />} />
            <Route path="/freelance/dashboard" element={<FreelanceDashboardPage />} />
            <Route path="/freelance/invitations" element={<FreelanceInvitationsPage />} />
            <Route path="/freelance/candidatures" element={<FreelanceCandidaturesPage />} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/verifications" element={<VerificationQueuePage />} />
            <Route path="/admin/litiges" element={<DisputesPage />} />

            {/* Shared */}
            <Route path="/connexion" element={<LoginPage />} />
            <Route path="/inscription" element={<RegisterPage />} />
            <Route path="/verticale/:slug" element={<VerticalPage />} />
            <Route path="/comment-ca-marche" element={<HowItWorksPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/tarifs" element={<PricingPage />} />
            <Route path="/faq" element={<FAQPage />} />

            {/* 404 */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F3EC' }}>
                <div className="text-center">
                  <p className="text-6xl font-bold mb-4" style={{ fontFamily: 'JetBrains Mono', color: '#F5A623' }}>404</p>
                  <p className="text-xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: '#0B1F3A' }}>Page introuvable</p>
                  <a href="/" className="text-sm font-semibold" style={{ color: '#F5A623' }}>← Retour à l'accueil</a>
                </div>
              </div>
            } />
          </Routes>
        </Suspense>
      </main>
      {!hideChrome && !hideFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
