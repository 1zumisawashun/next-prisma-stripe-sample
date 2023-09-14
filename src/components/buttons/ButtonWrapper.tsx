import styles from '@/styles/components/button.module.scss'

export const ButtonWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.buttonWrapper}>{children}</div>
}
