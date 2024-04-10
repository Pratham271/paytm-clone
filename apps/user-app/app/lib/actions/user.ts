"use server"
import prisma from "@repo/db/client";
import z, { number } from "zod"
import bcrypt from 'bcrypt';

const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(5),
    number: z.string().length(10).regex(new RegExp(/^[7-9]\d{9}$/))
})

export async function signup(name:string,email:string,password:string,number:string){
    const data ={
        name,
        email,
        password,
        number
    }
    const validData = schema.safeParse(data)
    try {
        console.log(validData)
        if(!validData.success){
            return null
        }
        const user = await prisma.user.findUnique({
            where: {
                number
            }
        })
        if(user){
            return null
        }
        const hash = await bcrypt.hash(password,10)
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                number,
                password:hash
            }
        })
        return {
            message: "User created successfully"
        }
    } catch (error:any) {
        console.log(error)
        throw new Error(error.message)
    }
}