"use client";
import { Bot, Chat, ChatDetailType } from "@/types";
import { FC, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { Spinner } from "@chakra-ui/react";
import { getChatByIdentifier } from "@/services";
import useChatDetailReducer from "@/hooks/useChatDetailReducer";
import { isErrorType } from "@/utils";

interface ChatProps {
  ChatData: ChatDetailType;
  identifier: string;
  bot: Bot;
}

const ChatDetail: FC<ChatProps> = ({ ChatData, bot, identifier }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const divObserverRef = useRef<HTMLDivElement>(null);

  const { state, addMoreChats } = useChatDetailReducer(ChatData);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [ChatData]);

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
