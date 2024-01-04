import { getChatForCollaboration, getCollaborationById } from "@/app/(database-queries)/collaboration-queries";
import { Messages } from "./Messages";
import { getUser } from "@/app/(database-queries)/user-queries";
import { clerkClient } from "@clerk/nextjs";


export const Chat = async ({
  collaborationId,
}: {
  collaborationId: string;

}) => {
    
const collaboration = await getCollaborationById(collaborationId)
if(!collaboration) return 

  const chat = await getChatForCollaboration(collaboration.chatId!);
  const clientInfo = await clerkClient.users.getUser(collaboration?.client.user.clerkId ??"");
  const designerInfo = await clerkClient.users.getUser(collaboration?.designer.user.clerkId ??"");
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
