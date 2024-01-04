import { cache } from "react";
import { getUserFromDb } from "../(helpers)/server/get-user-from-db";
import prismaClient from "../(network)/prismaClient";
import { permanentRedirect } from "next/navigation";


export const getCollaborations = cache(async () => {
    const user = await getUserFromDb();
    const collaborations = await prismaClient.collaboration.findMany({
      where: {
        OR: [
          {designerId: user?.designer?.id},
        {        clientId: user?.client?.id,}
        ]
      },
    })
    return collaborations
  })


  export const getCollaborationById = cache(async (id: string) => {
    const collaboration = await prismaClient.collaboration.findUnique({
      where: {
        id: id,
      },
      include: {
        designer: {
          include: {
            designerInformation: true,
            user: true,
          }
        },
        client: {
          include: {
            clientInformation: true,
            proposal: true,
            user: true,
          }
        },
      }
    })
    if(!collaboration) return permanentRedirect('/profile')
    return collaboration
  })


export const getChatForCollaboration = cache(async (id: number) => {
  const chat = await prismaClient.chat.findUnique({
    where: {
      id: id,
    },
    include: {
      messages: {
        include: {
          sender: {
            select: {
              id: true,
              clerkId: true,
            }
          },
        },
        orderBy: {
          createdAt: 'asc'
        },

      }
    }
  })
  return chat
})
