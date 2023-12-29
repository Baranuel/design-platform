'use server'

import { revalidatePath } from "next/cache";
import prismaClient from "../(network)/prismaClient";
import { CollaborationProgress } from "@prisma/client";
import { pusherServer } from "../(network)/pusher-server";



export const setCollaborationProgress = async (id: number, progress:CollaborationProgress) => {
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


export const addDesignLink = async (id: number, link: string) => {
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

export const deleteDesignLink = async (id: number) => {
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

export const sendMessage = async (chatId: number, senderId:number, clerkId:string, createdAt:Date, text: string, collaborationId:number) => {
    if(!text) return

    pusherServer.trigger(`chat-${chatId}`, 'message', {

            sender:{
                id: senderId,
                clerkId: clerkId,
            },
            id: Math.random(),
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