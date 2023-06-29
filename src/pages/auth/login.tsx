import { getProviders, signIn } from 'next-auth/react'
import { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { Button } from '../../components/uis'

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
                    <Button
                      onClick={() =>
                        signIn(provider.id, {
                          callbackUrl: '/books'
                        })
                      }
                    >
                      Sign in with {provider.name}
                    </Button>
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
