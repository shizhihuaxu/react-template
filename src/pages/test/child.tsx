import React from 'react'
import { Button } from 'antd'
import { useUserStore } from '@/stores/user'
import { useGlobalStore } from '@/stores/global'

const TestChild: React.FC = () => {
    const [ token, username, setToken ] = useUserStore(
        (state) => [ state.token, state.username, state.setToken ],
    )
    const isCollapse = useGlobalStore((state) => state.isCollapse)
      
    return (
        <>
            <div>这里是子页面</div>
            <div>collapse is: {isCollapse ? '关' : '开'}</div>
            <div>token is: {token}</div>
            <div>username is: {username}</div>
            <Button type='primary' onClick={() => setToken('token changed')}>改变token</Button>
        </>
    )
}

export default TestChild