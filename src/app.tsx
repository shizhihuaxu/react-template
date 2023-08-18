import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { BrowserRouter } from 'react-router-dom'
import RouterAuth from '@/routers/router-auth'
import RouterView from '@/routers/router-view'
import 'antd/dist/reset.css'
import '@/styles/utils.scss'

const App = () => {
    return (
        <BrowserRouter>
            <ConfigProvider  
                locale={zhCN}
                theme={{
                    token: {
                        colorPrimary: '#00b96b',
                    },
                }}>
                <RouterAuth >
                    <RouterView />
                </RouterAuth>
            </ConfigProvider>
        </BrowserRouter>
    )
}

export default App