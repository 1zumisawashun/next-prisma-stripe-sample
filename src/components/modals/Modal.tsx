import { SizeType } from '@/functions/types/Common'
import { UnstyledModal } from '@/components/modals/UnstyledModal'

type ModalProps = {
  close: () => void
  isOpen: boolean
  children: React.ReactNode
  size?: SizeType
}

export const Modal = ({
  close,
  isOpen,
  children,
  size = 'medium'
}: ModalProps) => {
  return (
    <UnstyledModal close={close} isOpen={isOpen} size={size}>
      {children}
    </UnstyledModal>
  )
}
