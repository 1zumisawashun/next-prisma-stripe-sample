import styles from './loading.module.scss'

export const Loading = () => {
  return (
    <div className={styles['loading-overlay']}>
      <div className={styles['loading-wrapper']}>
        <span className={styles['loading-container']} />
      </div>
    </div>
  )
}
