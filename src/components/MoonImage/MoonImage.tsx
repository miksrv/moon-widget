import React from 'react'

import { getMoonImage, MoonImageData } from './images'

interface MoonImageProps {
    illuminationPhase: number
    zenithAngle: number
    parallacticAngle: number
}

const MoonImage: React.FC<MoonImageProps> = ({ illuminationPhase, zenithAngle, parallacticAngle }) => {
    const { moonImage, rotateDeg }: MoonImageData = getMoonImage(illuminationPhase, zenithAngle, parallacticAngle)

    return (
            <img src={moonImage}
style={{ transform: `rotate(${rotateDeg}deg)` }}
alt='Moon phase' />
    )
}

export default MoonImage
