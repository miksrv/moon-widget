import React from 'react'

import type { MajorPhaseKey } from '../../hooks/useMoonData'

export interface PhaseTimelineNode {
    key: MajorPhaseKey
    label: string
    date: string
    active?: boolean
}

export interface PhaseTimelineProps {
    nodes: PhaseTimelineNode[]
}

const PhaseTimeline: React.FC<PhaseTimelineProps> = ({ nodes }) => (
    <div className="moon-widget__timeline">
        <div className="moon-widget__timeline-line" />
        {nodes.map((node) => (
            <div
                key={node.key}
                className={`moon-widget__timeline-node${node.active ? ' moon-widget__timeline-node--active' : ''}`}
            >
                <span className="moon-widget__timeline-label">
                    {node.label}
                </span>
                <span className="moon-widget__timeline-dot" />
                <span className="moon-widget__timeline-date">{node.date}</span>
            </div>
        ))}
    </div>
)

export default PhaseTimeline
