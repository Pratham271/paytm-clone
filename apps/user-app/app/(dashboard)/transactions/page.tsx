"use server"
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../lib/auth'
import prisma from '@repo/db/client'
import P2pTransactions from '../../../components/P2pTransactions'

async function getP2pTransactions(){
  const session = await getServerSession(authOptions)
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        {
          fromUserId: Number(session?.user?.id)
        },
        {
          toUserId: Number(session?.user?.id)
        }
      ]
    },
    include: {
      toUser:true
    }
  })
  return txns.map(t => ({
    amount: t.amount,
    time: t.timeStamp,
    to: t.toUser.name,
    transactionType: t.fromUserId == session?.user?.id ? "Paid": "Recieved"
  }))
}
const page = async() => {
  const transactions = await getP2pTransactions()
  return (
    <div className='p-6 w-full '>
       <P2pTransactions transactions={transactions}/>
    </div>
  )
}

export default page
