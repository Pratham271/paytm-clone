"use client"
import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { TextInput } from '@repo/ui/text-input'
import React, { useState } from 'react'
import { p2pTransfer } from '../app/lib/actions/p2pTransfer'
import { useRouter } from 'next/navigation'

const SendCard = () => {
    const [number,setNumber] = useState("")
    const [amount,setAmount] = useState("")
    const router = useRouter()

    async function handleSubmit(){
        const response = await p2pTransfer(number,Number(amount)*100)
        if(response?.message){
          alert(response.message)
        }
        else{
          setAmount("")
          setNumber("")
          router.push("/transfer")
        }
    }
  return (
   <div className='h-[50vh] p-3'>
     <Card title='Send'>
      <div className='min-w-72 pt-2'>
        <TextInput label='Number' onChange={(e)=> setNumber(e.target.value)} placeholder=''/>
        <TextInput label='Amount' onChange={(e)=> setAmount(e.target.value)} placeholder=''/>
      </div>
      <div className='mt-3 text-center'>
        <Button onClick={handleSubmit}>
            Send
        </Button>
      </div>
    </Card >
   </div>
  )
}

export default SendCard
