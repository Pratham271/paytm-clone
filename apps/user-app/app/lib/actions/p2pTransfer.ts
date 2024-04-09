"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to:string, amount: number){
    const session = await getServerSession(authOptions)
    const from = session?.user?.id
    if(!from){
        return {
            message: "Error while sending"
        }
    }

    const toUser = await prisma.user.findUnique({
        where: {
            number: to 
        }
    })
    if(!toUser){
        return {
            message: "User not found"
        }
    }
    if(toUser.id === Number(from)){
        return {
            message: "Cannot send money to yourself"
        }
    }
    await prisma.$transaction(async (tx) => {
        // to lock the row on which transaction is performed
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`
        const fromBalance = await tx.balance.findUnique({
            where: {
                userId: Number(from)
            }
        })
        if(!fromBalance || fromBalance.amount<amount){
            throw new Error("Insufficient funds")
        }

        await tx.balance.update({
            where: {
                userId: Number(from)
            },
            data:{
                amount: {
                    decrement: amount
                }
            }
        })

        await tx.balance.update({
            where: {
                userId: toUser.id
            },
            data:{
                amount: {
                    increment: amount
                }
            }
        })

        await tx.p2pTransfer.create({
            data: {
                fromUserId: Number(from),
                toUserId: toUser.id,
                amount: amount,
                timeStamp: new Date()
            }
        })
    })

    await prisma.$transaction(async (tx)=> {
        const fromBalance = await tx.balance.findUnique({
            where: {
                userId: Number(from)
            }
        })
        const toBalance = await tx.balance.findUnique({
            where: {
                userId: toUser.id
            }
        })

        await tx.balanceHistory.create({
            data: {
                userId: Number(from),
                amount: Number(fromBalance?.amount),
                timeStamp: new Date()
            }
        })

        await tx.balanceHistory.create({
            data: {
                userId: toUser.id,
                amount: Number(toBalance?.amount),
                timeStamp: new Date()
            }
        })
    })
}