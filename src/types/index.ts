export interface AuthDataType {
  token: string;
  userId: number;
}

export interface Bot {
  id: number;
  uuid: string;
  name: string;
  organizationId: number;
  apiKeyId?: number;
  nickname?: string;
  description?: string;
}

export interface CookieAuthData {
  auth: AuthDataType;
  bot?: Bot;
}

export type ErrorType = {
  code: number;
  message: string;
  detailedCause?: any;
};

export interface Message {
  _id: string;
  message: string;
  type_sender: "AI" | "USER"; // Asumiendo que el tipo de remitente puede ser 'AI' o 'USER'
  chat_id: string;
  conversation_id: string;
  type_message: "text"; // Asumiendo que siempre es 'text'
  createdAt: string;
  updatedAt: string;
}

export interface ChatListType {
  rows: Chat[];
}

export interface Chat {
  _id: string;
  identifier: string;
  user: string;
  phone_number_id: string;
  channel: "WHATSAPP"; // Asumiendo que siempre es 'WHATSAPP'
  bot_id: number;
  intercepted_chat: boolean;
  tags: string[];
  intercepted: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: "CLOSE" | "OPEN"; // Asumiendo que el estado puede ser 'CLOSE' o 'OPEN'
  last_message: Message;
}

export interface ChatDetailType {
  total: number;
  page: number;
  page_size: number;
  identifier: string;
  user: string;
  status: "CLOSE" | "OPEN";
  intercepted_chat: boolean;
  rows: ChatDetail[];
}

export interface ChatDetail {
  updatedAt: string;
  createdAt: string;
  message: string;
  type_sender: "AI" | "USER";
  type_message: "text";
  _id: string;
  chat_id: string;
  conversation_id: string;
  identifier: string;
}
