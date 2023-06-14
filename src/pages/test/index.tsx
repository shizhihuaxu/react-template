import React, { useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Button, message } from 'antd'
import classnames from 'classnames'
import style from './style.module.scss'

const Test: React.FC = () => {
    const [ messageApi, contextHolder ] = message.useMessage()

    const info = () => {
        messageApi.success('click！')
    }
      
    useEffect(() => {
        const a: Array<string> = Array.from('foo')
        const b: number[] = [ 1, 2, 3 ].map(n => n + 1)
        console.log(a, b)
        Promise.resolve().finally()
    }, [])

    return (
        <div className={classnames(
            {
                [style.container]: true,
            }, 
            'txt-align-r',
        )}>
            {contextHolder}
            <Button type="primary" onClick={info}>Primary Button</Button>
            <p>test</p>
            <Link to={'child/1'}>to child</Link>
            <Outlet />
        </div>
    )
}

export default Test