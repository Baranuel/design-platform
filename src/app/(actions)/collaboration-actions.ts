'use server'

import { revalidatePath } from "next/cache";
import prismaClient from "../(network)/prismaClient";
import { CollaborationProgress } from "@prisma/client";



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