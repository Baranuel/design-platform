'use client'

import { pusherClient } from "@/app/(network)/pusher-client"
import { useEffect, useState } from "react"

export const Notifications = () => {
    const [events, setEvents] = useState(0)
    
    useEffect(() => {
        pusherClient.subscribe("my-channel")

        pusherClient.bind("my-event", (data:any) => {
            console.log(data);
            setEvents((prevEvents) => prevEvents + 1)
        })

        return () => {
            pusherClient.unsubscribe("my-channel")
            pusherClient.unbind_all();
        }
    },[])
    return <div>Notifications: {events}</div>
}