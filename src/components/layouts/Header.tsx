import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { BaseButton } from '@/components/uis'

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

  return (
    <div className="bg-gray-900">
      <div className="container mx-auto flex max-w-4xl items-center px-2 py-5">
        <div className="mx-auto flex w-full flex-wrap items-center">
          <div className="flex w-full justify-center font-extrabold text-white lg:w-1/2 lg:justify-start">
            <Link
              href="/"
              className="text-2xl text-gray-900 no-underline hover:text-gray-900 hover:no-underline"
            >
              📚 &nbsp; <span className=" text-gray-200">BooxMix</span>
            </Link>
          </div>
          <div className="flex w-full content-center justify-between pt-2 lg:w-1/2 lg:justify-end lg:pt-0">
            <ul className="flex flex-1 items-center justify-center lg:flex-none">
              {items.map((item) => (
                <li className="px-4 py-1 text-white no-underline">
                  <BaseButton {...item}>{item.name}</BaseButton>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
