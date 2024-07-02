import { Chat, ChatListType } from "@/types";

type Action =
  | { type: "ADD_OR_UPDATE_CHAT"; payload: Chat }
  | { type: "INITIALIZE"; payload: ChatListType }
  | { type: "ADD_MORE_CHATS"; payload: Chat[] };

type State = ChatListType;

export const chatReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_OR_UPDATE_CHAT":
      const existingChatIndex = state.rows.findIndex(
        (chat) => chat.identifier === action.payload.identifier
      );

      let updatedRows = [...state.rows];

      if (existingChatIndex !== -1) {
        // Remove the existing chat from its current position
        updatedRows.splice(existingChatIndex, 1);
      } else if (updatedRows.length >= 10) {
        // Only remove the last row if the new identifier does not exist and the list has 10 or more items
        updatedRows.pop();
      }

      // Add the new chat to the beginning
      updatedRows = [action.payload, ...updatedRows];

      return {
        ...state,
        rows: updatedRows,
      };

    case "INITIALIZE":
      return action.payload;

    case "ADD_MORE_CHATS":
      return {
        ...state,
        rows: [...state.rows, ...action.payload],
      };

    default:
      return state;
  }
};
