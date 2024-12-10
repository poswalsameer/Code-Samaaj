'use client'

import { useRouter } from "next/navigation";
import React from "react";

function Page() {

    const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col gap-y-8 items-center justify-center p-4"
    id="bg-grid-pattern">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80">
        <div className="relative h-64 w-full">
          <img src="./landingPage.jpg" alt="" />
        </div>
        <div className=" p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Next Bootcamp</h2>
          <div className="mt-10 flex justify-between items-center">
            <p className="text-xl font-bold text-gray-800">
              Rs. 999
            </p>
            <button className="h-9 w-32 rounded-md bg-gray-800 text-white hover:bg-gray-700"
            onClick={() => router.push("/signup")}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
