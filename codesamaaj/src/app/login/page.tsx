"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import LoadingSpinner from "../appComponents/Loading";

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<{ email: string }>({
    email: "",
  });

  const router = useRouter();
  const { toast } = useToast();

  const loginUser = async (e: any) => {
    e.preventDefault();

    console.log("Data sent to backend: ", userDetails);

    try {
      setLoading(true);
      console.log("Email of the user entered is: ", userDetails);
      const loginResponse = await axios
        .post("/api/login", userDetails)
        .catch((error) => {
          console.error("Axios error response:", error.response);
          throw error;
        });

      if (loginResponse.status === 200) {
        setLoading(false);
        console.log("Response from the API is: ", loginResponse);
        router.push("/confirm-feedback");
      } else {
        toast({
          title: "User details not found",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error while logging the user");
      toast({
        title: "User not found, please signup",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      id="bg-grid-pattern-login"
    >
      {!loading ? (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="mb-4">
                <Input
                  type="text"
                  value={userDetails.email}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                  placeholder="Enter your registered email"
                  className="w-full text-gray-700 border-gray-300"
                />
              </div>
              <Button
                className="w-full bg-gray-800 hover:bg-gray-700 text-white"
                onClick={loginUser}
              >
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="gap-x-2 text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <span
              className="hover:cursor-pointer hover:underline"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </span>
          </CardFooter>
        </Card>
      ) : (
        <LoadingSpinner size={30} textSize="text-lg" />
      )}
    </div>
  );
}