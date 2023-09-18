import type { Meta, StoryObj } from '@storybook/react'

import { CircularProgress as CircularProgressComponent } from '@/components/elements'

const meta = {
  title: 'CircularProgress',
  component: CircularProgressComponent
}

export default meta

type Story = StoryObj<typeof CircularProgressComponent>

export const CircularProgress: Story = {
  render: () => (
    <CircularProgressComponent
      {...{ size: 'medium', color: 'primary', variant: 'outlined' }}
    />
  )
}
