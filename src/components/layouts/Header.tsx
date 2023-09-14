import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { UnstyledButton, UnstyledButtonAnchor } from '@/components'
import styles from './header.module.scss'

export const Header = () => {
  const { data: session, status } = useSession()

  /* eslint-disable react/no-array-index-key */
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            📚 &nbsp; <span className={styles.logoText}>BooxMix</span>
          </Link>
        </div>
        <div className={styles.menu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <UnstyledButtonAnchor href="/books">Books</UnstyledButtonAnchor>
              {session ? (
                <>
                  <UnstyledButtonAnchor href="/catalog">
                    Catalog
                  </UnstyledButtonAnchor>
                  <UnstyledButtonAnchor href="/cart">Cart</UnstyledButtonAnchor>
                  <UnstyledButtonAnchor href="/mypage">
                    MyPage
                  </UnstyledButtonAnchor>
                </>
              ) : (
                <UnstyledButton onClick={() => signIn()}>LogIn</UnstyledButton>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
