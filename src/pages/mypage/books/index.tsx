import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { Book, User } from '@prisma/client'
import prisma from '@/functions/libs/prisma'
import { MypageBookTable } from '@/features/mypage'
import { Button } from '@/components/uis'

type Props = {
  posts: (Book & { bookmarked_users: User[] })[]
}

export default function page({ posts }: Props) {
  return (
    <div className="container mx-auto px-6 py-16">
      {posts.length !== 0 ? (
        <div className="mx-auto sm:w-8/12 lg:w-6/12 xl:w-[50%]">
          <div className="grid gap-5 overflow-x-auto">
            <h1 className="text-center text-3xl">All books you posted</h1>
            <MypageBookTable posts={posts} />
            <div className="flex justify-center gap-5">
              <Button tag="next-link" href="/mypage">
                Back
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 text-center">
          <h1 className="text-3xl">No books posted</h1>
          <div className="flex justify-center gap-5">
            <Button tag="next-link" href="/mypage/books/create">
              Post Books
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })

  if (!session) {
    res.statusCode = 401
    return { props: { books: null } }
  }

  const email = session.user?.email as string

  const data = await prisma.user
    .findUnique({
      where: {
        email
      }
    })
    .posts({
      include: { bookmarked_users: true }
    })

  // NOTE:Date型はJson化させないといけないっぽい
  const posts = JSON.parse(JSON.stringify(data))

  return {
    props: { posts }
  }
}
