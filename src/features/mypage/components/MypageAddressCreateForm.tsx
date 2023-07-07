import React, { useState, BaseSyntheticEvent } from 'react'
import Router from 'next/router'
import { Button, InputText } from '@/components/uis'
import { fetchPostJSON } from '@/functions/helpers/api-helpers'

export const MypageAddressCreateForm = () => {
  const [address, setAddress] = useState({
    postal_code: '',
    state: '',
    city: '',
    line1: '',
    line2: ''
  })
  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target
    setAddress((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleSubmit = async (): Promise<void> => {
    const response = await fetchPostJSON(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/mypage/address/create`,
      address
    )
    console.log(response)
    Router.push(`/mypage/address`)
  }

  return (
    <div className="container mx-auto grid gap-4 px-6 py-16">
      <InputText
        name="postal_code"
        value={address.postal_code}
        onChange={handleChange}
        placeholder="address.postal_code"
      />
      <InputText
        name="state"
        value={address.state}
        onChange={handleChange}
        placeholder="address.state"
      />
      <InputText
        name="city"
        value={address.city}
        onChange={handleChange}
        placeholder="address.city"
      />
      <InputText
        name="line1"
        value={address.line1}
        onChange={handleChange}
        placeholder="address.line1"
      />
      <InputText
        name="line2"
        value={address.line2}
        onChange={handleChange}
        placeholder="address.line2"
      />
      <div>
        <Button type="button" onClick={handleSubmit}>
          create
        </Button>
      </div>
    </div>
  )
}
