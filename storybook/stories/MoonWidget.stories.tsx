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
        timezone: { control: 'text' }
    }
} as Meta

const Template: StoryFn<MoonWidgetProps> = (args) => <MoonWidget {...args} />

export const Default = Template.bind({})
Default.args = {
    lat: 51.5074,
    lon: -0.1278,
    date: new Date().toISOString(),
    timezone: 'UTC'
}

export const CustomDate = Template.bind({})
CustomDate.args = {
    lat: 51.5074,
    lon: -0.1278,
    date: '2023-12-25T00:00:00Z',
    timezone: 'UTC'
}
