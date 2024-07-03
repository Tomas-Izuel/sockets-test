import { ChatDetail, ChatDetailType } from "@/types";

type Action =
  | { type: "ADD_MESSAGE"; payload: ChatDetail }
  | { type: "INITIALIZE"; payload: ChatDetailType }
  | { type: "ADD_MORE_MESSAGES"; payload: ChatDetail[] }
  | { type: "SEND_MESSAGE"; payload: ChatDetail };

type State = ChatDetailType;

export const singleChatReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        rows: [action.payload, ...state.rows],
      };

    case "INITIALIZE":
      return action.payload;

    case "ADD_MORE_MESSAGES":
      return {
        ...state,
        rows: [...state.rows, ...action.payload],
      };
    case "SEND_MESSAGE":
      return {
        ...state,
        rows: [...state.rows, action.payload],
      };

    default:
      return state;
  }
};
