'use server'

import { revalidatePath } from "next/cache";
import { getUserFromDb } from "../helpers/server/get-user-from-db";
import prismaClient from "../(network)/prismaClient";


export const createProposal = async (proposalData:any) => {
    const user = await getUserFromDb();
    const proposal = { ...proposalData, clientId: user?.client?.id };
   await prismaClient.proposal.create({
        data: proposal
    })
    revalidatePath('/profile')
}


export const publishProposal = async (proposalId:number) => {

    await prismaClient.proposal.update({
        where: {id: proposalId},
        data: {status: 'PUBLISHED'}
    })
    revalidatePath('/profile')
}
