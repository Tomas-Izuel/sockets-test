import ChatList from "@/components/ChatList";
import { getBot, getConversations } from "@/services";
import { isErrorType } from "@/utils";
import { FC } from "react";

const ChatPage: FC = async () => {
  const bot = await getBot("1");
  if (isErrorType(bot)) {
    return null;
  }
  const defaultConversations = await getConversations(bot);

  if (isErrorType(defaultConversations)) {
    return null;
  }
  return <ChatList chats={defaultConversations} bot={bot} />;
};

export default ChatPage;
