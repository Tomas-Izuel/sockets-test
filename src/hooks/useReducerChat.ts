import { useReducer, useEffect } from "react";
import { useChat } from "@/context/ChatContext";
import { Chat, ChatListType } from "@/types";
import { chatReducer } from "@/utils/reducer";

const useChatReducer = (initialChats: ChatListType) => {
  const [state, dispatch] = useReducer(chatReducer, { rows: [] });

  useEffect(() => {
    dispatch({ type: "INITIALIZE", payload: initialChats });
  }, [initialChats]);

  const { socket } = useChat();

  useEffect(() => {
    socket?.on("new_chat", (message: Chat) => {
      const transitionedMessage = {
        ...message,
        show_transition: true,
      };
      dispatch({ type: "ADD_OR_UPDATE_CHAT", payload: transitionedMessage });
    });

    return () => {
      socket?.off("new_chat");
    };
  }, [socket]);

  const addMoreChats = (newChats: Chat[]) => {
    dispatch({ type: "ADD_MORE_CHATS", payload: newChats });
  };

  return { state, addMoreChats };
};

export default useChatReducer;
