"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { Bot, ChatListType } from "@/types";
import useChatReducer from "@/hooks/useReducerChat";
import { isErrorType } from "@/utils";
import { Spinner } from "@chakra-ui/react";
import { getConversations } from "@/services";
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";

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
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const divObserverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMoreChats = async (params: { page: number }) => {
      try {
        const newChats = await getConversations(bot, params); // Adjust this to fetch more chats based on params
        if (isErrorType(newChats)) {
          return;
        }
        addMoreChats(newChats.rows); // Dispatch action to add more chats
        setPage(page + 1);
      } catch (error) {
        console.error("Error fetching more chats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoading(true);
            fetchMoreChats({ page: page + 1 });
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
  }, [addMoreChats, bot, page]);

  return (
    <aside className="border-2 rounded-xl w-1/4 overflow-x-hidden overflow-y-scroll bg-white shadow-xl">
      <ul className="flex flex-col">
        {state.rows.map((chat) => (
          <Link
            href={"/1/chat/" + chat.identifier}
            key={chat._id}
            className="px-4 pt-2 w-full transition-chats flex flex-col gap-2 border-b-[1px] border-gray-400 h-20 bg-gray-50"
          >
            <h3 className="font-semibold flex justify-between">
              {chat.user}
              <span>{chat.identifier}</span>
            </h3>
            <p>
              {chat.last_message.type_sender === "USER" ? (
                <ArrowUturnLeftIcon className="w-4 h-4 inline-block text-gray-500 mr-3" />
              ) : (
                <ArrowUturnRightIcon className="w-4 h-4 inline-block text-gray-500 mr-3" />
              )}
              {chat.last_message.message?.slice(
                0,
                chat.last_message.message.length > 40
                  ? 40
                  : chat.last_message.message.length
              ) + (chat.last_message.message?.length > 40 ? "..." : "")}
            </p>
          </Link>
        ))}
      </ul>
      {isLoading ? (
        <div className="flex justify-center items-center h-[60px]">
          <Spinner className="w-6 h-6" />
        </div>
      ) : (
        <div
          ref={divObserverRef}
          className={
            "w-full min-h-[64px] h-16 relative mt-[17px] flex justify-center items-center"
          }
        ></div>
      )}
    </aside>
  );
};

export default ChatList;
