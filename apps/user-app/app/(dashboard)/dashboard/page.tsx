"use server"
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../lib/auth'
import prisma from '@repo/db/client'
const page = async() => {
  const session = await getServerSession(authOptions)
  const balanceHistory = await prisma.balanceHistory.findMany({
    where: {
      userId: Number(session?.user?.id)
    }
  })
  console.log(balanceHistory)
  return (
    <div className='pt-6 text-[#6a51a6] font-semibold text-3xl'>
      Hello {session?.user?.name[0].toUpperCase()+ session?.user?.name?.slice(1)}
    </div>
  )
}


export default page
