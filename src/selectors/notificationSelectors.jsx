import { createSelector } from "reselect";

export const notificationsSelector = (state) => state.notifications.data;

export const unseenNotificationsSelector = createSelector(
  notificationsSelector,
  (notifications) => notifications.filter((notif) => !notif.seen)
);

export const isDesktopNotificationsEnabledSelector = (state) =>
  state.notifications.isDesktopNotificationAllowed;
