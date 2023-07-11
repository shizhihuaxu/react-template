import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useUserStore } from '@/stores/user'

interface IProps {
    children: JSX.Element
}

// 路由守卫
const RouterAuth: React.FC<IProps> = (props) => {
    const { pathname } = useLocation()
    const [ token ] = useUserStore(
        (state) => [ state.token ],
    )
    
    if(!token && pathname !== '/login') return (<Navigate to='/login' replace />)

    return props.children
}

export default RouterAuth