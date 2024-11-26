"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import userDetailContext from "../context/UserDetailContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";
import LoadingSpinner from "../appComponents/Loading";
import Cookies from 'js-cookie';

interface UserDetails {
  fullName: string;
  rollNumber: string;
  whatsappNumber: string;
  email: string;
  course: string;
}

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

  const [userDetails, setUserDetails] = useState<UserDetails>({
    fullName: "",
    rollNumber: "",
    whatsappNumber: "",
    email: "",
    course: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();
  const context = useContext(userDetailContext);
  if( context === undefined ){
    throw new Error("Context is not defined correctly");
  }
  const { userEmail, setUserEmail } = context;

  const signUpUser = async () => {
    try {
      setLoading(true);

      const signupResponse = await axios.post("/api/signup", userDetails);

      if (signupResponse) {
        setLoading(false);
        // setUserEmail(userDetails.email);
        // console.log("Value inside the userEmail state: ", userEmail);
        console.log("Signup completed successfully: ", signupResponse);
        Cookies.set('authToken', userDetails.email);
        router.push("/confirm-feedback");
      }
    } catch (error) {
      setLoading(false);
      console.log("FRONTEND: Error while signing up the user");
      toast({
        title: "Error while signing up the user, please try again",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center "
      id="bg-grid-pattern-signup"
    >
      {!loading ? (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
          <Card className="w-full max-w-5xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Student Information
              </CardTitle>
              <CardDescription className="text-gray-600">
                Please fill out all the fields below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  signUpUser();
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="fullname"
                    value={userDetails.fullName}
                    onChange={(e: any) =>
                      setUserDetails({
                        ...userDetails,
                        fullName: e.target.value,
                      })
                    }
                    placeholder="John Doe"
                    className="border-gray-300 focus:border-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rollnumber" className="text-gray-700">
                    Roll Number
                  </Label>
                  <Input
                    id="rollnumber"
                    value={userDetails.rollNumber}
                    onChange={(e: any) =>
                      setUserDetails({
                        ...userDetails,
                        rollNumber: e.target.value,
                      })
                    }
                    placeholder="12345"
                    className="border-gray-300 focus:border-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-gray-700">
                    WhatsApp Number
                  </Label>
                  <Input
                    id="whatsapp"
                    value={userDetails.whatsappNumber}
                    onChange={(e: any) =>
                      setUserDetails({
                        ...userDetails,
                        whatsappNumber: e.target.value,
                      })
                    }
                    placeholder="+91 98765 43210"
                    className="border-gray-300 focus:border-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={userDetails.email}
                    onChange={(e: any) =>
                      setUserDetails({ ...userDetails, email: e.target.value })
                    }
                    type="email"
                    placeholder="johndoe@example.com"
                    className="border-gray-300 focus:border-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course" className="text-gray-700">
                    Course Enrolled
                  </Label>
                  <Input
                    id="course"
                    value={userDetails.course}
                    onChange={(e: any) =>
                      setUserDetails({ ...userDetails, course: e.target.value })
                    }
                    placeholder="BCA"
                    className="border-gray-300 focus:border-gray-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white"
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <LoadingSpinner size={30} textSize="text-lg" />
      )}
    </div>
  );
}
