import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { z } from "zod";


const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    phone: z.string().length(10),
    password: z.string().min(6)
})
export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            name: {label: "Name", type:"text",placeholder:"John Doe"},
            email: {label: "Email", type: "email", placeholder: "johndoe@gmail.com"},
            phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
            password: { label: "Password", type: "password" }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const parsedCredentials = schema.safeParse(credentials)
            if(!parsedCredentials.success){
                console.log("inside false statement")
                return null
            }
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findUnique({
                where: {
                    number: credentials.phone,
                    name: credentials.name,
                    email: credentials.email
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

            try {
                const user = await db.user.create({
                    data: {
                        name: credentials.name,
                        email: credentials.email,
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
            } catch(e) {
                console.error(e);
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
 