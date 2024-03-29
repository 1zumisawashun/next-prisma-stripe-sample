import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/buttons'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs']
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' }
  // }
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'contained',
    theme: 'primary',
    children: 'Button'
  }
}

export const Danger: Story = {
  args: {
    variant: 'contained',
    theme: 'danger',
    children: 'Button'
  }
}

export const Success: Story = {
  args: {
    variant: 'contained',
    theme: 'success',
    children: 'Button'
  }
}
