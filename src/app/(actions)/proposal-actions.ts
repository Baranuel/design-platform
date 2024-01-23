'use server'

import { revalidatePath } from "next/cache";
import { getUserFromDb } from "../(helpers)/server/get-user-from-db";
import prismaClient from "../(network)/prismaClient";
import { axiosInstance } from "../(network)/axios-instance";
import { put } from "@vercel/blob";

export const maxDuration = 60;
export const createImageThumbnail = async (url: string) => {
    const completeUrl = `https://${url}`
    const {data} = await axiosInstance.post('/puppeteer', {companyWebsite: completeUrl})

    return data.data.url
}


export const createProposal = async (proposalData:any) => {
    const user = await getUserFromDb();
    const proposal = { ...proposalData, clientId: user?.client?.id };
    const url = await createImageThumbnail(user?.client?.clientInformation?.companyWebsite || '')

    if(!url) return;

   const createdProposal = await prismaClient.proposal.create({
        data: {
            ...proposal,
            websiteHeroImage: url
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
