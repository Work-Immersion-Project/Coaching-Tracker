import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  OPEN_EVENT_DRAWER,
  CLOSE_EVENT_DRAWER,
} from "../types";

// Handle Navigation Drawer
export const openDrawer = () => {
  return {
    type: OPEN_DRAWER,
  };
};

export const closeDrawer = () => {
  return {
    type: CLOSE_DRAWER,
  };
};

export const openAddEventDrawer = () => {
  return {
    type: OPEN_EVENT_DRAWER,
  };
};

export const closeAddEventDrawer = () => {
  return {
    type: CLOSE_EVENT_DRAWER,
  };
};
