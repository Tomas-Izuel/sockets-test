import {
  Bot,
  Chat,
  ChatDetailType,
  ChatListType,
  CookieAuthData,
  ErrorType,
} from "@/types";

export const getBots = async (): Promise<Bot[] | ErrorType> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/bots`, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN || "",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return {
        code: response.status,
        message: "bot-listing",
        detailedCause: await response.json(),
      };
    }
  } catch (e) {
    console.log(e);
    return {
      code: 1,
      message: "bot-listing",
      detailedCause: JSON.stringify(e),
    };
  }
};

export const getBot = async (id: string): Promise<Bot | ErrorType> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/bots/${id}`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN || "",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return {
        code: response.status,
        message: "bot-fetch",
        detailedCause: await response.json(),
      };
    }
  } catch (e) {
    console.log(e);
    return {
      code: 1,
      message: "bot-fetch",
      detailedCause: JSON.stringify(e),
    };
  }
};

export const getConversations = async (
  bot: Bot,
  params?: { page: number }
): Promise<ChatListType | ErrorType> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/chats?page_size=10${
        params ? "&page=" + params.page : ""
      }`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN || "",
          bot_info: JSON.stringify({
            bot_uuid: bot.uuid,
            bot_id: bot.id,
          }),
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return {
        code: response.status,
        message: "conversation-fetch",
        detailedCause: await response.json(),
      };
    }
  } catch (e) {
    console.log(e);
    return {
      code: 1,
      message: "conversation-fetch",
      detailedCause: JSON.stringify(e),
    };
  }
};

export const getChatByIdentifier = async (
  bot: Bot,
  identifier: string,
  params?: { page: number }
): Promise<ChatDetailType | ErrorType> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_URL}/chats/${identifier}?${
        params ? "page=" + params.page + "&" : ""
      }page_size=50`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN || "",
          bot_info: JSON.stringify({
            bot_uuid: bot.uuid,
            bot_id: bot.id,
          }),
        },
        cache: "no-cache",
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return {
        code: response.status,
        message: "chat-fetch",
        detailedCause: await response.json(),
      };
    }
  } catch (e) {
    console.log(e);
    return {
      code: 1,
      message: "chat-fetch",
      detailedCause: JSON.stringify(e),
    };
  }
};
