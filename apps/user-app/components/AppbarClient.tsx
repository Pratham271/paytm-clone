"use client"
import { Appbar } from '@repo/ui/appbar'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const AppbarClient = () => {
    const session = useSession();
    const router = useRouter();
  return (
    <div>
        <Appbar onSignin={signIn} onSignout={async()=> {
            signOut()
            router.push("/api/auth/signin")
        }} 
        user={session.data?.user} />
    </div>
  )
}

export default AppbarClient
