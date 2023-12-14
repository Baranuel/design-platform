import prismaClient from "@/app/network/prismaClient";
import { User } from "../../../../global";
import { ApplicationFlow } from "./ApplicationFlow";
import { ProposalPreview } from "./ProposalPreveiw";
import { getUser } from "@/app/helpers/get-user";


const getProposal = async (user:User) => {
    return await prismaClient.proposal.findFirst({
      where: {
        clientId: user.client?.id
      }
    });
}


export const Proposal = async () => {
    const user = await getUser();
    const proposal = await getProposal(user)

    return(
        <>
{!proposal ? <ApplicationFlow /> : <ProposalPreview id={user.client?.proposal?.id}  />} 
        </>

)
}