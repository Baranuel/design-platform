import { ChatMessage } from "../../../../../global";
import Image
 from "next/image";
export const MessageContent = ({
  message,
  senderId,
  clerkId,
clientChatPerson,
designerChatPerson
}: {
  message: ChatMessage;
  senderId: number;
  clerkId: string;
  clientChatPerson: Record<string, any>;
  designerChatPerson: Record<string, any>;
}) => {
  const senderIsYou = message.sender.id === senderId;
  const senderIsClient = message.sender.clerkId === clientChatPerson.id;
    
  return (
    <div
      className={`flex items-center gap-1 ${
        senderIsYou && "self-end flex-row-reverse"
      }`}
    >
        <Image src={senderIsClient ? clientChatPerson.imageUrl : designerChatPerson.imageUrl} alt="image" width={45} height={45} className="rounded-full" />
      <span
        className={`p-2 rounded-xl ${
          senderIsYou ? "bg-purple text-white" : "bg-white"
        } font-semibold shadow-sm min-w-[60px]`}
      >
        {message.text}
      </span>
    </div>
  );
};
