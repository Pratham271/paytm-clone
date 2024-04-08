"use client"
import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { TextInput } from '@repo/ui/text-input'
import React, { useState } from 'react'

const SendCard = () => {
    const [number,setNumber] = useState("")
    const [amount,setAmount] = useState<Number>(0)
  return (
    <Card title='Send'>
      <div>
        <TextInput label='Number' onChange={(e)=> setNumber(e.target.value)} placeholder=''/>
      </div>
      <div>
        <TextInput label='Amount' onChange={(e)=> setAmount(Number(e.target.value)*100)} placeholder=''/>
      </div>
      <div className='mt-3 text-center'>
        <Button onClick={()=> {
            console.log(number)
            console.log(amount)
        }}>
            Send
        </Button>
      </div>
    </Card >
  )
}

export default SendCard
