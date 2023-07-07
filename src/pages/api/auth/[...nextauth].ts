import { NextApiHandler } from 'next'
import NextAuth, { CallbacksOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import { User } from '@prisma/client'
import prisma from '@/functions/libs/prisma'
import { stripe } from '@/functions/libs/stripe'

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  pages: {
    signIn: '/auth/login'
  },
  callbacks: {
    async signIn({ user }: any) {
      const { id, email, name, customerId } = user as User

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
            name: stripe_customer.name ?? name ?? '',
            phone: stripe_customer.phone ?? '',
            user: { connect: { id } }
          }
        })
        // NOTE:prismaのuserモデルのcustomerIdを保存する
        const update_user = await prisma.user.update({
          where: { email },
          data: { customerId: stripe_customer.id }
        })
      }
      return true
    }
  }
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler
