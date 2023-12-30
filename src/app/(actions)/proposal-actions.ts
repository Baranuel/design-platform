'use server'

import { revalidatePath } from "next/cache";
import { getUserFromDb } from "../(helpers)/server/get-user-from-db";
import prismaClient from "../(network)/prismaClient";
import { axiosInstance } from "../(network)/axios-instance";
import { put } from "@vercel/blob";


export const createProposal = async (proposalData:any) => {
    const user = await getUserFromDb();
    const proposal = { ...proposalData, clientId: user?.client?.id };

    const {data} = await axiosInstance.post('/puppeteer', {companyWebsite:`https://${user.client?.clientInformation?.companyWebsite}`})
    if(!data) return;

   const createdProposal = await prismaClient.proposal.create({
        data: {
            ...proposal,
            websiteHeroImage: data.data.url
        }
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


export const uploadFile = async (form: FormData) => {
    const file = form.get('file') as File;
    console.log(file)
    const filename = file?.name;

  const blob = await put(filename, file, {
    access: 'public',
  });

  return blob;
}
