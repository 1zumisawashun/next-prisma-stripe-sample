import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { UnstyledButton, UnstyledButtonAnchor } from '@/components'
import styles from './header.module.scss'

const Logo = () => {
  return (
    <svg
      className={styles.svg}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <path
          d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
          fill="#FFF"
        />
        <path
          d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
          fill="#84bcb4"
        />
        <path
          d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
          fill="#aad1cb"
        />
      </g>
    </svg>
  )
}
export const Header = () => {
  const { data: session } = useSession()

  return (
    <header>
      <div className={styles.header}>
        <div>
          <UnstyledButtonAnchor href="/">
            <Logo />
          </UnstyledButtonAnchor>
          <h1 className={styles.headline}>BooxMix</h1>
        </div>
        <div className="flex-gap-container">
          {session ? (
            <>
              <UnstyledButtonAnchor href="/books">
                <span className={styles['header-item']}>Books</span>
              </UnstyledButtonAnchor>
              <UnstyledButtonAnchor href="/catalog">
                <span className={styles['header-item']}>Catalog</span>
              </UnstyledButtonAnchor>
              <UnstyledButtonAnchor href="/cart">
                <span className={styles['header-item']}>Cart</span>
              </UnstyledButtonAnchor>
              <UnstyledButtonAnchor href="/mypage">
                <span className={styles['header-item']}>Mypage</span>
              </UnstyledButtonAnchor>
            </>
          ) : (
            <>
              <UnstyledButtonAnchor href="/books">
                <span className={styles['header-item']}>Books</span>
              </UnstyledButtonAnchor>
              <UnstyledButton onClick={() => signIn()}>
                <span className={styles['header-item']}>LogIn</span>
              </UnstyledButton>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
