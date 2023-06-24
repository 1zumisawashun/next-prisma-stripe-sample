import { PrismaClient } from '@prisma/client'
// ここで、data/articles.ts に記述したデータをインポートしています
import { articles } from '../src/functions/constants/articles'

const prisma = new PrismaClient()

async function main() {
  await prisma.article.createMany({
    data: articles
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
