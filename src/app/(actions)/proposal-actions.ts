'use server'

import { revalidatePath } from "next/cache";
import { getUserFromDb } from "../(helpers)/server/get-user-from-db";
import prismaClient from "../(network)/prismaClient";


export const createProposal = async (proposalData:any) => {
    const user = await getUserFromDb();
    const proposal = { ...proposalData, clientId: user?.client?.id };
    
   const createdProposal = await prismaClient.proposal.create({
        data: proposal
    })
    if(!createdProposal) return;

    await prismaClient.proposalListing.create({
        data: {
            proposalId: createdProposal.id,
            clientId: createdProposal.clientId
        }
    })
    revalidatePath('/profile')
}
