import { PrismaClient } from '@prisma/client'
import { books } from '../src/functions/constants/books'

const prisma = new PrismaClient()

async function main() {
  // NOTE:dbにuserがいる前提でseedする
  const user = await prisma.user.findUnique({
    where: {
      email: 'shun.1zumisawa@gmail.com'
    }
  })
  if (!user) throw new Error()

  const newBooks = books.map((book) => {
    return {
      ...book,
      posted_user: {
        connect: { id: user.id }
      }
    }
  })

  /* eslint-disable*/
  for (const newBook of newBooks) {
    await prisma.book.create({
      data: newBook
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
