import React, { useState } from 'react'
import Router from 'next/router'
import { getStripe } from '../../functions/libs/stripejs'
import { fetchPostJSON } from '../../functions/helpers/api-helpers'
import { formatAmountForDisplay } from '../../functions/helpers/stripe-helpers'
import * as config from '../../functions/constants/config'
import { Button, InputNumber, InputRange } from '../../components/uis'

const CreateForm = () => {
  async function handleSubmit(): Promise<void> {
    await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/books`, {
      method: 'POST'
    })
    Router.push(`/books`)
  }

  return (
    <Button type="button" onClick={() => handleSubmit()}>
      create
    </Button>
  )
}

export default CreateForm
