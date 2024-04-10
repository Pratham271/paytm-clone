"use server"
import React from 'react'
import SendCard from '../../../components/SendCard'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../lib/auth'

const page = async() => {
  const session = await getServerSession(authOptions)
  if(!session?.user){
    redirect("/signup")
  }
  return (
    <div className='w-96 flex flex-col justify-center mx-auto'>
        <SendCard/>
    </div>
  )
}

export default page
