
import { getListingById } from "@/app/(database-queries)/listing-queries"
import Image from "next/image"
import Link from "next/link"


export const ListingBanner = async ({id}:{id:number}) => {
  
    const listingById = await getListingById(id)
    const info = listingById?.client.clientInformation

    return (
        <>
          <div className=" flex flex-col w-3/5 gap-4">
          <span>
            <span className="text-stone-700 text-sm mb-1">Company</span>
            <h1 className="text-3xl">{info?.companyName}</h1>
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
          <div className=" relative w-2/5 h-full bg-stone-500 rounded-md overflow-hidden shadow-xl ">
          <Link href={`https://${info?.companyWebsite}`} target="blank" className="no-underline text-purple text-base font-medium">
            <Image className="shadow-xl" priority  src={listingById?.proposal.websiteHeroImage ?? ""} alt="company logo" fill />
          </Link>
          </div>    
   
        </>
    )
}