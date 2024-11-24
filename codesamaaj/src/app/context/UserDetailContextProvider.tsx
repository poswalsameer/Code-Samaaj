'use client'

import React, { useEffect, useState } from 'react'
import UserDetailContext from './UserDetailContext'

function UserDetailContextProvider({children}: {children: any}) {

  const [userEmail, setUserEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [canGiveFeedback, setCanGiveFeedback] = useState<boolean>(false);
  const [descriptionCharLimit, setDescriptionCharLimit] = useState<string>('');
  const [authToken, setAuthToken] = useState<boolean>(false);


  useEffect(() => {
    const savedCanGiveFeedback = localStorage.getItem("canGiveFeedback");
    if (savedCanGiveFeedback !== null) {
      setCanGiveFeedback(JSON.parse(savedCanGiveFeedback));
    }
    const savedDescriptionCharLimit = localStorage.getItem("descriptionCharLimit");
    if (savedDescriptionCharLimit !== null) {
      setDescriptionCharLimit(savedDescriptionCharLimit);
    } 

  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("canGiveFeedback", JSON.stringify(canGiveFeedback));
  }, [canGiveFeedback]);

  useEffect(() => {
    localStorage.setItem("descriptionCharLimit", descriptionCharLimit);
  }, [descriptionCharLimit]);

  return (
    <UserDetailContext.Provider value={{userEmail, setUserEmail, name, setName, canGiveFeedback, setCanGiveFeedback, descriptionCharLimit, setDescriptionCharLimit, authToken, setAuthToken }} >
      {children}
    </UserDetailContext.Provider>
  )
}

export default UserDetailContextProvider
