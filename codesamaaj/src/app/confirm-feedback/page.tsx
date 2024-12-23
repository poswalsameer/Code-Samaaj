"use client";

import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import userDetailContext from "../context/UserDetailContext";
import Cookies from "js-cookie";
import FeedbackWithAuth from "../appComponents/FeedbackWithAuth";
import LoadingSpinner from "../appComponents/Loading";

interface FeedbackData {
  overallRating: string;
  referralRating: string;
  mentorRating: string;
  mentorFeedback: string;
  nextBootcampParticipation: string;
  improvements: string;
}

function BootcampFeedback() {
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    overallRating: "",
    referralRating: "",
    mentorRating: "",
    mentorFeedback: "",
    nextBootcampParticipation: "",
    improvements: "",
  });
  const [cookieValue, setCookieValue] = useState<string | undefined>(undefined);
  const [authTokenExists, setAuthTokenExists] = useState<boolean>(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();
  const context = useContext(userDetailContext);

  const cookieToken: string | undefined = Cookies.get("authToken");

  if (context === undefined) {
    throw new Error("Context not defined correctly");
  }

  const {
    userEmail,
    setUserEmail,
    canGiveFeedback,
    setCanGiveFeedback,
    setDescriptionCharLimit,
  } = context;

  const ratingScale = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleSubmit = async (e: React.FormEvent) => {

    setLoading(true);

    e.preventDefault();

    if (
      !feedbackData.overallRating ||
      !feedbackData.referralRating ||
      !feedbackData.improvements ||
      !feedbackData.mentorFeedback ||
      !feedbackData.mentorRating ||
      !feedbackData.nextBootcampParticipation
    ) {
      toast({
        title: "Every field is required!",
      });
      setLoading(false);
    } else {
      
      try {

        setLoading(true);

        const feedbackDataToBackend = {
          email: currentUserEmail, // The unique identifier
          overallRating: feedbackData.overallRating, 
          referralRating: feedbackData.referralRating,
          mentorRating: feedbackData.mentorRating,
          mentorFeedback: feedbackData.mentorFeedback,
          nextBootcampParticipation: feedbackData.nextBootcampParticipation,
          improvements: feedbackData.improvements,
        };

        const response = await fetch("/api/submit-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(feedbackDataToBackend),
        });

        const result = await response.json();

        if (response.ok) {
          setLoading(false);
          router.push("/download-certificate");
        } else {
          setLoading(false);
          toast({
            title: "Error while adding feedback!",
          });
          console.log(`Error: ${result.message}`);
        }
      } 
      catch (error) {
        setLoading(false);
        toast({
          title: "Cannot add your feedback at this moment!",
        });
        console.error(
          "Error while adding feedback:",
          error
        );
      }
    }
  };

  useEffect(() => {

    const fetchAdminData = async () => {
      try {
        const response = await fetch("/api/admin-control", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch admin data");
        }

        const data = await response.json();

        // Update state with data from the database
        setCanGiveFeedback(data.data.canGiveFeedback);
        setDescriptionCharLimit(String(data.data.descriptionCharLimit));
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  useEffect(() => {
    if (cookieToken) {
      setAuthTokenExists(true);
      setCookieValue(cookieToken);
    } else {
      setAuthTokenExists(false);
    }
  }, [cookieToken]);

  useEffect(() => {
    // console.log(userEmail);
    const userEmailCookie = Cookies.get("authToken");
    if (userEmailCookie) {
      setCurrentUserEmail(userEmailCookie);
    }
  }, []);

  return !loading ? (
    <form
      onSubmit={handleSubmit}
      className="w-full flex justify-center items-center py-6"
      id="bg-grid-pattern-feedback"
    >
      <Card className="w-[45rem] bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Bootcamp Feedback Form
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Overall Experience Rating */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-gray-900">
              How would you rate your overall experience of this Bootcamp?{" "}
              <span className="text-red-500">*</span>
            </Label>
            <div className="space-y-2">
              <RadioGroup
                value={feedbackData.overallRating}
                onValueChange={(value: string) =>
                  setFeedbackData({ ...feedbackData, overallRating: value })
                }
                className="flex justify-between items-center"
              >
                {ratingScale.map((number) => (
                  <div key={number} className="flex items-center">
                    <RadioGroupItem
                      value={number.toString()}
                      id={`rating-${number}`}
                    />
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
              How likely are you to refer this bootcamp to your friends?{" "}
              <span className="text-red-500">*</span>
            </Label>
            <div className="space-y-2">
              <RadioGroup
                value={feedbackData.referralRating}
                onValueChange={(value: string) =>
                  setFeedbackData({ ...feedbackData, referralRating: value })
                }
                className="flex justify-between items-center"
              >
                {ratingScale.map((number) => (
                  <div key={number} className="flex items-center">
                    <RadioGroupItem
                      value={number.toString()}
                      id={`referral-${number}`}
                    />
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
              How would you rate your mentor?{" "}
              <span className="text-red-500">*</span>
            </Label>
            <div className="space-y-2">
              <RadioGroup
                value={feedbackData.mentorRating}
                onValueChange={(value: string) =>
                  setFeedbackData({ ...feedbackData, mentorRating: value })
                }
                className="flex justify-between items-center"
              >
                {ratingScale.map((number) => (
                  <div key={number} className="flex items-center">
                    <RadioGroupItem
                      value={number.toString()}
                      id={`mentor-${number}`}
                    />
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
              Drop a feedback for your mentor{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={feedbackData.mentorFeedback}
              onChange={(e: any) =>
                setFeedbackData({
                  ...feedbackData,
                  mentorFeedback: e.target.value,
                })
              }
              className="min-h-[100px] bg-white"
              placeholder="Your feedback..."
            />
          </div>

          {/* Future Participation */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-gray-900">
              And finally... Would you participate in our next Bootcamp?{" "}
              <span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              value={feedbackData.nextBootcampParticipation}
              onValueChange={(value: string) =>
                setFeedbackData({
                  ...feedbackData,
                  nextBootcampParticipation: value,
                })
              }
              className="flex flex-col space-y-2"
            >
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
              What improvements do you expect in the next Bootcamp?{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={feedbackData.improvements}
              onChange={(e: any) =>
                setFeedbackData({
                  ...feedbackData,
                  improvements: e.target.value,
                })
              }
              className="min-h-[100px] bg-white"
              placeholder="Your suggestions..."
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-gray-900 text-white hover:bg-gray-700"
            disabled={!canGiveFeedback}
          >
            Submit Feedback
          </Button>
        </CardFooter>
      </Card>
    </form>
  ) : (
    <LoadingSpinner size={30} textSize="text-lg" />
  );
}

export default FeedbackWithAuth(BootcampFeedback);