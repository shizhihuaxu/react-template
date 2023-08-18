import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { IRouteItem } from '@/routers'
import { routes } from '@/routers'

interface IUserStore {
    token: string
    username: string
    authRouteList: IRouteItem[]
    setToken: (token: string) => void
}

export const useUserStore = create<IUserStore>()(
    persist(
        (set) => ({
            token: '11',
            username: 'hahah',
            authRouteList: [ ...routes ],
            setToken: (token) => set(() => ({ token: token })),
        }),
        {
            name: 'user', // unique name
            // 仅持久化某些字段
            partialize: (state) => ({
                token: state.token,
                username: state.username,
            }),
        },
    ),
)
