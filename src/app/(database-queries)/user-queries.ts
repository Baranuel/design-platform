import { cache } from "react";
import { getUserFromDb } from "../(helpers)/server/get-user-from-db";
import prismaClient from "../(network)/prismaClient";


export const getUser = cache(async () => {
    const user = await getUserFromDb();
    return user;
  })

export const getUserByDesignerId = cache(async (designerId: number) => {
  const designer  = await prismaClient.designer.findUnique({
    where: {
      id: designerId
    },
  })
  if(!designer) throw new Error('Designer not found')
  const user = await prismaClient.user.findUnique({
    where: {
      id: designer.userId
    },
    include: {
      designer: {
        include: { designerInformation: true }
      }
    }
  })
  return user
  })


  export const getUserByClientId = cache(async (clientId: number) => {
    const client  = await prismaClient.client.findUnique({
      where: {
        id: clientId
      },
    })

    if(!client) throw new Error('Client not found')
    const user = await prismaClient.user.findUnique({
      where: {
        id: client.userId
      },
      include: {
        designer: {
          include: { designerInformation: true }
        }
      }
    })
    return user
  })