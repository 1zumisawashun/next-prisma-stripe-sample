import type { Meta, StoryObj } from '@storybook/react'

import { Button as ButtonComponent, ButtonWrapper } from '@/components/buttons'

const meta = {
  title: 'Button',
  component: ButtonComponent
}

export default meta

type Story = StoryObj<typeof ButtonComponent>

export const Button: Story = {
  render: () => (
    <>
      <ButtonWrapper>
        <ButtonComponent onClick={() => null} type="button" size="small">
          small
        </ButtonComponent>
        <ButtonComponent onClick={() => null} type="button" size="medium">
          medium
        </ButtonComponent>
        <ButtonComponent onClick={() => null} type="button" size="large">
          large
        </ButtonComponent>
      </ButtonWrapper>
      <ButtonWrapper>
        <ButtonComponent onClick={() => null} type="button" size="small">
          small
        </ButtonComponent>
        <ButtonComponent onClick={() => null} type="button" size="medium">
          medium
        </ButtonComponent>
        <ButtonComponent onClick={() => null} type="button" size="large">
          large
        </ButtonComponent>
      </ButtonWrapper>
    </>
  )
}
