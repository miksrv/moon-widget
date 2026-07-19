import React, { useEffect, useRef } from 'react'

import * as PIXI from 'pixi.js'

import imageMoon from './moon_image.png'

export interface MoonViewProps {
    /** 0 = new moon, 0.5 = full moon, 1 = new moon (SunCalc.getMoonIllumination().phase convention) */
    phase: number
    /** Canvas size in px — the moon disc is always square. Defaults to 180. */
    size?: number
}

// The built package's `.png` loader (esbuild `dataurl`) yields a plain string, but bundlers with their
// own static-image handling (e.g. Next.js's webpack pipeline, when this source is consumed directly via
// a dev alias) yield a `{ src, width, height, ... }`-shaped object instead — normalize both to a URL string.
const imageMoonSrc =
    typeof imageMoon === 'string'
        ? imageMoon
        : (imageMoon as { src: string }).src

const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = () => resolve(image)
        image.onerror = reject
        image.src = src
    })

const drawPhase = (
    leftShade: PIXI.Graphics,
    rightShade: PIXI.Graphics,
    hiddenMoon: PIXI.Sprite,
    phase: number,
    center: number,
) => {
    if (phase <= 0.5) {
        const scale = 1 - phase * 4
        leftShade.scale.x = 1
        leftShade.x = 0
        rightShade.scale.x = scale
        rightShade.x = center - scale * center

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
            leftShade.x = center - -scale * center
        } else {
            hiddenMoon.mask = null
            hiddenMoon.visible = false
            leftShade.scale.x = -scale
            leftShade.x = center - -scale * center
            rightShade.scale.x = 1
            rightShade.x = 0
        }
    }
}

const MoonView: React.FC<MoonViewProps> = ({ phase, size = 180 }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const leftShadeRef = useRef<PIXI.Graphics | null>(null)
    const rightShadeRef = useRef<PIXI.Graphics | null>(null)
    const hiddenMoonRef = useRef<PIXI.Sprite | null>(null)
    const readyRef = useRef(false)
    const phaseRef = useRef(phase)
    const centerRef = useRef(size / 2)

    useEffect(() => {
        const app = new PIXI.Application()
        const center = size / 2
        centerRef.current = center
        let destroyed = false
        // app.destroy() touches renderer/plugin state that app.init() installs — calling it before
        // init() resolves throws (e.g. ResizePlugin's `_cancelResize` isn't defined yet). Cleanup must
        // wait for init to finish before destroying, which the `destroyed` check below handles.
        let appInitialized = false

        const setup = async () => {
            await app.init({
                width: size,
                height: size,
                antialias: true,
                backgroundAlpha: 0,
                resolution: 1,
                view: document.createElement('canvas'),
            })
            appInitialized = true

            if (destroyed) {
                app.destroy(true)
                return
            }

            containerRef.current?.appendChild(app.canvas)

            const image = await loadImage(imageMoonSrc)
            const texture = PIXI.Texture.from(image)

            const moon = new PIXI.Sprite(texture)
            moon.width = size
            moon.height = size
            app.stage.addChild(moon)

            const leftShade = new PIXI.Graphics()
            leftShade.beginFill(0x000000, 0.7)
            leftShade.arc(size, size, center, Math.PI / 2, -Math.PI / 2)
            leftShade.endFill()
            leftShade.pivot.set(center, center)
            app.stage.addChild(leftShade)
            leftShadeRef.current = leftShade

            const rightShade = new PIXI.Graphics()
            rightShade.beginFill(0x000000, 0.7)
            rightShade.arc(size, size, center, -Math.PI / 2, Math.PI / 2)
            rightShade.endFill()
            rightShade.pivot.set(center, center)
            app.stage.addChild(rightShade)
            rightShadeRef.current = rightShade

            const hiddenMoon = new PIXI.Sprite(texture)
            hiddenMoon.visible = false
            app.stage.addChild(hiddenMoon)
            hiddenMoonRef.current = hiddenMoon

            readyRef.current = true
            // read the ref, not the `phase` closure — it may have changed while the setup above was awaiting
            drawPhase(
                leftShade,
                rightShade,
                hiddenMoon,
                phaseRef.current,
                center,
            )
        }

        void setup()

        return () => {
            destroyed = true
            readyRef.current = false
            if (appInitialized) {
                app.destroy(true)
            }
        }
    }, [size])

    useEffect(() => {
        phaseRef.current = phase
        if (
            readyRef.current &&
            leftShadeRef.current &&
            rightShadeRef.current &&
            hiddenMoonRef.current
        ) {
            drawPhase(
                leftShadeRef.current,
                rightShadeRef.current,
                hiddenMoonRef.current,
                phase,
                centerRef.current,
            )
        }
    }, [phase])

    return (
        <div
            ref={containerRef}
            style={{
                width: size,
                height: size,
            }}
        />
    )
}

export default MoonView
