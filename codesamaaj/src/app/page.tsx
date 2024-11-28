"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        <div className="space-x-6">
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

      <footer className="w-full absolute bottom-0 border-t-2 bg-white text-black py-4">
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
