import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){

    const data = await request.formData();
    console.log("Data from the FE: ", data);

    const status = data.get("code");
    const merchantId = data.get("merchantId");
    const transactionId = data.get("transactionId");

    console.log("All the values which we are getting: ", status, merchantId, transactionId);

    console.log("Salt index: ", process.env.NEXT_PUBLIC_SALT_INDEX);
    console.log("Salt key: ", process.env.NEXT_PUBLIC_SALT_KEY);

    //VERIFYING THE CHECKSUM

    const checkSumString = `/pg/v1/status/${merchantId}/${transactionId}` + process.env.NEXT_PUBLIC_SALT_KEY;

    const dataSHA256 = sha256(checkSumString);
    console.log("dataSHA256: ", dataSHA256.toString());


    const checkSum = dataSHA256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
    console.log("Final checkSum: ", checkSum);

    const options = {
        method: "GET",
        url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${transactionId}`,
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": checkSum,
            "X-MERCHANT-ID": `${merchantId}`,
        }
    }

    try {
        const response = await axios.request(options);
        console.log("Response data code: ", response.data.code);
        if( response.data.code === "PAYMENT_SUCCESS" ){
            // const baseUrl = 'http://localhost:3000';
            const baseUrl = 'https://codesamaajcertification.vercel.app' 
            return NextResponse.redirect(`${baseUrl}/payment-successful?paymentStatus=${encodeURIComponent("success")}`, {
                status: 301,
            });
        }
        else{
            return NextResponse.redirect("http://localhost:3000/payment-failed", {
                status: 301,
            })
        }
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({
            message: "Internal Server Error"
        }, {
            status: 500
        });
    }

}