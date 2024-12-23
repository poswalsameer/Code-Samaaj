'use client'

import { Button } from '@/components/ui/button'
import { PartyPopper } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import Cookies from 'js-cookie';

function Page() {

  const router = useRouter();
  const searchParams = useSearchParams()

  useEffect(() => {

    const paymentStatus = searchParams.get('paymentStatus')

    if (paymentStatus === 'success') {
      // Set the cookie
      Cookies.set('paymentStatus', paymentStatus, { expires: 365 }); // Expires in 7 days
    }
  }, []);

  return (
    <div 
        className="min-h-screen bg-white flex flex-col text-3xl text-center gap-y-8 items-center justify-center p-4"
        id="bg-grid-pattern"
    >
        <div className='max-w-4xl flex flex-col p-4 gap-y-3' >
            <div className='flex justify-center items-center gap-x-3'>
                Payment Successful 
                <PartyPopper className=' h-8 w-8' /> 
            </div>
            {/* <div>Once the bootcamp is complete, you can login </div> */}
        </div>

        <Button onClick={() => router.push("/signup")}>
            Signup
        </Button>
      
    </div>
  )
}

export default Page
