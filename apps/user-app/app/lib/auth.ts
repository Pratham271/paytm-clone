import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { z } from "zod";


const schema = z.object({
    phone: z.string().length(10).regex(new RegExp(/^[7-9]\d{9}$/)),
    password: z.string().min(5)
})

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
            password: { label: "Password", type: "password" }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const parsedCredentials = schema.safeParse(credentials)
            if(!parsedCredentials.success){
                return null
            }
            // const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findUnique({
                where: {
                    number: credentials.phone,
                }
            });
            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }
            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
 