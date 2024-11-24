'use client'

import { useContext, useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import userDetailContext from '../context/UserDetailContext'
import { Button } from '@/components/ui/button'
import withAuth from '../appComponents/WithAuth'

function AdminPage() {

  const [currentCharLimit, setCurrentCharLimit] = useState<string>('');

  const context = useContext(userDetailContext);

  if( context === undefined ){
    throw new Error("Context is not defined correctly");
  }

  const { canGiveFeedback, setCanGiveFeedback, descriptionCharLimit, setDescriptionCharLimit } = context;

  const toggleFeedbackButton = () => {
    console.log("Value before toggling: ", canGiveFeedback);
    setCanGiveFeedback( (prev) => (!prev));
  }

  const changeCharLimit = (e: any) => {
    // console.log("Value before changing the description limit: ", );
    setCurrentCharLimit(e.target.value);
  }

  const setCharLimit = () => {
    setDescriptionCharLimit(currentCharLimit);
  }
  

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8"
    id='bg-admin'
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
              onChange={changeCharLimit}
              className="max-w-xs"
            />
            <Button onClick={setCharLimit}>
              Set Limit
            </Button>
          </div>
          <p className="text-sm text-gray-500">Current limit: {descriptionCharLimit} characters</p>
        </div>

      </div>
    </div>
  )
}

export default withAuth(AdminPage)