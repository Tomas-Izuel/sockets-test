import Chat from "@/components/Chat";
import Message from "@/components/Message";
import { getBot, getChatByIdentifier } from "@/services";
import { isErrorType } from "@/utils";
import { FC } from "react";

interface ChatsDetailPageProps {
  params: {
    id: number;
    identifier: string;
  };
  searchParams?: Record<string, unknown>;
}

const IdentifierPage: FC<ChatsDetailPageProps> = async ({
  params: { id, identifier },
}) => {
  const bot = await getBot("1");
  if (isErrorType(bot)) {
    return null;
  }
  const chat = await getChatByIdentifier(bot, identifier);
  if (isErrorType(chat)) {
    return <h1>Error fetching chat</h1>;
  }
  return (
    <main className="border-2 rounded-xl w-full overflow-x-hidden overflow-y-scroll bg-white shadow-xl flex flex-col justify-start items-start">
      <header className=" w-full border-b-2 border-gray-300 p-6 shadow-lg flex flex-col">
        <h1>{chat.user}</h1>
        <h2>{identifier}</h2>
      </header>
      <Chat ChatData={chat} bot={bot} identifier={identifier} />
    </main>
  );
};

export default IdentifierPage;
