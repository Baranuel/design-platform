'use server'

import { revalidatePath } from "next/cache";
import prismaClient from "../(network)/prismaClient";
import { getUserFromDb } from "../helpers/server/get-user-from-db";
import { notifyClientForCollaboration } from "./pusher-events";


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

    const listing = await prismaClient.designerListing.update({
        where: {
            id: id
        },
        data: {
            status: "APPROVED"
        },
        include: {
            designer: true,
            proposalListing: true
        }
    })
    if(!listing || !listing.designer || !listing.proposalListing) return;

    const chat = await prismaClient.chat.create({})

     await prismaClient.collaboration.create({
        data: {
            clientId: listing.proposalListing.clientId,
            designerId: listing.designer.id,
            designerListingId: listing.id,
            chatId: chat.id,
            status: 'PENDING',
            progress: "0",
            linkToDesign: ""
        }
       
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