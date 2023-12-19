import { Suspense } from "react";
import { ClientProfile } from "./ClientProfile";
import { Listing } from "./Listing";
import { Collaborations } from "./Collaborations";
import { Proposal } from "./Proposal";

export const ClientProfilePage = async () => {
  return (
    <>
      <div className="flex flex-col gap-3 mt-24 h-[320px]">
        <h1 className="text-2xl">Profile Information</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientProfile />
        </Suspense>
      </div>

      <hr className="my-10 border-none h-[1px] bg-stone-200" />
      <div className="w-full min-h-[100px] flex flex-col gap-3 my-6 relative  ">
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
    </>
  );
};
