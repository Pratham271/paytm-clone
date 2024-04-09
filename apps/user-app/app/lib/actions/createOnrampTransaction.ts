"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from '@repo/db/client'
import { devNull } from "os";

export async function createOnRampTransaction(amount:number,provider:string){
    const session = await getServerSession(authOptions)
    if(!session?.user || !session?.user?.id){
        return {
            message: "unauthenticated user"
        }
    }
    const token = (Math.random() * 1000).toString(36).slice(3);
    await db.onRampTransaction.create({
        data: {
            amount: amount,
            provider: provider || "",
            startTime: new Date(),
            token: token,
            userId: Number(session.user.id),
            status: "Processing"
        }
    }) 
    const transit  = await fetch("http://localhost:3002/hdfcWebhook", {
        method: "POST",
        body: JSON.stringify({
            token: token,
            user_identifier: Number(session.user.id),
            amount: amount
        }),
        headers: {
            "content-type": "Application/json"
        }
    });
    const res = await transit.json()
    if(res.message === "Captured"){
        const balance = await db.balance.findUnique({
            where: {
                userId: Number(session?.user?.id)
            }
        })
        
        await db.balanceHistory.create({
            data: {
                userId: Number(session?.user?.id),
                timeStamp: new Date(),
                amount: Number(balance?.amount)
            }
        })
    }
    return {
        message : "Done"
    }
}