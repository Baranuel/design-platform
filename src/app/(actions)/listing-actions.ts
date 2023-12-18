'use server'

import { revalidatePath } from "next/cache";
import prismaClient from "../(network)/prismaClient";


export const setListingStatusActive = async (id: number) => {
    'use server'
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
    'use server'
        console.log(id)
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
