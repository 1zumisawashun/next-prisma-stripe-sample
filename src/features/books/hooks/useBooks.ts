import Router from 'next/router'
import { Book } from '@prisma/client'

export const useBooks = () => {
  const addBookmark = async (id: number): Promise<void> => {
    await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/bookmark/add/${id}`,
      {
        method: 'PUT'
      }
    )
    Router.push(`/books/${id}`)
  }

  const removeBookmark = async (id: number): Promise<void> => {
    await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/bookmark/remove/${id}`,
      {
        method: 'PUT'
      }
    )
    Router.push(`/books/${id}`)
  }
  const formatCartItem = (book: Book) => {
    const { id, price, title } = book
    return {
      id: String(id),
      price: price ?? 0,
      name: title,
      currency: 'JPY'
    }
  }

  return { addBookmark, removeBookmark, formatCartItem }
}
