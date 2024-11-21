import { connectDatabase } from "@/dbConnection/dbConnection";
import User from '@/models/users.models'
import { NextRequest, NextResponse } from 'next/server'

//CONNECTING TO THE DATABASE HERE
connectDatabase();

interface RequestBody {
    fullName: string;
    rollNumber: string;
    whatsappNumber: string;
    email: string;
    course: string;
}

export async function POST(request: NextRequest){
    try {
        
        const requestBody: any = await request.json();
        const { fullName, rollNumber, whatsappNumber, email, course }: RequestBody = requestBody;

        //VALIDATING THE DATA
        if( fullName==='' || rollNumber==='' || whatsappNumber==='' || email==='' || course==='' ){
            return NextResponse.json(
                {message: "Every field is required"},
                {status: 400}
            )
        }

        // FINDING IF USER ALREADY EXISTS OR NOT
        const findUserInDB = await User.findOne({email});

        if(findUserInDB){
            return NextResponse.json(
                {message: "User already exists, please login."},
                {status: 409}
            )
        }

        const createdUser = new User({
            fullName: fullName,
            rollNumber: rollNumber,
            whatsappNumber: whatsappNumber,
            email: email,
            course: course
        })

        const saveUserInDB = await createdUser.save();

        if(saveUserInDB){
            console.log("User created successfully: ", saveUserInDB);
            
            return NextResponse.json(
                {message: "User created successfully"},
                {status: 200}
            )
        }

        return NextResponse.json(
            {message: "Cannot create the user"},
            {status: 500}
        )
        
    } 
    catch (error: any) {
        return NextResponse.json(
            {message: error.message},
            {status: 500}
        )
    }
}
