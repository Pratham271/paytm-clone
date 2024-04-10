import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import { authOptions } from '../lib/auth';
import SignupForm from '../../components/SignupForm';

const page = async() => {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        redirect('/dashboard')
    }
  return (
    <div>
      <SignupForm/>
    </div>
  )
}

export default page
