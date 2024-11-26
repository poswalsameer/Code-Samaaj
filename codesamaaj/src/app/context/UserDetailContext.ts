import React, { Dispatch, SetStateAction } from "react";

interface UserDetailContextType {
    userEmail: string;
    setUserEmail: Dispatch<SetStateAction<string>>;
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    canGiveFeedback: boolean;
    setCanGiveFeedback: Dispatch<SetStateAction<boolean>>;
    descriptionCharLimit: string;
    setDescriptionCharLimit: Dispatch<SetStateAction<string>>;
    authToken: boolean;
    setAuthToken: Dispatch<SetStateAction<boolean>>;
    certificateDescription: string;
    setCertificateDescription: Dispatch<SetStateAction<string>>;
  }

const userDetailContext = React.createContext<UserDetailContextType | undefined>(undefined);

export default userDetailContext;