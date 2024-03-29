import React, { useState, BaseSyntheticEvent } from 'react'
import Router from 'next/router'
import { Button, InputText, AnchorButton } from '@/components'
import { fetchPutJSON } from '@/functions/helpers/api-helpers'
import { BookProps } from '@/functions/types/Book'

type Props = {
  book: BookProps
}
export const BookEditForm: React.FC<Props> = ({ book }) => {
  const [formData, setFormData] = useState({
    title: book.title,
    content: book.content
  })

  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (): Promise<void> => {
    await fetchPutJSON(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/books/edit/${book.id}`,
      formData
    )
    Router.push(`/mypage/books`)
  }

  return (
    <div className="container mx-auto grid gap-4 px-6 py-16">
      <InputText
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="formData.title"
      />
      <InputText
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="formData.content"
      />
      <div className="flex-gap-container">
        <AnchorButton href="/mypage">Back</AnchorButton>
        <Button onClick={handleSubmit}>edit</Button>
      </div>
    </div>
  )
}
