import React, { useEffect } from 'react'
import clsx from 'clsx'
import styles from './modal.module.scss'
import { SizeType } from '@/functions/types/Common'
import { getSize } from '@/components/modals/useModal'

type UnstyledModalProps = {
  close: () => void
  isOpen: boolean
  children: React.ReactNode
  size?: SizeType
}

export const UnstyledModal = ({
  close,
  isOpen,
  children,
  size = 'medium'
}: UnstyledModalProps) => {
  // NOTE:最低限の背景固定ロジック
  const stopScrollingBackContent = () => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  useEffect(stopScrollingBackContent, [isOpen])

  return isOpen ? (
    <div className={styles['modal-overlay']} onClick={close} aria-hidden="true">
      <div className={clsx(styles['modal-content'], getSize(size))}>
        {children}
      </div>
    </div>
  ) : null
}
