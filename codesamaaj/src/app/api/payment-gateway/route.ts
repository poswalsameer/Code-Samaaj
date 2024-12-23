import { NextRequest, NextResponse } from "next/server";
import sha256 from 'crypto-js/sha256';
import { v4 as uuidv4 } from "uuid";
import axios from "axios";


export async function POST(req: NextRequest){

    const response = NextResponse.json(
        { message: "Request received successfully" },
        { status: 200 }
      );
    
      // Set the CORS headers
      response.headers.set("Access-Control-Allow-Origin", "https://code-samaaj.vercel.app");
      response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS"); 
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, X-VERIFY"); 

    console.log("Values inside env: ");
    console.log("merchant id" ,process.env.NEXT_PUBLIC_MERCHANT_ID);
    console.log("salt key" ,process.env.NEXT_PUBLIC_SALT_KEY);
    console.log("salt index" ,process.env.NEXT_PUBLIC_SALT_INDEX);

    const transactionId = "MT-"+uuidv4().toString().slice(-6);
    const merchantUserId = "MUserId-"+uuidv4().toString().slice(-6);
    // console.log("Transaction Id: ", transactionId);

    const requestPayload = {
      "merchantId": process.env.NEXT_PUBLIC_MERCHANT_ID,
      "merchantTransactionId":transactionId,
      "merchantUserId": merchantUserId,
      "amount": 100,
      "redirectUrl": `https://code-samaaj.vercel.app/api/paymentStatus/${transactionId}`,
      "redirectMode": "POST",
      "callbackUrl": `https://code-samaaj.vercel.app/api/paymentStatus/${transactionId}`,
      "mobileNumber": "9999999999",
      "paymentInstrument": {
        "type": "PAY_PAGE"
      }
    }

    const dataPayload = JSON.stringify(requestPayload);
    // console.log("This is the dataPayload: ", dataPayload);

    const payloadConvertedTo64 = Buffer.from(dataPayload).toString("base64");
    // console.log(payloadConvertedTo64);

    const fullURL = payloadConvertedTo64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
    const dataSha256 = sha256(fullURL);

    const checkSum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
    // console.log("Checksum is: ", checkSum);

    // const UAT_PAY_API_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
    const UAT_PAY_API_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

    try {
      const response = await axios.post(UAT_PAY_API_URL, {
        request: payloadConvertedTo64,
      }, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": checkSum,
        }
      });
      console.log("Response:", response.data);

      if( response.data.success === true ){
        return NextResponse.json(
            {APIResponse: response.data},
            {status: 200}
        )
      }
      else{
        return NextResponse.json(
            {message: "Error in the payment gateway config"},
            {status: 500},
        )
      }
    }
    catch(error){
      console.log("Error: ", error);
      return NextResponse.json(
        {message: "Error"},
        {status: 500},
      );
    }

}