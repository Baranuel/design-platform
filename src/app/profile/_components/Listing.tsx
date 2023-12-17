import { axiosInstance } from "@/app/network/axios-instance";
import { auth } from "@clerk/nextjs";
import { cache } from "react";
import { UserListing } from "../../../../global";

const getActiveListing = cache( async () => {
   const {getToken} =  auth();
    const token = await getToken();
    const {data } = await axiosInstance.get<UserListing>("/listing", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return  data
  })

export const Listing = async () => {
  const listing = await getActiveListing();

  return (
    <div className="w-full min-h-[250px] flex flex-col gap-3   ">
      <h1>Active Listing</h1>
      <div className="w-full h-full flex flex-col items-center justify-start gap-4">
       {listing ? (
         <div className="w-full h-20 p-6 flex bg-white rounded-md border-solid border-stone-200 items-center justify-start gap-4">
         <span>{listing?.client?.clientInformation?.companyName}</span>
       </div>
       )
       : 
       <div className="w-full h-20 p-6 flex bg-stone-100 rounded-md border-solid border-stone-300 items-center justify-start gap-4">
         <span>Please publish your proposal to see an active listing</span>
        </div>
       }
      </div>
    </div>
  );
};
