import { cache } from "react";
import { getUserFromDb } from "../(helpers)/server/get-user-from-db";
import prismaClient from "../(network)/prismaClient";



export const getProposal = cache(async () => {
    const user = await getUserFromDb();
    if (!user) return null;

    const proposal = await prismaClient.proposal.findUnique({
        where: {
            clientId: user.client?.id
        },
        include: {
            client: {
                include: {
                    clientInformation: true,
                    proposal: true
                }
            },
            proposalListing: {
                include: {
                    proposal: true
                }
            }
        }
    })
    return proposal
  })


export const getQuestions = async () => {
    return await prismaClient.question.findMany();
  };


  export const getProposalById = cache(async (id: number) => {
    const proposal = await prismaClient.proposal.findUnique({
        where: {
            id: id
        },
        include: {
            client: {
                include: {
                    clientInformation: true,
                    proposal: true,
                    user: true
                }
            },
            proposalListing: {
                include: {
                    proposal: true
                }
            }
        }
    })
    return proposal
  } )