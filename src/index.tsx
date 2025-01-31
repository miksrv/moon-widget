import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MoonWidget from './MoonWidget';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <MoonWidget LAT={51} LON={56} />
    </React.StrictMode>
);
