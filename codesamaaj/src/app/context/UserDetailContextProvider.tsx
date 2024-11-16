'use client'

import React, { useState } from 'react'
import UserDetailContext from './UserDetailContext'

function UserDetailContextProvider({children}: {children: any}) {

  const [userEmail, setUserEmail] = useState<string>('');
  const [name, setName] = useState<string>('');

  return (
    <UserDetailContext.Provider value={{userEmail, setUserEmail, name, setName}} >
      {children}
    </UserDetailContext.Provider>
  )
}

export default UserDetailContextProvider
