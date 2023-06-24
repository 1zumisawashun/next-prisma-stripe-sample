import { getProviders, signIn } from 'next-auth/react'
import { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'

const login = ({
  // ここで型を定義しています
  providers
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="flex flex-col items-center space-y-20 pt-40">
      <Image
        src="/github-icon.png"
        width={150}
        height={150}
        objectFit="contain"
        alt=""
      />
      <div className="text-center ">
        <div className="mx-auto max-w-3xl">
          <div className="flexjustify-center">
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <div key={provider.name}>
                    <button
                      type="button"
                      className="group relative inline-flex items-center justify-start overflow-hidden rounded bg-white px-6 py-3 font-medium transition-all hover:bg-white"
                      // このボタンを押すと GitHub による認証が行われます
                      // また、認証後のリダイレクト先をルートパスに設定しています
                      // リダイレクト先については後ほど変更します
                      onClick={() =>
                        signIn(provider.id, {
                          callbackUrl: '/articles'
                        })
                      }
                    >
                      <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded bg-slate-800 transition-all duration-500 ease-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0" />
                      <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                        Sign in with {provider.name}
                      </span>
                    </button>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default login

export const getServerSideProps = async () => {
  // ここで、認証の方法を取得しています
  // 今回は、GitHub による認証だけですが、複数の認証方法（Google・Twitterなど）を取得することが出来ます
  const providers = await getProviders()
  return {
    props: { providers }
  }
}
