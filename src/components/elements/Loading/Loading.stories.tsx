import type { Meta, StoryObj } from '@storybook/react'

import { Loading as LoadingComponent } from '@/components/elements'

const meta = {
  title: 'Loading',
  component: LoadingComponent
}

export default meta

type Story = StoryObj<typeof LoadingComponent>

export const Loading: Story = {
  render: () => <LoadingComponent />
}
