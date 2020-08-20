import {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  UPDATE_NOTIFICATION_REQUEST,
  UPDATE_NOTIFICATION_SUCCESS,
  CHECK_DESKTOP_NOTIFICATION_PERMISSION_REQUEST,
  CHECK_DESKTOP_NOTIFICATION_PERMISSION_SUCCESS,
} from "../types";
const INITIAL_STATE = {
  data: [],
  isUpdatedByUser: false,
  isDesktopNotificationAllowed: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_REQUEST:
    case CHECK_DESKTOP_NOTIFICATION_PERMISSION_REQUEST:
    case UPDATE_NOTIFICATION_REQUEST: {
      return { ...state };
    }
    case CHECK_DESKTOP_NOTIFICATION_PERMISSION_SUCCESS: {
      return { ...state, isDesktopNotificationAllowed: action.payload };
    }
    case UPDATE_NOTIFICATION_SUCCESS: {
      const prevNotifs = state.data;
      const updatedNotifs = prevNotifs.map((notif) => {
        if (action.payload === notif.ID) {
          return {
            ...notif,
            seen: true,
          };
        }
        return notif;
      });

      return { ...state, data: updatedNotifs, isUpdatedByUser: true };
    }
    case GET_NOTIFICATIONS_SUCCESS:
      return { ...state, data: action.payload, isUpdatedByUser: false };
    default:
      return state;
  }
};
