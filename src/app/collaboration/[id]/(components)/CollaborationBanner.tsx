import { getCollaborationById } from "@/app/(database-queries)/collaboration-queries"
import { getUser } from "@/app/(database-queries)/user-queries"
import { clerkClient } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { permanentRedirect } from "next/navigation"


export const CollaborationBanner = async ({id}:{id:string}) => {
    const user = await getUser();
    const collaboration = await getCollaborationById(id)
    if(!collaboration) return permanentRedirect('/profile')
    
    if( user.role === 'CLIENT')  {
      collaboration?.client.id !== user?.client?.id && permanentRedirect('/listings')
    }

    if( user.role === 'DESIGNER')  {
      collaboration?.designer.id !== user?.designer?.id && permanentRedirect('/profile')
    }
    const clerkUser = await clerkClient.users.getUser(collaboration?.client?.user?.clerkId ?? "")
    const info = collaboration?.client.clientInformation

    return (
        <>
          <div className=" flex flex-col w-3/5 gap-6 ">
          <span>
            <span className="text-stone-700 text-sm mb-1">Company</span>
            <h1 className="text-xl">{info?.companyName}</h1>
          </span>
        <div className="flex gap-4">
          <span className="min-w-[110px]">
            <span className="text-stone-700 text-sm mb-1">Company Website</span>
            <p>
            <Link href={`https://${info?.companyWebsite}`} target="blank" className="no-underline text-purple text-base font-medium">{info?.companyWebsite} </Link>
            </p>
          </span>
        </div>
          <span>
          <span className="text-stone-700 text-sm mb-1">Industry Focus</span>
            <div className="mt-1 flex gap-1">
            {collaboration?.client.clientInformation?.companyIndustry.map(
                (category, index) => (
                  <span
                    className="p-1  bg-orange/5 border border-solid border-orange/50 font-semibold rounded-md text-xs text-orange"
                    key={index}>
                    {category}
                  </span>
                )
              )}
            </div>
          </span>
          <span>
          <span className="text-stone-700 text-sm mb-1">Company Description</span>
            <p className="text-base ">{collaboration?.client.clientInformation?.companyDescription}</p>
          </span>
          </div>
          <div className="  relative w-2/5  max-h-[280px] bg-stone-500 rounded-md overflow-hidden shadow-xl ">
          <Link href={`https://${info?.companyWebsite}`} target="blank" >
            <Image  priority  src={collaboration?.client?.proposal?.websiteHeroImage ?? ""} alt="company logo" fill />
          </Link>
          </div>    
   
        </>
    )
}