
import { ChatMessage } from "../../../../../global";


export const MessageContent =  ({ message, senderId }: { message: ChatMessage, senderId:number }) => {
    const senderIsYou = message.sender.id === senderId
    return (
        <div className={`flex items-center gap-1 ${senderIsYou  && "self-end flex-row-reverse"}`}>
            <span>{message.senderId}</span>
            <span className={`p-2 rounded-xl ${senderIsYou ? "bg-purple text-white" : "bg-white"} font-semibold shadow-sm min-w-[60px]`}>{message.text}</span>
            {!message.id  && <span className="text-xs text-gray-400">Sending...</span>}
        </div>
    )
}