import { MeetingTypeList } from '@/components/MeetingTypeList';
import React from 'react'

const Home= () => {
    const time = new Date().toLocaleTimeString("en-Us",{hour:'2-digit',minute:'2-digit'});
    const date = new Intl.DateTimeFormat('en-Us',{
      dateStyle:'full'
    }).format(new Date())
    

  return (
    <section className='flex size-full flex-col gap-10  '>
        <div className='h-[300px]  bg-cover
          w-full rounded-[20px] bg-hero'>
            <div className='flex h-full flex-col justify-between max-md:px-5  max-md:py-8 
             lg:p-11 '>
                <h2 className='glassmorphism w-[273px] h-[42px] top-9 left-11 py-[10px] px-[14px] gap-[7px] 
                 font-normal text-base text-center rounded'>  Upcoming Meeting at: 12:30 PM  </h2>
                <div className='flex flex-col gap-2'> 
                <h1 className='text-4xl lg:text-7xl font-extrabold'>
                    {time}   
                  </h1>
                 <p className='text-lg font-medium text-sky-1'> {date}  </p>
                </div>
              </div>  

          </div>        

        <MeetingTypeList />

 
        
    </section>
  )
}

export default Home