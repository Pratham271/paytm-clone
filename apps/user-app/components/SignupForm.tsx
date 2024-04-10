"use client"
import { Button } from '@repo/ui/button'
import { TextInput } from '@repo/ui/text-input'
import React, { useState } from 'react'
import { signup } from '../app/lib/actions/user'
import { useRouter } from 'next/navigation'

const SignupForm = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [number,setNumber] = useState("")
    const [password,setPassword] = useState("")
    const router = useRouter()
  return (
    <div className='flex flex-col justify-center h-screen '>
        <h1 className='text-center pb-10 text-3xl font-bold text-[#6a51a6]'>Get Started</h1>
        <div className='flex justify-center'>
            
            <div className='bg-white p-3 rounded-md shadow-md w-96 mb-20'>
                <TextInput label='Name' onChange={(e)=> setName(e.target.value)} placeholder='John Doe'/>
                <TextInput label='Email' onChange={(e)=> setEmail(e.target.value)} placeholder='johndoe@gmail.com'/>
                <TextInput label='Phone' onChange={(e)=> setNumber(e.target.value)} placeholder='9876543210'/>
                <TextInput label='Password' onChange={(e)=> setPassword(e.target.value)} placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'/>
                <div className='pt-3'>
                <Button onClick={async()=> {
                    const res = await signup(name,email,password,number)
                    if(res?.message){
                        console.log(res.message)
                        router.push("/api/auth/signin")
                    }
                }}>Sign Up</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignupForm
