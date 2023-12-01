import { UserButton, auth, currentUser, SignInButton } from "@clerk/nextjs";
import { LoginButton } from "./LoginButton";

export const Navigation = async () => {
    const user =  auth();
    const current = await currentUser();



   return (
    <nav className="flex fixed top-0 w-full z-40 items-center justify-end flex-wrap bg-white shadow-sm h-16  px-4">
    <div className=''>
      {!user.userId ? <LoginButton/> : <UserButton afterSignOutUrl="/"/>}
    </div>
   </nav>
   )

}