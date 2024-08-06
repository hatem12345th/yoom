"use client"
import { useRouter } from "next/navigation"
import { HomeCard } from "./HomeCard"
import { useState } from "react"
import { MeetingModal } from "./MeetingModal"
import { useUser } from "@clerk/nextjs"
import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useToast } from "./ui/use-toast"

export const MeetingTypeList = () => {
    const router = useRouter()
    const [MeetingState, setMeetingState] = useState("")
    const {user} = useUser()
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime:new Date(),
        description:'',
        link:'',
    })
    const {toast} = useToast()
    const [callDetails, setCallDetails] = useState()
    
    
    const createMeeting = async () => {
        if(!client || !user ) return;

        try {
            if(!values.dateTime){
                toast({title:"Please select a date and time"})
                return;
            }
        const id = crypto.randomUUID();
        const call = client.call('default',id);
        if(!call) throw Error('Failed to create call')
         const startAt =   values.dateTime.toISOString() || new Date(Date.now()).toISOString();
        const description = values.description || 'Isntant meeting';
        
        await call.getOrCreate({
            data:{
                starts_at:startAt,
                custom:{
                    description
                }
            }
        })
        setCallDetails(call);
        if(!values.description){
            router.push(`/meeting/${call.id}`)
        }


                toast({title:"Meeting Created"})
        } catch (error) {
            console.log(error);
            toast({
                title:"  failed to create meeting"
            })
        }

    }
    return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5  place-items-center    ">

        <HomeCard color={"bg-orange-1"} Logo={"/icons/add-meeting.svg"} title={"New Meeting"}  description={"Setup a new recording"} 
            handleClick={() => setMeetingState("isInstantMeeting")}
        />
        <HomeCard color={"bg-blue"} Logo={"/icons/join-meeting.svg"} title={"Join Meeting"} description={"via invitation link"} 
            handleClick={() => setMeetingState("isScheduleMeeting")}      
        />
        <HomeCard color={"bg-purple-1"} Logo={"/icons/upcoming.svg"} title={"Schedule Meeting"} description={"Plan your meeting"}  
            handleClick={() => setMeetingState("")}
        />
        <HomeCard color={"bg-yellow-1"} Logo={"/icons/Video.svg"}  title={"View Recordings"} description={"Meeting recordings"} 
            handleClick={() => router.push("/recordings")}
        />
        

        <MeetingModal
        isOpen={MeetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

    </section>
  )
}
