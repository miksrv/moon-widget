import { render, screen } from '@testing-library/react'

import { MoonWidget } from './index'

jest.mock('pixi.js', () => {
    class MockGraphics {
        public scale = { x: 1 }
        public x = 0
        public pivot = { set: jest.fn() }
        public mask: unknown = null
        public visible = true
        public beginFill() {
            return this
        }
        public arc() {
            return this
        }
        public endFill() {
            return this
        }
    }

    class MockSprite {
        public width = 0
        public height = 0
        public visible = true
        public mask: unknown = null
    }

    class MockApplication {
        public canvas = document.createElement('canvas')
        public stage = { addChild: jest.fn() }
        public async init() {
            return undefined
        }
        public destroy = jest.fn()
    }

    return {
        Application: MockApplication,
        Graphics: MockGraphics,
        Sprite: MockSprite,
        Texture: { from: jest.fn(() => ({})) },
    }
})

// jsdom never fires real image load events — fake it so MoonView's loadImage() resolves.
class MockImage {
    public onload: (() => void) | null = null
    public set src(_value: string) {
        setTimeout(() => this.onload?.(), 0)
    }
}
;(global as unknown as { Image: unknown }).Image = MockImage

describe('MoonWidget', () => {
    it('renders the widget and its translated labels', async () => {
        render(<MoonWidget lat={51.76712} lon={55.09785} date="2025-02-21" />)

        expect(await screen.findByText('Age')).toBeInTheDocument()
        expect(screen.getByText('Illumination')).toBeInTheDocument()
    })
})
