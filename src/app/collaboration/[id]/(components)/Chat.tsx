import { getChatForCollaboration } from "@/app/(database-queries)/collaboration-queries";
import { Messages } from "./Messages";
import { getUser } from "@/app/(database-queries)/user-queries";


export const Chat = async ({ chatId, collaborationId }: { chatId: number, collaborationId:number }) => {
  const chat = await getChatForCollaboration(chatId);
  const user = await getUser();
    if(!chat) return

    const messages = chat.messages

  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <Messages chatId={chat.id} senderId={user?.id} clerkId={user?.clerkId} messages={messages} collaborationId={collaborationId} />
    </div>
  );
};
