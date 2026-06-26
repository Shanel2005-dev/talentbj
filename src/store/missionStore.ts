import { create } from 'zustand';
import type { Mission, Invitation, CandidatureSpontanee, MissionStatut, InvitationStatut, CandidatureStatut } from '../types';
import { mockMissions, mockInvitations, mockCandidatures } from '../data/mock';

interface MissionStore {
  missions: Mission[];
  invitations: Invitation[];
  candidatures: CandidatureSpontanee[];

  // Selectors
  getMissionById: (id: string) => Mission | undefined;
  getMissionsByClientId: (clientId: string) => Mission[];
  getMissionsByFreelanceId: (freelanceId: string) => Mission[];
  getInvitationsByMissionId: (missionId: string) => Invitation[];
  getInvitationsByFreelanceId: (freelanceId: string) => Invitation[];
  getCandidaturesByMissionId: (missionId: string) => CandidatureSpontanee[];
  getCandidaturesByFreelanceId: (freelanceId: string) => CandidatureSpontanee[];

  // Actions — Missions
  createMission: (mission: Mission) => void;
  updateMissionStatut: (missionId: string, statut: MissionStatut) => void;
  assignFreelanceToMission: (missionId: string, freelanceId: string) => void;
  activateMission: (missionId: string) => void; // dépôt escrow → en_cours
  deliverMission: (missionId: string) => void;  // freelance livre → livree
  validateMission: (missionId: string) => void; // client valide → validee + fonds libérés

  // Actions — Invitations
  sendInvitation: (invitation: Invitation) => void;
  updateInvitationStatut: (invitationId: string, statut: InvitationStatut, details?: {
    prixPropose?: number;
    delaiPropose?: string;
    message?: string;
  }) => void;

  // Actions — Candidatures
  submitCandidature: (candidature: CandidatureSpontanee) => void;
  updateCandidatureStatut: (candidatureId: string, statut: CandidatureStatut) => void;

  // Actions — Double confirmation
  requestConfirmation: (missionId: string, freelanceId: string, prixFinal: number, delaiFinal: string, chemin: 'invitation' | 'candidature') => void;
  confirmEngagement: (missionId: string) => void;
  cancelEngagement: (missionId: string) => void;
}

export const useMissionStore = create<MissionStore>((set, get) => ({
  missions: [...mockMissions],
  invitations: [...mockInvitations],
  candidatures: [...mockCandidatures],

  getMissionById: (id) => get().missions.find(m => m.id === id),
  getMissionsByClientId: (clientId) => get().missions.filter(m => m.clientId === clientId),
  getMissionsByFreelanceId: (freelanceId) => get().missions.filter(m => m.freelanceId === freelanceId),
  getInvitationsByMissionId: (missionId) => get().invitations.filter(i => i.missionId === missionId),
  getInvitationsByFreelanceId: (freelanceId) => get().invitations.filter(i => i.freelanceId === freelanceId),
  getCandidaturesByMissionId: (missionId) => get().candidatures.filter(c => c.missionId === missionId),
  getCandidaturesByFreelanceId: (freelanceId) => get().candidatures.filter(c => c.freelanceId === freelanceId),

  createMission: (mission) =>
    set(state => ({ missions: [...state.missions, mission] })),

  updateMissionStatut: (missionId, statut) =>
    set(state => ({
      missions: state.missions.map(m =>
        m.id === missionId ? { ...m, statut } : m
      ),
    })),

  assignFreelanceToMission: (missionId, freelanceId) =>
    set(state => ({
      missions: state.missions.map(m =>
        m.id === missionId ? { ...m, freelanceId, statut: 'attribuee' } : m
      ),
    })),

  activateMission: (missionId) =>
    set(state => ({
      missions: state.missions.map(m => {
        if (m.id !== missionId) return m;
        const today = new Date().toISOString().slice(0, 10);
        const etapes = m.etapesEscrow.length > 0
          ? m.etapesEscrow.map((e, i) => i === 0 ? { ...e, complete: true, date: today } : e)
          : [
              { etape: 'depose' as const, label: 'Budget déposé', complete: true, date: today },
              { etape: 'en_cours' as const, label: 'Mission en cours', complete: false },
              { etape: 'livre' as const, label: 'Travail livré', complete: false },
              { etape: 'valide' as const, label: 'Fonds libérés', complete: false },
            ];
        return { ...m, statut: 'en_cours', etapesEscrow: etapes };
      }),
    })),

  deliverMission: (missionId) =>
    set(state => ({
      missions: state.missions.map(m => {
        if (m.id !== missionId) return m;
        const today = new Date().toISOString().slice(0, 10);
        const etapes = m.etapesEscrow.map(e =>
          e.etape === 'livre' ? { ...e, complete: true, date: today } : e
        );
        return { ...m, statut: 'livree', dateLivraison: today, etapesEscrow: etapes };
      }),
    })),

  validateMission: (missionId) =>
    set(state => ({
      missions: state.missions.map(m => {
        if (m.id !== missionId) return m;
        const today = new Date().toISOString().slice(0, 10);
        const etapes = m.etapesEscrow.map(e =>
          e.etape === 'valide' ? { ...e, complete: true, date: today } : e
        );
        return { ...m, statut: 'validee', etapesEscrow: etapes };
      }),
    })),

  sendInvitation: (invitation) =>
    set(state => {
      const missionInvitations = state.invitations.filter(i => i.missionId === invitation.missionId);
      if (missionInvitations.length >= 2) return state;
      const alreadyInvited = state.invitations.some(
        i => i.missionId === invitation.missionId && i.freelanceId === invitation.freelanceId
      );
      if (alreadyInvited) return state;

      const updatedMissions = state.missions.map(m =>
        m.id === invitation.missionId
          ? {
              ...m,
              statut: 'invitation_envoyee' as MissionStatut,
              freelancesInvitesIds: [...(m.freelancesInvitesIds ?? []), invitation.freelanceId],
            }
          : m
      );

      return {
        invitations: [...state.invitations, invitation],
        missions: updatedMissions,
      };
    }),

  updateInvitationStatut: (invitationId, statut, details) =>
    set(state => ({
      invitations: state.invitations.map(i =>
        i.id === invitationId
          ? {
              ...i,
              statut,
              dateReponse: new Date().toISOString().slice(0, 10),
              ...(details ?? {}),
            }
          : i
      ),
    })),

  submitCandidature: (candidature) =>
    set(state => {
      const already = state.candidatures.some(
        c => c.missionId === candidature.missionId && c.freelanceId === candidature.freelanceId
      );
      if (already) return state;
      return { candidatures: [...state.candidatures, candidature] };
    }),

  updateCandidatureStatut: (candidatureId, statut) =>
    set(state => ({
      candidatures: state.candidatures.map(c =>
        c.id === candidatureId ? { ...c, statut } : c
      ),
    })),

  requestConfirmation: (missionId, freelanceId, prixFinal, delaiFinal, chemin) =>
    set(state => ({
      missions: state.missions.map(m =>
        m.id === missionId
          ? { ...m, statut: 'en_attente_confirmation_freelance' as const, freelanceId, prixFinal, delaiFinal, cheminAttribution: chemin }
          : m
      ),
    })),

  confirmEngagement: (missionId) =>
    set(state => ({
      missions: state.missions.map(m =>
        m.id === missionId ? { ...m, statut: 'attribuee' as const } : m
      ),
    })),

  cancelEngagement: (missionId) =>
    set(state => ({
      missions: state.missions.map(m => {
        if (m.id !== missionId) return m;
        const previousStatut: MissionStatut = m.cheminAttribution === 'invitation' ? 'invitation_envoyee' : 'ouverte';
        return { ...m, statut: previousStatut, freelanceId: undefined, prixFinal: undefined, delaiFinal: undefined, cheminAttribution: undefined };
      }),
    })),
}));
