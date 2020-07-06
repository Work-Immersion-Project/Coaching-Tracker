import { INITIALIZE_GAPI } from "../types";

// This is for handling the authentication process of users
export const initializeGapiAuth = () => async (dispatch) => {
  window.gapi.load("client:auth2", async () => {
    await window.gapi.client.init({
      clientId:
        "347125005886-kt2hubgo6bljk7m9q0kj0t6vg8bk6g0b.apps.googleusercontent.com",
      scope: "email https://www.googleapis.com/auth/calendar",
      ux_mode: "popup",
    });
    dispatch({
      type: INITIALIZE_GAPI,
      payload: window.gapi.auth2.getAuthInstance(),
    });
  });
};
