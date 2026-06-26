# 🎯 PROMPT MAÎTRE — TALENTBJ (à coller dans Claude Code)

---

Tu es un développeur frontend senior ET un designer produit senior. Tu vas construire le frontend complet d'un vrai SaaS — pas un projet académique, pas un template générique.

## ⚠️ LIS CETTE SECTION AVANT DE CODER QUOI QUE CE SOIT

Une version précédente de ce projet a été rejetée car le design ressemblait à un projet académique générique. Tu dois absolument éviter :
- Des cards toutes identiques avec icône + titre + texte sans aucune personnalité
- Le combo "fond blanc + bleu primaire Tailwind par défaut (#3B82F6) + Heroicons non stylées"
- Des dégradés violet→bleu génériques
- Des sections empilées sans hiérarchie visuelle ni signature
- Un hero "gros titre + sous-titre + 2 boutons + image stock" sans rien de spécifique au produit

Tu dois construire une identité visuelle qui n'appartient qu'à TalentBJ, en suivant EXACTEMENT le système de design ci-dessous.

---

## 🏢 LE PRODUIT EN UNE PHRASE

TalentBJ est une marketplace qui connecte les entreprises et particuliers d'Afrique de l'Ouest à des freelances tech/design/marketing **vérifiés**, avec paiement sécurisé par escrow en Mobile Money et un moteur de recommandation qui calcule un score de compatibilité pour chaque mission.

## 🎨 SYSTÈME DE DESIGN OBLIGATOIRE — "Atelier de confiance"

**Concept directeur :** un freelance vérifié est comme un artisan dont le savoir-faire est certifié par un sceau. Le vocabulaire visuel s'inspire du tampon de certification et du parcours de validation — jamais de la grille de cards interchangeables d'un marketplace générique.

### Palette (utilise CES valeurs exactes, pas d'approximation)
```css
--ink-blue: #0B1F3A;      /* fond principal sombre, sections de confiance */
--seal-gold: #F5A623;     /* accent signature — CTA principaux, badges, score de matching */
--validated-green: #1FAE7A; /* statuts "livré", "fonds libérés", succès */
--warm-white: #F7F3EC;    /* fond clair chaud — jamais de blanc pur #FFFFFF */
--slate: #5C6B7A;         /* texte secondaire */
--ink-blue-light: #142A4D; /* variante claire du bleu pour cards sur fond sombre */
```

### Typographie (installer via Google Fonts)
- **Titres / display :** Space Grotesk (600, 700) — caractère technique mais chaleureux
- **Corps de texte :** Inter (400, 500, 600)
- **Données, scores, montants, badges :** JetBrains Mono (500) — renforce l'idée de précision mesurable. TOUJOURS utiliser cette police pour : les scores de matching (%), les montants FCFA, les statuts de mission.

### Signature visuelle obligatoire : le Sceau de Vérification
Dessine un composant SVG réutilisable `<VerificationSeal />` : un sceau circulaire (pas une coche Twitter/Facebook générique) avec un motif de bordure dentelée comme un vrai tampon officiel, en `--seal-gold` sur fond `--ink-blue`. Ce composant apparaît :
- Sur chaque card freelance vérifié (coin supérieur de la photo)
- Dans le header de la landing page, animé à l'apparition (un seul scroll-reveal marquant pour toute la page, pas de animations partout)
- Sur la page "Comment ça marche" en grand format pour expliquer le concept

### Structure du parcours = étapes tamponnées, pas des cards numérotées
Le parcours client ("Décrire → Comparer → Valider") doit être représenté visuellement comme une série de tampons qui s'apposent (effet rotation légère ±3deg, bordure dentelée, comme un vrai cachet) — PAS comme 3 cards avec "01 / 02 / 03" en haut à gauche façon template.

### Statut Escrow = tracking visuel, pas un badge texte
Le statut des fonds (Déposés → En cours → Livré → Validé/Libérés) doit être affiché comme une timeline horizontale avec des points connectés par une ligne, où le segment parcouru est en `--validated-green` et le segment restant en `--slate` clair — inspiré du tracking de colis, pas un simple badge coloré.

### Composants interdits
- Pas de Heroicons par défaut sans traitement — utilise `lucide-react` et stylise-les (taille cohérente, couleur du système, jamais l'icône brute à 24px noir)
- Pas de `border-radius: 8px` uniforme partout — varie délibérément : cards = 16px, boutons = 100px (pill), badges/sceau = circulaire
- Pas de dégradé violet/bleu — le seul dégradé autorisé est `--ink-blue` → `--ink-blue-light` sur les sections sombres

---

## 🛠️ STACK TECHNIQUE

```
React + Vite + TypeScript + TailwindCSS
react-router-dom v6
zustand (state global : auth, panier de missions)
react-hook-form + zod (formulaires)
lucide-react (icônes, stylisées selon le système ci-dessus)
framer-motion (UNIQUEMENT pour le scroll-reveal du sceau et la timeline escrow — pas d'animation surabondante)
```

## 📁 STRUCTURE DE FICHIERS

```
talentbj/
├── src/
│   ├── api/              # fonctions simulant les appels API (retournent les mock data avec un délai artificiel)
│   ├── components/
│   │   ├── ui/            # VerificationSeal.tsx, EscrowTimeline.tsx, MatchScoreBadge.tsx, StampStep.tsx, Button.tsx, Card.tsx
│   │   ├── layout/         # Navbar, Footer, DashboardSidebar
│   │   └── freelance/      # FreelanceCard, PortfolioGallery, SkillBadge
│   ├── pages/
│   │   ├── client/         # LandingPage, PostNeedPage, MatchResultsPage, FreelanceProfilePage, MissionTrackingPage, ClientDashboardPage, CompanySpacePage
│   │   ├── freelance/      # FreelanceLandingPage, OnboardingPage, FreelanceDashboardPage, AvailableMissionsPage
│   │   ├── admin/          # AdminDashboardPage, VerificationQueuePage, DisputesPage
│   │   └── shared/         # LoginPage, RegisterPage, VerticalPage, HowItWorksPage
│   ├── hooks/
│   ├── store/             # authStore.ts (rôle: client | freelance | entreprise | admin)
│   ├── data/               # mock.ts — TOUTES les données mockées centralisées ici
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
```

## ⚙️ COMMANDES D'INITIALISATION

```bash
npm create vite@latest talentbj -- --template react-ts
cd talentbj
npm install tailwindcss @tailwindcss/vite react-router-dom zustand react-hook-form zod lucide-react framer-motion
npx tailwindcss init -p
```

---

## 📋 DONNÉES MOCKÉES À CRÉER DANS `src/data/mock.ts`

- **30 freelances** sur 3 verticales (10 chacune : Développement web/mobile, Design graphique & UI/UX, Marketing digital & Community Management) avec : id, nom, photo (`https://picsum.photos/seed/{id}/200`), verticale, compétences (array), badge (`verifie` | `expert` | `premium`), tarif (forfait ou taux horaire FCFA), tauxReussite (%), nombreMissions, avis (3-5 objets {auteur, note, commentaire, date}), portfolio (3 réalisations {image, titre, description})
- **20 missions** avec : id, titre, description, budget FCFA, délai, verticale, statut (`ouverte` | `en_cours` | `livree` | `validee`), clientId, freelanceId (si attribuée), étapesEscrow (array avec {étape, date, complété})
- **15 clients** mix PME / startup / commerçant / particulier / ONG / entreprise (avec champ `type`)
- **Fonction `calculerScoreMatching(besoin, freelance)`** : logique simple combinant correspondance de compétences (mots-clés), budget compatible, disponibilité → retourne un score 60-98% + une raison textuelle courte (ex: "4 projets Django similaires livrés, dans votre budget")
- **10 litiges** avec {missionId, motif, messages (conversation), statut, résolution}

Toutes les fonctions dans `src/api/` doivent simuler un appel réseau avec `await new Promise(r => setTimeout(r, 300-600))` avant de retourner les mock data, pour que les états de chargement soient visibles.

---

## 📄 LES 18 PAGES À CONSTRUIRE — DANS CET ORDRE

Construis-les une par une, dans cet ordre exact. Ne passe à la page suivante qu'une fois la précédente terminée et fonctionnelle (routing inclus). Affiche `✅ PAGE X/18 TERMINÉE` après chacune.

### 1. LandingPage (`/`)
Hero qui ne suit PAS le format "titre + sous-titre + 2 boutons". À la place : un mini-simulateur de matching directement dans le hero — un champ "Décrivez votre besoin..." avec 2-3 exemples de besoins qui s'autocomplètent en placeholder animé, et au clic affiche une preview de 2 cards freelances avec leur score de match, comme une démonstration vivante du produit dès la première seconde. En dessous : les 3 verticales (Dev / Design / Marketing) en cards avec le traitement signature, section "Comment ça marche" en 3 tampons (Décrire → Comparer → Valider), section confiance avec le Sceau de Vérification expliqué, témoignages clients (persona Fanou et 2 autres), CTA final double (Je cherche un talent / Je suis freelance).

### 2. PostNeedPage (`/client/publier`)
Formulaire en langage naturel (textarea large "Décrivez votre besoin") + champs structurés (verticale, budget, délai). Au submit, transition vers les résultats.

### 3. MatchResultsPage (`/client/resultats`)
Liste de freelances recommandés, chaque card affiche le `MatchScoreBadge` (en JetBrains Mono, gros pourcentage) + la raison du match + résumé profil. Tri par score décroissant.

### 4. FreelanceProfilePage (`/freelance/:id`)
Photo + Sceau si vérifié, badges, portfolio en galerie, avis, taux de réussite affiché visuellement (pas juste un chiffre — une mini barre ou jauge), bouton "Démarrer une mission" en `--seal-gold`.

### 5. MissionTrackingPage (`/client/mission/:id`)
La timeline escrow horizontale (composant signature), messagerie simulée avec le freelance, bouton "Valider la livraison et libérer les fonds" qui déclenche une transition visuelle de la timeline.

### 6. ClientDashboardPage (`/client/dashboard`)
Missions actives, historique, montants en escrow total, factures téléchargeables (simulées).

### 7. CompanySpacePage (`/entreprise/dashboard`)
Variante : liste des recruteurs internes, missions groupées par recruteur, facturation consolidée.

### 8. FreelanceLandingPage (`/devenir-freelance`)
Page de conversion pour freelances : avantages (accès Mobile Money, visibilité, matching automatique au lieu de chercher des clients), étapes de vérification expliquées avec les tampons, témoignages freelances, CTA "Créer mon profil".

### 9. OnboardingPage (`/freelance/inscription`)
Formulaire multi-étapes avec indicateur de progression (profil → compétences → portfolio → test simulé) → écran final "Sceau en cours de vérification" avec animation d'attente, puis simulation d'attribution du badge.

### 10. FreelanceProfileEditPage (`/freelance/profil/edition`)
Vue édition du profil : compétences, tarifs, portfolio (ajout/suppression simulé).

### 11. AvailableMissionsPage (`/freelance/missions`)
Liste missions recommandées par le matching (avec score, comme côté client mais inversé) + missions ouvertes de sa verticale, filtrables.

### 12. FreelanceDashboardPage (`/freelance/dashboard`)
Missions en cours avec timeline escrow (vue freelance), revenus cumulés (en JetBrains Mono), bouton "Demander un retrait Mobile Money" avec formulaire simulé.

### 13. AdminDashboardPage (`/admin/dashboard`)
KPIs plateforme : missions actives, volume total en escrow, taux de litiges, nombre de freelances vérifiés ce mois — présentés avec des graphiques simples (pas de librairie de charts complexe, des barres/jauges en CSS suffisent).

### 14. VerificationQueuePage (`/admin/verifications`)
File d'attente de profils freelances à vérifier, avec bouton "Attribuer le Sceau Vérifié" / "Rejeter avec motif".

### 15. DisputesPage (`/admin/litiges`)
Liste litiges, détail conversation, formulaire de décision (rembourser client / libérer freelance / partiel).

### 16. LoginPage / RegisterPage (`/connexion`, `/inscription`)
Sélecteur de rôle visuel au début (Client / Freelance / Entreprise) qui adapte le formulaire suivant.

### 17. VerticalPage (`/verticale/:slug`)
Une page par verticale (dev-web, design-uiux, marketing-digital) avec contenu spécifique au métier : pour dev, badges par stack technique (Django, React, Flutter) ; pour design, une galerie portfolio en grille visuelle dense ; pour marketing, des mini-cases d'usage chiffrées.

### 18. HowItWorksPage (`/comment-ca-marche`)
Page de réassurance complète : explication détaillée du matching (avec exemple concret), de l'escrow (avec la timeline en grand), des badges/Sceau (avec les critères d'obtention).

---

## ✅ CRITÈRES DE QUALITÉ AVANT DE PASSER À LA PAGE SUIVANTE

Pour chaque page, vérifie avant de continuer :
- [ ] La palette exacte est utilisée (pas de bleu Tailwind par défaut qui se serait glissé)
- [ ] JetBrains Mono est utilisé pour tous les chiffres/scores/montants
- [ ] Aucune card n'a un `border-radius` uniforme avec toutes les autres sections
- [ ] Le responsive mobile fonctionne (teste mentalement à 375px de large)
- [ ] Les boutons primaires sont en `--seal-gold`, jamais en bleu

---

## 🚦 DÉMARRE MAINTENANT

1. Initialise le projet avec les commandes ci-dessus
2. Configure Tailwind avec les couleurs custom dans `tailwind.config.js`
3. Importe les 3 polices Google Fonts
4. Crée `src/data/mock.ts` avec toutes les données
5. Construis le composant `VerificationSeal` en premier (c'est la pièce centrale du système visuel)
6. Puis les pages dans l'ordre indiqué, une par une, sans t'arrêter entre elles

**Commence par l'initialisation du projet et le composant VerificationSeal.**
