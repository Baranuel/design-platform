
import { Suspense } from "react";
import { Proposal } from "./_components/Proposal";
import { Listing } from "./_components/Listing";
import { Collaborations } from "./_components/Collaborations";
import { ClientProfile } from "./_components/ClientProfile";




export default async function Page() {


  return (
    <section className=" z-40 px-72 2xl:px-48 xl:px-32 lg:px-24 md:px-12 sm:px-4 ">
        <Suspense fallback={<div>Loading...</div>}>
      <ClientProfile/>
      </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <hr className="my-10" />
        <Listing />
        <Collaborations />
        <Proposal />
      </Suspense>
    </section>
  );
}
