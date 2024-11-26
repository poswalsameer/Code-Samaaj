'use client'

import React, { useEffect, useState } from 'react'
import UserDetailContext from './UserDetailContext'

function UserDetailContextProvider({children}: {children: any}) {

  const [userEmail, setUserEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [canGiveFeedback, setCanGiveFeedback] = useState<boolean>(false);
  const [descriptionCharLimit, setDescriptionCharLimit] = useState<string>('');
  const [certificateDescription, setCertificateDescription] = useState<string>('');
  const [authToken, setAuthToken] = useState<boolean>(false);

  return (
    <UserDetailContext.Provider value={{userEmail, setUserEmail, name, setName, canGiveFeedback, setCanGiveFeedback, descriptionCharLimit, setDescriptionCharLimit, authToken, setAuthToken, certificateDescription, setCertificateDescription }} >
      {children}
    </UserDetailContext.Provider>
  )
}

export default UserDetailContextProvider
