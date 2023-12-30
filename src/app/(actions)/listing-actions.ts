'use server'

import { revalidatePath } from "next/cache";
import prismaClient from "../(network)/prismaClient";
import { getUserFromDb } from "../(helpers)/server/get-user-from-db";
import { notifyClientForCollaboration } from "./pusher-events";

import { axiosInstance } from "../(network)/axios-instance";

export const createListingImage = async (url: string) => {
     // Launch a new browser using puppeteer
    const {data} = await axiosInstance.post('/puppeteer', {companyWebsite: 'https://www.palubarozvoz.sk'})

    await prismaClient.proposal.update({
        where: {
            id: 5
        },
        data: {
            websiteHeroImage: data.data.url
        }
    
    })
    return data

}


export const setListingStatusActive = async (id: number) => {
    await prismaClient.proposalListing.update({
        where: {
            id: id
        },
        data: {
            status: 'ACTIVE'
        }
    })
    revalidatePath('/profile')
}

export const setListingStatusInactive = async (id: number) => {
    await prismaClient.proposalListing.update({
        where: {
            id: id
        },
        data: {
            status: 'INACTIVE'
        }
    })
    revalidatePath('/profile')
}


export const approveDesignerListing = async (id: number) => {
    // find listing
    const listing = await prismaClient.designerListing.findUnique({
        where: {
            id: id
        },
        include: {
            designer: true,
            proposalListing: true
        }
    })
    if(!listing || !listing.designer || !listing.proposalListing) return;

    // create transaction for collaboration creation
      const [updatedListing, collaboration, chat] = await prismaClient.$transaction([
        prismaClient.designerListing.update({
        where: {
            id: listing.id
        },
        data: {
            status: "APPROVED"
        },
        include: {
            designer: true,
            proposalListing: true
        }
    }),

    prismaClient.collaboration.create({
        data: {
            clientId: listing.proposalListing.clientId,
            designerId: listing.designer.id,
            designerListingId: listing.id,
            status: 'ONGOING',
            progress: 'Research',
            linkToDesign: ""
        }}),
        
        prismaClient.chat.create({})
    ])



     await prismaClient.collaboration.update({
        where: {
            id: collaboration.id
        },
        data: { chatId: chat.id}
    })


    revalidatePath('/profile')

}

export const rejectDesignerListing = async (id: number) => {
    
        await prismaClient.designerListing.update({
            where: {
                id: id
            },
            data: {
                status: "REJECTED"
            }
        })
        revalidatePath('/profile')
}

export const requestCollaborationForListing = async (id: number) => {
    const user = await getUserFromDb();
    if(user.role !== 'DESIGNER') throw new Error('Only designers can request collaborations')
    if(user.designer === null) throw new Error('Designer profile not found')

    await prismaClient.designerListing.create({
        data: {
            designerId: user.designer.id,
            proposalId: id
        }
    })
    revalidatePath(`/listing/${id}`)
    await notifyClientForCollaboration(user.designer.id)
}