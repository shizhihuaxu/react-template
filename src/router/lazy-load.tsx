import React, { Suspense } from 'react'

const LazyLoad = (Com: React.LazyExoticComponent<any>): React.ReactNode => {
    return (
        <Suspense
            fallback={
                <div>loading</div>
            }>
            <Com />
        </Suspense>
    )
}

export default LazyLoad
