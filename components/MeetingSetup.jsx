"use client"
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import  { useEffect, useState } from 'react'
import { Button } from './ui/button';

export const MeetingSetup = ({setIsSetupComplete}) => {
    const [isMicCamToggledOn, setisMicCamToggledOn] = useState(false);
    const call = useCall();
    
    if(!call) {
        throw new Error('usecall must be used within Streem component')
    }
    useEffect(() => {
        if(isMicCamToggledOn){
            call?.camera.disable();
            call?.microphone.disable();
        }
        else {
            call?.camera.enable();
            call?.microphone.enable();

        }


    },[isMicCamToggledOn,call?.camera,call?.microphone])

    return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 '>
        <h1 className='text-2xl font-bold '> Setup </h1>
        <VideoPreview />
        <div className='flex h-16 items-center justify-center gap-3'> 
            <label className='flex items-center gap-2 justify-center font-black' >
                    <input type="checkbox" 
                    checked = {isMicCamToggledOn}
                    onChange={(e) => setisMicCamToggledOn(e.target.checked)}
                    />
                    Join with mic and camera off    
                
            </label>

        <DeviceSettings />
        <Button className="rouded-md bg-green-500 px-4 py-2.5 "
            onClick ={() => {
                call.join()
                setIsSetupComplete(true);
            }}
        >
            Join meeting
        </Button>
        </div>
        
  </div>
  )
}
