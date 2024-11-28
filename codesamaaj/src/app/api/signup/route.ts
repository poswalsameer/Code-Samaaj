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
const SHEET_ID = '1q0eRPPTPcpogTmkg8HJa5JGd14Lk8XEBaBGTkqIhOeg';

const SERVICE_ACCOUNT_KEY_PATH = path.join(process.cwd(), 'credentials.json');

const envCredentials = {
    type: process.env.NEXT_PUBLIC_GOOGLE_TYPE,
    project_id: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
    private_key_id: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    auth_uri: process.env.NEXT_PUBLIC_GOOGLE_AUTH_URI,
    token_uri: process.env.NEXT_PUBLIC_GOOGLE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.NEXT_PUBLIC_GOOGLE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_CERT_URL,
    universe_domain: process.env.NEXT_PUBLIC_UNIVERSAL_DOMAIN
};

const auth = new google.auth.GoogleAuth({
    credentials: envCredentials,
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

        //WHOLE LOGIC TO ADD DATA IN GOOGLE SHEETS STARTS HERE
        const authClient = await auth.getClient();
        const request = {
            spreadsheetId: SHEET_ID,
            range: 'Sheet1!A2:E',  
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            resource: {
            values: [
                [fullName, rollNumber, whatsappNumber, email, course],
            ],
            },
            auth: authClient,
        };

        const response = await sheets.spreadsheets.values.append(request as any);

        if( response.status === 200 ){
            return NextResponse.json(
                {message: "User created"},
                {status: 200}
            )
        }
        else{
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
