import React from 'react'

import CardWidget from './components/variants/CardWidget'
import CompactWidget from './components/variants/CompactWidget'
import DetailWidget from './components/variants/DetailWidget'
import GaugeWidget from './components/variants/GaugeWidget'
import GridWidget from './components/variants/GridWidget'
import LiveWidget from './components/variants/LiveWidget'
import PanelWidget from './components/variants/PanelWidget'
import TimelineWidget from './components/variants/TimelineWidget'
import { useMoonData } from './hooks/useMoonData'
import type { Language } from './utils/date'
import { translations } from './translations'

import './style.css'

export type MoonWidgetVariant =
    | 'compact'
    | 'panel'
    | 'timeline'
    | 'grid'
    | 'detail'
    | 'live'
    | 'gauge'
    | 'card'

export interface MoonWidgetProps {
    lat: number
    lon: number
    date?: string
    timezone?: string
    language?: Language
    variant?: MoonWidgetVariant
    theme?: 'dark' | 'light'
}

const MoonWidget: React.FC<MoonWidgetProps> = ({
    lat,
    lon,
    date,
    timezone,
    language = 'en',
    variant = 'compact',
    theme = 'dark',
}) => {
    const data = useMoonData(lat, lon, date)
    const t = translations[language]

    const variantProps = {
        data,
        t,
        language,
        date: data.date,
        lat,
        lon,
        timezone,
        theme,
    }

    switch (variant) {
        case 'gauge':
            return <GaugeWidget {...variantProps} />
        case 'grid':
            return <GridWidget {...variantProps} />
        case 'card':
            return <CardWidget {...variantProps} />
        case 'timeline':
            return <TimelineWidget {...variantProps} />
        case 'detail':
            return <DetailWidget {...variantProps} />
        case 'panel':
            return <PanelWidget {...variantProps} />
        case 'live':
            return <LiveWidget {...variantProps} isLive={!date} />
        case 'compact':
        default:
            return <CompactWidget {...variantProps} />
    }
}

export default MoonWidget
