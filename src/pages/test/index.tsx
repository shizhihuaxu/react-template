import React, { useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'

const Test: React.FC = () => {
    useEffect(() => {
        const a: Array<string> = Array.from('foo')
        const b: string[] = [ 1, 2, 3 ].map(n => n + 1)
        console.log(a, b)
        Promise.resolve().finally()
    }, [])

    return (
        <div>
            <p>test</p>
            <Link to={'child/1'}>to child</Link>
            <Outlet />
        </div>
    )
}

export default Test