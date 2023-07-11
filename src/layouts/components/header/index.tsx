import React from 'react'
import { useGlobalStore } from '@/stores/global'
import { Layout, Button, theme } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const { Header } = Layout

const LayoutHeader: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    const [ isCollapse, setCollapse ] = useGlobalStore(
        (state) => [ state.isCollapse, state.setCollapse ],
    )

    return (
        <Header 
            style={{ 
                height: '55px', 
                paddingInline: '16px', 
                background: colorBgContainer, 
            }}
        >
            <Button
                type='text'
                icon={isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapse(!isCollapse)}
                style={{
                    fontSize: '16px',
                }}
            />
        </Header>
    )
}

export default LayoutHeader