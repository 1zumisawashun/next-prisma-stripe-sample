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
    <div className="gap-container">
      <ButtonWrapper>
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
      </ButtonWrapper>

      <ButtonWrapper>
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
      </ButtonWrapper>

      <ButtonWrapper>
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="small"
          color="danger"
          variant="contained"
        >
          small
        </ButtonComponent>
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="medium"
          color="danger"
          variant="contained"
        >
          medium
        </ButtonComponent>
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="large"
          color="danger"
          variant="contained"
        >
          large
        </ButtonComponent>
      </ButtonWrapper>

      <ButtonWrapper>
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="small"
          color="danger"
          variant="outlined"
        >
          small
        </ButtonComponent>
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="medium"
          color="danger"
          variant="outlined"
        >
          medium
        </ButtonComponent>
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="large"
          color="danger"
          variant="outlined"
        >
          large
        </ButtonComponent>
      </ButtonWrapper>

      <ButtonWrapper>
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="small"
          color="success"
          variant="contained"
        >
          small
        </ButtonComponent>
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="medium"
          color="success"
          variant="contained"
        >
          medium
        </ButtonComponent>
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="large"
          color="success"
          variant="contained"
        >
          large
        </ButtonComponent>
      </ButtonWrapper>

      <ButtonWrapper>
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="small"
          color="success"
          variant="outlined"
        >
          small
        </ButtonComponent>
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="medium"
          color="success"
          variant="outlined"
        >
          medium
        </ButtonComponent>
        <ButtonComponent
          onClick={() => null}
          type="button"
          size="large"
          color="success"
          variant="outlined"
        >
          large
        </ButtonComponent>
      </ButtonWrapper>
    </div>
  )
}
