import { create } from 'zustand'

// Read every frame by the 3D scene, so it lives in a plain mutable object
// instead of React state — no re-renders on scroll.
//   progress: page scroll, 0 → 1
//   marks:    scroll progress at which About, Work, Experience and Contact
//             arrive — the watch hands hit 3, 6, 9 and 12 o'clock there
export const scrollState = { progress: 0, marks: [0.2, 0.4, 0.7, 1] }

export const useStore = create((set) => ({
  soundOn: false,
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),

  activeProject: null,
  openProject: (slug) => set({ activeProject: slug }),
  closeProject: () => set({ activeProject: null }),
}))
