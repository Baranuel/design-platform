import { getListingById } from "@/app/(database-queries)/listing-queries"


export const ListingBanner = async ({id}:{id:number}) => {
    const listingById = await getListingById(id)


    return (
        <>
          <div className=" flex flex-col w-3/5 gap-6 ">
          <span>
          <span className="text-stone-700 text-sm mb-1">Company</span>
          <h1 className="text-xl">
              {listingById?.client?.clientInformation?.companyName}
            </h1>
          </span>
          <span>
          <span className="text-stone-700 text-sm mb-1">Industry Focus</span>
            <div className="mt-1 flex gap-1">
            {listingById?.client.clientInformation?.companyIndustry.map(
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
            <p className="text-base ">{listingById?.client.clientInformation?.companyDescription}</p>
          </span>
          </div>
          <div className="w-2/5 h-full bg-stone-500 rounded-md ">
    
          </div>
          {/* <div className="h-[80px] my-4 flex items-center justify-between ">
               <div className="flex gap-2 items-center w-[200px] h-full ">
                <div className="w-12 h-12 rounded-full relative overflow-hidden bg-black">
                    <Image src={clerkUser?.imageUrl ?? ""} alt="image" fill />
                </div>
                <span className="flex  flex-col ">
                <span className="flex gap-1">
                <p className="text-base ">{clerkUser?.firstName}</p>
                <p className="text-base ">{clerkUser?.lastName}</p>
                </span>
                <span className="text-purple opacity-70">{listingById?.client.user.role}</span>
                </span>
               </div>
                {listingById && user.role === 'DESIGNER' && (  <RequestCollaborationButton listing={listingById} user={user} /> )}
          </div> */}
        </>
    )
}