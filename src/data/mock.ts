import type { Freelance, Mission, Client, Litige, MatchResult, BesoinClient, Invitation, CandidatureSpontanee } from '../types';

// ─────────────────────────────────────────────────────────────
// 30 FREELANCES — 10 par verticale
// ─────────────────────────────────────────────────────────────

export const mockFreelances: Freelance[] = [

  // ── DÉVELOPPEMENT WEB & MOBILE (f01-f10) ──
  {
    id: 'f01', nom: 'Koffi Mensah', photo: 'https://picsum.photos/seed/f01/200',
    vertical: 'developpement', badge: 'expert',
    competences: ['Django', 'React', 'Python', 'PostgreSQL', 'REST API'],
    tarifHoraire: 8000, tauxReussite: 97, nombreMissions: 42,
    ville: 'Cotonou', disponible: true, dateInscription: '2023-03-15',
    bio: 'Développeur fullstack Django/React avec 5 ans d\'expérience sur des projets e-commerce et fintech pour PME africaines.',
    avis: [
      { id: 'a1', auteur: 'FANOU Marketplace', avatarSeed: 'a1', note: 5, commentaire: 'Livraison parfaite, site e-commerce opérationnel en 3 semaines. Très professionnel.', date: '2024-11-10' },
      { id: 'a2', auteur: 'StartAfrica Tech', avatarSeed: 'a2', note: 5, commentaire: 'API robuste et documentation claire. Je le recommande sans hésitation.', date: '2024-09-22' },
      { id: 'a3', auteur: 'Cabinet Agossou', avatarSeed: 'a3', note: 4, commentaire: 'Bon travail sur le portail client. Quelques ajustements demandés mais réactif.', date: '2024-07-05' },
    ],
    portfolio: [
      { id: 'p1', image: 'https://picsum.photos/seed/port1/600/400', titre: 'E-commerce Mode Bénin', description: 'Boutique en ligne complète avec paiement Mobile Money, gestion des stocks et tableau de bord admin.' },
      { id: 'p2', image: 'https://picsum.photos/seed/port2/600/400', titre: 'API Fintech', description: 'API REST pour gestion de portefeuille électronique avec intégration MTN et Moov Money.' },
      { id: 'p3', image: 'https://picsum.photos/seed/port3/600/400', titre: 'Portail RH en ligne', description: 'Système de gestion des congés et présences pour entreprise de 150 employés.' },
    ],
  },
  {
    id: 'f02', nom: 'Sèdami Houngbédji', photo: 'https://picsum.photos/seed/f02/200',
    vertical: 'developpement', badge: 'premium',
    competences: ['Flutter', 'Dart', 'Firebase', 'React Native', 'iOS', 'Android'],
    tarifForfait: 300000, tauxReussite: 95, nombreMissions: 31,
    ville: 'Porto-Novo', disponible: true, dateInscription: '2023-01-20',
    bio: 'Spécialiste mobile cross-platform Flutter avec expertise Firebase. Applications publiées sur Play Store et App Store pour clients béninois et ivoiriens.',
    avis: [
      { id: 'a4', auteur: 'FinTech Hub Bénin', avatarSeed: 'a4', note: 5, commentaire: 'Application Flutter livrée en 5 semaines, zéro bug en production. Excellent travail.', date: '2024-12-01' },
      { id: 'a5', auteur: 'Hôtel Bénin Royal', avatarSeed: 'a5', note: 5, commentaire: 'App de réservation intégrée à notre système. Très à l\'écoute des besoins.', date: '2024-10-14' },
      { id: 'a6', auteur: 'Jean-Marc Vodounon', avatarSeed: 'a6', note: 4, commentaire: 'Bonne communication, app livrée dans les délais.', date: '2024-08-30' },
    ],
    portfolio: [
      { id: 'p4', image: 'https://picsum.photos/seed/port4/600/400', titre: 'App de livraison Cotonou', description: 'Application mobile de livraison à domicile avec géolocalisation et paiement Mobile Money.' },
      { id: 'p5', image: 'https://picsum.photos/seed/port5/600/400', titre: 'App bancaire (UI)', description: 'Prototype d\'application bancaire mobile pour startup fintech, design system complet.' },
      { id: 'p6', image: 'https://picsum.photos/seed/port6/600/400', titre: 'Gestion de stock mobile', description: 'App Flutter de gestion d\'inventaire pour petits commerçants, mode hors-ligne inclus.' },
    ],
  },
  {
    id: 'f03', nom: 'Romuald Akindès', photo: 'https://picsum.photos/seed/f03/200',
    vertical: 'developpement', badge: 'verifie',
    competences: ['React', 'Next.js', 'Node.js', 'TypeScript', 'TailwindCSS'],
    tarifHoraire: 6500, tauxReussite: 92, nombreMissions: 18,
    ville: 'Cotonou', disponible: true, dateInscription: '2023-09-10',
    bio: 'Développeur frontend React/Next.js passionné par les interfaces rapides et accessibles. Spécialisé dans les dashboard et applications SaaS.',
    avis: [
      { id: 'a7', auteur: 'Médias TJ', avatarSeed: 'a7', note: 5, commentaire: 'Dashboard analytique livré impeccablement. Très bon niveau technique.', date: '2024-11-20' },
      { id: 'a8', auteur: 'AID Bénin', avatarSeed: 'a8', note: 4, commentaire: 'Site ONG responsive et professionnel. Légers retards mais qualité au rendez-vous.', date: '2024-09-05' },
    ],
    portfolio: [
      { id: 'p7', image: 'https://picsum.photos/seed/port7/600/400', titre: 'Dashboard SaaS Analytics', description: 'Interface d\'administration avec graphiques temps réel, filtres avancés et export Excel.' },
      { id: 'p8', image: 'https://picsum.photos/seed/port8/600/400', titre: 'Landing page startup', description: 'Page de présentation pour startup avec animations et optimisation SEO.' },
      { id: 'p9', image: 'https://picsum.photos/seed/port9/600/400', titre: 'Portail ONG', description: 'Site multipage pour ONG avec formulaire de don et espace membres.' },
    ],
  },
  {
    id: 'f04', nom: 'Ibrahim Bello', photo: 'https://picsum.photos/seed/f04/200',
    vertical: 'developpement', badge: 'verifie',
    competences: ['PHP', 'Laravel', 'MySQL', 'WordPress', 'WooCommerce'],
    tarifHoraire: 5500, tauxReussite: 90, nombreMissions: 25,
    ville: 'Parakou', disponible: true, dateInscription: '2022-11-05',
    bio: 'Développeur PHP/Laravel avec forte expertise WordPress et WooCommerce. Plus de 25 boutiques e-commerce livrées pour commerçants béninois et nigériens.',
    avis: [
      { id: 'a9', auteur: 'Pharmacie Centrale', avatarSeed: 'a9', note: 5, commentaire: 'Site pharmacy avec catalogue produits et commande en ligne. Parfait.', date: '2024-10-08' },
      { id: 'a10', auteur: 'Restaurant Le Diplomate', avatarSeed: 'a10', note: 5, commentaire: 'Menu en ligne et réservation de table, très simple à gérer.', date: '2024-08-15' },
      { id: 'a11', auteur: 'Association Dantokpa', avatarSeed: 'a11', note: 4, commentaire: 'Bon rapport qualité/prix pour notre site associatif.', date: '2024-06-20' },
    ],
    portfolio: [
      { id: 'p10', image: 'https://picsum.photos/seed/port10/600/400', titre: 'Boutique WooCommerce', description: 'E-commerce vêtements avec 500+ produits, gestion des tailles et paiement Mobile Money.' },
      { id: 'p11', image: 'https://picsum.photos/seed/port11/600/400', titre: 'Site pharmacie', description: 'Catalogue produits de santé avec recherche avancée et demande de devis.' },
      { id: 'p12', image: 'https://picsum.photos/seed/port12/600/400', titre: 'Portail association', description: 'Site institutionnel avec actualités, événements et espace membres.' },
    ],
  },
  {
    id: 'f05', nom: 'Nadia Lawani', photo: 'https://picsum.photos/seed/f05/200',
    vertical: 'developpement', badge: 'expert',
    competences: ['Vue.js', 'Python', 'FastAPI', 'Docker', 'Redis'],
    tarifHoraire: 7500, tauxReussite: 96, nombreMissions: 29,
    ville: 'Cotonou', disponible: false, dateInscription: '2022-08-20',
    bio: 'Développeuse fullstack Vue.js/FastAPI, passionnée de performance et d\'architecture API. Expérience en équipes agiles sur des projets à fort trafic.',
    avis: [
      { id: 'a12', auteur: 'SONAEC', avatarSeed: 'a12', note: 5, commentaire: 'API performante pour notre portail interentreprises. Zéro downtime depuis 8 mois.', date: '2024-11-01' },
      { id: 'a13', auteur: 'BéninShop SARL', avatarSeed: 'a13', note: 5, commentaire: 'Architecture microservices claire et documentée. Référente technique.', date: '2024-08-22' },
      { id: 'a14', auteur: 'École Numérique', avatarSeed: 'a14', note: 5, commentaire: 'Plateforme e-learning livrée avec toutes les fonctionnalités demandées.', date: '2024-06-10' },
    ],
    portfolio: [
      { id: 'p13', image: 'https://picsum.photos/seed/port13/600/400', titre: 'Plateforme e-learning', description: 'Système de cours en ligne avec quiz, certificats et suivi de progression.' },
      { id: 'p14', image: 'https://picsum.photos/seed/port14/600/400', titre: 'API gestion RH', description: 'Backend FastAPI pour ERP RH avec 50+ endpoints et documentation Swagger.' },
      { id: 'p15', image: 'https://picsum.photos/seed/port15/600/400', titre: 'Dashboard B2B', description: 'Interface Vue.js pour gestion de commandes grossistes avec alertes temps réel.' },
    ],
  },
  {
    id: 'f06', nom: 'Alphonse Ahouansou', photo: 'https://picsum.photos/seed/f06/200',
    vertical: 'developpement', badge: 'verifie',
    competences: ['React Native', 'TypeScript', 'Expo', 'Redux', 'GraphQL'],
    tarifForfait: 250000, tauxReussite: 88, nombreMissions: 14,
    ville: 'Abomey-Calavi', disponible: true, dateInscription: '2023-06-15',
    bio: 'Développeur React Native focalisé sur l\'expérience utilisateur. Spécialisé dans les apps mobiles de gestion et de commerce pour le marché ouest-africain.',
    avis: [
      { id: 'a15', auteur: 'FANOU Marketplace', avatarSeed: 'a15', note: 4, commentaire: 'App mobile boutique fonctionnelle, bonne qualité UI.', date: '2024-09-15' },
      { id: 'a16', auteur: 'FinTech Hub Bénin', avatarSeed: 'a16', note: 4, commentaire: 'App de suivi d\'investissement en TypeScript, code propre.', date: '2024-07-20' },
    ],
    portfolio: [
      { id: 'p16', image: 'https://picsum.photos/seed/port16/600/400', titre: 'App de gestion boutique', description: 'Application React Native pour commercants avec gestion stocks et caisse.' },
      { id: 'p17', image: 'https://picsum.photos/seed/port17/600/400', titre: 'App investissement', description: 'Suivi portefeuille d\'investissement avec graphiques et alertes prix.' },
      { id: 'p18', image: 'https://picsum.photos/seed/port18/600/400', titre: 'App événements', description: 'Plateforme de billetterie mobile pour événements culturels à Cotonou.' },
    ],
  },
  {
    id: 'f07', nom: 'Béatrice Dossou', photo: 'https://picsum.photos/seed/f07/200',
    vertical: 'developpement', badge: 'expert',
    competences: ['Django', 'PostgreSQL', 'Celery', 'AWS', 'REST API', 'Python'],
    tarifHoraire: 9000, tauxReussite: 98, nombreMissions: 38,
    ville: 'Cotonou', disponible: true, dateInscription: '2022-04-01',
    bio: 'Ingénieure backend Django sénior. Experte en architecture scalable, intégration de paiement Mobile Money et déploiement cloud pour les marchés africains.',
    avis: [
      { id: 'a17', auteur: 'StartAfrica Tech', avatarSeed: 'a17', note: 5, commentaire: 'Architecture backend solide, traite 10 000 transactions/jour sans problème.', date: '2024-12-10' },
      { id: 'a18', auteur: 'BéninShop SARL', avatarSeed: 'a18', note: 5, commentaire: 'Intégration MTN Money parfaite, aucun incident en production depuis 1 an.', date: '2024-09-30' },
      { id: 'a19', auteur: 'Pharmacie Centrale', avatarSeed: 'a19', note: 5, commentaire: 'Système de prescription en ligne robuste et sécurisé.', date: '2024-07-12' },
    ],
    portfolio: [
      { id: 'p19', image: 'https://picsum.photos/seed/port19/600/400', titre: 'Plateforme de paiement', description: 'Système de paiement en ligne avec intégration Mobile Money et escrow.' },
      { id: 'p20', image: 'https://picsum.photos/seed/port20/600/400', titre: 'API marketplace', description: 'Backend Django pour marketplace B2C avec gestion multi-vendeurs.' },
      { id: 'p21', image: 'https://picsum.photos/seed/port21/600/400', titre: 'Système RH cloud', description: 'Application de gestion du personnel déployée sur AWS, 200 utilisateurs.' },
    ],
  },
  {
    id: 'f08', nom: 'Yao Amoussou', photo: 'https://picsum.photos/seed/f08/200',
    vertical: 'developpement', badge: 'verifie',
    competences: ['Next.js', 'Supabase', 'TailwindCSS', 'Prisma', 'Vercel'],
    tarifHoraire: 6000, tauxReussite: 91, nombreMissions: 16,
    ville: 'Lomé', disponible: true, dateInscription: '2023-07-22',
    bio: 'Développeur Next.js spécialisé dans les stacks modernes (Supabase, Vercel, Prisma). Produit des sites rapides et bien référencés pour startups et PME.',
    avis: [
      { id: 'a20', auteur: 'Médias TJ', avatarSeed: 'a20', note: 5, commentaire: 'Site web media avec CMS intégré, super rapide en chargement.', date: '2024-11-08' },
      { id: 'a21', auteur: 'Sènan Kpètin', avatarSeed: 'a21', note: 4, commentaire: 'Portfolio professionnel élégant, livré en 2 semaines.', date: '2024-09-01' },
    ],
    portfolio: [
      { id: 'p22', image: 'https://picsum.photos/seed/port22/600/400', titre: 'Site media en ligne', description: 'Journal en ligne avec Next.js, Supabase et espace abonnés premium.' },
      { id: 'p23', image: 'https://picsum.photos/seed/port23/600/400', titre: 'SaaS comptabilité', description: 'Application de facturation et comptabilité simple pour indépendants.' },
      { id: 'p24', image: 'https://picsum.photos/seed/port24/600/400', titre: 'Portail événementiel', description: 'Plateforme de gestion d\'événements avec inscription et badge QR code.' },
    ],
  },
  {
    id: 'f09', nom: 'Fatima Tadjou', photo: 'https://picsum.photos/seed/f09/200',
    vertical: 'developpement', badge: 'verifie',
    competences: ['Android', 'Kotlin', 'Firebase', 'Jetpack Compose', 'MVVM'],
    tarifForfait: 200000, tauxReussite: 89, nombreMissions: 11,
    ville: 'Abidjan', disponible: true, dateInscription: '2023-11-10',
    bio: 'Développeuse Android Kotlin avec maîtrise de Jetpack Compose. Crée des applications natives rapides et intuitives pour le marché africain.',
    avis: [
      { id: 'a22', auteur: 'Hôtel Bénin Royal', avatarSeed: 'a22', note: 4, commentaire: 'App Android de check-in fonctionnelle et bien designée.', date: '2024-10-25' },
      { id: 'a23', auteur: 'Association Dantokpa', avatarSeed: 'a23', note: 5, commentaire: 'App de collecte de données terrain, fonctionne sans connexion.', date: '2024-08-05' },
    ],
    portfolio: [
      { id: 'p25', image: 'https://picsum.photos/seed/port25/600/400', titre: 'App de livraison Android', description: 'Application native Android pour livreurs avec carte offline et signature.' },
      { id: 'p26', image: 'https://picsum.photos/seed/port26/600/400', titre: 'App collecte terrain', description: 'Formulaires de collecte de données avec synchronisation différée.' },
      { id: 'p27', image: 'https://picsum.photos/seed/port27/600/400', titre: 'App commerce Android', description: 'Boutique Android avec catalogue, panier et paiement Mobile Money.' },
    ],
  },
  {
    id: 'f10', nom: 'Edouard Gnancadja', photo: 'https://picsum.photos/seed/f10/200',
    vertical: 'developpement', badge: 'premium',
    competences: ['DevOps', 'Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Linux'],
    tarifHoraire: 12000, tauxReussite: 99, nombreMissions: 47,
    ville: 'Cotonou', disponible: true, dateInscription: '2021-09-01',
    bio: 'Ingénieur DevOps senior. Infrastructure cloud AWS, CI/CD, monitoring. Accompagne les équipes tech béninoises vers des pratiques DevOps professionnelles.',
    avis: [
      { id: 'a24', auteur: 'BéninShop SARL', avatarSeed: 'a24', note: 5, commentaire: 'Migration Docker parfaite, déploiement automatisé en place. 0 downtime.', date: '2024-12-05' },
      { id: 'a25', auteur: 'SONAEC', avatarSeed: 'a25', note: 5, commentaire: 'Infrastructure AWS robuste, monitoring proactif. Vraiment professionnel.', date: '2024-10-18' },
      { id: 'a26', auteur: 'FinTech Hub Bénin', avatarSeed: 'a26', note: 5, commentaire: 'CI/CD mis en place en 1 semaine. Déploiements maintenant en 2 minutes.', date: '2024-08-01' },
    ],
    portfolio: [
      { id: 'p28', image: 'https://picsum.photos/seed/port28/600/400', titre: 'Infrastructure AWS multi-régions', description: 'Architecture cloud AWS avec load balancer, auto-scaling et RDS pour startup.' },
      { id: 'p29', image: 'https://picsum.photos/seed/port29/600/400', titre: 'Pipeline CI/CD GitHub Actions', description: 'Déploiement automatisé avec tests, build Docker et rollback automatique.' },
      { id: 'p30', image: 'https://picsum.photos/seed/port30/600/400', titre: 'Monitoring Prometheus/Grafana', description: 'Stack de monitoring complet avec alerting pour plateforme e-commerce.' },
    ],
  },

  // ── DESIGN GRAPHIQUE & UI/UX (f11-f20) ──
  {
    id: 'f11', nom: 'Adeline Akpo', photo: 'https://picsum.photos/seed/f11/200',
    vertical: 'design', badge: 'premium',
    competences: ['UI/UX Design', 'Figma', 'Design System', 'Prototypage', 'Recherche utilisateur'],
    tarifHoraire: 10000, tauxReussite: 98, nombreMissions: 53,
    ville: 'Cotonou', disponible: true, dateInscription: '2021-06-10',
    bio: 'Designer UI/UX senior. Crée des interfaces centrées utilisateur pour des produits numériques qui convertissent et fidélisent. Maîtrise Figma et design system.',
    avis: [
      { id: 'a27', auteur: 'StartAfrica Tech', avatarSeed: 'a27', note: 5, commentaire: 'Design system complet livré en 4 semaines. Nos équipes adorent travailler avec.', date: '2024-12-08' },
      { id: 'a28', auteur: 'FinTech Hub Bénin', avatarSeed: 'a28', note: 5, commentaire: 'Refonte UX de notre app : taux de conversion +35% après 2 mois.', date: '2024-10-01' },
      { id: 'a29', auteur: 'SONAEC', avatarSeed: 'a29', note: 5, commentaire: 'Portail interne repensé, adoption par les équipes instantanée.', date: '2024-07-30' },
    ],
    portfolio: [
      { id: 'p31', image: 'https://picsum.photos/seed/port31/600/400', titre: 'Design System Fintech', description: 'Système de composants Figma complet pour app bancaire mobile (50+ composants).' },
      { id: 'p32', image: 'https://picsum.photos/seed/port32/600/400', titre: 'Refonte UX plateforme RH', description: 'Audit UX + wireframes + prototype haute fidélité pour portail RH entreprise.' },
      { id: 'p33', image: 'https://picsum.photos/seed/port33/600/400', titre: 'App marketplace UI', description: 'Interface complète pour marketplace B2C avec 80+ écrans Figma.' },
    ],
  },
  {
    id: 'f12', nom: 'Modeste Hounsou', photo: 'https://picsum.photos/seed/f12/200',
    vertical: 'design', badge: 'expert',
    competences: ['Brand Identity', 'Adobe Illustrator', 'Logo Design', 'Packaging', 'Charte graphique'],
    tarifForfait: 150000, tauxReussite: 96, nombreMissions: 44,
    ville: 'Porto-Novo', disponible: true, dateInscription: '2022-02-14',
    bio: 'Directeur artistique spécialisé en identité de marque. Crée des identités visuelles mémorables pour startups et PME qui veulent se distinguer sur le marché africain.',
    avis: [
      { id: 'a30', auteur: 'Restaurant Le Diplomate', avatarSeed: 'a30', note: 5, commentaire: 'Notre nouvelle identité visuelle a transformé l\'image de notre restaurant.', date: '2024-11-15' },
      { id: 'a31', auteur: 'Pharmacie Centrale', avatarSeed: 'a31', note: 5, commentaire: 'Charte graphique professionnelle, déclinée sur tous nos supports.', date: '2024-09-08' },
      { id: 'a32', auteur: 'École Numérique', avatarSeed: 'a32', note: 4, commentaire: 'Logo original et mémorable, très satisfait du résultat.', date: '2024-07-22' },
    ],
    portfolio: [
      { id: 'p34', image: 'https://picsum.photos/seed/port34/600/400', titre: 'Identité Startup Fintech', description: 'Logo, charte graphique et assets pour startup de paiement mobile.' },
      { id: 'p35', image: 'https://picsum.photos/seed/port35/600/400', titre: 'Branding Restaurant', description: 'Identité complète : logo, menu, signalétique et réseaux sociaux.' },
      { id: 'p36', image: 'https://picsum.photos/seed/port36/600/400', titre: 'Packaging produits cosmétiques', description: 'Design packaging pour gamme de cosmétiques naturels béninois.' },
    ],
  },
  {
    id: 'f13', nom: 'Rachelle Kakpo', photo: 'https://picsum.photos/seed/f13/200',
    vertical: 'design', badge: 'verifie',
    competences: ['Motion Design', 'After Effects', 'Premiere Pro', 'Animation', 'Video'],
    tarifHoraire: 7000, tauxReussite: 93, nombreMissions: 22,
    ville: 'Cotonou', disponible: true, dateInscription: '2023-04-05',
    bio: 'Motion designer créatif. Transforme des idées en vidéos animées engageantes pour publicité, réseaux sociaux et présentations corporate.',
    avis: [
      { id: 'a33', auteur: 'Médias TJ', avatarSeed: 'a33', note: 5, commentaire: 'Jingle animé parfait pour notre lancement d\'émission. Vue impressionnante.', date: '2024-10-20' },
      { id: 'a34', auteur: 'StartAfrica Tech', avatarSeed: 'a34', note: 4, commentaire: 'Vidéo explicative de notre service, claire et bien animée.', date: '2024-08-14' },
    ],
    portfolio: [
      { id: 'p37', image: 'https://picsum.photos/seed/port37/600/400', titre: 'Intro animée chaîne YouTube', description: 'Animation logo 3D avec effets particules pour chaîne tech africaine.' },
      { id: 'p38', image: 'https://picsum.photos/seed/port38/600/400', titre: 'Vidéo explainer SaaS', description: 'Animation 2D de 90 secondes présentant une app de gestion financière.' },
      { id: 'p39', image: 'https://picsum.photos/seed/port39/600/400', titre: 'Stories publicitaires', description: 'Pack de 10 stories animées pour campagne Instagram boutique mode.' },
    ],
  },
  {
    id: 'f14', nom: 'Arnaud Mèdénou', photo: 'https://picsum.photos/seed/f14/200',
    vertical: 'design', badge: 'expert',
    competences: ['Product Design', 'Figma', 'User Testing', 'Information Architecture', 'Wireframing'],
    tarifHoraire: 8500, tauxReussite: 95, nombreMissions: 35,
    ville: 'Abomey-Calavi', disponible: false, dateInscription: '2022-05-18',
    bio: 'Product designer avec approche data-driven. Conçoit des parcours utilisateurs optimisés pour la conversion, testés auprès d\'utilisateurs réels en Afrique de l\'Ouest.',
    avis: [
      { id: 'a35', auteur: 'BéninShop SARL', avatarSeed: 'a35', note: 5, commentaire: 'Refonte de notre parcours d\'achat : abandon de panier divisé par 2.', date: '2024-11-28' },
      { id: 'a36', auteur: 'FANOU Marketplace', avatarSeed: 'a36', note: 5, commentaire: 'Tests utilisateurs très instructifs, design adapté à notre cible locale.', date: '2024-09-12' },
      { id: 'a37', auteur: 'FinTech Hub Bénin', avatarSeed: 'a37', note: 5, commentaire: 'Architecture d\'information claire pour notre app complexe.', date: '2024-07-03' },
    ],
    portfolio: [
      { id: 'p40', image: 'https://picsum.photos/seed/port40/600/400', titre: 'Refonte app e-commerce', description: 'UX research, IA, wireframes et prototype testé avec 15 utilisateurs béninois.' },
      { id: 'p41', image: 'https://picsum.photos/seed/port41/600/400', titre: 'Dashboard analytique', description: 'Interface de data visualization pour équipe commerciale, 30 vues différentes.' },
      { id: 'p42', image: 'https://picsum.photos/seed/port42/600/400', titre: 'App santé mobile', description: 'Design d\'application de suivi médical pour patients en zone rurale.' },
    ],
  },
  {
    id: 'f15', nom: 'Clarisse Zannou', photo: 'https://picsum.photos/seed/f15/200',
    vertical: 'design', badge: 'verifie',
    competences: ['Illustration', 'Procreate', 'Adobe Illustrator', 'Character Design', 'Infographie'],
    tarifForfait: 80000, tauxReussite: 94, nombreMissions: 19,
    ville: 'Cotonou', disponible: true, dateInscription: '2023-03-20',
    bio: 'Illustratrice digitale spécialisée en personnages et infographies pour supports éducatifs, édition et marketing. Style afro-contemporain reconnaissable.',
    avis: [
      { id: 'a38', auteur: 'École Numérique', avatarSeed: 'a38', note: 5, commentaire: 'Illustrations pour nos manuels numériques, les enfants adorent !', date: '2024-10-12' },
      { id: 'a39', auteur: 'AID Bénin', avatarSeed: 'a39', note: 5, commentaire: 'Infographies rapport annuel très professionnelles et engageantes.', date: '2024-08-25' },
    ],
    portfolio: [
      { id: 'p43', image: 'https://picsum.photos/seed/port43/600/400', titre: 'Illustrations manuel scolaire', description: 'Série de 40 illustrations pédagogiques pour livre numérique en mathématiques.' },
      { id: 'p44', image: 'https://picsum.photos/seed/port44/600/400', titre: 'Infographie rapport ONG', description: 'Mise en page visuelle de données d\'impact pour rapport annuel ONG.' },
      { id: 'p45', image: 'https://picsum.photos/seed/port45/600/400', titre: 'Characters pour app', description: 'Création de 6 personnages pour l\'onboarding d\'une app de gestion financière.' },
    ],
  },
  {
    id: 'f16', nom: 'Didier Agossa', photo: 'https://picsum.photos/seed/f16/200',
    vertical: 'design', badge: 'verifie',
    competences: ['Web Design', 'Webflow', 'Figma', 'CSS', 'Landing Page'],
    tarifHoraire: 6000, tauxReussite: 90, nombreMissions: 20,
    ville: 'Lomé', disponible: true, dateInscription: '2023-05-30',
    bio: 'Web designer Webflow spécialisé dans les landing pages et sites vitrines à forte conversion. Livraison en 1 à 2 semaines garantie.',
    avis: [
      { id: 'a40', auteur: 'Sènan Kpètin', avatarSeed: 'a40', note: 5, commentaire: 'Site portfolio élégant et fonctionnel, livré en 10 jours.', date: '2024-09-28' },
      { id: 'a41', auteur: 'Cabinet Agossou', avatarSeed: 'a41', note: 4, commentaire: 'Site cabinet professionnel, bon rapport qualité/prix.', date: '2024-07-15' },
    ],
    portfolio: [
      { id: 'p46', image: 'https://picsum.photos/seed/port46/600/400', titre: 'Landing page SaaS', description: 'Page de vente pour logiciel de comptabilité avec tunnel de conversion optimisé.' },
      { id: 'p47', image: 'https://picsum.photos/seed/port47/600/400', titre: 'Site vitrine cabinet', description: 'Site professionnel pour cabinet d\'avocats avec blog et formulaire contact.' },
      { id: 'p48', image: 'https://picsum.photos/seed/port48/600/400', titre: 'Portfolio créatif', description: 'Portfolio fullscreen pour photographe avec galerie et booking en ligne.' },
    ],
  },
  {
    id: 'f17', nom: 'Mariette Sossou', photo: 'https://picsum.photos/seed/f17/200',
    vertical: 'design', badge: 'expert',
    competences: ['Logo Design', 'Branding', 'Adobe Illustrator', 'Adobe Photoshop', 'Packaging'],
    tarifForfait: 120000, tauxReussite: 97, nombreMissions: 61,
    ville: 'Cotonou', disponible: true, dateInscription: '2021-12-05',
    bio: 'Graphiste senior avec 4 ans d\'expérience en création de logos et chartes graphiques. Plus de 60 marques béninoises et africaines dans son portfolio.',
    avis: [
      { id: 'a42', auteur: 'Hôtel Bénin Royal', avatarSeed: 'a42', note: 5, commentaire: 'Notre rebranding a été remarqué par toute la clientèle. Excellent travail.', date: '2024-12-02' },
      { id: 'a43', auteur: 'FANOU Marketplace', avatarSeed: 'a43', note: 5, commentaire: 'Logo moderne qui représente bien notre boutique. Très satisfaite.', date: '2024-10-05' },
      { id: 'a44', auteur: 'Association Dantokpa', avatarSeed: 'a44', note: 5, commentaire: 'Identité visuelle de notre association, mémorable et professionnelle.', date: '2024-08-18' },
    ],
    portfolio: [
      { id: 'p49', image: 'https://picsum.photos/seed/port49/600/400', titre: 'Rebranding Hôtel', description: 'Nouveau logo + charte graphique + signalétique pour hôtel 4 étoiles.' },
      { id: 'p50', image: 'https://picsum.photos/seed/port50/600/400', titre: 'Identité marque agro', description: 'Logo + packaging pour gamme de produits agricoles exportés.' },
      { id: 'p51', image: 'https://picsum.photos/seed/port51/600/400', titre: 'Kit marque startup', description: 'Brand kit complet (logo, couleurs, typo, templates) pour startup tech.' },
    ],
  },
  {
    id: 'f18', nom: 'Joël Houénou', photo: 'https://picsum.photos/seed/f18/200',
    vertical: 'design', badge: 'verifie',
    competences: ['UI Design', 'Adobe XD', 'Figma', 'Mobile Design', 'Design Sprint'],
    tarifHoraire: 5500, tauxReussite: 88, nombreMissions: 15,
    ville: 'Parakou', disponible: true, dateInscription: '2023-08-15',
    bio: 'UI Designer spécialisé en interfaces mobiles. Crée des designs fonctionnels et esthétiques adaptés aux utilisateurs africains.',
    avis: [
      { id: 'a45', auteur: 'Jean-Marc Vodounon', avatarSeed: 'a45', note: 4, commentaire: 'Interface de mon app bien pensée, agréable à utiliser.', date: '2024-10-22' },
      { id: 'a46', auteur: 'StartAfrica Tech', avatarSeed: 'a46', note: 4, commentaire: 'Maquettes livrées rapidement, quelques itérations nécessaires.', date: '2024-08-10' },
    ],
    portfolio: [
      { id: 'p52', image: 'https://picsum.photos/seed/port52/600/400', titre: 'App transport urbain', description: 'UI d\'application de réservation de transport à Cotonou, mode nuit inclus.' },
      { id: 'p53', image: 'https://picsum.photos/seed/port53/600/400', titre: 'App épargne mobile', description: 'Interface d\'application d\'épargne collaborative pour groupes informels.' },
      { id: 'p54', image: 'https://picsum.photos/seed/port54/600/400', titre: 'Dashboard entreprise', description: 'Interface web de gestion de flotte véhicules pour entreprise logistique.' },
    ],
  },
  {
    id: 'f19', nom: 'Viviane Adjamossi', photo: 'https://picsum.photos/seed/f19/200',
    vertical: 'design', badge: 'verifie',
    competences: ['Graphic Design', 'InDesign', 'Affiche', 'Flyer', 'Print Design'],
    tarifForfait: 60000, tauxReussite: 92, nombreMissions: 28,
    ville: 'Cotonou', disponible: false, dateInscription: '2022-09-10',
    bio: 'Graphiste print et digital. Affiches, flyers, brochures et supports de communication pour événements, entreprises et institutions.',
    avis: [
      { id: 'a47', auteur: 'AID Bénin', avatarSeed: 'a47', note: 5, commentaire: 'Affiches de campagne sensationnelles, très remarquées lors de l\'événement.', date: '2024-11-05' },
      { id: 'a48', auteur: 'Restaurant Le Diplomate', avatarSeed: 'a48', note: 4, commentaire: 'Menus et flyers promotionnels de qualité imprimerie.', date: '2024-09-20' },
    ],
    portfolio: [
      { id: 'p55', image: 'https://picsum.photos/seed/port55/600/400', titre: 'Campagne d\'affichage ONG', description: 'Série de 5 affiches pour campagne de sensibilisation sur l\'éducation des filles.' },
      { id: 'p56', image: 'https://picsum.photos/seed/port56/600/400', titre: 'Brochure corporate', description: 'Brochure A3 pliée pour entreprise de services B2B, 16 pages.' },
      { id: 'p57', image: 'https://picsum.photos/seed/port57/600/400', titre: 'Programme événement', description: 'Programme + livret pour forum tech Afrique de l\'Ouest, 200 participants.' },
    ],
  },
  {
    id: 'f20', nom: 'Patrice Assou', photo: 'https://picsum.photos/seed/f20/200',
    vertical: 'design', badge: 'premium',
    competences: ['UX Research', 'User Testing', 'Figma', 'Conception d\'interfaces', 'Accessibilité'],
    tarifHoraire: 11000, tauxReussite: 99, nombreMissions: 40,
    ville: 'Abidjan', disponible: true, dateInscription: '2021-10-20',
    bio: 'Expert UX Research avec 4 ans d\'expérience en tests utilisateurs sur le terrain en Afrique de l\'Ouest. Transforme les données comportementales en décisions design.',
    avis: [
      { id: 'a49', auteur: 'BéninShop SARL', avatarSeed: 'a49', note: 5, commentaire: 'Tests terrain révélateurs, notre redesign a suivi exactement ses recommandations.', date: '2024-12-15' },
      { id: 'a50', auteur: 'FinTech Hub Bénin', avatarSeed: 'a50', note: 5, commentaire: 'Rapport UX Research de référence, 40 pages d\'insights actionnables.', date: '2024-10-08' },
      { id: 'a51', auteur: 'École Numérique', avatarSeed: 'a51', note: 5, commentaire: 'Tests sur tablette avec élèves ruraux, résultats précieux pour notre produit.', date: '2024-07-25' },
    ],
    portfolio: [
      { id: 'p58', image: 'https://picsum.photos/seed/port58/600/400', titre: 'Research fintech mobile', description: 'Étude terrain auprès de 30 utilisateurs sur usage du Mobile Money, livrables actionnables.' },
      { id: 'p59', image: 'https://picsum.photos/seed/port59/600/400', titre: 'Audit accessibilité', description: 'Audit complet accessibilité WCAG 2.1 pour site institutionnel gouvernement.' },
      { id: 'p60', image: 'https://picsum.photos/seed/port60/600/400', titre: 'Personas & Customer Journey', description: 'Cartographie du parcours client pour marketplace alimentaire, 5 personas.' },
    ],
  },

  // ── MARKETING DIGITAL & COMMUNITY MANAGEMENT (f21-f30) ──
  {
    id: 'f21', nom: 'Sandrine Gbaguidi', photo: 'https://picsum.photos/seed/f21/200',
    vertical: 'marketing', badge: 'expert',
    competences: ['Social Media', 'Facebook Ads', 'Instagram Ads', 'Création de contenu', 'Analytics'],
    tarifHoraire: 6500, tauxReussite: 94, nombreMissions: 36,
    ville: 'Cotonou', disponible: true, dateInscription: '2022-07-15',
    bio: 'Social media manager senior avec expertise publicité Facebook/Instagram. Gère des budgets publicitaires jusqu\'à 5M FCFA pour PME et startups béninoises.',
    avis: [
      { id: 'a52', auteur: 'FANOU Marketplace', avatarSeed: 'a52', note: 5, commentaire: 'Nos ventes Instagram ont triplé en 3 mois de gestion. Incroyable ROI.', date: '2024-11-25' },
      { id: 'a53', auteur: 'Restaurant Le Diplomate', avatarSeed: 'a53', note: 5, commentaire: 'Campagnes Facebook très ciblées, réservations en hausse de 60%.', date: '2024-09-18' },
      { id: 'a54', auteur: 'Hôtel Bénin Royal', avatarSeed: 'a54', note: 5, commentaire: 'Community management professionnel, notre e-réputation a changé.', date: '2024-07-10' },
    ],
    portfolio: [
      { id: 'p61', image: 'https://picsum.photos/seed/port61/600/400', titre: 'Campagne lancement produit', description: 'Campagne Facebook/Instagram pour lancement boutique mode, 500K FCFA budget, ROAS x4.' },
      { id: 'p62', image: 'https://picsum.photos/seed/port62/600/400', titre: 'Stratégie social media', description: 'Stratégie 6 mois avec calendrier éditorial, templates et KPIs pour restaurant.' },
      { id: 'p63', image: 'https://picsum.photos/seed/port63/600/400', titre: 'Rapport mensuel analytics', description: 'Dashboard de suivi des performances réseaux sociaux avec recommandations.' },
    ],
  },
  {
    id: 'f22', nom: 'Théodore Kpakpavi', photo: 'https://picsum.photos/seed/f22/200',
    vertical: 'marketing', badge: 'premium',
    competences: ['SEO', 'Content Marketing', 'WordPress', 'Rédaction web', 'Netlinking'],
    tarifHoraire: 7000, tauxReussite: 96, nombreMissions: 43,
    ville: 'Porto-Novo', disponible: true, dateInscription: '2021-11-10',
    bio: 'Expert SEO francophone avec une expertise rare sur les marchés béninois et ouest-africains. Positionne des sites en première page Google durablement.',
    avis: [
      { id: 'a55', auteur: 'Cabinet Agossou', avatarSeed: 'a55', note: 5, commentaire: 'Site cabinet maintenant 1ère position sur "avocat Cotonou". ROI exceptionnel.', date: '2024-12-10' },
      { id: 'a56', auteur: 'Pharmacie Centrale', avatarSeed: 'a56', note: 5, commentaire: 'Trafic organique x5 en 6 mois. Stratégie content efficace.', date: '2024-09-25' },
      { id: 'a57', auteur: 'BéninShop SARL', avatarSeed: 'a57', note: 5, commentaire: 'Audit SEO très complet, roadmap claire. Résultats visibles dès le 2ème mois.', date: '2024-07-18' },
    ],
    portfolio: [
      { id: 'p64', image: 'https://picsum.photos/seed/port64/600/400', titre: 'SEO site e-commerce', description: 'Audit + optimisation technique + 60 articles pour boutique mode. Trafic +400% en 8 mois.' },
      { id: 'p65', image: 'https://picsum.photos/seed/port65/600/400', titre: 'Stratégie contenu B2B', description: 'Plan éditorial 12 mois + 24 articles optimisés pour cabinet conseil.' },
      { id: 'p66', image: 'https://picsum.photos/seed/port66/600/400', titre: 'Netlinking thématique', description: 'Campagne de liens entrants sur sites africains francophones pour startup fintech.' },
    ],
  },
  {
    id: 'f23', nom: 'Aurélie Kiniffo', photo: 'https://picsum.photos/seed/f23/200',
    vertical: 'marketing', badge: 'verifie',
    competences: ['Community Management', 'Création de contenu', 'Canva', 'Instagram', 'TikTok'],
    tarifHoraire: 5000, tauxReussite: 91, nombreMissions: 21,
    ville: 'Cotonou', disponible: true, dateInscription: '2023-02-28',
    bio: 'Community manager créative. Anime des communautés engagées sur Instagram et TikTok pour marques béninoises. Crée du contenu vidéo et photo adapté au marché local.',
    avis: [
      { id: 'a58', auteur: 'FANOU Marketplace', avatarSeed: 'a58', note: 5, commentaire: 'Communauté Instagram passée de 200 à 8000 abonnés en 4 mois !', date: '2024-10-30' },
      { id: 'a59', auteur: 'Restaurant Le Diplomate', avatarSeed: 'a59', note: 4, commentaire: 'Contenu attractif et régulier, bonne réactivité aux commentaires.', date: '2024-08-20' },
    ],
    portfolio: [
      { id: 'p67', image: 'https://picsum.photos/seed/port67/600/400', titre: 'Stratégie Instagram boutique', description: 'Croissance organique de 0 à 10K abonnés pour boutique cosmétiques en 6 mois.' },
      { id: 'p68', image: 'https://picsum.photos/seed/port68/600/400', titre: 'TikTok restaurant', description: '12 vidéos TikTok pour restaurant, 3 vidéos virales à 50K+ vues.' },
      { id: 'p69', image: 'https://picsum.photos/seed/port69/600/400', titre: 'Pack contenu mensuel', description: '30 posts Canva + légendes + stories pour brand lifestyle.' },
    ],
  },
  {
    id: 'f24', nom: 'Maxime Hounsounou', photo: 'https://picsum.photos/seed/f24/200',
    vertical: 'marketing', badge: 'expert',
    competences: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Media Planning', 'Conversion'],
    tarifHoraire: 8000, tauxReussite: 95, nombreMissions: 31,
    ville: 'Abomey-Calavi', disponible: true, dateInscription: '2022-06-01',
    bio: 'Spécialiste paid media avec expertise Google Ads et Meta Ads. Certifié Google & Meta. Gère des budgets publicitaires de 500K à 10M FCFA pour des résultats mesurables.',
    avis: [
      { id: 'a60', auteur: 'StartAfrica Tech', avatarSeed: 'a60', note: 5, commentaire: 'Google Ads ROI x6 sur nos campagnes SaaS. Vraiment expert.', date: '2024-11-20' },
      { id: 'a61', auteur: 'FinTech Hub Bénin', avatarSeed: 'a61', note: 5, commentaire: 'Acquisition LinkedIn B2B très efficace, CPL divisé par 3.', date: '2024-09-10' },
      { id: 'a62', auteur: 'BéninShop SARL', avatarSeed: 'a62', note: 4, commentaire: 'Bonne optimisation de nos campagnes Meta, résultats en hausse.', date: '2024-07-05' },
    ],
    portfolio: [
      { id: 'p70', image: 'https://picsum.photos/seed/port70/600/400', titre: 'Google Ads SaaS B2B', description: 'Campagne Search + Display pour logiciel B2B, CPL de 3 500 FCFA.' },
      { id: 'p71', image: 'https://picsum.photos/seed/port71/600/400', titre: 'Meta Ads e-commerce', description: 'Campagne conversion boutique mode, ROAS de 5,2 sur 2M FCFA de budget.' },
      { id: 'p72', image: 'https://picsum.photos/seed/port72/600/400', titre: 'LinkedIn Ads RH', description: 'Génération de leads pour cabinet de recrutement via LinkedIn, 120 leads qualifiés.' },
    ],
  },
  {
    id: 'f25', nom: 'Sylvie Dègla', photo: 'https://picsum.photos/seed/f25/200',
    vertical: 'marketing', badge: 'verifie',
    competences: ['Email Marketing', 'Mailchimp', 'Automation', 'Copywriting', 'CRM'],
    tarifHoraire: 5500, tauxReussite: 90, nombreMissions: 18,
    ville: 'Cotonou', disponible: true, dateInscription: '2023-01-15',
    bio: 'Email marketeur avec spécialisation en automation et séquences de nurturing. Aide les PME à fidéliser leurs clients et augmenter le panier moyen.',
    avis: [
      { id: 'a63', auteur: 'Pharmacie Centrale', avatarSeed: 'a63', note: 4, commentaire: 'Newsletter mensuelle de qualité, taux d\'ouverture à 35%. Bon travail.', date: '2024-10-15' },
      { id: 'a64', auteur: 'Cabinet Agossou', avatarSeed: 'a64', note: 5, commentaire: 'Séquence d\'emails automatisée pour nos nouveaux clients. Vraiment efficace.', date: '2024-08-28' },
    ],
    portfolio: [
      { id: 'p73', image: 'https://picsum.photos/seed/port73/600/400', titre: 'Séquence onboarding', description: 'Séquence de 7 emails d\'accueil pour SaaS, taux de conversion trial→payant +18%.' },
      { id: 'p74', image: 'https://picsum.photos/seed/port74/600/400', titre: 'Newsletter mensuelle', description: 'Template et rédaction newsletter B2B pour 5000 abonnés, 30% taux ouverture.' },
      { id: 'p75', image: 'https://picsum.photos/seed/port75/600/400', titre: 'Automation panier abandonné', description: 'Séquence de 3 emails de récupération panier, taux de récupération 12%.' },
    ],
  },
  {
    id: 'f26', nom: 'Christian Azondekon', photo: 'https://picsum.photos/seed/f26/200',
    vertical: 'marketing', badge: 'expert',
    competences: ['Copywriting', 'Brand Voice', 'Storytelling', 'Landing Page', 'Publicité'],
    tarifForfait: 100000, tauxReussite: 96, nombreMissions: 38,
    ville: 'Lomé', disponible: true, dateInscription: '2022-03-10',
    bio: 'Copywriter persuasif. Rédige des textes qui vendent pour landing pages, publicités et emails. Adapte le message au contexte culturel africain pour un impact maximal.',
    avis: [
      { id: 'a65', auteur: 'FinTech Hub Bénin', avatarSeed: 'a65', note: 5, commentaire: 'Landing page recopiée à main levée tant les textes convertissent. Bravo.', date: '2024-12-08' },
      { id: 'a66', auteur: 'StartAfrica Tech', avatarSeed: 'a66', note: 5, commentaire: 'Pitch deck réécrit, levée de fonds facilitée par sa clarté narrative.', date: '2024-10-02' },
      { id: 'a67', auteur: 'FANOU Marketplace', avatarSeed: 'a67', note: 5, commentaire: 'Fiches produits rédigées de façon convaincante, taux de clic en hausse.', date: '2024-08-12' },
    ],
    portfolio: [
      { id: 'p76', image: 'https://picsum.photos/seed/port76/600/400', titre: 'Landing page SaaS', description: 'Page de vente pour logiciel GED, taux de conversion de 8% (moyenne secteur : 2%).' },
      { id: 'p77', image: 'https://picsum.photos/seed/port77/600/400', titre: 'Scripts publicités vidéo', description: 'Scripts pour 5 publicités YouTube, vue moyenne 70% de la vidéo.' },
      { id: 'p78', image: 'https://picsum.photos/seed/port78/600/400', titre: 'Pitch deck investisseurs', description: 'Rédaction narrative pour levée de fonds 50M FCFA, 3 investisseurs convaincus.' },
    ],
  },
  {
    id: 'f27', nom: 'Céline Tonon', photo: 'https://picsum.photos/seed/f27/200',
    vertical: 'marketing', badge: 'verifie',
    competences: ['Influencer Marketing', 'Partenariats', 'UGC', 'Brand Ambassador', 'Instagram'],
    tarifForfait: 80000, tauxReussite: 88, nombreMissions: 14,
    ville: 'Cotonou', disponible: true, dateInscription: '2023-05-20',
    bio: 'Spécialiste en marketing d\'influence et partenariats. Connecte les marques avec les créateurs de contenu béninois et west-africains pour des campagnes authentiques.',
    avis: [
      { id: 'a68', auteur: 'FANOU Marketplace', avatarSeed: 'a68', note: 4, commentaire: 'Collaboration avec 5 influenceurs, bonne visibilité sur Cotonou.', date: '2024-11-10' },
      { id: 'a69', auteur: 'Médias TJ', avatarSeed: 'a69', note: 5, commentaire: 'Partenariat influenceur parfaitement géré, couverture événement excellent.', date: '2024-09-05' },
    ],
    portfolio: [
      { id: 'p79', image: 'https://picsum.photos/seed/port79/600/400', titre: 'Campagne influenceurs mode', description: 'Activation 8 micro-influenceurs Cotonou pour lancement collection, 200K de portée.' },
      { id: 'p80', image: 'https://picsum.photos/seed/port80/600/400', titre: 'Programme ambassadeurs', description: 'Création programme d\'ambassadeurs étudiants pour application éducative.' },
      { id: 'p81', image: 'https://picsum.photos/seed/port81/600/400', titre: 'UGC campagne événement', description: 'Récolte et curation de contenu utilisateur pour forum tech, 500 publications.' },
    ],
  },
  {
    id: 'f28', nom: 'Francis Goudjo', photo: 'https://picsum.photos/seed/f28/200',
    vertical: 'marketing', badge: 'verifie',
    competences: ['Google Analytics', 'Data Studio', 'Tableau', 'A/B Testing', 'CRO'],
    tarifHoraire: 6000, tauxReussite: 93, nombreMissions: 20,
    ville: 'Porto-Novo', disponible: true, dateInscription: '2022-10-01',
    bio: 'Analyste marketing data-driven. Installe les outils de tracking, analyse les données et recommande des optimisations concrètes pour améliorer la performance.',
    avis: [
      { id: 'a70', auteur: 'BéninShop SARL', avatarSeed: 'a70', note: 5, commentaire: 'Dashboard analytique clair, notre équipe suit enfin les bons KPIs.', date: '2024-11-18' },
      { id: 'a71', auteur: 'StartAfrica Tech', avatarSeed: 'a71', note: 5, commentaire: 'A/B tests bien conduits, variation gagnante identifiée en 2 semaines.', date: '2024-09-22' },
    ],
    portfolio: [
      { id: 'p82', image: 'https://picsum.photos/seed/port82/600/400', titre: 'Dashboard marketing', description: 'Dashboard Google Data Studio avec 15 KPIs pour e-commerce, mise à jour automatique.' },
      { id: 'p83', image: 'https://picsum.photos/seed/port83/600/400', titre: 'Audit analytics', description: 'Audit complet du tracking GA4 + plan de taggage pour site 50 000 visiteurs/mois.' },
      { id: 'p84', image: 'https://picsum.photos/seed/port84/600/400', titre: 'Programme CRO', description: '6 A/B tests menés sur landing page, taux de conversion passé de 2% à 5,4%.' },
    ],
  },
  {
    id: 'f29', nom: 'Madeleine Sènavé', photo: 'https://picsum.photos/seed/f29/200',
    vertical: 'marketing', badge: 'expert',
    competences: ['Content Strategy', 'Rédaction web', 'SEO Content', 'Podcast', 'Newsletter'],
    tarifHoraire: 7000, tauxReussite: 95, nombreMissions: 29,
    ville: 'Cotonou', disponible: true, dateInscription: '2022-08-05',
    bio: 'Stratège de contenu senior. Conçoit et déploie des stratégies éditoriales complètes pour attirer, engager et convertir les audiences africaines francophones.',
    avis: [
      { id: 'a72', auteur: 'École Numérique', avatarSeed: 'a72', note: 5, commentaire: 'Stratégie de contenu qui a multiplié notre audience par 8 en un an.', date: '2024-12-05' },
      { id: 'a73', auteur: 'AID Bénin', avatarSeed: 'a73', note: 5, commentaire: 'Rapport annuel écrit de façon engageante, nos donateurs ont adoré.', date: '2024-10-10' },
      { id: 'a74', auteur: 'SONAEC', avatarSeed: 'a74', note: 4, commentaire: 'Bonne stratégie contenu pour notre intranet, adoptée par les équipes.', date: '2024-08-02' },
    ],
    portfolio: [
      { id: 'p85', image: 'https://picsum.photos/seed/port85/600/400', titre: 'Stratégie éditoriale ONG', description: 'Plan de contenu 12 mois + formation équipe pour ONG éducation, audience x8.' },
      { id: 'p86', image: 'https://picsum.photos/seed/port86/600/400', titre: 'Podcast corporate', description: 'Conception et 10 épisodes du podcast RH de BéninShop (3000 écoutes/épisode).' },
      { id: 'p87', image: 'https://picsum.photos/seed/port87/600/400', titre: 'Newsletter experts', description: 'Newsletter hebdomadaire tech Afrique pour 8000 abonnés, 42% taux ouverture.' },
    ],
  },
  {
    id: 'f30', nom: 'Romain Houèdokoho', photo: 'https://picsum.photos/seed/f30/200',
    vertical: 'marketing', badge: 'premium',
    competences: ['Growth Hacking', 'CRO', 'Product Marketing', 'Référencement', 'Acquisition'],
    tarifHoraire: 10000, tauxReussite: 97, nombreMissions: 45,
    ville: 'Abidjan', disponible: true, dateInscription: '2021-07-15',
    bio: 'Growth hacker senior. Identifie les leviers de croissance rapide et les implémente avec rigueur. Spécialisé sur les marchés digitaux émergents d\'Afrique francophone.',
    avis: [
      { id: 'a75', auteur: 'FinTech Hub Bénin', avatarSeed: 'a75', note: 5, commentaire: 'Notre MRR a été multiplié par 3 en 6 mois grâce à son approche growth.', date: '2024-12-12' },
      { id: 'a76', auteur: 'StartAfrica Tech', avatarSeed: 'a76', note: 5, commentaire: 'Stratégie acquisition B2B redoutable, coût d\'acquisition divisé par 4.', date: '2024-10-05' },
      { id: 'a77', auteur: 'BéninShop SARL', avatarSeed: 'a77', note: 5, commentaire: 'Référencement produit optimisé, notre catalogue vu par 3x plus de visiteurs.', date: '2024-07-28' },
    ],
    portfolio: [
      { id: 'p88', image: 'https://picsum.photos/seed/port88/600/400', titre: 'Growth B2B SaaS', description: 'Stratégie acquisition + referral + PLG pour SaaS, MRR x3 en 6 mois.' },
      { id: 'p89', image: 'https://picsum.photos/seed/port89/600/400', titre: 'Viral loop e-commerce', description: 'Mécanisme de parrainage et fidélité, +40% clients acquis via referral.' },
      { id: 'p90', image: 'https://picsum.photos/seed/port90/600/400', titre: 'Optimisation funnel', description: 'Refonte tunnel de conversion, de 1,2% à 4,8% de taux de conversion global.' },
    ],
  },

  // ── COMPTABILITÉ & FISCALITÉ (f34-f37) ──
  {
    id: 'f34', nom: 'Gervais Dossou-Yovo', photo: 'https://picsum.photos/seed/f34/200',
    vertical: 'comptabilite', badge: 'expert',
    competences: ['OHADA', 'SYSCOHADA', 'Bilan annuel', 'Déclaration fiscale', 'Audit', 'DGI'],
    numeroOrdre: 'OECCA-BJ-2019-0142',
    tarifHoraire: 9000, tauxReussite: 98, nombreMissions: 54,
    ville: 'Cotonou', disponible: true, dateInscription: '2022-04-10',
    bio: 'Expert-comptable diplômé, membre de l\'OECCA-Bénin. 8 ans d\'expérience en tenue comptable OHADA, établissement des bilans et déclarations fiscales pour PME et ONG béninoises.',
    avis: [
      { id: 'a78', auteur: 'Cabinet Agossou & Associés', avatarSeed: 'a78', note: 5, commentaire: 'Bilan annuel irréprochable, zéro remarque DGI lors du contrôle. Très fiable.', date: '2024-11-18' },
      { id: 'a79', auteur: 'FANOU Marketplace', avatarSeed: 'a79', note: 5, commentaire: 'Tenue comptable rigoureuse et rapports clairs. Je recommande sans hésiter.', date: '2024-09-10' },
      { id: 'a80', auteur: 'AID Bénin', avatarSeed: 'a80', note: 5, commentaire: 'Comptabilité ONG conforme aux exigences des bailleurs internationaux. Excellent.', date: '2024-07-02' },
    ],
    portfolio: [
      { id: 'p100', image: 'https://picsum.photos/seed/port100/600/400', titre: 'Bilan PME SYSCOHADA', description: 'Établissement du bilan annuel et liasses fiscales pour PME de distribution, 200M FCFA de CA.' },
      { id: 'p101', image: 'https://picsum.photos/seed/port101/600/400', titre: 'Audit ONG internationale', description: 'Audit financier d\'une ONG de développement sur financement AFD, rapport aux normes INTOSAI.' },
      { id: 'p102', image: 'https://picsum.photos/seed/port102/600/400', titre: 'Restructuration comptable', description: 'Migration vers SYSCOHADA révisé pour groupe de 3 sociétés, formation équipe interne.' },
    ],
  },
  {
    id: 'f35', nom: 'Clémentine Agbodjan', photo: 'https://picsum.photos/seed/f35/200',
    vertical: 'comptabilite', badge: 'expert',
    competences: ['DGI', 'CNSS', 'Déclaration fiscale', 'TVA', 'IS', 'Paie', 'SYSCOHADA'],
    numeroOrdre: 'OECCA-BJ-2021-0318',
    tarifForfait: 180000, tauxReussite: 96, nombreMissions: 38,
    ville: 'Cotonou', disponible: true, dateInscription: '2022-09-15',
    bio: 'Comptable fiscaliste spécialisée dans les déclarations DGI (TVA, IS, IRPP) et CNSS pour PME et commerçants béninois. Évite les pénalités et optimise la charge fiscale dans le cadre légal.',
    avis: [
      { id: 'a81', auteur: 'Restaurant Le Diplomate', avatarSeed: 'a81', note: 5, commentaire: 'Nos déclarations TVA sont enfin à jour et sans erreur. Plus de stress fiscal.', date: '2024-12-01' },
      { id: 'a82', auteur: 'Pharmacie Centrale Cotonou', avatarSeed: 'a82', note: 5, commentaire: 'Gestion paie et CNSS impeccable pour 12 salariés. Très réactive.', date: '2024-10-15' },
      { id: 'a83', auteur: 'Jean-Marc Vodounon', avatarSeed: 'a83', note: 4, commentaire: 'Déclaration IRPP gérée proprement, dossier DGI sans problème.', date: '2024-08-20' },
    ],
    portfolio: [
      { id: 'p103', image: 'https://picsum.photos/seed/port103/600/400', titre: 'Dossier fiscal PME', description: 'Régularisation fiscale complète (TVA + IS sur 3 ans) pour PME hôtelière, sans pénalités.' },
      { id: 'p104', image: 'https://picsum.photos/seed/port104/600/400', titre: 'Paie mensuelle multi-sociétés', description: 'Gestion de la paie de 3 sociétés (45 salariés au total), CNSS et déclarations DGI inclus.' },
      { id: 'p105', image: 'https://picsum.photos/seed/port105/600/400', titre: 'Optimisation TVA collecteur', description: 'Analyse et optimisation du régime TVA pour grossiste, économie de 4,2M FCFA/an.' },
    ],
  },
  {
    id: 'f36', nom: 'Hippolyte Zinsou', photo: 'https://picsum.photos/seed/f36/200',
    vertical: 'comptabilite', badge: 'verifie',
    competences: ['Audit interne', 'Contrôle de gestion', 'Bilan annuel', 'OHADA', 'Tableau de bord'],
    tarifHoraire: 7500, tauxReussite: 93, nombreMissions: 22,
    ville: 'Parakou', disponible: true, dateInscription: '2023-02-20',
    bio: 'Contrôleur de gestion et auditeur interne. Conçoit des tableaux de bord financiers et des procédures de contrôle interne pour PME souhaitant structurer leur gestion.',
    avis: [
      { id: 'a84', auteur: 'Médias TJ', avatarSeed: 'a84', note: 5, commentaire: 'Tableau de bord financier enfin lisible et actionnable pour notre direction.', date: '2024-11-08' },
      { id: 'a85', auteur: 'SONAEC', avatarSeed: 'a85', note: 4, commentaire: 'Audit interne bien structuré, rapport de recommandations très utile.', date: '2024-09-14' },
    ],
    portfolio: [
      { id: 'p106', image: 'https://picsum.photos/seed/port106/600/400', titre: 'Tableau de bord dirigeant', description: 'Dashboard financier mensuel pour PME industrielle : cash-flow, marges, écarts budget/réel.' },
      { id: 'p107', image: 'https://picsum.photos/seed/port107/600/400', titre: 'Manuel de procédures', description: 'Rédaction du manuel de procédures comptables et financières pour entreprise de 80 personnes.' },
      { id: 'p108', image: 'https://picsum.photos/seed/port108/600/400', titre: 'Audit interne startup', description: 'Première mission d\'audit interne pour startup fintech en série A, rapport aux investisseurs.' },
    ],
  },
  {
    id: 'f37', nom: 'Rosalie Kpadonou', photo: 'https://picsum.photos/seed/f37/200',
    vertical: 'comptabilite', badge: 'verifie',
    competences: ['Paie', 'CNSS', 'Droit social', 'Contrats de travail', 'SYSCOHADA'],
    tarifForfait: 80000, tauxReussite: 91, nombreMissions: 17,
    ville: 'Cotonou', disponible: false, dateInscription: '2023-06-01',
    bio: 'Gestionnaire de paie et spécialiste droit social. Établit les bulletins de paie conformes au code du travail béninois, gère les entrées/sorties et assure la conformité CNSS.',
    avis: [
      { id: 'a86', auteur: 'Hôtel Bénin Royal', avatarSeed: 'a86', note: 5, commentaire: 'Paie de 30 salariés gérée sans accroc depuis 1 an. Très professionnelle.', date: '2024-10-25' },
      { id: 'a87', auteur: 'École Numérique Bénin', avatarSeed: 'a87', note: 4, commentaire: 'Mise en conformité CNSS effectuée rapidement, dossiers en ordre.', date: '2024-08-05' },
    ],
    portfolio: [
      { id: 'p109', image: 'https://picsum.photos/seed/port109/600/400', titre: 'Externalisation paie', description: 'Prise en charge complète de la paie mensuelle pour hôtel de 30 salariés + déclarations CNSS.' },
      { id: 'p110', image: 'https://picsum.photos/seed/port110/600/400', titre: 'Régularisation CNSS', description: 'Régularisation des cotisations CNSS arriérées sur 2 ans pour PME, sans majoration de retard.' },
      { id: 'p111', image: 'https://picsum.photos/seed/port111/600/400', titre: 'Procédures RH', description: 'Rédaction des contrats de travail et du règlement intérieur pour startup de 15 personnes.' },
    ],
  },

  // ── EN ATTENTE DE VÉRIFICATION (inscrits récemment) ──
  {
    id: 'f31', nom: 'Narcisse Amoussou', photo: 'https://picsum.photos/seed/f31/200',
    vertical: 'developpement', statutVerification: 'en_attente',
    competences: ['PHP', 'Laravel', 'MySQL', 'Vue.js', 'Bootstrap'],
    tarifHoraire: 5000, tauxReussite: 0, nombreMissions: 0,
    ville: 'Cotonou', disponible: true, dateInscription: '2025-06-20',
    bio: 'Développeur web Laravel/PHP avec 2 ans d\'expérience sur des sites vitrine et e-commerce pour PME béninoises. Passionné par les solutions accessibles et performantes.',
    avis: [],
    portfolio: [
      { id: 'p91', image: 'https://picsum.photos/seed/port91/600/400', titre: 'Site e-commerce PME', description: 'Boutique en ligne Laravel pour boulangerie Cotonou, 80 produits, commande en ligne.' },
      { id: 'p92', image: 'https://picsum.photos/seed/port92/600/400', titre: 'Portail de gestion RH', description: 'Application web de gestion des présences et congés pour entreprise de 50 personnes.' },
      { id: 'p93', image: 'https://picsum.photos/seed/port93/600/400', titre: 'API REST artisans', description: 'API de mise en relation artisans/clients avec paiement en ligne pour startup béninoise.' },
    ],
  },
  {
    id: 'f32', nom: 'Élise Kpatchavi', photo: 'https://picsum.photos/seed/f32/200',
    vertical: 'design', statutVerification: 'en_attente',
    competences: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Canva', 'UI Design'],
    tarifForfait: 75000, tauxReussite: 0, nombreMissions: 0,
    ville: 'Porto-Novo', disponible: true, dateInscription: '2025-06-22',
    bio: 'Designer graphique et UI freelance. Crée des identités visuelles mémorables et des interfaces intuitives pour startups et PME. Sensible aux codes culturels africains.',
    avis: [],
    portfolio: [
      { id: 'p94', image: 'https://picsum.photos/seed/port94/600/400', titre: 'Identité visuelle ONG', description: 'Logo, charte graphique et templates réseaux sociaux pour ONG éducation Porto-Novo.' },
      { id: 'p95', image: 'https://picsum.photos/seed/port95/600/400', titre: 'Redesign app mobile', description: 'Refonte UI d\'une application de livraison, maquettes Figma complètes livrées en 10 jours.' },
      { id: 'p96', image: 'https://picsum.photos/seed/port96/600/400', titre: 'Supports événementiels', description: 'Rollups, flyers et kakémonos pour forum entrepreneuriat Bénin 2024.' },
    ],
  },
  {
    id: 'f33', nom: 'Théodore Bossou', photo: 'https://picsum.photos/seed/f33/200',
    vertical: 'marketing', statutVerification: 'en_attente',
    competences: ['Community Management', 'Facebook Ads', 'Instagram', 'Canva', 'Rédaction web'],
    tarifHoraire: 4500, tauxReussite: 0, nombreMissions: 0,
    ville: 'Cotonou', disponible: true, dateInscription: '2025-06-23',
    bio: 'Community manager et créateur de contenu pour marques béninoises. Gère des communautés engagées sur Facebook et Instagram et pilote des campagnes publicitaires à petits budgets.',
    avis: [],
    portfolio: [
      { id: 'p97', image: 'https://picsum.photos/seed/port97/600/400', titre: 'Gestion page restaurant', description: 'Animation Facebook + Instagram d\'un restaurant Cotonou : +500 abonnés en 3 mois.' },
      { id: 'p98', image: 'https://picsum.photos/seed/port98/600/400', titre: 'Campagne boutique mode', description: 'Publicité Facebook pour boutique mode, 45 000 FCFA investis, 180 000 de retour.' },
      { id: 'p99', image: 'https://picsum.photos/seed/port99/600/400', titre: 'Lancement startup', description: 'Stratégie de lancement réseaux sociaux pour application mobile, 800 inscrits J+7.' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// 15 CLIENTS
// ─────────────────────────────────────────────────────────────

export const mockClients: Client[] = [
  { id: 'c01', nom: 'FANOU Marketplace', type: 'commercant', email: 'fanou@boutique.bj', ville: 'Cotonou' },
  { id: 'c02', nom: 'StartAfrica Tech', type: 'startup', email: 'contact@startafrica.bj', ville: 'Cotonou' },
  { id: 'c03', nom: 'Cabinet Agossou & Associés', type: 'pme', email: 'agossou@cabinet.bj', ville: 'Cotonou' },
  { id: 'c04', nom: 'AID Bénin', type: 'ong', email: 'info@aid-benin.org', ville: 'Cotonou' },
  { id: 'c05', nom: 'Restaurant Le Diplomate', type: 'commercant', email: 'contact@lediplomatebj.com', ville: 'Cotonou' },
  {
    id: 'c06', nom: 'BéninShop SARL', type: 'entreprise', email: 'rh@beninshop.bj', ville: 'Cotonou',
    recruteurs: [
      { id: 'r1', nom: 'Gilles Houénou', email: 'g.houenou@beninshop.bj', poste: 'Directeur Digital' },
      { id: 'r2', nom: 'Aimée Kpossou', email: 'a.kpossou@beninshop.bj', poste: 'Responsable Produit' },
    ],
  },
  { id: 'c07', nom: 'Sènan Kpètin', type: 'particulier', email: 'senan.kpetin@gmail.com', ville: 'Porto-Novo' },
  { id: 'c08', nom: 'École Numérique Bénin', type: 'ong', email: 'admin@ecole-numerique.bj', ville: 'Cotonou' },
  { id: 'c09', nom: 'Pharmacie Centrale Cotonou', type: 'pme', email: 'pharma.centrale@gmail.com', ville: 'Cotonou' },
  { id: 'c10', nom: 'SONAEC', type: 'entreprise', email: 'dsio@sonaec.bj', ville: 'Cotonou',
    recruteurs: [
      { id: 'r3', nom: 'Henri Tohounkpè', email: 'h.tohounkpe@sonaec.bj', poste: 'DSI' },
    ],
  },
  { id: 'c11', nom: 'Médias TJ', type: 'pme', email: 'numerique@mediastj.bj', ville: 'Cotonou' },
  { id: 'c12', nom: 'Jean-Marc Vodounon', type: 'particulier', email: 'jm.vodounon@gmail.com', ville: 'Cotonou' },
  { id: 'c13', nom: 'Hôtel Bénin Royal', type: 'pme', email: 'direction@beninroyal.com', ville: 'Cotonou' },
  { id: 'c14', nom: 'Association Dantokpa', type: 'ong', email: 'comite@dantokpa-asso.bj', ville: 'Cotonou' },
  {
    id: 'c15', nom: 'FinTech Hub Bénin', type: 'entreprise', email: 'hub@fintechbj.com', ville: 'Cotonou',
    recruteurs: [
      { id: 'r4', nom: 'Rodrigue Assogba', email: 'r.assogba@fintechbj.com', poste: 'CTO' },
      { id: 'r5', nom: 'Laure Dansou', email: 'l.dansou@fintechbj.com', poste: 'Product Manager' },
      { id: 'r6', nom: 'Olivier Akplogan', email: 'o.akplogan@fintechbj.com', poste: 'Head of Design' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// 20 MISSIONS
// ─────────────────────────────────────────────────────────────

export const mockMissions: Mission[] = [
  // OUVERTES (8)
  {
    id: 'm01', titre: 'Développement site e-commerce vêtements', clientId: 'c01',
    description: 'Je cherche un développeur pour créer ma boutique en ligne complète : catalogue de 200+ produits, gestion des tailles, paiement Mobile Money MTN et Moov, espace client. Livraison souhaitée en 4 semaines.',
    budget: 250000, delai: '4 semaines', vertical: 'developpement', statut: 'ouverte',
    datePublication: '2025-01-10', competencesRequises: ['React', 'Django', 'PostgreSQL', 'Mobile Money'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', complete: false },
      { etape: 'en_cours', label: 'Travail en cours', complete: false },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm02', titre: 'Création identité visuelle startup fintech', clientId: 'c15',
    description: 'Notre startup de paiement mobile cherche un designer pour créer son identité visuelle complète : logo, charte graphique, palette de couleurs, typographie, et templates pour les réseaux sociaux.',
    budget: 120000, delai: '2 semaines', vertical: 'design', statut: 'ouverte',
    datePublication: '2025-01-08', competencesRequises: ['Logo Design', 'Brand Identity', 'Figma'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', complete: false },
      { etape: 'en_cours', label: 'Travail en cours', complete: false },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm03', titre: 'Gestion réseaux sociaux restaurant (3 mois)', clientId: 'c05',
    description: 'Le Diplomate cherche un community manager pour animer nos pages Facebook et Instagram : 1 post/jour, réponse aux commentaires, stories quotidiennes, rapport mensuel. Budget mensuel : 50 000 FCFA.',
    budget: 150000, delai: '3 mois', vertical: 'marketing', statut: 'ouverte',
    datePublication: '2025-01-12', competencesRequises: ['Community Management', 'Instagram', 'Facebook', 'Création de contenu'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', complete: false },
      { etape: 'en_cours', label: 'Travail en cours', complete: false },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm04', titre: 'Application mobile Flutter (Android + iOS)', clientId: 'c15',
    description: 'Nous avons besoin d\'une application mobile cross-platform pour notre service de paiement P2P. Fonctionnalités : inscription, envoi/réception d\'argent, historique, notification push. Intégration API existante.',
    budget: 450000, delai: '8 semaines', vertical: 'developpement', statut: 'ouverte',
    datePublication: '2025-01-05', competencesRequises: ['Flutter', 'Dart', 'Firebase', 'API REST'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', complete: false },
      { etape: 'en_cours', label: 'Travail en cours', complete: false },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm05', titre: 'Audit UX + Redesign interface application web', clientId: 'c02',
    description: 'Notre plateforme SaaS RH existe depuis 2 ans mais l\'interface est difficile à utiliser. Nous cherchons un expert UX pour auditer l\'existant et proposer un redesign complet en Figma.',
    budget: 180000, delai: '3 semaines', vertical: 'design', statut: 'ouverte',
    datePublication: '2025-01-14', competencesRequises: ['UX Research', 'Figma', 'User Testing', 'Product Design'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', complete: false },
      { etape: 'en_cours', label: 'Travail en cours', complete: false },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm06', titre: 'Campagne publicitaire Facebook + Instagram lancement produit', clientId: 'c01',
    description: 'Lancement d\'une nouvelle collection de vêtements. Besoin d\'un expert en publicité Meta pour créer et piloter une campagne de 2 semaines avec un budget de 200 000 FCFA.',
    budget: 80000, delai: '2 semaines', vertical: 'marketing', statut: 'ouverte',
    datePublication: '2025-01-11', competencesRequises: ['Facebook Ads', 'Instagram Ads', 'Meta Ads', 'Création de contenu'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', complete: false },
      { etape: 'en_cours', label: 'Travail en cours', complete: false },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm07', titre: 'Développement API REST Django pour marketplace', clientId: 'c06',
    description: 'Nous développons une marketplace B2B et cherchons un expert Django pour concevoir et implémenter l\'API REST : gestion utilisateurs, produits, commandes, facturation, intégration Mobile Money.',
    budget: 280000, delai: '5 semaines', vertical: 'developpement', statut: 'ouverte',
    datePublication: '2025-01-07', competencesRequises: ['Django', 'Python', 'REST API', 'PostgreSQL'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', complete: false },
      { etape: 'en_cours', label: 'Travail en cours', complete: false },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm08', titre: 'Motion design — intro vidéo institutionnelle', clientId: 'c08',
    description: 'Notre école numérique a besoin d\'une vidéo animée de 90 secondes pour présenter notre programme à des partenaires. Style professionnel, animations fluides, voix off incluse.',
    budget: 70000, delai: '10 jours', vertical: 'design', statut: 'ouverte',
    datePublication: '2025-01-13', competencesRequises: ['Motion Design', 'After Effects', 'Animation'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', complete: false },
      { etape: 'en_cours', label: 'Travail en cours', complete: false },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  // EN COURS (6)
  {
    id: 'm09', titre: 'Portail client PME — gestion devis et factures', clientId: 'c03', freelanceId: 'f01',
    description: 'Portail web pour PME permettant à leurs clients de soumettre des demandes de devis, suivre les commandes et télécharger les factures.',
    budget: 350000, delai: '6 semaines', vertical: 'developpement', statut: 'en_cours',
    datePublication: '2024-12-01', competencesRequises: ['React', 'Django', 'PostgreSQL'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', date: '2024-12-10', complete: true },
      { etape: 'en_cours', label: 'Travail en cours', date: '2024-12-12', complete: true },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm10', titre: 'Branding complet startup fintech — identité visuelle', clientId: 'c15', freelanceId: 'f12',
    description: 'Création de l\'identité visuelle complète pour FinTech Hub : logo, charte, déclinaisons print et digital.',
    budget: 200000, delai: '3 semaines', vertical: 'design', statut: 'en_cours',
    datePublication: '2024-12-05', competencesRequises: ['Logo Design', 'Brand Identity', 'Figma'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', date: '2024-12-15', complete: true },
      { etape: 'en_cours', label: 'Travail en cours', date: '2024-12-17', complete: true },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm11', titre: 'Audit SEO + Stratégie contenu 6 mois', clientId: 'c09', freelanceId: 'f22',
    description: 'Audit complet du site pharmacie + plan SEO 6 mois avec rédaction de 24 articles optimisés.',
    budget: 120000, delai: '6 mois', vertical: 'marketing', statut: 'en_cours',
    datePublication: '2024-11-20', competencesRequises: ['SEO', 'Content Marketing', 'Rédaction web'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', date: '2024-11-28', complete: true },
      { etape: 'en_cours', label: 'Travail en cours', date: '2024-12-02', complete: true },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm12', titre: 'Dashboard analytique React — données de vente temps réel', clientId: 'c06', freelanceId: 'f03',
    description: 'Interface React pour visualiser les données de vente en temps réel, avec graphiques, filtres et export CSV.',
    budget: 180000, delai: '3 semaines', vertical: 'developpement', statut: 'en_cours',
    datePublication: '2024-12-10', competencesRequises: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', date: '2024-12-18', complete: true },
      { etape: 'en_cours', label: 'Travail en cours', date: '2024-12-20', complete: true },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm13', titre: 'Charte graphique ONG + site vitrine', clientId: 'c04', freelanceId: 'f16',
    description: 'Création identité visuelle pour AID Bénin + site web statique présentant leurs programmes.',
    budget: 90000, delai: '2 semaines', vertical: 'design', statut: 'en_cours',
    datePublication: '2024-12-08', competencesRequises: ['Web Design', 'Figma', 'Webflow'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', date: '2024-12-15', complete: true },
      { etape: 'en_cours', label: 'Travail en cours', date: '2024-12-16', complete: true },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm14', titre: 'Community management événement tech — Forum Bénin Digital', clientId: 'c11', freelanceId: 'f21',
    description: 'Animation réseaux sociaux pour le Forum Bénin Digital 2025 : pré-événement, live et post-événement sur 3 mois.',
    budget: 90000, delai: '3 mois', vertical: 'marketing', statut: 'en_cours',
    datePublication: '2024-11-25', competencesRequises: ['Community Management', 'Social Media', 'Instagram'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', date: '2024-12-05', complete: true },
      { etape: 'en_cours', label: 'Travail en cours', date: '2024-12-08', complete: true },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  // LIVRÉES (3)
  {
    id: 'm15', titre: 'Site vitrine restaurant responsive', clientId: 'c05', freelanceId: 'f04',
    description: 'Site vitrine responsive pour Le Diplomate : menu en ligne, réservation de table, galerie photos.',
    budget: 120000, delai: '2 semaines', vertical: 'developpement', statut: 'livree',
    dateLivraison: '2026-06-24',
    datePublication: '2024-10-01', competencesRequises: ['WordPress', 'PHP', 'CSS'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', date: '2024-10-08', complete: true },
      { etape: 'en_cours', label: 'Travail en cours', date: '2024-10-10', complete: true },
      { etape: 'livre', label: 'Livré', date: '2026-06-24', complete: true },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm16', titre: 'Logo + Carte de visite + Charte couleurs', clientId: 'c07', freelanceId: 'f17',
    description: 'Création d\'un logo professionnel, carte de visite et mini charte graphique pour consultant indépendant.',
    budget: 50000, delai: '5 jours', vertical: 'design', statut: 'livree',
    dateLivraison: '2026-06-20',
    datePublication: '2024-11-05', competencesRequises: ['Logo Design', 'Adobe Illustrator'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', date: '2024-11-08', complete: true },
      { etape: 'en_cours', label: 'Travail en cours', date: '2024-11-09', complete: true },
      { etape: 'livre', label: 'Livré', date: '2026-06-20', complete: true },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm17', titre: 'Formation réseaux sociaux — équipe de 5 personnes', clientId: 'c08', freelanceId: 'f23',
    description: 'Formation pratique de 2 jours sur l\'utilisation professionnelle des réseaux sociaux pour l\'équipe communication de l\'école.',
    budget: 70000, delai: '2 jours', vertical: 'marketing', statut: 'livree',
    dateLivraison: '2026-06-18',
    datePublication: '2024-10-20', competencesRequises: ['Social Media', 'Instagram', 'Community Management'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', date: '2024-10-25', complete: true },
      { etape: 'en_cours', label: 'Travail en cours', date: '2024-10-28', complete: true },
      { etape: 'livre', label: 'Livré', date: '2026-06-18', complete: true },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  // VALIDÉES (3)
  {
    id: 'm18', titre: 'Boutique WooCommerce — épicerie fine en ligne', clientId: 'c13', freelanceId: 'f04',
    description: 'Création d\'une boutique WooCommerce pour l\'épicerie fine de l\'hôtel avec système de livraison.',
    budget: 180000, delai: '3 semaines', vertical: 'developpement', statut: 'validee',
    datePublication: '2024-08-01', competencesRequises: ['WooCommerce', 'WordPress', 'PHP'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', date: '2024-08-10', complete: true },
      { etape: 'en_cours', label: 'Travail en cours', date: '2024-08-12', complete: true },
      { etape: 'livre', label: 'Livré', date: '2024-08-28', complete: true },
      { etape: 'valide', label: 'Validé & Libérés', date: '2024-09-02', complete: true },
    ],
  },
  {
    id: 'm19', titre: 'Affiche et programme Forum Bénin Numérique 2024', clientId: 'c11', freelanceId: 'f19',
    description: 'Design de l\'affiche officielle et du programme imprimé du Forum Bénin Numérique.',
    budget: 45000, delai: '1 semaine', vertical: 'design', statut: 'validee',
    datePublication: '2024-07-10', competencesRequises: ['Graphic Design', 'InDesign', 'Affiche'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', date: '2024-07-15', complete: true },
      { etape: 'en_cours', label: 'Travail en cours', date: '2024-07-16', complete: true },
      { etape: 'livre', label: 'Livré', date: '2024-07-20', complete: true },
      { etape: 'valide', label: 'Validé & Libérés', date: '2024-07-22', complete: true },
    ],
  },
  {
    id: 'm20', titre: 'Newsletter mensuelle — 3 mois de rédaction', clientId: 'c03', freelanceId: 'f29',
    description: 'Rédaction et mise en page de la newsletter mensuelle du cabinet : 3 articles experts + actualités juridiques.',
    budget: 60000, delai: '3 mois', vertical: 'marketing', statut: 'validee',
    datePublication: '2024-07-01', competencesRequises: ['Rédaction web', 'Email Marketing', 'Content Strategy'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', date: '2024-07-08', complete: true },
      { etape: 'en_cours', label: 'Travail en cours', date: '2024-07-10', complete: true },
      { etape: 'livre', label: 'Livré', date: '2024-10-02', complete: true },
      { etape: 'valide', label: 'Validé & Libérés', date: '2024-10-05', complete: true },
    ],
  },
  // ── MISSIONS INVITATION_ENVOYEE (m23-m28) ──
  {
    id: 'm23', titre: 'Site e-commerce vêtements avec paiement MTN', clientId: 'c01',
    description: 'Création d\'un site e-commerce complet pour notre boutique de vêtements : catalogue, panier, paiement MTN Money et Moov Money, espace admin.',
    budget: 250000, delai: '4 semaines', vertical: 'developpement', statut: 'invitation_envoyee',
    freelancesInvitesIds: ['f01', 'f02'],
    datePublication: '2025-06-20', competencesRequises: ['React', 'Django', 'Mobile Money', 'PostgreSQL'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', complete: false },
      { etape: 'en_cours', label: 'Travail en cours', complete: false },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm24', titre: 'Identité visuelle restaurant gastronomique', clientId: 'c01',
    description: 'Création identité visuelle complète pour notre restaurant haut de gamme : logo, charte graphique, menus, supports digitaux.',
    budget: 150000, delai: '3 semaines', vertical: 'design', statut: 'invitation_envoyee',
    freelancesInvitesIds: ['f12', 'f14'],
    datePublication: '2025-06-18', competencesRequises: ['Logo Design', 'Brand Identity', 'Figma', 'Print'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', complete: false },
      { etape: 'en_cours', label: 'Travail en cours', complete: false },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm25', titre: 'Stratégie social media lancement application mobile', clientId: 'c01',
    description: 'Stratégie et exécution social media pour le lancement de notre application mobile : campagne 1 mois sur Facebook, Instagram et TikTok, objectif 1 000 téléchargements.',
    budget: 80000, delai: '1 mois', vertical: 'marketing', statut: 'invitation_envoyee',
    freelancesInvitesIds: ['f21', 'f22'],
    datePublication: '2025-06-15', competencesRequises: ['Facebook Ads', 'Instagram', 'TikTok', 'Acquisition'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', complete: false },
      { etape: 'en_cours', label: 'Travail en cours', complete: false },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm26', titre: 'API REST e-commerce avec intégration Mobile Money', clientId: 'c01',
    description: 'Développement API REST pour marketplace B2C : catalogue produits, panier, paiement Mobile Money MTN et Moov, gestion commandes, notifications email. Stack Django + PostgreSQL.',
    budget: 200000, delai: '4 semaines', vertical: 'developpement', statut: 'attribuee',
    freelanceId: 'f03', freelancesInvitesIds: ['f03'],
    datePublication: '2025-06-22', competencesRequises: ['Django', 'REST API', 'PostgreSQL', 'Mobile Money'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', complete: false },
      { etape: 'en_cours', label: 'Travail en cours', complete: false },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm27', titre: 'Refonte logo et charte graphique PME', clientId: 'c01',
    description: 'Notre PME cherche un designer pour refondre son identité visuelle : logo moderne, palette de couleurs, charte graphique complète avec déclinaisons print et digitale.',
    budget: 120000, delai: '2 semaines', vertical: 'design', statut: 'ouverte',
    freelancesInvitesIds: [],
    datePublication: '2025-06-23', competencesRequises: ['Logo Design', 'Brand Identity', 'Figma'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', complete: false },
      { etape: 'en_cours', label: 'Travail en cours', complete: false },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm28', titre: 'Portail client avec espace devis et factures', clientId: 'c03',
    description: 'Portail web pour cabinet d\'avocats : espace client pour soumettre des demandes, suivre les dossiers, consulter et télécharger les factures. Stack : React + Django REST Framework.',
    budget: 300000, delai: '5 semaines', vertical: 'developpement', statut: 'invitation_envoyee',
    freelancesInvitesIds: ['f01'],
    datePublication: '2025-06-21', competencesRequises: ['React', 'Django', 'REST API', 'TypeScript'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', complete: false },
      { etape: 'en_cours', label: 'Travail en cours', complete: false },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },

  // EN ATTENTE DE CONFIRMATION FREELANCE (m29-m30)
  {
    id: 'm29', titre: 'Développement API paiement Mobile Money', clientId: 'c01', freelanceId: 'f01',
    description: 'Intégration complète des API MTN Money et Moov Money pour notre plateforme e-commerce : envoi, réception, remboursement, webhooks. Stack Django + DRF.',
    budget: 200000, delai: '3 semaines', vertical: 'developpement',
    statut: 'en_attente_confirmation_freelance',
    prixFinal: 185000, delaiFinal: '3 semaines', cheminAttribution: 'invitation',
    freelancesInvitesIds: ['f01'],
    datePublication: '2025-06-24', competencesRequises: ['Django', 'REST API', 'Mobile Money', 'Python'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', complete: false },
      { etape: 'en_cours', label: 'Travail en cours', complete: false },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm30', titre: 'Refonte UX application de gestion RH', clientId: 'c01', freelanceId: 'f01',
    description: 'Notre application RH interne souffre d\'une interface dépassée. Nous cherchons un expert pour auditer et proposer une refonte complète en Figma avec prototypes testables.',
    budget: 150000, delai: '2 semaines', vertical: 'design',
    statut: 'en_attente_confirmation_freelance',
    prixFinal: 140000, delaiFinal: '2 semaines', cheminAttribution: 'candidature',
    freelancesInvitesIds: [],
    datePublication: '2025-06-23', competencesRequises: ['UX Research', 'Figma', 'Prototypage'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', complete: false },
      { etape: 'en_cours', label: 'Travail en cours', complete: false },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },

  // MISSIONS FANOU MARKETPLACE (c01) — livrées (3 cas de délai automatique)
  {
    id: 'm31', titre: 'Audit et optimisation du système de cache API', clientId: 'c01', freelanceId: 'f01',
    description: 'Analyse des performances de l\'API FANOU, identification des goulots d\'étranglement, mise en place d\'un système de cache Redis et optimisation des requêtes PostgreSQL.',
    budget: 130000, delai: '2 semaines', vertical: 'developpement', statut: 'livree',
    dateLivraison: '2026-06-24',
    datePublication: '2026-06-05', competencesRequises: ['Django', 'Redis', 'PostgreSQL', 'Python'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', date: '2026-06-06', complete: true },
      { etape: 'en_cours', label: 'Travail en cours', date: '2026-06-09', complete: true },
      { etape: 'livre', label: 'Livré', date: '2026-06-24', complete: true },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm32', titre: 'Refonte interface gestion commandes e-commerce', clientId: 'c01', freelanceId: 'f01',
    description: 'Refonte complète de l\'espace de gestion des commandes de FANOU Marketplace : tableau de bord temps réel, filtres avancés, export PDF et notifications push.',
    budget: 175000, delai: '3 semaines', vertical: 'developpement', statut: 'livree',
    dateLivraison: '2026-06-20',
    datePublication: '2026-05-28', competencesRequises: ['React', 'TypeScript', 'TailwindCSS', 'Django'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', date: '2026-05-29', complete: true },
      { etape: 'en_cours', label: 'Travail en cours', date: '2026-06-01', complete: true },
      { etape: 'livre', label: 'Livré', date: '2026-06-20', complete: true },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm33', titre: 'Module de statistiques et reporting mensuel', clientId: 'c01', freelanceId: 'f01',
    description: 'Développement d\'un module analytique pour FANOU : graphiques de ventes, rapports PDF automatiques, alertes stock bas et exports Excel pour la comptabilité.',
    budget: 95000, delai: '10 jours', vertical: 'developpement', statut: 'livree',
    dateLivraison: '2026-06-18',
    datePublication: '2026-06-05', competencesRequises: ['React', 'Django', 'Chart.js', 'PostgreSQL'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', date: '2026-06-06', complete: true },
      { etape: 'en_cours', label: 'Travail en cours', date: '2026-06-08', complete: true },
      { etape: 'livre', label: 'Livré', date: '2026-06-18', complete: true },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },

  // MISSIONS FANOU MARKETPLACE (c01) — en cours + validée
  {
    id: 'm21', titre: 'Refonte dashboard commercial FANOU', clientId: 'c01', freelanceId: 'f01',
    description: 'Refonte de l\'interface d\'administration de la boutique FANOU Marketplace : dashboard analytics, gestion des commandes en temps réel et espace client amélioré.',
    budget: 180000, delai: '3 semaines', vertical: 'developpement', statut: 'en_cours',
    datePublication: '2024-12-15', competencesRequises: ['React', 'TypeScript', 'TailwindCSS', 'Django'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', date: '2024-12-16', complete: true },
      { etape: 'en_cours', label: 'Travail en cours', date: '2024-12-18', complete: true },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  },
  {
    id: 'm22', titre: 'Stratégie SEO boutique mode africaine', clientId: 'c01', freelanceId: 'f22',
    description: 'Audit SEO complet et stratégie de contenu 6 mois pour améliorer le référencement naturel de la boutique FANOU sur les requêtes mode et vêtements au Bénin.',
    budget: 95000, delai: '1 mois', vertical: 'marketing', statut: 'validee',
    datePublication: '2024-11-01', competencesRequises: ['SEO', 'Content Marketing', 'WordPress', 'Analytics'],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', date: '2024-11-02', complete: true },
      { etape: 'en_cours', label: 'Travail en cours', date: '2024-11-05', complete: true },
      { etape: 'livre', label: 'Livré', date: '2024-11-28', complete: true },
      { etape: 'valide', label: 'Validé & Libérés', date: '2024-11-30', complete: true },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// 10 LITIGES
// ─────────────────────────────────────────────────────────────

export const mockLitiges: Litige[] = [
  {
    id: 'l01', missionId: 'm09', statut: 'en_cours', dateOuverture: '2025-01-08',
    motif: 'Qualité de livraison non conforme au cahier des charges — fonctionnalités manquantes',
    messages: [
      { auteur: 'Cabinet Agossou', role: 'client', date: '2025-01-08', message: 'Le portail livré ne comprend pas la gestion des devis que nous avions demandée. Impossible de valider.' },
      { auteur: 'Koffi Mensah', role: 'freelance', date: '2025-01-08', message: 'La gestion des devis était dans le scope initial mais a été retirée lors de la 2ème réunion. J\'ai un email de confirmation.' },
      { auteur: 'Admin TalentBJ', role: 'admin', date: '2025-01-09', message: 'Nous examinons les échanges. Une médiation sera organisée dans 48h.' },
    ],
  },
  {
    id: 'l02', missionId: 'm14', statut: 'ouvert', dateOuverture: '2025-01-12',
    motif: 'Délai non respecté — absence de communication du freelance depuis 5 jours',
    messages: [
      { auteur: 'Médias TJ', role: 'client', date: '2025-01-12', message: 'Sandrine n\'a pas posté depuis 5 jours et ne répond pas à nos messages. Le forum approche.' },
    ],
  },
  {
    id: 'l03', missionId: 'm15', statut: 'resolu', dateOuverture: '2024-10-25', resolution: 'Remboursement partiel (20%) accordé au client. Freelance a livré 80% du travail demandé.',
    motif: 'Certaines pages responsive non livrées selon la spécification',
    messages: [
      { auteur: 'Restaurant Le Diplomate', role: 'client', date: '2024-10-25', message: 'La page menu mobile ne s\'affiche pas correctement sur iPhone.' },
      { auteur: 'Ibrahim Bello', role: 'freelance', date: '2024-10-26', message: 'Je reconnais l\'erreur, je corrige dans 48h.' },
      { auteur: 'Admin TalentBJ', role: 'admin', date: '2024-10-28', message: 'Après vérification, la correction a été apportée. Litige résolu avec accord des deux parties.' },
    ],
  },
  {
    id: 'l04', missionId: 'm11', statut: 'ouvert', dateOuverture: '2025-01-10',
    motif: 'Résultats SEO en dessous des objectifs promis',
    messages: [
      { auteur: 'Pharmacie Centrale', role: 'client', date: '2025-01-10', message: 'Après 2 mois, aucun article n\'est en première page Google. Résultats décevants.' },
      { auteur: 'Théodore Kpakpavi', role: 'freelance', date: '2025-01-11', message: 'Le SEO prend généralement 3 à 6 mois. Le travail est en cours conformément au plan.' },
    ],
  },
  {
    id: 'l05', missionId: 'm18', statut: 'resolu', dateOuverture: '2024-09-01', resolution: 'Les fonds ont été libérés après correction du bug de paiement signalé.',
    motif: 'Bug critique sur le module de paiement avant validation finale',
    messages: [
      { auteur: 'Hôtel Bénin Royal', role: 'client', date: '2024-09-01', message: 'Impossible de finaliser une commande, erreur 500 lors du paiement Mobile Money.' },
      { auteur: 'Ibrahim Bello', role: 'freelance', date: '2024-09-02', message: 'Bug identifié : conflit de version de l\'API Moov Money. Correction en cours.' },
      { auteur: 'Admin TalentBJ', role: 'admin', date: '2024-09-04', message: 'Bug corrigé confirmé. Fonds libérés au freelance.' },
    ],
  },
  {
    id: 'l06', missionId: 'm10', statut: 'ouvert', dateOuverture: '2025-01-05',
    motif: 'Nombre de révisions excessif — client demande la 8ème version du logo',
    messages: [
      { auteur: 'Modeste Hounsou', role: 'freelance', date: '2025-01-05', message: 'Le contrat prévoit 3 révisions. Nous en sommes à 8. Je ne peux pas continuer gratuitement.' },
      { auteur: 'FinTech Hub Bénin', role: 'client', date: '2025-01-06', message: 'Les propositions ne correspondaient pas à notre brief initial. Nous avons le droit d\'avoir un résultat satisfaisant.' },
    ],
  },
  {
    id: 'l07', missionId: 'm16', statut: 'resolu', dateOuverture: '2024-11-15', resolution: 'Client satisfait après livraison de la version finale. Fonds libérés intégralement.',
    motif: 'Livraison incomplète — fichiers sources non fournis',
    messages: [
      { auteur: 'Sènan Kpètin', role: 'client', date: '2024-11-15', message: 'J\'ai reçu uniquement les JPG, pas les fichiers sources Illustrator.' },
      { auteur: 'Mariette Sossou', role: 'freelance', date: '2024-11-15', message: 'Pardon pour l\'oubli, voici les fichiers AI joints.' },
      { auteur: 'Admin TalentBJ', role: 'admin', date: '2024-11-16', message: 'Litige résolu. Les fichiers sources ont été fournis.' },
    ],
  },
  {
    id: 'l08', missionId: 'm13', statut: 'ouvert', dateOuverture: '2025-01-14',
    motif: 'Délais non respectés — livraison attendue il y a 3 jours',
    messages: [
      { auteur: 'AID Bénin', role: 'client', date: '2025-01-14', message: 'La charte était attendue le 10 janvier. Toujours rien et le freelance ne répond plus.' },
    ],
  },
  {
    id: 'l09', missionId: 'm12', statut: 'en_cours', dateOuverture: '2025-01-09',
    motif: 'Fonctionnalités d\'export non implémentées selon les specs',
    messages: [
      { auteur: 'BéninShop SARL', role: 'client', date: '2025-01-09', message: 'L\'export CSV ne fonctionne pas pour les données de plus de 1000 lignes.' },
      { auteur: 'Romuald Akindès', role: 'freelance', date: '2025-01-09', message: 'Il faut implémenter une pagination server-side. Je corrige cette semaine.' },
      { auteur: 'Admin TalentBJ', role: 'admin', date: '2025-01-10', message: 'Délai de correction accordé : 5 jours ouvrés.' },
    ],
  },
  {
    id: 'l10', missionId: 'm20', statut: 'resolu', dateOuverture: '2024-08-05', resolution: 'Accord amiable : le freelance a fourni un article bonus. Fonds libérés.',
    motif: 'Qualité rédactionnelle en dessous des attentes pour la 1ère newsletter',
    messages: [
      { auteur: 'Cabinet Agossou', role: 'client', date: '2024-08-05', message: 'Le premier numéro manque de profondeur juridique. Nos clients attendent une expertise réelle.' },
      { auteur: 'Madeleine Sènavé', role: 'freelance', date: '2024-08-06', message: 'J\'ai besoin que vous me fournissiez les cas concrets et avis des avocats. Je structure, je ne génère pas le contenu juridique.' },
      { auteur: 'Admin TalentBJ', role: 'admin', date: '2024-08-08', message: 'Médiation effectuée. Accord sur une livraison enrichie + article bonus.' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// FONCTION DE MATCHING
// ─────────────────────────────────────────────────────────────

export function calculerScoreMatching(besoin: BesoinClient, freelance: Freelance): MatchResult {
  const texte = (besoin.description + ' ' + (besoin.vertical || '')).toLowerCase();

  const competencesMatch = freelance.competences.filter(c =>
    texte.includes(c.toLowerCase()) ||
    texte.includes(c.toLowerCase().split('/')[0])
  );

  const budgetCompatible = !besoin.budget || (
    (freelance.tarifForfait ? freelance.tarifForfait <= besoin.budget * 1.2 : true) &&
    (freelance.tarifHoraire ? freelance.tarifHoraire * 40 <= besoin.budget * 1.5 : true)
  );

  const verticalMatch = !besoin.vertical || freelance.vertical === besoin.vertical;

  let score = 60;
  score += Math.min(competencesMatch.length * 7, 28);
  score += verticalMatch ? 5 : 0;
  score += budgetCompatible ? 3 : 0;
  score += freelance.badge === 'premium' ? 5 : freelance.badge === 'expert' ? 3 : 0;
  score += freelance.disponible ? 2 : -5;
  score = Math.min(score, 98);

  const badgeLabel = freelance.badge ?? 'vérifié';
  let raison = '';
  if (competencesMatch.length > 0) {
    raison = `${competencesMatch.slice(0, 2).join(' & ')} — ${freelance.nombreMissions} missions livrées (${freelance.tauxReussite}% succès)`;
  } else if (verticalMatch) {
    raison = `Spécialiste ${freelance.vertical}, badge ${badgeLabel} — ${freelance.nombreMissions} missions`;
  } else {
    raison = `Profil ${badgeLabel} avec ${freelance.tauxReussite}% de réussite`;
  }

  return { freelance, score, raison };
}

export function getMatchResults(besoin: BesoinClient): MatchResult[] {
  const candidats = (besoin.vertical
    ? mockFreelances.filter(f => f.vertical === besoin.vertical)
    : mockFreelances
  ).filter(f => f.statutVerification !== 'en_attente');

  return candidats
    .map(f => calculerScoreMatching(besoin, f))
    .filter(r => r.score >= 65)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

// Helpers
export function getFreelanceById(id: string): Freelance | undefined {
  return mockFreelances.find(f => f.id === id);
}

export function getMissionById(id: string): Mission | undefined {
  return mockMissions.find(m => m.id === id);
}

export function getMissionsByClientId(clientId: string): Mission[] {
  return mockMissions.filter(m => m.clientId === clientId);
}

export function getMissionsByFreelanceId(freelanceId: string): Mission[] {
  return mockMissions.filter(m => m.freelanceId === freelanceId);
}

export function getMissionsByVertical(vertical: string): Mission[] {
  return mockMissions.filter(m => m.vertical === vertical && m.statut === 'ouverte');
}

export function getFreelancesByVertical(vertical: string): Freelance[] {
  return mockFreelances.filter(f => f.vertical === vertical);
}

// ─────────────────────────────────────────────────────────────
// INVITATIONS MOCK
// ─────────────────────────────────────────────────────────────

export const mockInvitations: Invitation[] = [
  // m23: f01 + f02 invités, tous en_attente
  { id: 'i01', missionId: 'm23', freelanceId: 'f01', statut: 'en_attente', dateEnvoi: '2025-06-20' },
  { id: 'i02', missionId: 'm23', freelanceId: 'f02', statut: 'en_attente', dateEnvoi: '2025-06-20' },
  // m24: f12 + f14 invités, les deux ont accepté avec des prix différents
  {
    id: 'i03', missionId: 'm24', freelanceId: 'f12', statut: 'acceptee_avec_proposition', dateEnvoi: '2025-06-18',
    prixPropose: 140000, delaiPropose: '2 semaines',
    message: 'Bonjour, je suis très intéressé par ce projet de branding restaurant. Avec mon expérience en identité visuelle haut de gamme, je propose 2 semaines pour 140 000 FCFA. Mon portfolio inclut plusieurs restaurants à Cotonou.',
    dateReponse: '2025-06-19',
  },
  {
    id: 'i04', missionId: 'm24', freelanceId: 'f14', statut: 'acceptee_avec_proposition', dateEnvoi: '2025-06-18',
    prixPropose: 180000, delaiPropose: '3 semaines',
    message: 'Bonjour, je peux créer une identité visuelle distinctive pour votre restaurant. Mon approche inclut une phase de recherche approfondie et 3 révisions incluses. 180 000 FCFA pour un résultat premium en 3 semaines.',
    dateReponse: '2025-06-20',
  },
  // m25: f21 + f22 invités, tous ont refusé
  { id: 'i05', missionId: 'm25', freelanceId: 'f21', statut: 'refusee', dateEnvoi: '2025-06-15', dateReponse: '2025-06-16' },
  { id: 'i06', missionId: 'm25', freelanceId: 'f22', statut: 'refusee', dateEnvoi: '2025-06-15', dateReponse: '2025-06-17' },
  // m26: f03 invité et a accepté
  {
    id: 'i07', missionId: 'm26', freelanceId: 'f03', statut: 'acceptee_avec_proposition', dateEnvoi: '2025-06-22',
    prixPropose: 195000, delaiPropose: '4 semaines',
    message: 'Bonjour, votre projet API e-commerce correspond parfaitement à mon expertise React/Next.js. J\'ai livré 3 projets similaires avec intégration Mobile Money. Je propose 195 000 FCFA pour 4 semaines avec documentation Swagger incluse.',
    dateReponse: '2025-06-23',
  },
  // m28: f01 invité, en_attente
  { id: 'i08', missionId: 'm28', freelanceId: 'f01', statut: 'en_attente', dateEnvoi: '2025-06-21' },
];

// ─────────────────────────────────────────────────────────────
// CANDIDATURES SPONTANÉES MOCK
// ─────────────────────────────────────────────────────────────

export const mockCandidatures: CandidatureSpontanee[] = [
  // m27: design ouverte, 3 candidatures spontanées
  {
    id: 'cs01', missionId: 'm27', freelanceId: 'f11', prixPropose: 90000, delaiPropose: '2 semaines',
    message: 'Bonjour, je suis spécialiste en identité visuelle pour PME. Mon approche est collaborative et je livre logos vectoriels + charte PDF. Plusieurs références dans votre secteur.',
    statut: 'en_attente', dateSoumission: '2025-06-24',
  },
  {
    id: 'cs02', missionId: 'm27', freelanceId: 'f16', prixPropose: 110000, delaiPropose: '3 semaines',
    message: 'Bonjour, j\'ai redesigné 8 logos PME cette année avec une satisfaction client de 100%. Ma proposition inclut logo + charte + templates réseaux sociaux. 3 révisions incluses.',
    statut: 'en_attente', dateSoumission: '2025-06-24',
  },
  {
    id: 'cs03', missionId: 'm27', freelanceId: 'f15', prixPropose: 85000, delaiPropose: '10 jours',
    message: 'Bonjour, proposition économique pour une charte graphique professionnelle. Logo + guide de style + 3 templates. Délai court de 10 jours garanti.',
    statut: 'en_attente', dateSoumission: '2025-06-25',
  },
  // m01 (ouverte développement): f01 a soumis une candidature spontanée
  {
    id: 'cs04', missionId: 'm01', freelanceId: 'f01', prixPropose: 220000, delaiPropose: '3 semaines',
    message: 'Bonjour, ce projet e-commerce mode correspond à mon expertise Django/React. J\'ai livré 3 boutiques similaires avec intégration Mobile Money. Disponible immédiatement.',
    statut: 'en_attente', dateSoumission: '2025-06-24',
  },
];

// ─────────────────────────────────────────────────────────────
// HELPERS — INVITATIONS & CANDIDATURES
// ─────────────────────────────────────────────────────────────

export function getInvitationsByMissionId(missionId: string): Invitation[] {
  return mockInvitations.filter(i => i.missionId === missionId);
}

export function getInvitationsByFreelanceId(freelanceId: string): Invitation[] {
  return mockInvitations.filter(i => i.freelanceId === freelanceId);
}

export function getCandidaturesByMissionId(missionId: string): CandidatureSpontanee[] {
  return mockCandidatures.filter(c => c.missionId === missionId);
}

export function getCandidaturesByFreelanceId(freelanceId: string): CandidatureSpontanee[] {
  return mockCandidatures.filter(c => c.freelanceId === freelanceId);
}
