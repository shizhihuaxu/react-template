import { create } from 'zustand'

interface IGlobalStore {
    isCollapse: boolean
    setCollapse: (isCollapse: boolean) => void
}
  
export const useGlobalStore = create<IGlobalStore>((set) => ({
    isCollapse: false,
    setCollapse: (isCollapse) => set(() => ({ isCollapse: isCollapse })),
}))