import React, { useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js'

import imageMoon from './moon_image.png'
import {
degToRad,     forceNumber, formatInterval,
getPercentIlluminated,
getPhaseSlot, getTimeSinceNewMoon,     roundToOnePlace} from './utils'

interface MoonPhaseViewProps {
    moonPhase: number
    onMoonPhaseUpdate: (newPhase: number) => void
}

export const MoonPhaseView: React.FC<MoonPhaseViewProps> = ({ moonPhase, onMoonPhaseUpdate }) => {
    const containerRef = useRef(null)
    const moonSpriteRef = useRef(null)
    const hiddenMoonRef = useRef(null)
    const leftShadeRef = useRef(null)
    const rightShadeRef = useRef(null)

    const center = { x: 180 / 2, y: 180 / 2 }
    const radius = 90

    const width = center.x * 2
    const height = center.y * 2

    const convertPhase = (phaseRad: number): number => {
        const phase = (phaseRad - Math.PI) / (Math.PI * 2)
        if (phase > 1) {
            return 0
        }
        if (phase < 0) {
            return phase + 1
        }
        return phase
    }

    const drawPhase = (leftShade: any, rightShade: any, hiddenMoon: any, phase: any) => {
        if (phase <= 0.5) {
            const scale = 1 - (phase * 4)
            leftShade.scale.x = 1
            leftShade.x = 0
            rightShade.scale.x = scale
            rightShade.x = center.x - (scale * center.x)

            if (phase > 0.25) {
                hiddenMoon.mask = rightShade
                hiddenMoon.visible = true
            } else if (phase < -0.25) {
                hiddenMoon.mask = leftShade
                hiddenMoon.visible = true
            } else {
                hiddenMoon.mask = null
                hiddenMoon.visible = false
            }
        } else {
            const scale = -phase * 4 + 3
            rightShade.scale.x = 1
            rightShade.x = 0

            if (phase < 0.75) {
                hiddenMoon.mask = leftShade
                hiddenMoon.visible = true
                leftShade.scale.x = -scale
                leftShade.x = center.x - (-scale * center.x)
            } else {
                hiddenMoon.mask = null
                hiddenMoon.visible = false
                leftShade.scale.x = -scale
                leftShade.x = center.x - (-scale * center.x)
                rightShade.scale.x = 1
                rightShade.x = 0
            }
        }
    }

    useEffect(() => {
        const app = new PIXI.Application()

        const setup = async () => {
            await app.init({
                width,
                height,
                antialias: true,
                backgroundAlpha: 0,
                resolution: 1,
                view: document.createElement('canvas')
            })

            if (containerRef.current) {
                containerRef.current.appendChild(app.canvas)
            }

            const texture = await PIXI.Assets.load(imageMoon)
            const moon = new PIXI.Sprite(texture)
            moon.width = width
            moon.height = height
            app.stage.addChild(moon)
            // @ts-ignore
            moonSpriteRef.current = moon

            const leftShade = new PIXI.Graphics()
            leftShade.beginFill(0x000000, 0.7)
            leftShade.arc(center.x * 2, center.y * 2, radius, Math.PI / 2, -Math.PI / 2)
            leftShade.endFill()
            leftShade.pivot.set(center.x, center.y)
            app.stage.addChild(leftShade)
            // @ts-ignore
            leftShadeRef.current = leftShade

            const rightShade = new PIXI.Graphics()
            rightShade.beginFill(0x000000, 0.7)
            rightShade.arc(center.x * 2, center.y * 2, radius, -Math.PI / 2, Math.PI / 2)
            rightShade.endFill()
            rightShade.pivot.set(center.x, center.y)
            app.stage.addChild(rightShade)
            // @ts-ignore
            rightShadeRef.current = rightShade

            const hiddenMoon = new PIXI.Sprite(texture)
            hiddenMoon.visible = false
            app.stage.addChild(hiddenMoon)
            // @ts-ignore
            hiddenMoonRef.current = hiddenMoon

            drawPhase(leftShade, rightShade, hiddenMoon, convertPhase(moonPhase))
        }

        setup()

        return () => {
            app.destroy(true)
        }
    }, [])

    useEffect(() => {
        if (
            leftShadeRef.current &&
            rightShadeRef.current &&
            hiddenMoonRef.current
        ) {
            drawPhase(
                leftShadeRef.current,
                rightShadeRef.current,
                hiddenMoonRef.current,
                convertPhase(moonPhase)
            )
        }
    }, [moonPhase])

    const handlePhaseChange = (e: any) => {
        onMoonPhaseUpdate(degToRad(forceNumber(e.target.value)))
    }

    const phaseSlot = getPhaseSlot(moonPhase)
    const timeSinceNewMoon = Math.round(getTimeSinceNewMoon(moonPhase))

    return (
        <div>
            <select className='form-select'
onChange={handlePhaseChange}
value={phaseSlot as number}>
                <option value={180}>New Moon</option>
                <option value={-135}>Waxing Crescent</option>
                <option value={-90}>First Quarter</option>
                <option value={-45}>Waxing Gibbous</option>
                <option value={0}>Full Moon</option>
                <option value={45}>Waning Gibbous</option>
                <option value={90}>Third Quarter</option>
                <option value={135}>Waning Crescent</option>
            </select>
            <div className='mt-1'
style={{ width: 180, height: 180 }}
ref={containerRef} />
            <div className='text-center'>
                {roundToOnePlace(getPercentIlluminated(moonPhase - Math.PI))}% illuminated
            </div>
            <div className='text-center'>Time since new moon:</div>
            <div className='text-center'>{formatInterval(timeSinceNewMoon)}</div>
        </div>
    )
}

export default MoonPhaseView
