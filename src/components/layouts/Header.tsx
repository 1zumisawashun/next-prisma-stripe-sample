import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { BaseButton } from '@/components'
import styles from '@/styles/components/header.module.scss'

export const Header = () => {
  const { data: session, status } = useSession()

  const items = [
    { tag: 'next-link', href: '/books', name: 'Books', isHidden: false },
    {
      tag: 'next-link',
      href: '/catalog',
      name: 'Catalog',
      isHidden: status !== 'loading' && !session
    },
    {
      tag: 'next-link',
      href: '/cart',
      name: 'Cart',
      isHidden: status !== 'loading' && !session
    },
    {
      tag: 'next-link',
      href: '/mypage',
      name: 'MyPage',
      isHidden: status !== 'loading' && !session
    },
    {
      tag: 'button',
      onClick: () => signIn(),
      name: 'LogIn',
      isHidden: status !== 'loading' && session
    }
  ] as const

  const filteredItems = items.filter((item) => !item.isHidden)

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
            {filteredItems.map((item, index) => (
              <li key={index} className={styles.menuItem}>
                <BaseButton {...item}>{item.name}</BaseButton>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
