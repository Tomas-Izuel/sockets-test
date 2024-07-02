import { FC, PropsWithChildren, ReactNode } from "react";
import ChatList from "../../components/ChatList";
import { getBot } from "@/services";
import { isErrorType } from "@/utils";
import { ChatProvider } from "@/context/ChatContext";

const Layout: FC<
  PropsWithChildren<{
    chatContainer: ReactNode;
  }>
> = async ({ children, chatContainer }) => {
  const bot = await getBot("1");

  if (isErrorType(bot)) {
    return null;
  }
  return (
    <ChatProvider bot={bot}>
      <div className="flex gap-4 h-screen p-10 bg-gray-50">
        {children}
        {chatContainer}
      </div>
    </ChatProvider>
  );
};

export default Layout;
