import { getMatchResults } from '../data/mock';
import type { BesoinClient, MatchResult } from '../types';

const delay = (ms = 400) => new Promise(r => setTimeout(r, ms));

export async function fetchMatchResults(besoin: BesoinClient): Promise<MatchResult[]> {
  await delay(600);
  return getMatchResults(besoin);
}

export async function fetchMatchPreview(description: string): Promise<MatchResult[]> {
  await delay(400);
  return getMatchResults({ description }).slice(0, 3);
}
