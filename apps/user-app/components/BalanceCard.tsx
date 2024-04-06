import { Card } from '@repo/ui/card'
import React from 'react'

const BalanceCard = ({amount, locked}: {amount: number, locked:number}) => {
  return (
    <Card title={"Balance"}>
        <div className="flex justify-between border-b border-slate-300 p-2">
            <div>
                Unlocked Balance
            </div>
            <div>
               {amount/100} INR
            </div>
        </div><div className="flex justify-between border-b border-slate-300 p-2">
            <div>
                Total Locked Balance
            </div>
            <div>
               {amount/100} INR
            </div>
        </div><div className="flex justify-between border-b border-slate-300 p-2">
            <div>
                Total Balance
            </div>
            <div>
               {(locked+amount)/100} INR
            </div>
        </div>
    </Card>
  )
}

export default BalanceCard
