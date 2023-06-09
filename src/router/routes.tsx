import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import LazyLoad from './lazy-load'

export const routes: RouteObject[] = [
    {
        path: '/',
        element: LazyLoad(lazy(() => import('@/pages/test'))),
        children: [
            {
                path: 'child/:id',
                element: LazyLoad(lazy(() => import('@/pages/test/child'))),
            }
        ]
    }
]