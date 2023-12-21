import { cache } from "react";
import { getUserFromDb } from "../helpers/server/get-user-from-db";
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
