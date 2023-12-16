'use server'

import { revalidatePath } from "next/cache";
import prismaClient from "./network/prismaClient";
import { userCheck } from "./helpers/server/userCheck";




export const createProposal = async (proposalData:any) => {
    const user = await userCheck();
    const proposal = { ...proposalData, clientId: user?.client?.id };

   await prismaClient.proposal.create({
        data: proposal
    })
    revalidatePath('/profile')
}
