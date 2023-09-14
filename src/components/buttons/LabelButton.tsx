import { LinkProps } from 'next/link'
import { ReactNode, ComponentProps } from 'react'
import { Label } from '../elements/label/Label'
import { LabelVariantType } from '../elements/label/useLabel'
import { UnstyledButton, UnstyledButtonAnchor } from './UnstyledButton'

type LabelButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
  variant: LabelVariantType
} & ComponentProps<'button'>
type LabelButtonAnchorProps = {
  children: ReactNode
  variant: LabelVariantType
} & LinkProps

export const LabelButton = ({
  type,
  variant,
  children,
  ...props
}: LabelButtonProps) => {
  return (
    <UnstyledButton {...props} type="button">
      <Label variant={variant}>{children}</Label>
    </UnstyledButton>
  )
}

export const LabelButtonAnchor = ({
  variant,
  children,
  ...props
}: LabelButtonAnchorProps) => {
  return (
    <UnstyledButtonAnchor {...props}>
      <Label variant={variant}>{children}</Label>
    </UnstyledButtonAnchor>
  )
}
