# TALENTBJ — Dossier de Spécifications
## Marketplace de talents tech & business vérifiés d'Afrique de l'Ouest

---

## 1. CONTEXTE & ÉTUDE DE L'EXISTANT

### Le marché du freelancing en Afrique de l'Ouest aujourd'hui

| Plateforme | Limite pour le marché béninois |
|---|---|
| **Upwork / Fiverr** | Exigent carte bancaire internationale ou PayPal — inaccessibles à 90% des freelances locaux. Pas de Mobile Money. Concurrence mondiale écrasante (un dev béninois rivalise avec l'Inde, le Pakistan à prix cassés). |
| **WhatsApp / Groupes Facebook** | Canal dominant actuellement. Aucune vérification, aucune garantie, aucun historique, négociation à l'aveugle. |
| **NKOMON, Afrobytes, et autres tentatives locales** | Souvent généralistes, sans mécanisme de paiement sécurisé, faible rétention. |
| **Bouche-à-oreille** | Fonctionne mais ne scale pas, limite la découverte de nouveaux talents. |

**Conclusion de l'étude :** il existe un vide entre "informel risqué" et "international inaccessible". TalentBJ se positionne exactement dans cet espace.

---

## 2. LE PROBLÈME (analysé par segment)

### Côté Client (PME, startups, commerçants, particuliers, ONG)
- Cherche un développeur/graphiste/community manager → passe par WhatsApp ou Facebook
- Aucun moyen de vérifier le niveau réel avant de payer
- Aucune garantie si le freelance disparaît après paiement
- Doit gérer la négociation, le suivi, les relances manuellement

### Côté Freelance
- Exclu des plateformes internationales (pas de carte Visa/Mastercard, pas de PayPal actif au Bénin)
- Dépend du réseau personnel pour trouver des missions
- Aucun moyen de prouver objectivement son niveau à un client qui ne le connaît pas
- Risque de travailler gratuitement si le client ne paie pas après livraison

### Problème structurel commun
**Un marché à deux faces qui ne se rencontrent pas en confiance**, faute d'infrastructure locale de paiement et de vérification.

---

## 3. POSITIONNEMENT STRATÉGIQUE

> ❌ Ce que TalentBJ n'est PAS : un clone généraliste de Fiverr couvrant tous les métiers (plomberie, coiffure, etc. — nécessitent géolocalisation, assurance, vérification physique).

> ✅ Ce que TalentBJ EST : **la marketplace de référence pour les talents numériques et business d'Afrique de l'Ouest**, lancée sur 3 verticales precises.

### Les 3 verticales au lancement (MVP)
1. **Développement web & mobile** (Django, React, Flutter, PHP)
2. **Design graphique & UI/UX** (logos, identité visuelle, interfaces)
3. **Marketing digital & Community Management** (réseaux sociaux, pub en ligne, contenu)

### Roadmap d'extension (post-traction)
4. Comptabilité & gestion fiscale locale
5. Rédaction & traduction
6. Assistance virtuelle & data

**Pourquoi cet ordre :** les 3 premières verticales captent la demande la plus fréquente et la mieux rémunérée des PME/startups béninoises — le segment d'acquisition le plus rapide selon l'étude de marché.

---

## 4. LES ACTEURS DE LA PLATEFORME

| Acteur | Rôle | Actions clés |
|---|---|---|
| **Client** (PME, startup, commerçant, particulier, ONG) | Recherche un talent, publie un besoin, paie via escrow | Créer un compte, publier une mission, consulter les recommandations de matching, dialoguer avec le freelance, valider la livraison, libérer le paiement, noter |
| **Freelance** | Propose ses compétences, réalise des missions | Créer un profil avec portfolio, passer une vérification de compétences, répondre aux missions ou recevoir des matchs, livrer le travail, recevoir le paiement |
| **Entreprise** (compte multi-utilisateurs) | Variante du client avec plusieurs recruteurs internes | Gérer une équipe de recruteurs, centraliser l'historique des projets, accéder à une facturation consolidée |
| **Administrateur** | Garant de la confiance sur la plateforme | Vérifier les profils freelances (badges), arbitrer les litiges, superviser les transactions escrow, gérer le contenu signalé |
| **Moteur de matching** (composant produit, pas un humain) | Recommande les freelances pertinents pour chaque mission publiée | Analyse la description du besoin → calcule un score de compatibilité par freelance → classe les recommandations avec justification |

---

## 5. LA SOLUTION — Réponse point par point

| Problème identifié | Réponse TalentBJ |
|---|---|
| Pas de plateforme locale de confiance | Marketplace dédiée Bénin / Afrique de l'Ouest, verticale, pas généraliste |
| Pas de moyen de paiement adapté | Intégration MTN Mobile Money & Moov Money dès le MVP |
| Risque d'arnaque bilatéral | **Système d'escrow** : le client dépose les fonds, ils sont bloqués jusqu'à validation de la livraison, puis libérés au freelance |
| Compétences invérifiables | Badges **Vérifié / Expert / Premium** + tests de compétences + avis clients horodatés |
| Client perdu face à des dizaines de profils | **Score de matching IA** : le client décrit son besoin en langage naturel, le système recommande les meilleurs profils avec un pourcentage de compatibilité et une justification ("92% de match — 4 projets Django similaires livrés") |
| Pas d'historique structuré pour les entreprises | Espace Entreprise avec multi-recruteurs, historique centralisé, facturation groupée |

---

## 6. L'INNOVATION — Ce qui différencie réellement TalentBJ

### 6.1 Le matching n'est pas une recherche, c'est une recommandation
Le client ne filtre pas des dizaines de profils lui-même. Il décrit son besoin ("Je cherche un développeur Django pour un site e-commerce avec paiement Mobile Money, budget 200 000 FCFA, délai 3 semaines"). Le moteur traduit cela en critères (compétence, budget, délai, complexité) et restitue un classement avec score de compatibilité et raison explicite — pas une boîte noire.

### 6.2 La confiance est mesurable, pas déclarative
Au lieu d'un simple texte "5 ans d'expérience" non vérifiable, chaque freelance porte des **signaux de confiance visibles et vérifiés** : badge de vérification d'identité, badge de test de compétence réussi, taux de livraison à temps, taux de litiges (proche de 0 affiché comme un argument de confiance).

### 6.3 L'escrow comme produit, pas comme mention légale
La majorité des plateformes mentionnent "paiement sécurisé" en petit texte. TalentBJ rend le statut des fonds **visible à chaque étape du projet** (Fonds déposés → Travail en cours → Livré, en attente de validation → Fonds libérés), comme un tracking de colis. Cela transforme une fonctionnalité backend en argument de réassurance visuel.

### 6.4 Spécialisation verticale = expertise perçue
En ne couvrant que 3 verticales precises au lieu de "tous les métiers", chaque page catégorie peut afficher des éléments spécifiques au métier (ex: pour les développeurs — un badge par stack technique et un lien vers un repo de démonstration ; pour les designers — une galerie portfolio en grille visuelle). Un marketplace généraliste ne peut pas se permettre ce niveau de détail par métier.

---

## 7. MODÈLE ÉCONOMIQUE

1. **Commission sur mission** : 5 à 15% selon le palier du freelance (Standard / Vérifié / Premium)
2. **Abonnement Premium freelance** : mise en avant du profil, badge Premium, accès prioritaire aux nouvelles missions
3. **Offres sponsorisées** : les entreprises peuvent mettre en avant leurs missions urgentes
4. **Frais de mise en relation rapide** (optionnel, post-MVP) : matching accéléré pour les clients pressés

---

## 8. PERSONA CLIENT TYPE (pour calibrer le design et le ton)

**Nom fictif : FANOU, gérante de boutique e-commerce à Cotonou**
- 32 ans, gère une boutique de vêtements en ligne sur Instagram
- A besoin d'un community manager et d'un graphiste régulièrement
- Utilise WhatsApp et Mobile Money tous les jours, peu à l'aise avec l'anglais ou les outils complexes
- Budget limité mais récurrent (missions de 20 000 à 100 000 FCFA)
- Veut une solution **rapide et rassurante**, pas un outil "tech" compliqué

→ Implication design : parcours en 3 clics maximum, vocabulaire simple en français, confirmation visuelle claire à chaque étape, pas de jargon SaaS.

---

## 9. DIRECTION DESIGN — "Atelier de confiance"

Plutôt que le bleu-blanc Stripe/Notion générique (déjà la référence visuelle de 80% des SaaS), la proposition suivante garde l'exigence "premium et sérieux" demandée tout en donnant à TalentBJ une identité qui n'appartient qu'à elle :

### Concept : la plateforme comme un atelier de maître-artisan numérique
L'idée directrice : un freelance vérifié est comme un artisan dont le savoir-faire est certifié. Le vocabulaire visuel s'inspire du **tampon de certification, du sceau, du parcours de validation** — pas de la grille de cartes interchangeables d'un marketplace générique.

**Palette :**
- `#0B1F3A` — Bleu encre profond (fond principal, confiance, sérieux)
- `#F5A623` — Or/ambre (accent signature — rappel du "sceau de qualité", utilisé avec retenue sur les badges et CTA)
- `#1FAE7A` — Vert validation (statut "fonds libérés", "livré", succès)
- `#F7F3EC` — Blanc cassé chaud (surfaces claires, pas un blanc froid clinique)
- `#5C6B7A` — Gris ardoise (texte secondaire, structure)

**Typographie :**
- Display : **Space Grotesk** (titres, chiffres clés — caractère technique mais chaleureux)
- Texte : **Inter** (lisibilité, sérieux, neutre)
- Données/badges : **JetBrains Mono** (scores de matching, montants, statuts — renforce l'idée de précision mesurable)

**Signature visuelle :** le badge de vérification dessiné comme un **sceau circulaire** (et non une coche générique de réseau social) — visible sur chaque profil freelance vérifié, dans le header de la landing, et animé subtilement à l'apparition (un seul moment d'animation marquant, pas de décoration partout).

**Structure :** le parcours client est présenté comme une **progression à 3 étapes tamponnées** (Décrire → Comparer → Valider) plutôt que des cards numérotées génériques — parce que c'est un vrai procédé séquentiel, pas une décoration.

---

## 10. PÉRIMÈTRE DU MVP FRONTEND (ce que Claude Code doit livrer)

Frontend uniquement, API simulées (mock data), React + Vite + TypeScript + TailwindCSS.

### Pages côté Client
1. **Landing page** — Hero avec démonstration du matching, les 3 verticales, comment ça marche, témoignages, CTA
2. **Publier un besoin** — Formulaire en langage naturel + critères (budget, délai, verticale)
3. **Résultats de matching** — Liste freelances recommandés avec score %, justification, badges
4. **Profil freelance** — Portfolio, badges, avis, taux de réussite, bouton "Démarrer une mission"
5. **Suivi de mission** — Statut escrow visuel (Fonds déposés → En cours → Livré → Validé), messagerie, bouton libérer les fonds
6. **Dashboard client** — Missions actives, historique, factures
7. **Espace Entreprise** — Multi-recruteurs, historique centralisé (variante du dashboard client)

### Pages côté Freelance
8. **Landing freelance** ("Devenir freelance vérifié") — Avantages, étapes de vérification, témoignages
9. **Inscription & vérification** — Étapes : profil → portfolio → test de compétence simulé → badge attribué
10. **Profil public freelance** (vue édition) — Portfolio, compétences, tarifs
11. **Missions disponibles** — Liste missions où il a été recommandé par le matching + missions ouvertes de sa verticale
12. **Dashboard freelance** — Missions en cours, revenus, statut escrow par mission, demande de retrait Mobile Money

### Pages Admin
13. **Dashboard admin** — KPIs plateforme (missions actives, volume escrow, taux de litiges)
14. **Vérification des profils** — File d'attente de freelances à vérifier, attribution des badges
15. **Gestion des litiges** — Liste litiges ouverts, détail conversation, décision

### Pages transverses
16. **Login / Register** — Sélecteur de rôle (Client / Freelance / Entreprise)
17. **Page Verticale** (ex: "Développement web") — Présentation spécifique au métier, freelances de cette catégorie
18. **Comment ça marche** — Explication du matching, de l'escrow, des badges (page de réassurance)

---

## 11. DONNÉES MOCKÉES NÉCESSAIRES

- 30 freelances répartis sur les 3 verticales, avec : nom, photo (picsum), verticale, compétences, badges (Vérifié/Expert/Premium), taux horaire ou forfait, taux de réussite %, nombre de missions, avis (3-5 par profil), portfolio (3 réalisations avec image + description)
- 20 missions publiées avec : titre, description, budget, délai, verticale, statut (ouverte/en cours/livrée/validée), client associé
- Scores de matching simulés (logique simple : correspondance compétences + budget + disponibilité → score 60-98%)
- 15 clients (mix PME, startup, commerçant, particulier, ONG, entreprise multi-recruteurs)
- Statuts escrow par mission avec historique d'étapes horodaté
- 10 litiges simulés avec conversation et résolution

---

## 12. CE QUI A MANQUÉ DANS LA PREMIÈRE TENTATIVE (à corriger explicitement)

D'après ton retour, la version précédente avait un rendu "académique" générique. Le prompt ci-joint pour Claude Code intègre explicitement :
- Une direction design nommée et justifiée (pas de liberté totale qui retombe sur les défauts Stripe/Tailwind par défaut)
- Une palette et une typographie imposées dès le départ
- Un signal visuel signature (le sceau de vérification) à décliner sur plusieurs écrans
- L'interdiction explicite des patterns "template SaaS" (cards uniformes sans personnalité, icônes Heroicons par défaut sans traitement, dégradé violet-bleu générique)
