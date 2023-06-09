import React from 'react'
import { RouteObject } from 'react-router-dom'

const Test = React.lazy(() => import('@/pages/test'))
const TestChild = React.lazy(() => import('@/pages/test/child'))

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Test />,
        children: [
            {
                path: 'child/:id',
                element: <TestChild />,
            }
        ]
    }
]