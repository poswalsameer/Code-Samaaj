import { connectDatabase } from "@/dbConnection/dbConnection";
import User from "@/models/users.models";
import { NextRequest, NextResponse } from 'next/server';

connectDatabase();

export async function POST( request: NextRequest, response: NextResponse ){

    try {

        const requestBody: any = await request.json();
        const { email }: {email: string} = requestBody;

        //VALIDATING THE DATA
        if( email==='' ){
            return NextResponse.json(
                {message: "Email is required to login"},
                {status: 400}
            )
        }

        //FIND THE USER IN THE DATABASE
        const userInDB = await User.findOne({email});

        if( userInDB ){
            console.log( "User found in DB: ", userInDB);
            
            return NextResponse.json(
                {userDetails: userInDB},
                {status: 200}
            )
        }

        return NextResponse.json(
            {message: "User not found in the database"},
            {status: 404}
        )
        
    } 
    catch (error) {
        return NextResponse.json(
            {message: "Error while logging in the user"},
            {status: 500}
        )    
    }

}