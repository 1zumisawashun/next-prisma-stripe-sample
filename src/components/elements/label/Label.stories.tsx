import type { Meta, StoryObj } from '@storybook/react'

import { Label as LabelComponent } from '@/components/elements'

const meta = {
  title: 'Button',
  component: LabelComponent
}

export default meta

type Story = StoryObj<typeof LabelComponent>

export const Label: Story = {
  render: () => (
    <>
      <LabelComponent variant="delete">delete</LabelComponent>
      <LabelComponent variant="increment">increment</LabelComponent>
      <LabelComponent variant="selected">selected</LabelComponent>
    </>
  )
}
