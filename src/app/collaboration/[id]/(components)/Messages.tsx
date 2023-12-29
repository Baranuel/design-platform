'use client'
import { ChatMessage } from "../../../../../global";
import { Button, Input } from "antd";

import { MessageContent } from "./MessageContent";
import {  useEffect, useOptimistic, useTransition } from "react";

import { sendMessage } from "@/app/(actions)/collaboration-actions";
import { Controller, useForm } from "react-hook-form";
import { pusherClient } from "@/app/(network)/pusher-client";


export const Messages =  ({ messages, chatId, senderId, clerkId, collaborationId}: { messages: ChatMessage[], chatId:number , senderId:number, clerkId:string, collaborationId:number}) => {
    const [isPending, startTransition] = useTransition();
  const {control, handleSubmit} = useForm({
    mode:'onChange',
  })

  const [optimisticMessages, setOptimisticMessage] = useOptimistic( messages,  (prevList, message: ChatMessage) => [
    ...prevList,message
  ])

  const handleSubmitMessage = async (data:Record<string,string>) => {
    const {message} = data
    await sendMessage(chatId, senderId,clerkId, new Date(), message, collaborationId)

  }

  useEffect(() => {
    const channel = pusherClient.subscribe(`chat-${chatId}`);

    channel.bind("message", function (data: ChatMessage) {
    startTransition( () => setOptimisticMessage(data))
});
    
    return () => {
      pusherClient.unsubscribe(`chat-${chatId}`);
      pusherClient.unbind("message");
    };
  },[chatId, setOptimisticMessage])


  return (
    <div className="flex flex-col gap-2 h-full w-full">
      <div className=" bg-gray-100 min-h-[300px]">
        {optimisticMessages.map((message, index) => {
          return (
            <MessageContent message={message} key={index} />
          );
        })}
      </div>
      <div className="flex gap-2 w-full h-full">
        <Controller
        name='message'
        control={control}
        render={({field}) => <Input size="large" {...field} />}
        />
        <Button 
        onClick={handleSubmit(handleSubmitMessage)} 
        size="large" type="primary">
          Send
        </Button>
      </div>
    </div>
  );
};
