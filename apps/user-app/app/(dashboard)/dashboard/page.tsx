"use server"
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../lib/auth'

const page = async() => {
  const session = await getServerSession(authOptions)

  return (
    <div className='pt-6 text-[#6a51a6] font-semibold text-3xl'>
      Hello {session?.user?.name[0].toUpperCase()+ session?.user?.name?.slice(1)}
    </div>
  )
}


export default page
