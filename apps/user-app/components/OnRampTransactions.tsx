import { Card } from '@repo/ui/card'
import React from 'react'

export enum OnRampStatus {
    Success,
    Failure,
    Processing
  }

type transactions = {
    time: Date,
    amount: number,
    status: OnRampStatus,
    provider: string
}[]
const OnRampTransactions = ({transactions}:{transactions:transactions}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
  return (
    <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map((t,index) => <div key={index} className="flex justify-between p-2">
                <div>
                    <div className={`text-sm `}>
                        {t.status.toString() === 'Success' ? "Recieved" : t.status} INR
                    </div>
                    <div className="text-gray-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className={`flex flex-col justify-center ${t.status.toString()=='Success'?"text-green-500": t.status.toString()=='Processing'?"text-yellow-500":"text-red-500"}`}>
                    + Rs {t.amount / 100}
                </div>
            </div>)}
        </div>
    </Card>
  )
}

export default OnRampTransactions
