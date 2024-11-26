import { connectDatabase } from "@/dbConnection/dbConnection";
import User from "@/models/users.models";
import { NextRequest, NextResponse } from 'next/server';

connectDatabase();

export async function POST(request: NextRequest) {

    try {
      const requestBody: any = await request.json();
        const { email } = requestBody;
  
      // VALIDATING THE DATA
      if (!email) {
        return NextResponse.json(
          { message: "Email is required to fetch user details" },
          { status: 400 }
        );
      }
  
      // FIND THE USER IN THE DATABASE
      const userInDB = await User.findOne({ email });
  
      if (userInDB) {
        console.log("User details fetched from DB: ", userInDB);
  
        return NextResponse.json(
          { user: userInDB },
          { status: 200 }
        );
      }
  
      return NextResponse.json(
        { message: "User not found in the database" },
        { status: 404 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
}