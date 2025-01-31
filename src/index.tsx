import React from 'react'
import ReactDOM from 'react-dom/client'

import MoonWidget from './MoonWidget'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <MoonWidget date={'2025/02/21'}
lat={51.76712}
lon={55.09785}
timezone={'Asia/Yekaterinburg'} />
    </React.StrictMode>
)
