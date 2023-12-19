import { getActiveListing } from "@/app/(database-queries)/listing-queries";
import Link from "next/link";
import { UpdateListingStatus } from "./UpdateListingStatus";



export const Listing = async () => {
  const listing = await getActiveListing();


  return (
       
      <div className="w-full h-full flex flex-col items-center justify-start gap-4">
       {listing ? (
        <>
        <UpdateListingStatus {...listing} />
         <div className="w-full h-16 p-6 flex bg-white rounded-md border-solid border-stone-200 items-center justify-start gap-3">
          <span className={`${listing.status === 'ACTIVE' ? ' bg-gradient-to-b from-green-400 to-green-600' : 'bg-amber-400'} rounded-full w-2 h-2`}></span>
          <p className="text-sm font-medium">{listing.status}</p>
         <p className="flex-grow">
         <Link href={`/listing/${listing.id}`} target="blank" className="no-underline  text-stone-900 text-sm font-semibold hover:underline">{listing?.client?.clientInformation?.companyName}</Link>
         </p>
         <span className="justify-self-end text-sm">Views:{listing.views}</span>
       </div>
        </>
       )
       : 
       <div className="w-full h-20 p-6 flex bg-stone-50 rounded-md border-solid border-stone-200 items-center justify-start gap-4">
         <span>Please publish your proposal to see an active listing</span>
        </div>
       }
      </div>

  );
};
