
import Image from "next/image"
import { clerkClient } from "@clerk/nextjs"
import { getCollaborationById } from "@/app/(database-queries)/collaboration-queries";
import { getUserFromDb } from "@/app/(helpers)/server/get-user-from-db";


export const CollaborationRow = async ({id}:{id:string}) => {

    const collaborationById = await getCollaborationById(id)
    const clerkUser = await clerkClient.users.getUser(collaborationById?.client?.user?.clerkId ?? "")
    const user = await getUserFromDb()

    return (
        <div className="h-full w-full my-4 py-4 px-2 flex flex-col gap-3 items-start ">
            <h3 className="font-medium">Client</h3>
            <div className="flex w-full h-full items-center justify-between">
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
               <span className="font-medium text-green-500">{collaborationById?.status === 'ONGOING' && user.role !=='CLIENT' &&  "In Collaboration"}</span>
            </div>
          </div> 
    )

}