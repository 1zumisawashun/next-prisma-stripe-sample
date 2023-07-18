import styles from '@/styles/components/modal.module.scss'

type ModalProps = {
  header?: JSX.Element | string
  body?: JSX.Element | string
  footer?: JSX.Element | string
  close: () => void
}
export const Modal: React.FC<ModalProps> = ({
  header,
  body,
  footer,
  close
}) => {
  return (
    <>
      <div className={styles.modal} onClick={close} aria-hidden="true">
        <div className={styles.inner}>
          {/*content*/}
          <div className={styles.content}>
            {/*header*/}
            <div className={styles.header}>
              <h3>{header}</h3>
            </div>
            {/*body*/}
            <div className={styles.body}>
              <p>{body}</p>
            </div>
            {/*footer*/}
            <div className={styles.footer}>{footer}</div>
          </div>
        </div>
      </div>
      <div className={styles.backdrop} />
    </>
  )
}
