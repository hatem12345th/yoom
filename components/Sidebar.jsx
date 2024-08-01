"use client"

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const Sidebar = () => {
  const pathname = usePathname()
  return (
    <section className='bg-dark-1 h-screen w-fit lg:w-[264px] 
    flex flex-col justify-between p-6 pt-28 max-sm:hidden
        left-0 top-0
    '>
        <div className='flex flex-col gap-6'>
        {sidebarLinks.map((link) => {
              const isActive = pathname === link.route || pathname.startsWith(link.route)
            return (
              <Link 
              href={link.route} 
              key={link.label}
              className={cn('flex gap-4 items-center p-4 rounded-lg justify-start',{
                'bg-blue':isActive,
              })}
              >
                {link.label}
              </Link>
            )
        }) }
        </div>



    </section>
  )
}
