import React, { useState, BaseSyntheticEvent } from 'react'
import Router from 'next/router'
import { Button, InputText, AnchorButton, InputSelect } from '@/components'
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
    <div className="common-container -w576">
      <div className="gap-container">
        <InputText
          name="title"
          label="title"
          description="titletitletitletitletitle"
          error="errorerrorerrorerror"
          value={formData.title}
          onChange={handleChange}
          placeholder="formData.title"
          isRequired
        />
        <InputText
          name="content"
          label="content"
          description="contentcontentcontentcontentcontent"
          error="errorerrorerrorerror"
          value={formData.content}
          onChange={handleChange}
          placeholder="formData.content"
          isOptioned
        />
        <InputSelect
          name="category"
          label="category"
          description="categorycategorycategorycategory"
          error="errorerrorerrorerror"
          value={formData.content}
          onChange={handleChange}
          placeholder="formData.content"
          options={[
            {
              label: '匿名',
              value: '匿名'
            }
          ]}
        />
        <div className="flex-gap-container">
          <AnchorButton href="/mypage">Back</AnchorButton>
          <Button onClick={handleSubmit}>create</Button>
        </div>
      </div>
    </div>
  )
}
