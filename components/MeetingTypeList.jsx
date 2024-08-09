"use client"
import { useRouter } from "next/navigation"
import { HomeCard } from "./HomeCard"
import { useState } from "react"
import { MeetingModal } from "./MeetingModal"
import { useUser } from "@clerk/nextjs"
import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useToast } from "./ui/use-toast"
import { Textarea } from "./ui/textarea"
import ReactDatePicker from "react-datepicker"

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


    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

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
        
        {!callDetails ?
         <MeetingModal
         isOpen={MeetingState === 'isScheduleMeeting'}
         onClose={() => setMeetingState(undefined)}
         title="Create metting"
        
         handleClick={createMeeting}
       >
            <div className="flex flex-col gap-2.5">
                <label className="text-base text-sky-50 text-normal leading-[22px] " >
                    Add a description
                </label>
                <Textarea  className="bg-dark-2 border-none    
                    focus-visible:ring-0
                    focus-visible:ring-offset-0
                "   
                
                    onChange={(e) => {
                        setValues({...values,description:e.target.value})
                    }}
                />
                <div className="flex w-full flex-col gap-2.5">
                    <label className="text-base text-normal 
                       leading-[22px] text-sky-50  " >
                           Select Date and Time 
                    </label>
                    <ReactDatePicker 
                        selected={values.dateTime}
                        onChange={(date) => setValues({...values,dateTime:date })}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="bg-dark-2  w-full rounded-lg p-2"
                    
                    />
                </div>
            </div>

       </MeetingModal>
            : 
            <MeetingModal
        isOpen={MeetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Meeting Created"
        className="text-center"
        buttonText="Copy Meeting Link"
        handleClick={() => {
            navigator.clipboard.writeText(meetingLink)
           toast({title:"Link copied"}) 
        }}
        image={"/icons/checked.svg"}
        buttonIcon={"/icons/copy.svg"}
      />
    
    }
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
