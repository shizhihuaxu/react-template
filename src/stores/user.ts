import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IUserStore {
    token: string
    username: string
    setToken: (token: string) => void
}
  
export const useUserStore = create<IUserStore>()(
    persist(
        (set) => ({
            token: 'user token',
            username: 'hahah',
            setToken: (token) => set(() => ({ token: token })),
        }),
        { 
            name: 'user',
            // username 不持久化
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(([ key ]) => ![ 'username' ].includes(key)),
                ),
        }, // unique name
    ),
)