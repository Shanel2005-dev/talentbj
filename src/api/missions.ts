import {
  mockMissions,
  getMissionById,
  getMissionsByClientId,
  getMissionsByFreelanceId,
  getMissionsByVertical,
} from '../data/mock';
import type { Mission, Vertical } from '../types';

const delay = (ms = 400) => new Promise(r => setTimeout(r, ms));

export async function fetchMissions(vertical?: Vertical): Promise<Mission[]> {
  await delay(350);
  return vertical ? getMissionsByVertical(vertical) : mockMissions;
}

export async function fetchMissionById(id: string): Promise<Mission | null> {
  await delay(300);
  return getMissionById(id) ?? null;
}

export async function fetchClientMissions(clientId: string): Promise<Mission[]> {
  await delay(350);
  return getMissionsByClientId(clientId);
}

export async function fetchFreelanceMissions(freelanceId: string): Promise<Mission[]> {
  await delay(350);
  return getMissionsByFreelanceId(freelanceId);
}

export async function postMission(
  data: Omit<Mission, 'id' | 'etapesEscrow' | 'datePublication' | 'statut' | 'freelanceId'>
): Promise<Mission> {
  await delay(800);
  const newMission: Mission = {
    ...data,
    id: `m${Date.now()}`,
    statut: 'ouverte',
    datePublication: new Date().toISOString().split('T')[0],
    etapesEscrow: [
      { etape: 'depose', label: 'Fonds déposés', complete: false },
      { etape: 'en_cours', label: 'Travail en cours', complete: false },
      { etape: 'livre', label: 'Livré', complete: false },
      { etape: 'valide', label: 'Validé & Libérés', complete: false },
    ],
  };
  return newMission;
}

export async function validerLivraison(missionId: string): Promise<Mission> {
  await delay(700);
  const m = getMissionById(missionId);
  if (!m) throw new Error('Mission introuvable');
  return {
    ...m,
    statut: 'validee',
    etapesEscrow: m.etapesEscrow.map(e => ({
      ...e,
      complete: true,
      date: e.date ?? new Date().toISOString().split('T')[0],
    })),
  };
}

export async function fetchMissionsOuvertes(vertical?: Vertical): Promise<Mission[]> {
  await delay(350);
  const ouvertes = mockMissions.filter(m => m.statut === 'ouverte');
  return vertical ? ouvertes.filter(m => m.vertical === vertical) : ouvertes;
}
