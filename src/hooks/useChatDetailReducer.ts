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
    const response = socket?.emit(
      "join_room",
      initialChats.identifier,
      (response: any) => {
        console.log("joined room", response);
      }
    );
  }, [initialChats, socket]);

  useEffect(() => {
    socket?.on("new_message", (message: ChatDetail) => {
      console.log("new message", message);
      dispatch({ type: "ADD_MESSAGE", payload: message });
    });

    return () => {
      socket?.off("new_message");
    };
  }, [socket]);

  const addMoreChats = (newChats: ChatDetail[]) => {
    dispatch({ type: "ADD_MORE_MESSAGES", payload: newChats });
  };

  return { state, addMoreChats };
};

export default useChatDetailReducer;
