import clsx from 'clsx'
import styles from './button.module.scss'
import { getPosition, PositionType } from './useButton'

type ButtonWrapperProps = {
  children: React.ReactNode
  position?: PositionType
}
export const ButtonWrapper = ({ children, position }: ButtonWrapperProps) => {
  return (
    <div className={clsx(styles['button-wrapper'], getPosition(position))}>
      {children}
    </div>
  )
}
