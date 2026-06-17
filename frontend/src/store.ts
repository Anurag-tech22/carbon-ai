import { create } from 'zustand'

interface UserState {
  carbonScore: number | null
  totalEmissions: number | null
  setScore: (score: number, emissions: number) => void
}

export const useStore = create<UserState>((set) => ({
  carbonScore: null,
  totalEmissions: null,
  setScore: (score, emissions) => set({ carbonScore: score, totalEmissions: emissions }),
}))
