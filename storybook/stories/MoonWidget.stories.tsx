import React from 'react'

import MoonWidget, { MoonWidgetProps } from '../../src/MoonWidget'

import { Meta, StoryFn } from '@storybook/react'

export default {
    title: 'Example/MoonWidget',
    component: MoonWidget,
    argTypes: {
        lat: { control: 'number' },
        lon: { control: 'number' },
        date: { control: 'date' },
        timezone: { control: 'text' },
        variant: {
            control: {
                type: 'select',
                options: ['vertical', 'horizontal']
            }
        },
        language: {
            control: {
                type: 'select',
                options: ['en', 'ru']
            }
        }
    }
} as Meta

const Template: StoryFn<MoonWidgetProps> = (args) => (
    <div style={{ width: 'auto' }}>
        <MoonWidget {...args} />
    </div>
)

export const Default = Template.bind({})
Default.args = {
    lat: 37.695637,
    lon: -121.9214582,
    date: new Date().toISOString(),
    // timezone: 'UTC',
    language: 'ru',
    variant: 'horizontal'
}

export const CustomDate = Template.bind({})
CustomDate.args = {
    lat: 37.695637,
    lon: -121.9214582,
    date: '2023-12-25T00:00:00Z',
    timezone: 'UTC',
    language: 'en',
    variant: 'vertical'
}
