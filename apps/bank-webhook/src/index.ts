import express from 'express'
import db from '@repo/db/client'

const app = express()
app.use(express.json())

app.post("/hdfcWebhook", async(req,res)=> {
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    try {
        // transaction in db 
        const transaction = await db.onRampTransaction.findUnique({
            where: {
                token: paymentInformation.token,
            }
        })
        if(transaction?.status!=='Processing'){
            return res.status(411).json({
                message: "not allowed"
            })
        }
        await db.$transaction([
            db.balance.update({
                where:{
                    id: paymentInformation.userId,
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount
                    }
                }
            }),
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success"
                }
            })
        ]);
        return res.status(200).json({
            message: "Captured"
        });

    } catch (error) {
        console.log(error)
        return res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

app.listen(8080, ()=> {
    console.log("app listening on port 8080")
})
