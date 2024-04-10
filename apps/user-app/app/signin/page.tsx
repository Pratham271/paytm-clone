"use server"
import React from 'react'
import SigninForm from '../../components/SigninForm'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../lib/auth';

const page = async() => {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        redirect('/dashboard')
    }
  return (
    <div>
        <SigninForm/>
    </div>
  )
}

export default page
