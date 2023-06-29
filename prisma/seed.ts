import { PrismaClient } from '@prisma/client'
// ここで、data/books.ts に記述したデータをインポートしています
import { books } from '../src/functions/constants/books'

const prisma = new PrismaClient()

async function main() {
  await prisma.book.createMany({
    data: books
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
