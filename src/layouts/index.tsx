import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Layout, theme } from 'antd'
import { useUserStore } from '@/stores/user'
import { searchRoute } from '@/routers'
import Menu from './components/menu/index'
import Header from './components/header/index'

const { Content } = Layout

const AppLayout: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken()
    const { pathname } = useLocation()
    const authRouteList = useUserStore((state) => state.authRouteList)
    const [ isFullPage, setFullPage ] = useState(false)

    useEffect(() => {
        const curRoute = searchRoute(pathname, authRouteList)
        setFullPage(!!curRoute?.meta?.isFullPage)
    }, [ pathname, authRouteList ])
  
    return (
        isFullPage 
            ? <Outlet /> 
            : (
                <Layout>
                    <Menu />
                    <Layout>
                        <Header />
                        <Content
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                background: colorBgContainer,
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            )
    )
}

export default AppLayout