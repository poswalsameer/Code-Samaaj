import { connectDatabase } from "@/dbConnection/dbConnection";
import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import * as fs from 'fs'
import * as path from 'path'
import { readFile } from 'fs/promises';

//CONNECTING TO THE DATABASE HERE
connectDatabase();

// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SHEET_ID = '1q0eRPPTPcpogTmkg8HJa5JGd14Lk8XEBaBGTkqIhOeg'; // Replace with your Google Sheet ID

// const SERVICE_ACCOUNT_KEY_PATH = path.join(process.cwd(), 'credentials.json');

// const auth = new google.auth.GoogleAuth({
//     keyFile: SERVICE_ACCOUNT_KEY_PATH,
//     scopes: SCOPES,
// });
  
const sheets = google.sheets('v4');

export async function POST(req: NextRequest){

    try {
        const {
            email,
            overallRating,
            referralRating,
            mentorRating,
            mentorFeedback,
            nextBootcampParticipation,
            improvements,
        } = await req.json();

        console.log("The email we got from the frontend is this: ", email);

        const credentialsPath = path.join(process.cwd(), 'credentials.json');
        const credentials = JSON.parse(await readFile(credentialsPath, 'utf8'));
        const { client_email, private_key } = credentials;

        const auth = new google.auth.GoogleAuth({
            credentials: { client_email, private_key },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = SHEET_ID;

        // Fetch all rows to locate the user
        const getRows = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Sheet1!A2:E', // Assuming user details are here
        });

        const rows = getRows.data.values;

        if (!rows) {
            return NextResponse.json(
                { message: 'No users found' },
                { status: 404 }
            );
        }

        // Locate the user row using the email
        const userRowIndex = rows.findIndex(row => row[3] === email); // Assuming email is in column D (index 3)

        if (userRowIndex === -1) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        // Define the range for feedback columns (F-K)
        const range = `Sheet1!F${userRowIndex + 2}:K${userRowIndex + 2}`; // Row index +2 to account for 1-based index and header

        // Prepare feedback data
        const feedbackData = [
            overallRating,
            referralRating,
            mentorRating,
            mentorFeedback,
            nextBootcampParticipation,
            improvements,
        ];

        const request = {
            spreadsheetId: spreadsheetId,
            range: range,  // Adjust the range as needed
            valueInputOption: 'RAW',
            resource: {
            values: [
                [overallRating, referralRating, mentorRating, mentorFeedback, nextBootcampParticipation, improvements],
            ],
            },
        };

        const response = await sheets.spreadsheets.values.update(request as any);

        if( response.status === 200 ){
            console.log("User feedback added to google sheet successfully");
            
            return NextResponse.json(
                {message: "Feedback created"},
                {status: 200}
            )
        }
        else{
            console.log("Cannot add user feedback, inside the else part");

            return NextResponse.json(
                {message: "Error while adding user feedback in else part"},
                {status: 500}
            )
            
        }

        return NextResponse.json(
            { message: 'Feedback added successfully' },
            { status: 200 }
        );
    } 
    catch (error) {
        console.error('Error adding feedback:', error);
        return NextResponse.json(
            { message: 'Failed to add feedback' },
            { status: 500 }
        );
    }

}