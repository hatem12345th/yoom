"use client"
import Image from "next/image"

export const HomeCard = ({color,Logo,title,description,handleClick}) => {
  return (
    <div className={` xl:max-w-[280px] md:max-w-[280px] w-full min-h-[260px] ${color} rounded-[14px] px-4 py-6 
     flex justify-between flex-col cursor-pointer   ` }
        onClick={handleClick}
     >
        <div className="flex-center glassmorphism size-12 
            rounded-[10px]
        ">
            <Image 
                src={Logo}
                width={27}
                height={27}
                alt="hhh"
            />
        </div>
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">  {title}  </h1>
            <p className="text-lg font-normal">
                {description}
            </p>
        </div>
            


    </div>
  )
}
