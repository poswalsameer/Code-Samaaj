"use client";

import { useContext, useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import userDetailContext from "../context/UserDetailContext";
import { Button } from "@/components/ui/button";
import withAuth from "../appComponents/WithAuth";
import { Textarea } from "@/components/ui/textarea";

// FLOW TO UPDATE THE DATA IN DB FROM THE FRONTEND:

function AdminPage() {
  const [currentCharLimit, setCurrentCharLimit] = useState<string>("");
  const [currentDescription, setCurrentDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const context = useContext(userDetailContext);
  if (context === undefined) {
    throw new Error("Context is not defined correctly");
  }
  const {
    canGiveFeedback,
    setCanGiveFeedback,
    descriptionCharLimit,
    setDescriptionCharLimit,
    certificateDescription,
    setCertificateDescription,
  } = context;

  // API endpoint
  const apiEndpoint = "/api/admin-control";

  // Function to update the feedback toggle
  const toggleFeedbackButton = async () => {
    try {
      setLoading(true);

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ canGiveFeedback: !canGiveFeedback }),
      });

      if (!response.ok) {
        throw new Error("Failed to update feedback state");
      }

      const data = await response.json();
      setCanGiveFeedback(data.data.canGiveFeedback);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const setDescriptionInCertificate = async () => {

    console.log("set Description button clicked");

    try {
      setLoading(true);

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: currentDescription,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update description to be added on certificate");
      }

      const data = await response.json();
      console.log("received data from the API: ", data);
      setCertificateDescription(data.data.description);
    } 
    catch (error: any){
      console.error("Error while setting the description on the certificate: ", error.message);
    }

  }

  // Function to update the character limit
  const setCharLimit = async () => {
    try {
      setLoading(true);

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          descriptionCharLimit: Number(currentCharLimit),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update description character limit");
      }

      const data = await response.json();
      setDescriptionCharLimit(data.data.descriptionCharLimit);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
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

        console.log(
          "Value of description state: ",
          data.data.description
        );

        // Update state with data from the database
        setCanGiveFeedback(data.data.canGiveFeedback);
        setDescriptionCharLimit(String(data.data.descriptionCharLimit));
        setCertificateDescription(data.data.description);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-8"
      id="bg-admin"
    >
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Settings</h1>

      <div className=" bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div className="  flex items-center justify-between">
          <Label htmlFor="feedback-toggle" className="text-gray-700">
            Enable Student Feedback
          </Label>
          <Switch
            id="feedback-toggle"
            checked={canGiveFeedback}
            onCheckedChange={toggleFeedbackButton}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="character-limit" className="text-gray-700">
            Description Character Limit
          </Label>
          <div className="flex space-x-2 items-center">
            <Input
              id="character-limit"
              type="number"
              value={currentCharLimit}
              onChange={(e) => setCurrentCharLimit(e.target.value)}
              className="max-w-xs"
            />
            <Button onClick={setCharLimit} >Set Limit</Button>
          </div>
          <p className="text-sm text-gray-500">
            Current limit: {descriptionCharLimit} characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="character-limit" className="text-gray-700">
            Certificate Description 
          </Label>
          <div className="flex space-x-2 items-center">
            <Textarea
              id="character-limit"
              value={currentDescription}
              onChange={(e) => setCurrentDescription(e.target.value)}
              className="max-w-xs"
            />
            <Button onClick={setDescriptionInCertificate}>Set Description</Button>
          </div>
          <p className="text-sm text-gray-500">
            Current description: {certificateDescription}
          </p>
        </div>

      </div>
    </div>
  );
}

export default withAuth(AdminPage);
