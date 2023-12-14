
import { Button } from "antd";
import Image from "next/image";
import { ApplicationFlow } from "./ApplicationFlow";
import prismaClient from "@/app/network/prismaClient";
import { ProposalPreview } from "./ProposalPreveiw";
import { User } from "../../../../global";
import { currentUser } from "@clerk/nextjs";


export interface BannerProps {
  user: User;
}
const getProposal = async (user:User) => {
    return await prismaClient.proposal.findFirst({
      where: {
        clientId: user.client?.id
      }
    });
}

const getQuestions = async () => {
    return await prismaClient.question.findMany();
}

export const ProfileBannerClient = async  ({ user }: BannerProps) => {
const clerkUser = await currentUser()
const proposal = await getProposal(user)
const questions = await getQuestions()

const info = user.client?.clientInformation 

  return (
    <section>
      <div className="flex gap-4 border-b border-black mt-[100px] w-full min-h-fit pb-12">
        <div className="w-1/5 justify-center items-center flex">
          <div className="bg-blue-500 relative rounded-full w-32 h-32 overflow-hidden">
            <Image src={clerkUser?.imageUrl ?? ""} alt="user picture" fill />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full items-start mt-4">
          <span className="w-full flex justify-between items-center text-xl">
            <h2>
              {info?.companyName}{" "}
              <span className="text-purple ml-2">{user.role}</span>
            </h2>
            <Button className="min-w-[120px]">Edit</Button>
          </span>
          {/* Profile Information*/}
          <div className="flex gap-12 justify-between w-full h-38 ">
            <div className="flex flex-col gap-1 w-1/2 bg-white h-full">
              <span className="flex gap-2">
                <span className="text-sm">Business Owner:</span>{" "}
                <span className="font-semibold">{clerkUser?.firstName}</span>
              </span>
              <span className="flex gap-2">
                <span className="text-sm">Company Size:</span>{" "}
                <span className="font-semibold">
                  {info?.companySize}
                </span>
              </span>
              <span className="flex flex-col gap-2">
                <span className="text-sm">Industry Focus:</span>
                <span className="flex  gap-2 ">
                  {info?.companyIndustry.map((item, index) => (
                    <span
                      key={index}
                      className="whitespace-nowrap rounded-md flex items-center text-sm font-medium border border-solid border-orange text-orange bg-orange/5 p-1"
                    >
                      {item}
                    </span>
                  ))}
                </span>
              </span>
            </div>
            <div className="flex flex-col  gap-1 w-fit bg-white h-full">
              <span className="flex gap-2">
                <span className="text-sm">Country:</span>{" "}
                <span className="font-semibold">{user.country}</span>
              </span>
              <span className="flex gap-2">
                <span className="text-sm">Zip:</span>{" "}
                <span className="font-semibold">{user.postalCode}</span>
              </span>
           
            </div>
          </div>
        </div>
      </div>
      <hr className="border-none h-[1px] bg-stone-300" />
      <div className="min-h-[400px] flex flex-col p-12  gap-4 items-start">
        <div className="w-full bg-purple h-10"></div>
        <div className="w-full bg-purple h-10"></div>
        <div className="w-full bg-purple h-10"></div>
      </div>
      <hr className="border-none h-[1px] bg-stone-300" />
     {!proposal ? <ApplicationFlow /> : <ProposalPreview questions={questions} proposal={proposal} />}
    </section>
  );
};
