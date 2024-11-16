import React, { Dispatch, SetStateAction } from "react";

interface UserDetailContextType {
    userEmail: string;
    setUserEmail: Dispatch<SetStateAction<string>>;
    name: string;
    setName: Dispatch<SetStateAction<string>>;
  }

const userDetailContext = React.createContext<UserDetailContextType | undefined>(undefined);

export default userDetailContext;