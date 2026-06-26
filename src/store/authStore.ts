import { create } from 'zustand';
import type { AuthRole, StatutVerification } from '../types';

interface AuthStore {
  role: AuthRole;
  name: string | null;
  email: string | null;
  freelanceId: string | null;
  statutVerification: StatutVerification | null;
  login: (role: NonNullable<AuthRole>, name: string, email: string, freelanceId?: string, statutVerification?: StatutVerification) => void;
  setStatutVerification: (s: StatutVerification) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  role: null,
  name: null,
  email: null,
  freelanceId: null,
  statutVerification: null,
  login: (role, name, email, freelanceId, statutVerification) =>
    set({ role, name, email, freelanceId: freelanceId ?? null, statutVerification: statutVerification ?? null }),
  setStatutVerification: (s) => set({ statutVerification: s }),
  logout: () => set({ role: null, name: null, email: null, freelanceId: null, statutVerification: null }),
}));
