import { Suspense } from "react";
import { ListingBanner } from "./(components)/ListingBanner";
import { RequestRow } from "./(components)/RequestRow";

export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <section className=" min-h-[calc(100vh-120px)] mt-32 px-80 2xl:px-48 xl:px-32 lg:px-24 md:px-12 sm:px-4 ">
        <h1 className="text-2xl">Profile Information</h1>
      <div className="  bg-white border-solid border-[1px] border-gray-300 rounded-md flex gap-4 h-[320px] p-6 w-full my-4 ">
        <Suspense fallback={<div>Loading...</div>}>
        <ListingBanner id={+params.id} />
      </Suspense>
      </div>
      <div className=" rounded-sm  flex gap-4 h-[120px] items-center  w-full ">
        <Suspense fallback={<div>Loading...</div>}>
        <RequestRow id={+params.id} />
      </Suspense>
      </div>
      <hr />
      {/* <ProposalPreview id={listingById?.proposalId} /> */}
    </section>
  );
}
