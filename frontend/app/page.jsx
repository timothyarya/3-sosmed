'use client';

import React from 'react'
import {signIn, useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';


const page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session?.user) {
    router.push('/login');
  } else {
    return (
      <div>
        Home Page
      </div>
    )
  }
}

export default page