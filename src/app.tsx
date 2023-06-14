import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import router from '@/router'

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