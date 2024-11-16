'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import userDetailContext from "../context/UserDetailContext";

export default function Component() {

    const usernameData = [ "Mohammed Sayyan", "BHUVANESH M", "Shamikh Ali", "Bibi Amna", "Abdul Rahiman Almaz", "Kushi Jeej", "Riya kp", "Hania Shameer", "Rana fathima", "Carol Joseph Biju", "Aswin Biju", "TANISH", "ArdhendhuBhushanBabu", "Hiza Rafi", "Hafis A Musthafa", "Parthiv Sushil", "Risa fathima", "Afham umar", "Sabareesh ms", "Amartya Menon PP", "Mohammad Ismail Hasan", "Abdul khadir wazeer", "Aamir Umar", "Fathima Insha K", "AHAMMED JASIR", "Abdul haseeb mk", "Muhammed lehen c", "Sharfas M", "Jaseena Hameed", "Rumailath Rafeeq", "Ienaas Adnan Ali", "Alan mathew", "Kevin Johnson", "NIHA VINOD V", "Adish Bhaskar kk", "Alen Lawrence", "Joyal jude mp", "Ganavi Nagaraj", "Jwel Kangjam", "Jince babu", "Gokul C Sunoj", "Janaki Ravi Prasad", "Raihaan Ismail Jukaku", "Hakkim Munnisa", "A Afran", "Afnan Khan", "Mashood ali PP", "Ifa fathima k", "Jiya Gopal", "Mahammad rahil", "Devapriya P", "Mohammed Ramzi N V", "Jerohn Augustin", "Muhammed Afras", "Mohammed Bilal", "Loona Najaa C P", "Fathimath Fida Z", "Muhammad Shiyas", "Ramees Muhammed", "MOHAMMED NIHAL.M", "Archana.O", "Kadeeja Rifna", "Mariyam Farseena", "Khadeeja Mehjabin", "Mahammad thameez", "Siva Nandan.V.S", "MUHAMMAD RAZIK", "Adithyan M R", "Muhammad Safwanul Ansar", "ABHINAV G", "Muhammed Sahal mc", "Anisha Andrade", "ADIL PV" ];

    const lowerCaseUsernames = usernameData.map(username => username.toLowerCase());
    console.log(lowerCaseUsernames);

    const correctFormLinkFirst = "https://docs.google.com/forms";
    const correctFormLinkSecond = "formResponse";

    // const [name, setName] = useState<string>('');
    const [formLink, setFormLink] = useState<string>('');

    const context = useContext(userDetailContext);
    if( context === undefined ){
        throw new Error( "Context is not correctly defined" );
    }
    const { name, setName } = context;

    const router = useRouter();

    const handleData = (e: any) => {

        e.preventDefault();

        const lowercaseName = name.toLowerCase();
        const isNamePresent = lowerCaseUsernames.includes(lowercaseName);

        const isLinkCorrect = formLink.includes(correctFormLinkFirst) && formLink.includes(correctFormLinkSecond);


        if( isNamePresent===true && isLinkCorrect===true ){
            setName(lowercaseName);
            router.push("/download-certificate");
        }
        else{
            console.log("No match");
            console.log("Value of isLinkCorrect: ", isLinkCorrect);
            console.log("Value of isNamePresent: ", isNamePresent);
            console.log("Lowercase username: ", lowercaseName);
        }



    }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
            <svg
              className="h-8 w-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Access Certificate</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your full name and the link of the feedback submission success page
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={name}
                onChange={ (e) => setName(e.target.value) }
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="formLink" className="sr-only">
                Link
              </label>
              <Input
                id="formLink"
                name="formLink"
                type="url"
                value={formLink}
                onChange={ (e) => setFormLink(e.target.value) }
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="Form Link"
              />
            </div>
          </div>
          <div>
            <Button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"

              onClick={handleData}
            >
              Access Certificate
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}