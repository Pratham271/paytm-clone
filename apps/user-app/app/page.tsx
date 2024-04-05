"use client"
import { PrismaClient } from "@repo/db/client";
import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";
const prisma = new PrismaClient() 

export default function Page(): JSX.Element {
  const session = useSession()
  return (
    <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user}/>
    </div>
  );
}
