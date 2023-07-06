import { getProviders, signIn } from 'next-auth/react'
import { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { Button } from '@/components/uis'

export default function page({
  providers
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const login = async (providerId: string) => {
    const params = { callbackUrl: '/books' }
    const res = await signIn(providerId, params)
    console.log(res)
  }
  return (
    <div className="flex flex-col items-center space-y-20 pt-40">
      <Image src="/github-icon.png" width={150} height={150} alt="" />
      <div className="text-center ">
        <div className="mx-auto max-w-3xl">
          <div className="flex justify-center">
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <div key={provider.name}>
                    <Button onClick={() => login(provider.id)}>
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

export const getServerSideProps = async () => {
  // ここで、認証の方法を取得しています
  // 今回は、GitHub による認証だけですが、複数の認証方法（Google・Twitterなど）を取得することが出来ます
  const providers = await getProviders()
  return {
    props: { providers }
  }
}
