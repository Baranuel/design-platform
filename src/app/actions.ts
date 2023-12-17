'use server'

import { revalidatePath } from "next/cache";
import prismaClient from "./network/prismaClient";
import { getUserFromDb } from "./helpers/server/get-user-from-db";


export const createProposal = async (proposalData:any) => {
    const user = await getUserFromDb();
    console.log(user)
    const proposal = { ...proposalData, clientId: user?.client?.id };
   await prismaClient.proposal.create({
        data: proposal
    })
    revalidatePath('/profile')
}
