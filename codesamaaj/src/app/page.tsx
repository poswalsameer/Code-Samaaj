'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import userDetailContext from "./context/UserDetailContext";

export default function Home() {

  const userEmailData = ["msayyan@gmail.com", "bhuvanesh.m444@gmail.com", "shamikha336@gmail.com", "amnist2002@gmail.com", "220154almaz@gmail.com", "kushijeej@gmail.com", "riyamithran4@gmail.com", "haniashameer16@gmail.com", "ranasakhariya@gmail.com", "caroljoseph2255@gmail.com", "aswin859089@gmail.com", "tanishahm368786@gmail.com", "ardhendhu009@gmail.com", "hizarafi1@gmail.com", "hafismusthafa63@gmail.com", "parthivsushil95@gmail.com", "rizariyaz904846@gmail.com", "afhamu32@gmail.com", "sabarishms2004@gmail.com", "amartyamenon03@gmail.com", "ismailhasan4970@gmail.com", "khadirwazeer702@gmail.com", "umaraamir284@gmail.com", "inshaanwar732@gmail.com", "ahmadjasir789@gmail.com", "abdulhaseebmk10@gmail.com", "muhammedlehan10@gmail.com", "shalusharfas1828@gmail.com", "jaseenahameed2002@gmail.com", "rumailathrafeeq@gmail.com", "ienaasali28@gmail.com", "alanmathew175@gmail.com", "kevinjohnsonk70@gmail.com", "nihavinod640@gmail.com", "adishkk890@gmail.com", "alenlawrence5@gmail.com", "joyaljude291@gmail.com", "ganavinagaraj71@gmail.com", "21653@yenepoya.edu.in", "jincebabu00007@gmail.com", "csunojgokul@gmail.com", "ravisana38@gmail.com", "raihaanismail786@gmail.com", "hakkimmunnisa@gmail.com", "abdulafran0101@gmail.com", "afnankhan50586@gmail.com", "mashoodali982@gmail.com", "ifathimash@gmail.com", "jiyavg2004@gmail.com", "mahammadrahil1909@gmail.com", "devapriya2477@gmail.com", "ramzinvofficial@gmail.com", "jerohnaugustin167@gmail.com", "afrasashraf033@gmail.com", "mrbilalofficial06@gmail.com", "loonanajaa4@gmail.com", "fathimathfidaaa@gmail.com", "shiyasum202@gmail.com", "rameesmohd30@gmail.com", "nihaldilu36@gmail.com", "archanajithesh00@gmail.com", "rifnaabdulrahman@gmail.com", "mariyamfarseena2@gmail.com", "mehjabinkhadeeja@gmail.com", "tmmi7625@gmail.com", "sivanandan9745@gmail.com", "21009@yenepoya.edu.in", "23021@yenepoya.edu.in", "ansarsafwan159@gmail.com", "abhinavgireesh013@gmail.com", "sahalmcpvr@gmail.com", "andradeanisha333@gmail.com", "21485@yenepoya.edu.in"];

  // const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  // CONTEXT
  const context = useContext(userDetailContext);
  if( context === undefined ){
    throw new Error("Context is not defined correctly");
  }
  const { userEmail, setUserEmail } = context;

  // setUserEmail('');

  const handleLogin = (e: any) => {

    e.preventDefault();
    setLoading(true);
    console.log("Email entered by the user: ", userEmail);

    const isEmailPresent = userEmailData.includes(userEmail);

    if( isEmailPresent === true ){
      setUserEmail(userEmail);
      router.push("/confirm-feedback");
    }

    setLoading(false);
    

  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <div className="h-32 w-full bg-white flex items-center justify-center">
            
            <img src="./logo.png" alt="" className="h-28 w-28" />
            <div className="ml-4 font-bold text-6xl" >CODE SAMAAJ</div>

          </div>
          <p className="mt-10 text-sm text-gray-600">
            Enter your email to log in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={userEmail}
              onChange={ (e) => setUserEmail(e.target.value) }
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <Button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={handleLogin}
            >
              Log in
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}