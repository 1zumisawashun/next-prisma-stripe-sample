import Link from 'next/link'

/* eslint-disable jsx-a11y/anchor-is-valid */
const Home = () => {
  return (
    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
      <div className="pb-12 text-center md:pb-16">
        <h1 className="leading-tighter mb-4 text-7xl font-extrabold tracking-tighter md:text-8xl">
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            BUKUMA
          </span>
        </h1>
        <div className="mx-auto max-w-3xl">
          <p className="mb-8 text-xl">Bookmark articles you like!</p>
          <div className="flexjustify-center mt-5">
            <div className="mt-3">
              <Link href="/articles" legacyBehavior>
                <a className="group inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 font-medium text-gray-900 hover:text-white focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800">
                  <span className="rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                    Find Articles!!
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
