import { cache } from "react";
import { getUserFromDb } from "../(helpers)/server/get-user-from-db";
import prismaClient from "../(network)/prismaClient";


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

  export const getCollaborationById = cache(async (id: number) => {
    const collaboration = await prismaClient.collaboration.findUnique({
      where: {
        id: id,
      },
      include: {
        designer: {
          include: {
            user: true,
          }
        },
        client: {
          include: {
            user: true,
          }
        },
      }
    })
    return collaboration
  })

