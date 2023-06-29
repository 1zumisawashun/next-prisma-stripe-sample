import React, { useState, BaseSyntheticEvent } from 'react'
import Router from 'next/router'
import { Button, InputText } from '../../components/uis'

const CreateForm = () => {
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
    await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/books`, {
      method: 'POST'
    })
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
      <div>
        <Button type="button" onClick={handleSubmit}>
          create
        </Button>
      </div>
    </div>
  )
}

export default CreateForm
