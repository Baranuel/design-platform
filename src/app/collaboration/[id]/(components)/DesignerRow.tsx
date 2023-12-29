import { getCollaborationById } from "@/app/(database-queries)/collaboration-queries"
import { clerkClient } from "@clerk/nextjs"
import Image from "next/image"

export const DesignerRow = async ({id}:{id:number}) => {
    const collaboration = await getCollaborationById(+id);
    const clerkUser = await clerkClient.users.getUser(collaboration?.designer.user.clerkId ?? "")

   return  <div className="flex w-full h-full items-center justify-between">
    <div className="flex gap-2 items-center w-[200px] h-full ">
        <div className="w-12 h-12 rounded-full relative overflow-hidden bg-black">
            <Image src={clerkUser?.imageUrl ?? ""} alt="image" fill />
        </div>
        <span className="flex  flex-col ">
        <span className="flex gap-1">
        <p className="text-base ">{clerkUser?.firstName}</p>
        <p className="text-base ">{clerkUser?.lastName}</p>
        </span>
        </span>

       </div>
    
    </div>
}