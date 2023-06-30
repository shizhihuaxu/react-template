import { create } from 'zustand'

interface IGlobalStore {
    isCollapse: boolean
    updateCollapse: (isCollapse: boolean) => void
}
  
export const useGlobalStore = create<IGlobalStore>((set) => ({
    isCollapse: false,
    updateCollapse: (isCollapse) => set(() => ({ isCollapse: isCollapse })),
}))