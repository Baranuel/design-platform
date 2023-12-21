import { UserButton, auth, currentUser, SignInButton } from "@clerk/nextjs";
import { LoginButton } from "./LoginButton";
import { ProfileButton } from "./ProfileButton";
import Link from "next/link";
import { Notifications } from "./Notifications";
import { getUser } from "@/app/(database-queries)/user-queries";


export const Navigation = async () => {
    const clerkUser =  auth();




   return (
    <nav className="flex gap-3 fixed top-0 w-full z-40 items-center justify-end flex-wrap bg-white shadow-sm h-16  px-6">
     {clerkUser.userId ? <Notifications /> : null}
      <Link className="no-underline" href="/" >Home</Link>
      <Link className="no-underline" href="/listings" >Listings</Link>
    <div className=''>
      {!clerkUser.userId ? <LoginButton/> : <ProfileButton/>}
    </div>
   </nav>
   )

}