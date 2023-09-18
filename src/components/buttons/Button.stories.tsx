import type { Meta, StoryObj } from '@storybook/react'

import { Button as ButtonComponent } from '@/components/buttons'

const meta = {
  title: 'Button',
  component: ButtonComponent
}

export default meta

type Story = StoryObj<typeof ButtonComponent>

export const Button: Story = {
  render: () => (
    <div className="gap-container">
      <div className="flex-gap-container">
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="small"
          color="primary"
          variant="contained"
        >
          small
        </ButtonComponent>
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="medium"
          color="primary"
          variant="contained"
        >
          medium
        </ButtonComponent>
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="large"
          color="primary"
          variant="contained"
        >
          large
        </ButtonComponent>
      </div>
      <div className="flex-gap-container">
        <ButtonComponent
          onClick={() => null}
          type="button"
          color="primary"
          loading
        >
          medium
        </ButtonComponent>
        <ButtonComponent
          onClick={() => null}
          type="button"
          color="primary"
          disabled
        >
          medium
        </ButtonComponent>
      </div>
      <div className="flex-gap-container">
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="small"
          color="primary"
          variant="outlined"
        >
          small
        </ButtonComponent>
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="medium"
          color="primary"
          variant="outlined"
        >
          medium
        </ButtonComponent>
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="large"
          color="primary"
          variant="outlined"
        >
          large
        </ButtonComponent>
      </div>

      <div className="flex-gap-container">
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="medium"
          color="primary"
          variant="outlined"
          loading
        >
          medium
        </ButtonComponent>
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="medium"
          color="primary"
          variant="outlined"
          disabled
        >
          medium
        </ButtonComponent>
      </div>
    </div>
  )
}
