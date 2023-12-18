import { Suspense } from "react";
import { Listing } from "./(components)/Listing";
import { ClientProfile } from "./(components)/ClientProfile";
import { Proposal } from "./(components)/Proposal";
import { Collaborations } from "./(components)/Collaborations";

export default async function Page() {
  return (
    <section className=" z-40 px-72 2xl:px-48 xl:px-32 lg:px-24 md:px-12 sm:px-4 ">
         <div className="flex flex-col gap-3 mt-24 h-[320px]">
        <h1 className="text-2xl">Profile Information</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientProfile />
      </Suspense>
    </div>

      <hr className="my-10" />
      <div className="w-full min-h-[200px] flex flex-col gap-3 my-6 relative  ">
        <h1>Active Listings</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Listing />
      </Suspense>
      </div>


      <div className="w-full min-h-[200px] h-[200px] flex flex-col gap-3 my-6  ">
        <h1>Ongoing Collaborations</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Collaborations />
      </Suspense>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Proposal />
      </Suspense>
    </section>
  );
}
