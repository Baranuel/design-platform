
import Image from "next/image"
import { clerkClient } from "@clerk/nextjs"
import { getUser } from "@/app/(database-queries)/user-queries";
import { RequestCollaborationButton } from "./RequestCollaborationButton";
import { getListingById } from "@/app/(database-queries)/listing-queries";


export const RequestRow = async ({id}:{id:number}) => {
    const user  = await getUser()
    const clerkUser = await clerkClient.users.getUser(user.clerkId)
    const listingById = await getListingById(id)
    return (
        <div className="h-[80px] w-full my-4 p-4 flex items-center justify-between ">
               <div className="flex gap-2 items-center w-[200px] h-full ">
                <div className="w-12 h-12 rounded-full relative overflow-hidden bg-black">
                    <Image src={clerkUser?.imageUrl ?? ""} alt="image" fill />
                </div>
                <span className="flex  flex-col ">
                <span className="flex gap-1">
                <p className="text-base ">{clerkUser?.firstName}</p>
                <p className="text-base ">{clerkUser?.lastName}</p>
                </span>
                <span className="text-purple opacity-70">{user.role}</span>
                </span>
               </div>
                {listingById && user.role === 'DESIGNER' && (  <RequestCollaborationButton listing={listingById} user={user} /> )}
          </div> 
    )

}