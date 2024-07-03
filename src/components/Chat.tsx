"use client";
import { Bot, ChatDetailType } from "@/types";
import { FC, useEffect, useRef } from "react";
import Message from "./Message";
import useChatDetailReducer from "@/hooks/useChatDetailReducer";

interface ChatProps {
  ChatData: ChatDetailType;
  identifier: string;
  bot: Bot;
}

const ChatDetail: FC<ChatProps> = ({ ChatData, bot, identifier }) => {
  const { state, addMoreChats } = useChatDetailReducer(ChatData);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ChatData, state]);

  return (
    <section className=" p-10 flex flex-col gap-8 w-full overflow-y-scroll">
      {state.rows
        .map((message) => <Message key={message._id} message={message} />)
        .reverse()}
      <div ref={messagesEndRef} />
    </section>
  );
};

export default ChatDetail;
