'use client'

import { Button } from '@/components/ui/button'
import { PartyPopper } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

function Page() {

  const router = useRouter();

  return (
    <div 
        className="min-h-screen bg-white flex flex-col text-3xl text-center gap-y-8 items-center justify-center p-4"
        id="bg-grid-pattern"
    >
        <div className='max-w-4xl flex flex-col p-4 gap-y-3' >
            <div className='flex justify-center items-center gap-x-3'>
                You are successfully registered for the bootcamp 
                <PartyPopper className=' h-8 w-8' /> 
            </div>
            <div>Once the bootcamp is complete, you can login again to download your certificates.</div>
        </div>

        <Button onClick={() => router.push("/")}>
            Go back
        </Button>
      
    </div>
  )
}

export default Page
