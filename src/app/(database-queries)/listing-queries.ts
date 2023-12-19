import { cache } from "react";

import prismaClient from "../(network)/prismaClient";
import { getUserFromDb } from "../helpers/server/get-user-from-db";



export const getActiveListing = cache(async () => {
    const user = await getUserFromDb();
    if (!user) return null;

    const listing = await prismaClient.proposalListing.findUnique({
        where: {
            clientId: user.client?.id
        },
        include: {
            proposal: true,
            client: {
                include: { clientInformation: true, proposal: true }
            }
        }
    })

    return listing
})


export const getAllActiveListings = cache(async () => {

    const listings = await prismaClient.proposalListing.findMany({
        where: {
            status: 'ACTIVE'
        },
        include: {
            proposal: true,
            client: {
                include: { clientInformation: true, proposal: true }
            }
        }
    })

    return listings
})


export const getListingById = cache(async (id: number) => {

    const listing = await prismaClient.proposalListing.findUnique({
        where: {
            id: id
        },
        include: {
            proposal: true,
            client: {
                include: { clientInformation: true, proposal: true, user: true }
            },
            interestedDesigners: {
                include: {
                    designer: {
                        include: { designerInformation: true, user: true }
                    },
                }
            }

        }
    })

    return listing
})