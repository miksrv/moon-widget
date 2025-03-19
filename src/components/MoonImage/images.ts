import moon_phase_1 from './images/moon_image_01.png'
import moon_phase_2 from './images/moon_image_02.png'
import moon_phase_3 from './images/moon_image_03.png'
import moon_phase_4 from './images/moon_image_04.png'
import moon_phase_5 from './images/moon_image_05.png'
import moon_phase_6 from './images/moon_image_06.png'
import moon_phase_7 from './images/moon_image_07.png'
import moon_phase_8 from './images/moon_image_08.png'
import moon_phase_9 from './images/moon_image_09.png'
import moon_phase_10 from './images/moon_image_10.png'
import moon_phase_11 from './images/moon_image_11.png'
import moon_phase_12 from './images/moon_image_12.png'
import moon_phase_13 from './images/moon_image_13.png'
import moon_phase_14 from './images/moon_image_14.png'
import moon_phase_15 from './images/moon_image_15.png'
import moon_phase_16 from './images/moon_image_16.png'
import moon_phase_17 from './images/moon_image_17.png'
import moon_phase_18 from './images/moon_image_18.png'
import moon_phase_19 from './images/moon_image_19.png'
import moon_phase_20 from './images/moon_image_20.png'
import moon_phase_21 from './images/moon_image_21.png'
import moon_phase_22 from './images/moon_image_22.png'
import moon_phase_23 from './images/moon_image_23.png'
import moon_phase_24 from './images/moon_image_24.png'
import moon_phase_25 from './images/moon_image_25.png'
import moon_phase_26 from './images/moon_image_26.png'
import moon_phase_27 from './images/moon_image_27.png'
import moon_phase_28 from './images/moon_image_28.png'
import moon_phase_29 from './images/moon_image_29.png'
import moon_phase_30 from './images/moon_image_30.png'
import moon_phase_31 from './images/moon_image_31.png'

export const MOON_IMAGES = [
    moon_phase_1,
    moon_phase_2,
    moon_phase_3,
    moon_phase_4,
    moon_phase_5,
    moon_phase_6,
    moon_phase_7,
    moon_phase_8,
    moon_phase_9,
    moon_phase_10,
    moon_phase_11,
    moon_phase_12,
    moon_phase_13,
    moon_phase_14,
    moon_phase_15,
    moon_phase_16,
    moon_phase_17,
    moon_phase_18,
    moon_phase_19,
    moon_phase_20,
    moon_phase_21,
    moon_phase_22,
    moon_phase_23,
    moon_phase_24,
    moon_phase_25,
    moon_phase_26,
    moon_phase_27,
    moon_phase_28,
    moon_phase_29,
    moon_phase_30,
    moon_phase_31
]

export type MoonImageData = {
    moonImage: string;
    rotateDeg: number;
};

export const getMoonImage = (illuminationPhase: number, zenithAngle: number, parallacticAngle: number): MoonImageData =>  {
    const phaseIndex = Math.floor(illuminationPhase * 31)
    const rotateDeg = (zenithAngle - parallacticAngle) * (180 / Math.PI)
    const moonImage = MOON_IMAGES[phaseIndex]

    return {
        moonImage,
        rotateDeg
    }
}
