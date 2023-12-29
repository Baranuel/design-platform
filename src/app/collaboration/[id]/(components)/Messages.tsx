'use client'
import { ChatMessage } from "../../../../../global";
import { Button, Input } from "antd";

import { MessageContent } from "./MessageContent";
import {  useEffect, useOptimistic, useRef, useState, useTransition } from "react";

import { sendMessage } from "@/app/(actions)/collaboration-actions";
import { Controller, set, useForm } from "react-hook-form";
import { pusherClient } from "@/app/(network)/pusher-client";


export const Messages =  ({ messages, chatId, senderId, clerkId, collaborationId}: { messages: ChatMessage[], chatId:number , senderId:number, clerkId:string, collaborationId:number}) => {
    const [isPending, startTransition] = useTransition();
    const chatEnd = useRef<HTMLDivElement>(null)
  const {control, handleSubmit, reset} = useForm({
    mode:'onChange',
  })

  const [optimisticMessages, setOptimisticMessage] = useOptimistic( messages, (prevMessages, message:ChatMessage) => [...prevMessages, message] )

  const handleSubmitMessage = async (data:Record<string,string>) => {
    const {message} = data
    reset()
    await sendMessage(chatId, senderId, clerkId, new Date(), message, collaborationId)
  }

  useEffect(() => {
    const channel = pusherClient.subscribe(`chat-${chatId}`);
    channel.bind("message", function (data: ChatMessage) {
    setOptimisticMessage(data);
});
    
    return () => {
      pusherClient.unsubscribe(`chat-${chatId}`);

    };
  },[chatId, setOptimisticMessage])

  useEffect(() => {
    if(chatEnd.current){
        console.log(optimisticMessages)
        chatEnd.current.scrollIntoView({behavior:'smooth'})
      }
  },[optimisticMessages])


  return (
    <div className="flex flex-col gap-2 h-full w-full">
      <div className=" p-4 flex flex-col gap-3 overflow-scroll bg-gray-100 min-h-[300px] max-h-[300px]">
        {optimisticMessages.map((message, index) => {
          return (
            <MessageContent senderId={senderId} message={message} key={index} />
          );
        })}
        <div ref={chatEnd}></div>
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
