"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { Bot, ChatListType } from "@/types";
import useChatReducer from "@/hooks/useReducerChat";
import { isErrorType, tw } from "@/utils";
import { Skeleton, Spinner } from "@chakra-ui/react";
import { getConversations } from "@/services";

interface ChatListProps {
  chats: ChatListType;
  bot: Bot;
}

interface ChatListProps {
  chats: ChatListType;
  bot: Bot;
}

const ChatList: FC<ChatListProps> = ({ chats, bot }) => {
  const { state, addMoreChats } = useChatReducer(chats);
  const [isLoading, setIsLoading] = useState(false);
  const divObserverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchMoreChats({ page: 2 }); // Example: Fetch more chats for page 2
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the div is visible
    );

    if (divObserverRef.current) {
      observer.observe(divObserverRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const fetchMoreChats = async (params: { page: number }) => {
    setIsLoading(true);
    try {
      const newChats = await getConversations(bot, params); // Adjust this to fetch more chats based on params
      if (isErrorType(newChats)) {
        return;
      }
      addMoreChats(newChats.rows); // Dispatch action to add more chats
    } catch (error) {
      console.error("Error fetching more chats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="border-2 rounded-xl w-1/4 overflow-x-hidden overflow-y-scroll bg-white shadow-xl">
      <ul className="flex flex-col">
        {state.rows.map((chat) => (
          <li
            key={chat._id}
            className="px-4 pt-2 w-full flex flex-col gap-2 border-b-[1px] border-gray-400 h-20 bg-gray-50"
          >
            <h3 className="font-semibold">{chat.identifier}</h3>
            <p>
              {chat.last_message.message?.slice(
                0,
                chat.last_message.message.length > 40
                  ? 40
                  : chat.last_message.message.length
              ) + (chat.last_message.message?.length > 40 ? "..." : "")}
            </p>
          </li>
        ))}
      </ul>
      <div
        ref={divObserverRef}
        className={"w-full min-h-[64px] h-16 relative mt-[17px]"}
      >
        {isLoading && (
          <Skeleton className="absolute h-20 w-full flex justify-center items-center bottom-0 left-0 pt-0.5">
            <Spinner className="w-6 h-6 border-klari-hover-primary" />
          </Skeleton>
        )}
      </div>
    </aside>
  );
};

export default ChatList;
