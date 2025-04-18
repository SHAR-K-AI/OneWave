import { create } from 'zustand';

export const usePlayerStore = create((set) => ({
    currentTrack: '',
    setCurrentTrack: (src: string) => set({ currentTrack: src }),
}));
