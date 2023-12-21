'use server'

import { pusherServer } from "../(network)/pusher-server";


export const notifyClientForCollaboration = async (designerId:number) => {
    pusherServer.trigger("CLIENT", "collaboration-request", {
        designerId: designerId,
        message: "You have a new collaboration request"
      });
}
