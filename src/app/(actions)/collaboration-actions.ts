'use server'

import { revalidatePath } from "next/cache";
import prismaClient from "../(network)/prismaClient";
import { CollaborationProgress } from "@prisma/client";
import { pusherServer } from "../(network)/pusher-server";



export const setCollaborationProgress = async (id: string, progress:CollaborationProgress) => {
    await prismaClient.collaboration.update({
        where: {
            id: id
        },
        data: {
            progress: progress
        }
    })
    revalidatePath(`/collaboration/${id}`)
}


export const addDesignLink = async (id: string, link: string) => {
    await prismaClient.collaboration.update({
        where: {
            id: id
        },
        data: {
            linkToDesign: link
        }
    })

    revalidatePath(`/collaboration/${id}`)
}

export const deleteDesignLink = async (id: string) => {
    await prismaClient.collaboration.update({
        where: {
            id: id
        },
        data: {
            linkToDesign: ""
        }
    })

    revalidatePath(`/collaboration/${id}`)
}

export const sendMessage = async (chatId: number, senderId:number, clerkId:string, createdAt:Date, text: string, collaborationId:string) => {
    if(!text) return

    pusherServer.trigger(`chat-${chatId}`, 'message', {
            sender:{
                id: senderId,
                clerkId: clerkId,
            },
            text: text,
            chatId: chatId,
            createdAt: createdAt,
        })
 
    await prismaClient.message.create({
        data: {
            text: text,
            chatId: chatId,
            senderId: senderId,
            createdAt: createdAt,
        },
        include: {
            sender: {
                select: {
                    id: true,
                    clerkId: true,
                }
            },
        }
    })


    revalidatePath(`/collaboration/${collaborationId}`)

}


export const stopCollaboration = async (id: string) => {

    const listingConnectedToCollaboration = await prismaClient.collaboration.findFirst({
        where: {
            id: id
        },
        select: {
            designerListingId: true
        }
    })
    
    await prismaClient.$transaction([
        prismaClient.collaboration.delete({
            where: {
                id: id
            }
        }),
        prismaClient.designerListing.delete({
            where: {
                id: listingConnectedToCollaboration?.designerListingId
            }
        })
    ])
    revalidatePath(`/collaboration/${id}`)
}