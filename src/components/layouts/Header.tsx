import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

/* eslint-disable jsx-a11y/anchor-is-valid */
export const Header = () => {
  const { data: session, status } = useSession()
  return (
    <div className="bg-gray-900">
      <div className="container mx-auto flex max-w-4xl items-center px-2 py-5">
        <div className="mx-auto flex w-full flex-wrap items-center">
          <div className="flex w-full justify-center font-extrabold text-white lg:w-1/2 lg:justify-start">
            <Link href="/" legacyBehavior>
              <a className="text-2xl text-gray-900 no-underline hover:text-gray-900 hover:no-underline">
                📚 &nbsp; <span className=" text-gray-200">BooxMix</span>
              </a>
            </Link>
          </div>
          <div className="flex w-full content-center justify-between pt-2 lg:w-1/2 lg:justify-end lg:pt-0">
            <ul className="flex flex-1 items-center justify-center lg:flex-none">
              <li className="px-4 py-1 text-white no-underline">
                <Link href="/books" legacyBehavior>
                  <a>Books</a>
                </Link>
              </li>
              <li className="px-4 py-1 text-white no-underline">
                <Link href="/catalog" legacyBehavior>
                  <a>Catalog</a>
                </Link>
              </li>
              {status !== 'loading' && session && (
                <>
                  <li className="px-4 py-1 text-white no-underline">
                    <Link href="/cart" legacyBehavior>
                      <a>Cart</a>
                    </Link>
                  </li>
                  <li className="px-4 py-1 text-white no-underline">
                    <Link href="/mypage" legacyBehavior>
                      <a>MyPage</a>
                    </Link>
                  </li>
                </>
              )}
              {status !== 'loading' && !session && (
                <li className="px-4 py-1 text-white no-underline">
                  <button type="button" onClick={() => signIn()}>
                    <a>Log in</a>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
