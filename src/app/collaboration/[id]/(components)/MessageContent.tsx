
import { ChatMessage } from "../../../../../global";


export const MessageContent =  ({ message }: { message: ChatMessage }) => {

    return (
        <div className="flex flex-col gap-1">
            <span>{message.senderId}</span>
            <span>{message.text}</span>
        </div>
    )
}