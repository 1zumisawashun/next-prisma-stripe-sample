import { ReactNode } from 'react'
import Link from 'next/link'
import styles from '@/styles/components/button.module.scss'

type ButtonLinkProps = {
  href: string
  children: ReactNode
}

/* eslint-disable jsx-a11y/anchor-is-valid */
export const ButtonLink: React.FC<ButtonLinkProps> = ({ href, children }) => {
  return (
    <Link href={href} legacyBehavior>
      <a className={styles.button}>
        <span>{children}</span>
      </a>
    </Link>
  )
}
