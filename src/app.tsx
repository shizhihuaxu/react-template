import React from 'react'

function App() {
    const a: Array<string> = Array.from('foo')
    const b = [1, 2, 3].map(n => n + 1)
    Promise.resolve().finally()
    console.log(a, b)

    return (
        <div>test1</div>
    )
}

export default App