"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from '@repo/db/client'

export async function createOnRampTransaction(amount:number,provider:string){
    const session = await getServerSession(authOptions)
    if(!session?.user || !session?.user?.id){
        return {
            message: "unauthenticated user"
        }
    }
    const token = (Math.random() * 1000).toString();
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
    return {
        message : "Done"
    }
}