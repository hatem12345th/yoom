import { cn } from '@/lib/utils'
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import {useState} from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import  EndCallButoon  from './EndCallButoon'
import Loader from './Loader'



export const MeetingRoom = () => {
  const searchParams = useSearchParams(); 
  const [layout, setLayout] = useState("speaker-left")
  const [showParticipants, setShowParticipants] = useState(false)
  const isPersonalRoom = !!searchParams.get('personal');
  
  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState();

  if(callingState !== CallingState.JOINED ) return <Loader />
  
  const CallLayout = () => {
    switch(layout){
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition='left' />  
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition='right' />

    }
  }
  
  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 '>
      <div className='relative flex size-full items-center justify-center'> 
        <div className='flex size-full max-w-[1000px] items-center'>

      <CallLayout />
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2',{'show-block':showParticipants})}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>

        <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap  '>  
            <CallControls />

      <DropdownMenu >
            <div className='flex items-center'>
            <DropdownMenuTrigger className='cursor-pointer rounded-full hover:bg-[#4c535b] bg-[#19232d] px-4 py-2' >
              <LayoutList size={20} className=''  />

            </DropdownMenuTrigger>


            </div>
          
           <DropdownMenuContent className="bg-dark-1 border-dark-1 text-white ">
            {['Grid',"Speaker-Left","Speaker-Right"].map((item,index) => (
                <div key={index}>
                  <DropdownMenuItem className="cursor-pointer"
                  onClick={() => (
                    setLayout(item.toLowerCase())
                  )}
                  >

                    {item}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className='border-dark-1' />

                </div>

            ))  }
            
            
          </DropdownMenuContent>
      </DropdownMenu>

          <CallStatsButton />

          <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
            <Users size={20} className="text-white" />
          </div>
        </button>

        {!isPersonalRoom && <EndCallButoon />}






         </div>


      </div>
    </section>
  )
}
