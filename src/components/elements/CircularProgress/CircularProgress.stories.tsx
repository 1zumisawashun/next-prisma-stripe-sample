import type { Meta, StoryObj } from '@storybook/react'

import { CircularProgress } from '@/components/elements'

const meta: Meta<typeof CircularProgress> = {
  title: 'CircularProgress',
  component: CircularProgress,
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

type Story = StoryObj<typeof CircularProgress>

export const Primary: Story = {
  args: {
    variant: 'outlined',
    theme: 'primary'
  }
}

export const Danger: Story = {
  args: {
    variant: 'outlined',
    theme: 'danger'
  }
}

export const Success: Story = {
  args: {
    variant: 'outlined',
    theme: 'success'
  }
}
