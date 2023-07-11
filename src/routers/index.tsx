import type { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'
import React, { lazy } from 'react'
import {  Navigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import LazyLoad from './lazy-load'

export interface IRouteMeta {
    key: string // 标识唯一性，做路由跳转用，path不能标识唯一性
    title?: string // 菜单标题
    icon?: React.ReactNode // 菜单图标
    isHide?: boolean // 是否隐藏在左侧菜单中
    isFullPage?: boolean 
}

interface ICustomFields {
    meta?: IRouteMeta
}

type AppIndexRouteObject = IndexRouteObject & ICustomFields
type AppNonIndexRouteObject = Omit<NonIndexRouteObject, 'children'> &
ICustomFields & {
    children?: (AppIndexRouteObject | AppNonIndexRouteObject)[]
}

export type IRouteItem = AppIndexRouteObject | AppNonIndexRouteObject

// 根据pathname在路由表中查询所对应路由信息
export const searchRoute = (pathname: string, routes: IRouteItem[] = []): IRouteItem => {
    let route: IRouteItem = {}

    for (const item of routes) {
        if (item?.meta?.key === pathname || item?.path === pathname) return item
        if (item.children) {
            const res = searchRoute(pathname, item.children)
            if (Object.keys(res).length) route = res
        }
    }
    return route
}

// 路由列表
export const routes: IRouteItem[] = [
    {
        path: '/',
        element: LazyLoad(lazy(() => import('@/layouts/index'))),
        children: [
            // 路由重定向
            {
                index: true,
                element: <Navigate to='home' replace />,
            },
            {
                path: 'login',
                meta: { key: '/login', isHide: true, isFullPage: true },
                element: LazyLoad(lazy(() => import('@/pages/login/index'))),
            },
            {
                path: 'home',
                meta: { key: '/home', title: 'aa', icon: <UserOutlined /> },
                element: LazyLoad(lazy(() => import('@/pages/home/index'))),
            },
            {
                path: 'test',
                meta: { key: '/test', title: '测试页面', icon: <UserOutlined /> },
                element: LazyLoad(lazy(() => import('@/pages/test'))),
                children: [
                    {
                        path: 'child',
                        meta: { key: '/test/child', title: '测试子页面', icon: <UserOutlined /> },
                        element: LazyLoad(lazy(() => import('@/pages/test/child'))),
                    },
                ],
            },
        ],
    },
]