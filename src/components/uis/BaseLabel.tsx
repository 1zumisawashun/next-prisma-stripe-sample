import { ReactNode } from 'react'

const status = {
  edit: 'cursor-pointer rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800',
  delete:
    'cursor-pointer rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800',
  increment:
    'cursor-pointer rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800',
  decrement:
    'cursor-pointer rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800',
  selected:
    'cursor-pointer rounded bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800',
  default:
    'cursor-pointer rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800'
}

export type LabelType = keyof typeof status
export const BaseLabel: React.FC<{
  children: ReactNode
  type: LabelType
}> = ({ children, type }) => {
  return <span className={status[type]}>{children}</span>
}
