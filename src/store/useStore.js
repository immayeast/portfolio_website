import { create } from 'zustand'

export const useStore = create((set) => ({
  timeOffset: 0, // -1 (Past) to 0 (Present) to 1 (Future)
  setTimeOffset: (val) => set({ timeOffset: val }),
  
  activeProject: 'Current Studio Build',
  
  isPendantOpen: false,
  togglePendant: () => set((state) => ({ isPendantOpen: !state })),
  
  isOriginVisible: false,
  setOriginVisible: (visible) => set({ isOriginVisible: visible })
}))
