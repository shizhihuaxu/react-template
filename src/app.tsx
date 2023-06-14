import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import router from '@/router'
import 'antd/dist/reset.css'
import '@/styles/utils.scss'

const App = () => {
    return (
        <ConfigProvider  
            locale={zhCN}
            theme={{
                token: {
                    colorPrimary: '#00b96b',
                },
            }}>
            <RouterProvider router={router} />
        </ConfigProvider>
    )
}

export default App