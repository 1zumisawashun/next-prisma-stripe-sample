import { NextApiHandler } from 'next'
import NextAuth, { NextAuthOptions, CallbacksOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { AdapterUser } from 'next-auth/adapters'
import prisma from '@/functions/libs/prisma'
import { stripe } from '@/functions/libs/stripe'

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    // })
  ],
  adapter: {
    ...PrismaAdapter(prisma),
    createUser: async (data: any) => {
      const user = await prisma.user.create({ data })
      const { customerId, email, id } = user
      if (!customerId) {
        // NOTE:stripeアカウントを作成する
        const stripe_customer = await stripe.customers.create({ email })
        // NOTE:prismaのcustomerモデルを作成する
        const prisma_customer = await prisma.customer.create({
          data: {
            id: stripe_customer.id,
            description: stripe_customer.description,
            email: stripe_customer.email ?? email,
            metadata: {},
            name: stripe_customer.name ?? '',
            phone: stripe_customer.phone ?? '',
            user: { connect: { id } }
          }
        })
        // NOTE:prismaのuserモデルのcustomerIdを保存する
        const update_user = await prisma.user.update({
          where: { email },
          data: { customerId: stripe_customer.id }
        })
        return user as unknown as AdapterUser
      }
      return user as unknown as AdapterUser
    }
  },
  secret: process.env.SECRET,
  pages: {
    signIn: '/auth/login'
  },
  callbacks: {}
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler
