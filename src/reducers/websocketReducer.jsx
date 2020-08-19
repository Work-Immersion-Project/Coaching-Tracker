import { CREATE_WEBSOCKET } from "../types";

const INITIALSTATE = {
  openSockets: [],
  closedSockets: [],
};

export default (state = INITIALSTATE, action) => {
  switch (action.type) {
    case CREATE_WEBSOCKET: {
      return {
        ...state,
        openSockets: [...state.openSockets, action.payload],
      };
    }
    default:
      return { ...state };
  }
};
