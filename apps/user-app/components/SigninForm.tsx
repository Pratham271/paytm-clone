"use client"
import { Button } from '@repo/ui/button'
import { TextInput } from '@repo/ui/text-input'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SigninForm = () => {
    const [number,setNumber] = useState("")
    const [password,setPassword] = useState("")
    const router = useRouter();
  return (
    <div className='flex flex-col justify-center h-screen'>
         <h1 className='text-center pb-10 text-3xl font-bold text-[#6a51a6]'>Welcome Back</h1>
    <div className='flex justify-center'>
        <div className='w-96 rounded-md bg-white p-3'>
            <TextInput label='Number' onChange={(e)=> setNumber(e.target.value)}  placeholder='9876543210'/>
            <TextInput label='Password' onChange={(e)=> setPassword(e.target.value)}  placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'/>
            <div className='mt-3'>
            <Button onClick={async()=> {
                const res = await signIn('credentials', {
                    phone:number,
                    password,
                    redirect: false
                })
                if(res?.status===200){
                    router.push("/dashboard")
                }
                else{
                    alert("Wrong Credentials")
                }
            }}>Sign In</Button>
            </div>
        </div>
    </div>  
    <p className='text-center mt-3'>Don&apos;t have an account? <a href="/signup" className='underline text-stone-600'>Signup</a></p>
</div>
  )
}

export default SigninForm
