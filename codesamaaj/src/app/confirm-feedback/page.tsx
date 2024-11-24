"use client"

import { useContext, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import userDetailContext from "../context/UserDetailContext"
import Cookies from 'js-cookie';

interface FeedbackData{
  overallRating: string;
  referralRating: string;
  mentorRating: string;
  mentorFeedback: string;
  nextBootcampParticipation: string;
  improvements: string;
}

export default function BootcampFeedback() {

  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    overallRating: '',
    referralRating: '',
    mentorRating: '',
    mentorFeedback: '',
    nextBootcampParticipation: '',
    improvements: ''
  })
  const [cookieValue, setCookieValue] = useState<string | undefined>(undefined);
  const [authTokenExists, setAuthTokenExists] = useState<boolean>(false);

  const router = useRouter()
  const { toast } = useToast()
  const context = useContext(userDetailContext);

  const cookieToken: string | undefined = Cookies.get('authToken');

  if( context === undefined ){
    throw new Error("Context not defined correctly");
  }

  const { canGiveFeedback } = context;

  const ratingScale = Array.from({ length: 10 }, (_, i) => i + 1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if( !feedbackData.overallRating || !feedbackData.referralRating || !feedbackData.improvements || !feedbackData.mentorFeedback || !feedbackData.mentorRating || !feedbackData.nextBootcampParticipation ){
      toast({
        title: "Every field is required!",
      });
    }
    else{
      console.log("The data from the state is: ", feedbackData);
    }

  }

  useEffect( () => {
    
    if( cookieToken ){
      setAuthTokenExists(true);
      setCookieValue(cookieToken);
    }
    else{
      setAuthTokenExists(false);
    }
    
  }, [cookieToken] )

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center items-center py-6"
    id="bg-grid-pattern-feedback"
    >
      <Card className="w-[45rem] bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Bootcamp Feedback Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Overall Experience Rating */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-gray-900">
              How would you rate your overall experience of this Bootcamp? <span className="text-red-500">*</span>
            </Label>
            <div className="space-y-2">
              <RadioGroup
                value={feedbackData.overallRating}
                onValueChange={ (value: string) => setFeedbackData({...feedbackData, overallRating: value}) }
                className="flex justify-between items-center"
              >
                {ratingScale.map((number) => (
                  <div key={number} className="flex items-center">
                    <RadioGroupItem value={number.toString()} id={`rating-${number}`} />
                  </div>
                ))}
              </RadioGroup>
              <div className="flex justify-between px-4">
                {ratingScale.map((number) => (
                  <span key={number} className="text-xs text-gray-400">
                    {number}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Referral Rating */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-gray-900">
              How likely are you to refer this bootcamp to your friends? <span className="text-red-500">*</span>
            </Label>
            <div className="space-y-2">
              <RadioGroup
                value={feedbackData.referralRating}
                onValueChange={ (value: string) => setFeedbackData({...feedbackData, referralRating: value }) }
                className="flex justify-between items-center"
              >
                {ratingScale.map((number) => (
                  <div key={number} className="flex items-center">
                    <RadioGroupItem value={number.toString()} id={`referral-${number}`} />
                  </div>
                ))}
              </RadioGroup>
              <div className="flex justify-between px-4">
                {ratingScale.map((number) => (
                  <span key={number} className="text-xs text-gray-400">
                    {number}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mentor Rating */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-gray-900">
              How would you rate your mentor? <span className="text-red-500">*</span>
            </Label>
            <div className="space-y-2">
              <RadioGroup
                value={feedbackData.mentorRating}
                onValueChange={ (value: string) => setFeedbackData({...feedbackData, mentorRating: value }) }
                className="flex justify-between items-center"
              >
                {ratingScale.map((number) => (
                  <div key={number} className="flex items-center">
                    <RadioGroupItem value={number.toString()} id={`mentor-${number}`} />
                  </div>
                ))}
              </RadioGroup>
              <div className="flex justify-between px-4">
                {ratingScale.map((number) => (
                  <span key={number} className="text-xs text-gray-400">
                    {number}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mentor Feedback Text Area */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-gray-900">
              Drop a feedback for your mentor <span className="text-red-500">*</span>
            </Label>
            <Textarea 
            value={feedbackData.mentorFeedback}
            onChange={ (e:any) => setFeedbackData({...feedbackData, mentorFeedback: e.target.value}) }
            className="min-h-[100px] bg-white" placeholder="Your feedback..." />
          </div>

          {/* Future Participation */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-gray-900">
              And finally... Would you participate in our next Bootcamp? <span className="text-red-500">*</span>
            </Label>
            <RadioGroup 
            value={feedbackData.nextBootcampParticipation} 
            onValueChange={(value: string) => setFeedbackData({...feedbackData, nextBootcampParticipation: value}) } 
            className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="participation-yes" />
                <Label htmlFor="participation-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="participation-no" />
                <Label htmlFor="participation-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Improvements Text Area */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-gray-900">
              What improvements do you expect in the next Bootcamp? <span className="text-red-500">*</span>
            </Label>
            <Textarea 
            value={feedbackData.improvements}
            onChange={ (e:any) => setFeedbackData({...feedbackData, improvements: e.target.value}) }
            className="min-h-[100px] bg-white" placeholder="Your suggestions..." />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-gray-900 text-white hover:bg-gray-700"
          disabled={!canGiveFeedback || !authTokenExists }
          >
            Submit Feedback
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}






























// "use client";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useContext, useState } from "react";
// import { useRouter } from "next/navigation";
// import userDetailContext from "../context/UserDetailContext";
// import { useToast } from "@/hooks/use-toast"

// export default function Component() {
//   const usernameData = [
//     "Mohammed Sayyan",
//     "BHUVANESH M",
//     "Shamikh Ali",
//     "Bibi Amna",
//     "Abdul Rahiman Almaz",
//     "Kushi Jeej",
//     "Riya kp",
//     "Hania Shameer",
//     "Rana fathima",
//     "Carol Joseph Biju",
//     "Aswin Biju",
//     "TANISH",
//     "ArdhendhuBhushanBabu",
//     "Hiza Rafi",
//     "Hafis A Musthafa",
//     "Parthiv Sushil",
//     "Risa fathima",
//     "Afham umar",
//     "Sabareesh ms",
//     "Amartya Menon PP",
//     "Mohammad Ismail Hasan",
//     "Abdul khadir wazeer",
//     "Aamir Umar",
//     "Fathima Insha K",
//     "AHAMMED JASIR",
//     "Abdul haseeb mk",
//     "Muhammed lehen c",
//     "Sharfas M",
//     "Jaseena Hameed",
//     "Rumailath Rafeeq",
//     "Ienaas Adnan Ali",
//     "Alan mathew",
//     "Kevin Johnson",
//     "NIHA VINOD V",
//     "Adish Bhaskar kk",
//     "Alen Lawrence",
//     "Joyal jude mp",
//     "Ganavi Nagaraj",
//     "Jwel Kangjam",
//     "Jince babu",
//     "Gokul C Sunoj",
//     "Janaki Ravi Prasad",
//     "Raihaan Ismail Jukaku",
//     "Hakkim Munnisa",
//     "A Afran",
//     "Afnan Khan",
//     "Mashood ali PP",
//     "Ifa fathima k",
//     "Jiya Gopal",
//     "Mahammad rahil",
//     "Devapriya P",
//     "Mohammed Ramzi N V",
//     "Jerohn Augustin",
//     "Muhammed Afras",
//     "Mohammed Bilal",
//     "Loona Najaa C P",
//     "Fathimath Fida Z",
//     "Muhammad Shiyas",
//     "Ramees Muhammed",
//     "MOHAMMED NIHAL.M",
//     "Archana.O",
//     "Kadeeja Rifna",
//     "Mariyam Farseena",
//     "Khadeeja Mehjabin",
//     "Mahammad thameez",
//     "Siva Nandan.V.S",
//     "MUHAMMAD RAZIK",
//     "Adithyan M R",
//     "Muhammad Safwanul Ansar",
//     "ABHINAV G",
//     "Muhammed Sahal mc",
//     "Anisha Andrade",
//     "ADIL PV",
//   ];

//   const lowerCaseUsernames = usernameData.map((username) =>
//     username.toLowerCase()
//   );
//   console.log(lowerCaseUsernames);

//   const correctFormLinkFirst = "https://docs.google.com/forms";
//   const correctFormLinkSecond = "formResponse";
//   const correctFormLinkThird = "alreadyresponded";

//   const [formLink, setFormLink] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   const { toast } = useToast();

//   const context = useContext(userDetailContext);
//   if (context === undefined) {
//     throw new Error("Context is not correctly defined");
//   }
//   const { name, setName } = context;

//   const router = useRouter();

//   const handleData = (e: any) => {

//     if( name === "" ){
//       toast({
//         title: "Full Name is required",
//       })
//     }
//     if( formLink === "" ){
//       toast({
//         title: "Form Link is required",
//       })
//     }

//     setLoading(true);

//     e.preventDefault();

//     const lowercaseName = name.toLowerCase();
//     const isNamePresent = lowerCaseUsernames.includes(lowercaseName);

//     const isSecondParameterCorrect = formLink.includes(correctFormLinkSecond) || formLink.includes(correctFormLinkThird);

//     const isLinkCorrect = formLink.includes(correctFormLinkFirst) && isSecondParameterCorrect;

//     if (isNamePresent === true && isLinkCorrect === true) {
//       setName(lowercaseName);
//       router.push("/download-certificate");
//       setLoading(false);
//     } else {

//       if( lowercaseName.length>0 && isNamePresent === false ){
//         toast({
//           title: "Name not found in the database",
//         })
//       }
//       if( formLink.length>0 && isLinkCorrect === false ){
//         toast({
//           title: "Link entered is not correct",
//         })
//       }

//       console.log("No match");
//       console.log("Value of isLinkCorrect: ", isLinkCorrect);
//       console.log("Value of isNamePresent: ", isNamePresent);
//       console.log("Lowercase username: ", lowercaseName);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="w-full max-w-xl space-y-8">
//           <div className="text-center">
//             <div className="mx-auto h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
//               <svg
//                 className="h-8 w-8 text-gray-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//             </div>
//             <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//               Access Certificate
//             </h2>
//             <p className="mt-2 text-sm text-gray-600">
//               Enter your full name and the link of the feedback submission
//               success page
//             </p>
//           </div>
//           <form className="mt-8 space-y-6">
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="fullName" className="sr-only">
//                   Full Name
//                 </label>
//                 <Input
//                   id="fullName"
//                   name="fullName"
//                   type="text"
//                   autoComplete="name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
//                   placeholder="Full Name"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="formLink" className="sr-only">
//                   Link
//                 </label>
//                 <Input
//                   id="formLink"
//                   name="formLink"
//                   type="url"
//                   value={formLink}
//                   onChange={(e) => setFormLink(e.target.value)}
//                   required
//                   className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
//                   placeholder="Form Link"
//                 />
//               </div>
//             </div>
//             <div>
//               <Button
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                 onClick={handleData}
//               >
//                 Access Certificate
//               </Button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }
