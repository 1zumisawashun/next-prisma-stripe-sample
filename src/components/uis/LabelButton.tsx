import { ReactNode } from 'react'
import { BaseLabel, LabelType } from './BaseLabel'

export const LabelButton: React.FC<{
  children: ReactNode
  type: LabelType
  onClick: () => void
}> = ({ children, type, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      <BaseLabel type={type}>{children}</BaseLabel>
    </button>
  )
}
