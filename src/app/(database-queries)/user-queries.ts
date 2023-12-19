import { cache } from "react";
import { getUserFromDb } from "../helpers/server/get-user-from-db";


export const getUser = cache(async () => {
    const user = await getUserFromDb();
    return user;
  })
