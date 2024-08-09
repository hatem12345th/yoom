import Image from "next/image"
import Link from "next/link"
import { MobileNav } from "./MobileNav"
import {
   SignedIn,
  UserButton,
  SignedOut,
  SignInButton
} from '@clerk/nextjs'

export const Navbar = () => {
  return (
    <nav className="flex-between f fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10  ">
          <Link href={"/"} className="items-center flex-between gap-2" >
          <Image 
            src="/icons/logo.svg"
            width={45}
            height={45}
              alt="yoom logo"
          className="max-sm:size-10"
          />
 <p className="text-[26px] flex-between font-extrabold text-white max-sm:hidden">
          YOOM
        </p>
      
          </Link>
      <div className=" flex-between   gap-5">
        {/*    Clerk User Management */}
        <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        <MobileNav />
      </div>

          
    </nav>
  )
}
