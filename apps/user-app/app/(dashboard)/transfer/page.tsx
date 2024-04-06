import React from 'react'
import AddMoneyCard from '../../../components/AddMoneyCard'
import BalanceCard from '../../../components/BalanceCard'
import OnRampTransactions from '../../../components/OnRampTransactions'

enum Status {
  Success,
  Failure,
  Processing
}
const page = () => {
  const date = new Date()
  const transactions = [
    {
      time: date,
      amount: 200,
      status: Status.Failure,
      provider: 'HDFC'
    },
    {
      time: date,
      amount: 200,
      status: Status.Processing,
      provider: 'HDFC'
    },
    {
      time: date,
      amount: 200,
      status: Status.Success,
      provider: 'HDFC'
    }
  ]
  return (
    <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoneyCard />
            </div>
            <div>
                <BalanceCard amount={100} locked={20} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default page
