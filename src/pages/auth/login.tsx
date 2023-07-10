import { getProviders, signIn } from 'next-auth/react'
import { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { Fragment } from 'react'
import { Button } from '@/components/uis'

export default function page({
  providers
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const login = async (providerId: string) => {
    const params = { callbackUrl: '/' }
    const response = await signIn(providerId, params)
    console.log(response)
  }

  return (
    <div className="flex flex-col items-center space-y-10 pt-40">
      <Image src="/github-icon.png" width={100} height={100} alt="" />
      <div className="text-center ">
        <div className="mx-auto max-w-3xl">
          <div className="flex justify-center">
            {providers &&
              Object.values(providers).map((provider) => (
                <Fragment key={provider.name}>
                  <Button onClick={() => login(provider.id)}>
                    Sign in with {provider.name}
                  </Button>
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: { providers }
  }
}
