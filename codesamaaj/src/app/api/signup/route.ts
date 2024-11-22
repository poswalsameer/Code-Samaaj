import { connectDatabase } from "@/dbConnection/dbConnection";
import User from '@/models/users.models'
import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import * as fs from 'fs'
import * as path from 'path'

//CONNECTING TO THE DATABASE HERE
connectDatabase();

interface RequestBody {
    fullName: string;
    rollNumber: string;
    whatsappNumber: string;
    email: string;
    course: string;
}

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SHEET_ID = '1q0eRPPTPcpogTmkg8HJa5JGd14Lk8XEBaBGTkqIhOeg'; // Replace with your Google Sheet ID

const SERVICE_ACCOUNT_KEY_PATH = path.join(process.cwd(), 'credentials.json');

const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_KEY_PATH,
    scopes: SCOPES,
  });
  
const sheets = google.sheets('v4');

export async function POST(req: NextRequest){

    try {
        
        const requestBody: any = await req.json();
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
            
            // return NextResponse.json(
            //     {message: "User created successfully"},
            //     {status: 200}
            // )
        }

        //WHOLE LOGIC TO ADD DATA IN GOOGLE SHEETS STARTS HERE
        const authClient = await auth.getClient();
        const request = {
            spreadsheetId: SHEET_ID,
            range: 'Sheet1!A2:E',  // Adjust the range as needed
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            resource: {
            values: [
                [fullName, rollNumber, whatsappNumber, email, course], // Data to append
            ],
            },
            auth: authClient,
        };

        const response = await sheets.spreadsheets.values.append(request as any);

        if( response.status === 200 ){
            console.log("User added to google sheet successfully");
            
            return NextResponse.json(
                {message: "User created"},
                {status: 200}
            )
        }
        else{
            console.log("Cannot create the user, inside the else part");

            return NextResponse.json(
                {message: "Error while creating in else part"},
                {status: 500}
            )
            
        }

        
        //WHOLE LOGIC TO ADD DATA IN GOOGLE SHEETS ENDS HERE

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
