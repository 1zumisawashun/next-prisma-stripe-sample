import { User } from './User'

export type BookProps = {
  id: number
  title: string
  content: string
  bookmarked_users: User[]
}
