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
import SignupWithAuth from "../appComponents/SignupWithAuth";

interface UserDetails {
  fullName: string;
  rollNumber: string;
  whatsappNumber: string;
  email: string;
  course: string;
}

function Home() {
  
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
        // Cookies.set('authToken', userDetails.email);
        router.push("/registration-successful");
      }
    } catch (error) {
      setLoading(false);
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

export default SignupWithAuth(Home);
