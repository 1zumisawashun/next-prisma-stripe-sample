import { ReactNode } from 'react'
import { BaseLabel } from './BaseLabel'

export const LabelButton: React.FC<{
  children: ReactNode
  type: 'edit' | 'delete' | 'increment' | 'decrement'
  onClick: () => void
}> = ({ children, type, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      <BaseLabel type={type}>{children}</BaseLabel>
    </button>
  )
}
