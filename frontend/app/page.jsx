'use client';

import React, { useEffect } from 'react'
import {signIn, useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar/Navbar';



const page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'loading') {
      if (!session?.user) {
        router.push('/login')
      }
    }
  }, [status]);

  return (
    <>
      <Navbar />
      <div>Home Page</div>
    </>
  )
}

export default page