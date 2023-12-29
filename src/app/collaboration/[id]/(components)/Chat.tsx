import { getChatForCollaboration } from "@/app/(database-queries)/collaboration-queries";
import { Messages } from "./Messages";
import { getUser } from "@/app/(database-queries)/user-queries";
import { clerkClient } from "@clerk/nextjs";


export const Chat = async ({
  chatId,
  collaborationId,
  client,
  designer,
}: {
  chatId: number;
  collaborationId: number;
  client: string;
  designer: string;
}) => {
  const chat = await getChatForCollaboration(chatId);
  const clientInfo = await clerkClient.users.getUser(client);
  const designerInfo = await clerkClient.users.getUser(designer);
  const user = await getUser();
  if (!chat) return;

  const clientChatPerson = {
    id: clientInfo.id,
    firstName: clientInfo.firstName,
    lastName: clientInfo.lastName,
    imageUrl: clientInfo.imageUrl,
  }

    const designerChatPerson = {
        id: designerInfo.id,
        firstName: designerInfo.firstName,
        lastName: designerInfo.lastName,
        imageUrl: designerInfo.imageUrl,
    }
  const messages = chat.messages;

  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <Messages
        client={clientChatPerson}
        designer={designerChatPerson}
        chatId={chat.id}
        senderId={user?.id}
        clerkId={user?.clerkId}
        messages={messages}
        collaborationId={collaborationId}
      />
    </div>
  );
};
