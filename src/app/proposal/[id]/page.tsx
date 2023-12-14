import prismaClient from "@/app/network/prismaClient";
import { ProposalPreview } from "@/app/profile/_components/ProposalPreveiw";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { Button } from "antd";
import Image from "next/image";

const getProposal = async (id: number) => {
  return await prismaClient.proposal.findUnique({
    where: {
      id: id,
    },
    include: {
      client: {
        include: {
          user: true,
          clientInformation: true,
        },
      },
    },
  });
};

export default async function ProposalPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const proposal = await getProposal(+id);
  const clerkUser = await clerkClient.users.getUser(proposal?.client?.user?.clerkId ?? "");

  return (
    <section className=" min-h-[calc(100vh-120px)] mt-32 px-80 2xl:px-48 xl:px-32 lg:px-24 md:px-12 sm:px-4 ">
      <div className=" rounded-sm bg-white border-solid border-stone-200 flex gap-4 h-[320px] p-6 w-full ">
      <div className=" flex flex-col w-3/5 gap-6 ">
      <span>
      <span className="text-stone-700 text-sm mb-1">Company</span>
      <h1 className="text-xl">
          {proposal?.client?.clientInformation?.companyName}
        </h1>
      </span>
      <span>
      <span className="text-stone-700 text-sm mb-1">Industry Focus</span>
        <div className="mt-1 flex gap-1">
        {proposal?.client.clientInformation?.companyIndustry.map(
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
        <p className="text-base ">{proposal?.client.clientInformation?.companyDescription}</p>
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
            <span className="text-purple opacity-70">{proposal?.client.user.role}</span>
            </span>
           </div>
            <Button type="primary" className="rounded-md min-h-[40px]">Request Collaboration</Button>
      </div>
      <hr />
      <ProposalPreview id={+id} />
    </section>
  );
}
