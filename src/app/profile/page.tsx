
import { Suspense } from "react";
import { Listing } from "./_components/Listing";
import { ClientProfile } from "./_components/ClientProfile";
import { Proposal } from "./_components/Proposal";


export default async function Page() {


  return (
    <section className=" z-40 px-72 2xl:px-48 xl:px-32 lg:px-24 md:px-12 sm:px-4 ">

      <ClientProfile/>

          <hr className="my-10" />
        <Suspense fallback={<div>Loading...</div>}>
        <Listing />
        </Suspense>
        {/* <Collaborations /> */}
        <Proposal />

    </section>
  );
}
