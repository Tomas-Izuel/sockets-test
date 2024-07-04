import { ChatDetail } from "@/types";
import { tw } from "@/utils";
import { FC } from "react";

interface MessageProps {
  message: ChatDetail;
}

const Message: FC<MessageProps> = ({ message }) => {
  return (
    <div
      className={tw(
        "p-4 rounded-xl relative w-fit",
        message.type_sender === "AI"
          ? "bg-blue-100 rounded-ss-sm"
          : "bg-blue-300 rounded-ee-sm self-end",
        message.show_transition ? "transition-message" : ""
      )}
    >
      {message.message}
    </div>
  );
};

export default Message;
