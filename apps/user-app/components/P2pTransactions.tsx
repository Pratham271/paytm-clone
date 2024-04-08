import { Card } from '@repo/ui/card'
import React from 'react'

type transactions = {
    amount : number,
    time: Date,
    transactionType: string,
    to: string
}[]
const P2pTransactions = ({transactions}:{transactions:transactions}) => {
    if (!transactions.length) {
        return <Card title="All Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
  return (
    <Card title="All Transactions">
         <div className="pt-2">
            {transactions.map((t,index) => <div key={index} className="flex justify-between p-2">
                <div>
                    <div className="text-sm">
                        {t.transactionType} {t.transactionType=="Paid"?"to":"from"} {t.to} 
                    </div>
                    <div className="text-gray-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className={`flex flex-col justify-center ${t.transactionType=="Paid"?"text-red-500":"text-green-500"}`}>
                    {t.transactionType=="Paid"?"-":"+"} Rs {t.amount / 100}
                </div>
            </div>)}
        </div>
    </Card>
  )
}

export default P2pTransactions
