import { cache } from "react";
import { getUserFromDb } from "../helpers/server/get-user-from-db";
import prismaClient from "../(network)/prismaClient";



export const getCollaborations = cache(async () => {
    const user = await getUserFromDb();
    const collaborations = await prismaClient.collaboration.findMany()
    return collaborations
  })
