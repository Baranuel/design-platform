'use server'

import { pusherServer } from "../(network)/pusher-server";


export const handleEvent = async () => {
    pusherServer.trigger("my-channel", "my-event", {
        message: "hello world",
      });
}
