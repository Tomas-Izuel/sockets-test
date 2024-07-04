import { useReducer, useEffect } from "react";
import { useChat } from "@/context/ChatContext";
import { Chat, ChatDetail, ChatDetailType } from "@/types";
import { singleChatReducer } from "@/utils/singleChatReducer";

const useChatDetailReducer = (initialChats: ChatDetailType) => {
  const { socket } = useChat();
  const [state, dispatch] = useReducer(singleChatReducer, {
    total: 0,
    page: 0,
    page_size: 0,
    identifier: "",
    user: "",
    status: "CLOSE",
    intercepted_chat: false,
    rows: [],
  });

  useEffect(() => {
    dispatch({ type: "INITIALIZE", payload: initialChats });
    socket?.emit("join_chat", initialChats.identifier);
  }, [initialChats, socket]);

  useEffect(() => {
    socket?.on("new_message", (message: ChatDetail) => {
      const transitionedMessage = {
        ...message,
        show_transition: true,
      };
      dispatch({ type: "ADD_MESSAGE", payload: transitionedMessage });
    });

    return () => {
      socket?.off("new_message");
    };
  }, [socket]);

  const addMoreChats = (newChats: ChatDetail[]) => {
    dispatch({ type: "ADD_MORE_MESSAGES", payload: newChats });
  };

  const sendMessage = (message: ChatDetail) => {
    //fetching the message
    dispatch({ type: "SEND_MESSAGE", payload: message });
  };

  return { state, addMoreChats };
};

export default useChatDetailReducer;
