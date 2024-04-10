"use server"
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../lib/auth'
import prisma from '@repo/db/client'
import BalanceHistoryGraph from '../../../components/BalanceHistoryGraph'
import { redirect } from 'next/navigation'

type TransactionGroup = {
  date: string;
  amount: number;
};

type TransactionData = {
  date: string;
  amount: number
}

const page = async() => {
  const session = await getServerSession(authOptions)
  if(!session?.user){
    redirect("/signup")
  }
  const balanceHistory = await prisma.balanceHistory.findMany({
    where: {
      userId: Number(session?.user?.id)
    }
  })
  const data = balanceHistory.map(b => ({
    date: b.timeStamp.toLocaleDateString(),
    amount: b.amount/100
  }))
  // console.log(data[1]?.amount)
  const groupTxns = getGroupedTransactions(data)
  const victoryData = groupTxns.map(g => ({
    x: g.date,
    y: g.amount
  }))
  return (
    <div className='pt-6 text-[#6a51a6] font-semibold text-4xl '>
      Hello {session?.user?.name[0].toUpperCase()+ session?.user?.name?.slice(1)}
      <div className='mt-28 lg:mx-60 w-[54rem] text-[#6a51a6] text-2xl text-center'>
        Your Balance History
      <BalanceHistoryGraph data={victoryData}/>
      </div>
    </div>
  )
}

function getGroupedTransactions(
  transactions: TransactionData[]
): TransactionGroup[] {
  const groupedTxs: TransactionGroup[] = [];
  const filteredTxs = transactions.filter((t) => t.date);

  for (let i = 0; i < filteredTxs.length; i++) {
    const date = formatDate(new Date(transactions[i]?.date!));
    const amount = Number(filteredTxs[i]?.amount);

    // Check if the date already exists in groupedTxs
    const existingGroup = groupedTxs.find((group) => group.date === date);
    if (!existingGroup) {
      // If the date doesn't exist, add a new entry
      groupedTxs.push({
        date,
        amount,
      });
    } else {
      // If the date exists, update the amount
      existingGroup.amount = amount;
    }
  }

  return groupedTxs;
}

function formatDate(date: Date, includeTime?: boolean): string {
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const mm = months[date.getMonth()];
  const dd = date.getDate();
  const yyyy = date.getFullYear();
  const time = includeTime ? ` at ${date.toLocaleTimeString()}` : "";
  return `${mm} ${dd}, ${yyyy}${time}`;
}

export default page
