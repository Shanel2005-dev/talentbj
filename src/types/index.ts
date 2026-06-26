export type Vertical = 'developpement' | 'design' | 'marketing' | 'comptabilite';
export type Badge = 'verifie' | 'expert' | 'premium';
export type StatutVerification = 'en_attente' | 'verifie' | 'rejete';
export type MissionStatut = 'ouverte' | 'invitation_envoyee' | 'en_attente_confirmation_freelance' | 'attribuee' | 'en_cours' | 'livree' | 'validee';
export type InvitationStatut = 'en_attente' | 'acceptee_avec_proposition' | 'refusee';
export type CandidatureStatut = 'en_attente' | 'acceptee' | 'non_retenue';
export type ClientType = 'pme' | 'startup' | 'commercant' | 'particulier' | 'ong' | 'entreprise';
export type AuthRole = 'client' | 'freelance' | 'entreprise' | 'admin' | null;
export type EscrowEtapeKey = 'depose' | 'en_cours' | 'livre' | 'valide';
export type LitigeStatut = 'ouvert' | 'en_cours' | 'resolu';

export interface Avis {
  id: string;
  auteur: string;
  avatarSeed: string;
  note: number;
  commentaire: string;
  date: string;
}

export interface PortfolioItem {
  id: string;
  image: string;
  titre: string;
  description: string;
}

export interface Freelance {
  id: string;
  nom: string;
  photo: string;
  vertical: Vertical;
  competences: string[];
  badge?: Badge;
  statutVerification?: StatutVerification;
  tarifHoraire?: number;
  tarifForfait?: number;
  tauxReussite: number;
  nombreMissions: number;
  avis: Avis[];
  portfolio: PortfolioItem[];
  ville: string;
  bio: string;
  disponible: boolean;
  dateInscription: string;
  numeroOrdre?: string;
}

export interface EtapeEscrow {
  etape: EscrowEtapeKey;
  label: string;
  date?: string;
  complete: boolean;
}

export interface Mission {
  id: string;
  titre: string;
  description: string;
  budget: number;
  delai: string;
  vertical: Vertical;
  statut: MissionStatut;
  clientId: string;
  freelanceId?: string;
  freelancesInvitesIds?: string[];
  etapesEscrow: EtapeEscrow[];
  datePublication: string;
  competencesRequises: string[];
  prixFinal?: number;
  delaiFinal?: string;
  cheminAttribution?: 'invitation' | 'candidature';
  dateLivraison?: string;
}

export interface Invitation {
  id: string;
  missionId: string;
  freelanceId: string;
  statut: InvitationStatut;
  dateEnvoi: string;
  prixPropose?: number;
  delaiPropose?: string;
  message?: string;
  dateReponse?: string;
}

export interface CandidatureSpontanee {
  id: string;
  missionId: string;
  freelanceId: string;
  prixPropose: number;
  delaiPropose: string;
  message: string;
  statut: CandidatureStatut;
  dateSoumission: string;
}

export interface Recruteur {
  id: string;
  nom: string;
  email: string;
  poste: string;
}

export interface Client {
  id: string;
  nom: string;
  type: ClientType;
  email: string;
  ville: string;
  recruteurs?: Recruteur[];
}

export interface MessageLitige {
  auteur: string;
  message: string;
  date: string;
  role: 'client' | 'freelance' | 'admin';
}

export interface Litige {
  id: string;
  missionId: string;
  motif: string;
  messages: MessageLitige[];
  statut: LitigeStatut;
  resolution?: string;
  dateOuverture: string;
}

export interface MatchResult {
  freelance: Freelance;
  score: number;
  raison: string;
}

export interface BesoinClient {
  description: string;
  vertical?: Vertical;
  budget?: number;
  delai?: string;
}
