'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast"
import Cookies from 'js-cookie';


interface AdminLoginDetails {
  email: string;
  password: string;
}

function AdminLogin() {

  const [adminLoginDetails, setAdminLoginDetails] = useState<AdminLoginDetails>({
    email: '',
    password: ''
  })

  const { toast } = useToast();
  const router = useRouter();

  const correctAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const correctAdminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const adminLoginButtonClicked = (e: any) => {

    e.preventDefault();

    if( !adminLoginDetails.email || !adminLoginDetails.password ){
      toast({
        title: "Every field is required!",
      });
    }
    else{

      if( adminLoginDetails.email !== correctAdminEmail && adminLoginDetails.password === correctAdminPassword ){
        toast({
          title: "Email entered is not correct",
        });
      }
      else if( adminLoginDetails.email === correctAdminEmail && adminLoginDetails.password !== correctAdminPassword ){
        toast({
          title: "Password entered is not correct",
        });
      }
      else if( adminLoginDetails.email !== correctAdminEmail && adminLoginDetails.password !== correctAdminPassword ){
        toast({
          title: "Email and password entered are not correct",
        });
      }
      else{
        Cookies.set('adminToken', 'thisTokenIsToVerifyThatTheAdminHasLoggedIn', { expires: 1 })
        router.push("/admin")
      }

    }


  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4"
    id="bg-grid-pattern-login"
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="mb-4">
              <Input
                type="text"
                value={adminLoginDetails.email}
                onChange={ (e: any) => setAdminLoginDetails({...adminLoginDetails, email: e.target.value}) }
                placeholder="Enter your email"
                className="w-full text-gray-700 border-gray-300"
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                value={adminLoginDetails.password}
                onChange={ (e: any) => setAdminLoginDetails({...adminLoginDetails, password: e.target.value}) }
                placeholder="Enter your password"
                className="w-full text-gray-700 border-gray-300"
              />
            </div>
            <Button
              className="w-full bg-gray-800 hover:bg-gray-700 text-white"
              onClick={adminLoginButtonClicked}
            >
              Login
            </Button>
          </form>
        </CardContent>
        {/* <CardFooter className="gap-x-2 text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <span
            className="hover:cursor-pointer hover:underline"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </span>
        </CardFooter> */}
      </Card>
    </div>
  );
}

export default AdminLogin;
