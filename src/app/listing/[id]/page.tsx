import { getListingById } from "@/app/(database-queries)/listing-queries"
import { clerkClient } from "@clerk/nextjs";
import Image from "next/image";
import { RequestCollaborationButton } from "./(components)/RequestCollaborationButton";
import { getUser } from "@/app/(database-queries)/user-queries";




export default async function ListingPage ({
    params,
    searchParams,
  }: {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }) {
    const user = await getUser();
    const listingById = await getListingById(+params.id)
    const clerkUser = await clerkClient.users.getUser(listingById?.client?.user?.clerkId ?? "");

    return (
        <section className=" min-h-[calc(100vh-120px)] mt-32 px-80 2xl:px-48 xl:px-32 lg:px-24 md:px-12 sm:px-4 ">
          <div className=" rounded-sm bg-white border-solid border-stone-200 flex gap-4 h-[320px] p-6 w-full ">
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
          </div>
          <div className="h-[80px] my-4 flex items-center justify-between ">
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
          </div>
          <hr />
          {/* <ProposalPreview id={listingById?.proposalId} /> */}
        </section>
    )   
}