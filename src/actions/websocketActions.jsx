import { CREATE_WEBSOCKET, UPDATE_WEBSOCKET } from "../types";

export const createWebsocket = (socket) => {
  return { type: CREATE_WEBSOCKET, payload: socket };
};

export const updateWebsockets = () => {
  return { type: UPDATE_WEBSOCKET };
};
