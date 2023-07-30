import React, { useState, BaseSyntheticEvent } from 'react'
import Router from 'next/router'
import { Button, InputText, ButtonWrapper } from '@/components/uis'
import { fetchPostJSON } from '@/functions/helpers/api-helpers'

export const BookCreateForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })
  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleSubmit = async (): Promise<void> => {
    await fetchPostJSON(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/books/create`,
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
      <ButtonWrapper>
        <Button tag="next-link" href="/mypage">
          Back
        </Button>
        <Button tag="button" type="button" onClick={handleSubmit}>
          create
        </Button>
      </ButtonWrapper>
    </div>
  )
}
