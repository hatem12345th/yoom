"use client"
import { useCall, VideoPreview } from '@stream-io/video-react-sdk'
import  { useEffect, useState } from 'react'

export const MeetingSetup = () => {
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
    </div>
  )
}
