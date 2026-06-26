import { mockFreelances, getFreelanceById, getFreelancesByVertical } from '../data/mock';
import type { Freelance, Vertical } from '../types';

const delay = (ms = 400) => new Promise(r => setTimeout(r, ms));

export async function fetchFreelances(vertical?: Vertical): Promise<Freelance[]> {
  await delay(350);
  return vertical ? getFreelancesByVertical(vertical) : mockFreelances;
}

export async function fetchFreelanceById(id: string): Promise<Freelance | null> {
  await delay(300);
  return getFreelanceById(id) ?? null;
}

export async function fetchFreelancesPremium(): Promise<Freelance[]> {
  await delay(250);
  return mockFreelances.filter(f => f.badge === 'premium' && f.disponible).slice(0, 6);
}

export async function updateFreelanceProfile(
  id: string,
  updates: Partial<Pick<Freelance, 'bio' | 'competences' | 'tarifHoraire' | 'tarifForfait' | 'ville'>>
): Promise<Freelance> {
  await delay(600);
  const f = getFreelanceById(id);
  if (!f) throw new Error('Freelance introuvable');
  return { ...f, ...updates };
}
