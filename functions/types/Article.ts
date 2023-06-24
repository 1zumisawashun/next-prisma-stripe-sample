import { User } from './User'

export type ArticleProps = {
  id: number
  title: string
  content: string
  users: User[]
}
