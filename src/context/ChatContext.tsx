"use client";
import { Bot } from "@/types";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

interface ChatContextProps {
  bot: Bot;
}

interface ChatContextType {
  socket: Socket | null;
}

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export const ChatProvider: FC<PropsWithChildren<ChatContextProps>> = ({
  children,
  bot,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "", {
      path: "/socket.io",
      extraHeaders: {
        authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN || "",
        bot_id: bot.id.toString(),
      },
    });
    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected to socket");
    });
    return () => {
      socket.disconnect();
    };
  }, [bot]);

  return (
    <ChatContext.Provider value={{ socket }}>{children}</ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
