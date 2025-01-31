import React, { useEffect, useRef } from 'react'

import imageSrc from './moon.png'

interface MoonPhaseImageProps {
    phase: number; // 0 (новолуние) → 1 (новолуние), 0.5 - полнолуние
    shadowIntensity?: number; // Интенсивность тени (0.0 - 1.0)
    shadowSpread?: number; // Размытие границы тени (0.0 - 1.0)
}

const MoonPhaseImage: React.FC<MoonPhaseImageProps> = ({ phase, shadowIntensity = 0.8, shadowSpread = 0.3 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) {return}
        const ctx = canvas.getContext('2d')
        if (!ctx) {return}

        const img = new Image()
        img.src = imageSrc
        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height

            // Отображаем Луну
            ctx.drawImage(img, 0, 0, img.width, img.height)

            // Преобразуем фазу Луны к правильному диапазону
            const adjustedPhase = Math.abs(phase - 0.5) // 0 -> 0.5 (новолуние), 0.5 -> 0 (полнолуние), 1 -> 0.5 (новолуние)

            // Если полнолуние (adjustedPhase = 0) — тени нет
            if (adjustedPhase === 0) {return}

            // Если новолуние (adjustedPhase = 0.5) — Луна полностью затемнена
            ctx.globalCompositeOperation = 'source-atop'
            if (adjustedPhase === 0.5) {
                ctx.fillStyle = `rgba(0, 0, 0, ${shadowIntensity})`
                ctx.fillRect(0, 0, img.width, img.height)
                ctx.globalCompositeOperation = 'source-over'
                return
            }

            // Градиентная тень
            const gradient = ctx.createLinearGradient(0, 0, img.width, 0)

            const darkShadow = `rgba(0, 0, 0, ${shadowIntensity})` // Максимальная тень
            const midShadow = `rgba(0, 0, 0, ${shadowIntensity * 0.6})` // Средняя тень
            const lightShadow = 'rgba(0, 0, 0, 0)' // Плавный переход

            let transitionStart; let transitionEnd

            if (phase < 0.5) {
                // Растущая Луна (тень уходит справа налево)
                const visibleFraction = phase * 2 // От 0 (новолуние) до 1 (полнолуние)
                transitionStart = Math.max(0, 1 - visibleFraction - shadowSpread)
                transitionEnd = Math.min(1, 1 - visibleFraction + shadowSpread)

                gradient.addColorStop(0, darkShadow)
                gradient.addColorStop(transitionStart, midShadow)
                gradient.addColorStop(transitionEnd, lightShadow)
                gradient.addColorStop(1, lightShadow)
            } else {
                // Убывающая Луна (тень появляется справа налево)
                const shadowFraction = (1 - phase) * 2 // Инвертируем фазу, чтобы тень увеличивалась с правого края
                transitionStart = Math.max(0, shadowFraction - shadowSpread)
                transitionEnd = Math.min(1, shadowFraction + shadowSpread)

                gradient.addColorStop(0, lightShadow)
                gradient.addColorStop(transitionStart, lightShadow)
                gradient.addColorStop(transitionEnd, midShadow)
                gradient.addColorStop(1, darkShadow)
            }

            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, img.width, img.height)
            ctx.globalCompositeOperation = 'source-over'
        }
    }, [phase, shadowIntensity, shadowSpread])

    return <canvas ref={canvasRef} />
}

export default MoonPhaseImage
