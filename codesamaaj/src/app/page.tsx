"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import userDetailContext from "./context/UserDetailContext";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  // const userEmailData = [
  //   "msayyan@gmail.com",
  //   "bhuvanesh.m444@gmail.com",
  //   "shamikha336@gmail.com",
  //   "amnist2002@gmail.com",
  //   "220154almaz@gmail.com",
  //   "kushijeej@gmail.com",
  //   "riyamithran4@gmail.com",
  //   "haniashameer16@gmail.com",
  //   "ranasakhariya@gmail.com",
  //   "caroljoseph2255@gmail.com",
  //   "aswin859089@gmail.com",
  //   "tanishahm368786@gmail.com",
  //   "ardhendhu009@gmail.com",
  //   "hizarafi1@gmail.com",
  //   "hafismusthafa63@gmail.com",
  //   "parthivsushil95@gmail.com",
  //   "rizariyaz904846@gmail.com",
  //   "afhamu32@gmail.com",
  //   "sabarishms2004@gmail.com",
  //   "amartyamenon03@gmail.com",
  //   "ismailhasan4970@gmail.com",
  //   "khadirwazeer702@gmail.com",
  //   "umaraamir284@gmail.com",
  //   "inshaanwar732@gmail.com",
  //   "ahmadjasir789@gmail.com",
  //   "abdulhaseebmk10@gmail.com",
  //   "muhammedlehan10@gmail.com",
  //   "shalusharfas1828@gmail.com",
  //   "jaseenahameed2002@gmail.com",
  //   "rumailathrafeeq@gmail.com",
  //   "ienaasali28@gmail.com",
  //   "alanmathew175@gmail.com",
  //   "kevinjohnsonk70@gmail.com",
  //   "nihavinod640@gmail.com",
  //   "adishkk890@gmail.com",
  //   "alenlawrence5@gmail.com",
  //   "joyaljude291@gmail.com",
  //   "ganavinagaraj71@gmail.com",
  //   "21653@yenepoya.edu.in",
  //   "jincebabu00007@gmail.com",
  //   "csunojgokul@gmail.com",
  //   "ravisana38@gmail.com",
  //   "raihaanismail786@gmail.com",
  //   "hakkimmunnisa@gmail.com",
  //   "abdulafran0101@gmail.com",
  //   "afnankhan50586@gmail.com",
  //   "mashoodali982@gmail.com",
  //   "ifathimash@gmail.com",
  //   "jiyavg2004@gmail.com",
  //   "mahammadrahil1909@gmail.com",
  //   "devapriya2477@gmail.com",
  //   "ramzinvofficial@gmail.com",
  //   "jerohnaugustin167@gmail.com",
  //   "afrasashraf033@gmail.com",
  //   "mrbilalofficial06@gmail.com",
  //   "loonanajaa4@gmail.com",
  //   "fathimathfidaaa@gmail.com",
  //   "shiyasum202@gmail.com",
  //   "rameesmohd30@gmail.com",
  //   "nihaldilu36@gmail.com",
  //   "archanajithesh00@gmail.com",
  //   "rifnaabdulrahman@gmail.com",
  //   "mariyamfarseena2@gmail.com",
  //   "mehjabinkhadeeja@gmail.com",
  //   "tmmi7625@gmail.com",
  //   "sivanandan9745@gmail.com",
  //   "21009@yenepoya.edu.in",
  //   "23021@yenepoya.edu.in",
  //   "ansarsafwan159@gmail.com",
  //   "abhinavgireesh013@gmail.com",
  //   "sahalmcpvr@gmail.com",
  //   "andradeanisha333@gmail.com",
  //   "21485@yenepoya.edu.in",
  // ];

  const router = useRouter();

  return (
    <div
      className="min-h-screen bg-white flex flex-col gap-y-8 items-center justify-center p-4"
      id="bg-grid-pattern"
    >
      <div className="h-32 w-full flex items-center justify-center">
        <img src="./logo.png" alt="" className="h-14 w-14 sm:h-28 sm:w-28 rounded-full" />
        <div className="ml-2 font-bold text-3xl sm:ml-4 sm:font-bold sm:text-6xl">
          CODE SAMAAJ
        </div>
      </div>
      <div className="space-x-6">
        <Button
          className=" w-32 bg-gray-900 text-white transition-all delay-75 ease-linear hover:-translate-y-1"
          onClick={ () => router.push("/signup") }
        >
          Sign Up
        </Button>
        <Button className="w-32 bg-gray-900 text-white transition-all delay-75 ease-linear hover:-translate-y-1"
        onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
