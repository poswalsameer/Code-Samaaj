'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React from 'react'

function Page() {

  const router = useRouter();

  return (
    <div 
        className="min-h-screen bg-white flex flex-col text-2xl sm:text-3xl text-center gap-y-8 items-center justify-center p-4"
        id="bg-grid-pattern"
    >
        <div className='max-w-4xl p-4' >
        Your payment has failed due to some unavoidable issues. If any amount has been deducted from your account, that will be refunded within 3-5 working days. You can also contact us for any further queries.
        </div>

        <Button onClick={() => router.push("/")}>
            Go back
        </Button>
      
    </div>
  )
}

export default Page
