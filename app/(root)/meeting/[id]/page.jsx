"use client"

import Loader from '@/components/Loader';
import { MeetingRoom } from '@/components/MeetingRoom';
import { MeetingSetup } from '@/components/MeetingSetup';
import  {useGetCallById}  from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import {useState} from 'react'

const Meeting = ({params}) => {
    const {id} = useParams()
    const {user,isLoaded} = useUser();
    const [setupComplete, setSetupComplete] = useState(false);

    const {call,isCallLoading} = useGetCallById(id);
    
    if(!isLoaded || isCallLoading) return <Loader />
    return (
    <main className='h-screen w-full'>
      <StreamCall call={call}  >
          <StreamTheme>
              {! setupComplete ? (
                  <MeetingSetup />
              ):(
                  <MeetingRoom />
              )}

          </StreamTheme>
      </StreamCall>




    </main>
  )
}

export default Meeting