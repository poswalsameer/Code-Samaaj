'use client'

import { useContext, useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react'
import userDetailContext from "../context/UserDetailContext";
import { useToast } from "@/hooks/use-toast"
import Cookies from 'js-cookie';

const Certificate = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | undefined>(undefined);
  const [currentUsername, setCurrentUsername] = useState<string>('');

  const { toast } = useToast();

  const context = useContext(userDetailContext);
  if( context === undefined ){
    throw new Error("Context not defined correctly");
  }
  const { name, setName, userEmail, setUserEmail, canGiveFeedback, setCanGiveFeedback, descriptionCharLimit, setDescriptionCharLimit, certificateDescription, setCertificateDescription } = context;

  function capitalizeWords(name: string) {
    return name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const handleGeneratePDF = () => {
   
    let username = currentUsername;
    username = capitalizeWords(username);

    if (!username) {
      toast({
        title: "Name of the user not found",
      })
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = "/certificate.jpg";

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);
      ctx.font = "700 50px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      const nameX = canvas.width / 2;
      const nameY = canvas.height / 2 + 10;
      ctx.fillText(username, nameX, nameY);

      // Set the font for the description
      ctx.font = "400 30px Arial";
      ctx.textAlign = "center";

      // Draw the description below the name
      const descriptionX = canvas.width / 2;
      const descriptionY = nameY + 70; 
      ctx.fillText(certificateDescription, descriptionX, descriptionY);

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${username}_Certificate.pdf`);
    };
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
        setCertificateDescription(data.data.description);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    const emailFromCookies = Cookies.get('authToken');
    if( emailFromCookies ){
      setCurrentUserEmail(emailFromCookies);
    }

    fetchAdminData();

    const fetchUserDetails = async () => {

      const emailInsideCookie = Cookies.get('authToken');

      try {
        const response = await fetch('/api/get-user-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailInsideCookie }),
        });
    
        const data = await response.json();
        if (response.ok) {
          setCurrentUsername(data.user.fullName);
        } else {
          console.error("Error: ", data.message);
        }
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    }

    fetchUserDetails();

  }, []);

  return (

    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Your Certificate</h2>
        </div>
        <div className="relative aspect-[1.414/1] w-full bg-gray-100 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          <img
            src="./certificate.jpg"
            alt="Certificate Preview"
            className="w-full h-full object-cover filter blur-sm"
          />
        </div>
        <div className="flex justify-center">
          <Button className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white"
          
          onClick={handleGeneratePDF}
          >
            <Download className="h-4 w-4" />
            <span>Download Certificate</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
