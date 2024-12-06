"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div
        className="min-h-screen bg-white flex flex-col gap-y-8 items-center justify-center p-4"
        id="bg-grid-pattern"
      >
        <div className="h-32 w-full flex items-center justify-center">
          <img
            src="./logo.png"
            alt=""
            className="h-14 w-14 sm:h-28 sm:w-28 rounded-full"
          />
          <div className="ml-2 font-bold text-3xl sm:ml-4 sm:font-bold sm:text-6xl">
            CODE SAMAAJ
          </div>
        </div>
        <div className="
        h-[13rem] w-[20rem] rounded-md
        sm:h-[20rem] sm:w-[30rem] sm:rounded-md
        md:h-[20rem] md:w-[40rem] md:rounded-md
        lg:h-[20rem] lg:w-[60rem] lg:rounded-md ">

            <div className="
            h-full w-full relative
            sm:h-full sm:w-full sm:relative
            md:h-full md:w-full md:relative
            lg:h-full lg:w-full lg:relative">
              <img 
                src="./landingPage.jpg" 
                alt="" 
                className="
                h-full w-full rounded-lg object-cover
                sm:h-full sm:w-full sm:rounded-2xl sm:object-cover
                md:h-full md:w-full md:rounded-2xl md:object-cover
                lg:h-full lg:w-full lg:rounded-2xl lg:object-cover" />

              <div className="
              absolute inset-0 rounded-lg bg-black/60 flex flex-col items-center justify-center text-white space-y-4
              sm:absolute sm:inset-0 sm:rounded-2xl sm:bg-black/60 sm:flex sm:flex-col sm:items-center sm:justify-center sm:text-white sm:space-y-4
              md:absolute md:inset-0 md:rounded-2xl md:bg-black/60 md:flex md:flex-col md:items-center md:justify-center md:text-white md:space-y-4
              lg:absolute lg:inset-0 lg:rounded-2xl lg:bg-black/60 lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-white lg:space-y-4">
                <h2 className="
                text-2xl font-bold text-center
                sm:text-4xl sm:font-bold sm:text-center
                md:text-4xl md:font-bold md:text-center
                lg:text-4xl lg:font-bold lg:text-center">
                  Transform Your Coding Journey
                </h2>
                <div className="
                flex flex-col items-center
                sm:flex sm:flex-col sm:items-center
                md:flex md:flex-col md:items-center
                lg:flex lg:flex-col lg:items-center">
                  <p className="
                  text-base opacity-90
                  sm:text-lg sm:opacity-90
                  md:text-lg md:opacity-90
                  lg:text-lg lg:opacity-90">At just</p>
                  <div className="
                  text-4xl font-bold
                  sm:text-6xl sm:font-bold
                  md:text-6xl md:font-bold
                  lg:text-6xl lg:font-bold">₹999</div>

                </div>
              </div>
            </div>

        </div>
        <div className="space-x-6 my-5 sm:my-10">
          <Button
            className=" w-32 bg-gray-900 text-white transition-all delay-75 ease-linear hover:-translate-y-1"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </Button>
          <Button
            className="w-32 bg-gray-900 text-white transition-all delay-75 ease-linear hover:-translate-y-1"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        </div>
      </div>

      <footer className="w-full fixed bottom-0 border-t-2 bg-white text-black py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center ">
            <div className="h-full flex justify-center items-center -ml-1 sm:ml-10 text-xs sm:text-sm">
              &copy; 2024 CodeSamaaj
            </div>
            <div className="h-full flex justify-center items-center -mr-1 sm:mr-10 space-x-2">
              <Link
                href="/privacy-policy"
                className="text-xs sm:text-sm hover:underline"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-xs sm:text-sm hover:underline"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
