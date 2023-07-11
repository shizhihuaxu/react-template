import { useRoutes } from 'react-router-dom'
import { routes } from './index'

// 路由组件
const RouterView = () => {
    return useRoutes(routes)
}

export default RouterView