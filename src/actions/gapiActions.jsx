import { INITIALIZE_GAPI } from "../types";

// This is for handling the authentication process of users
export const initializeGapiAuth = () => async (dispatch) => {
  window.gapi.load("client", async () => {
    await window.gapi.client.init({
      apiKey: "AIzaSyCwBrZzbSRO7cuGyEuB80IKENrQqRrhoTc",
      clientId:
        "347125005886-kt2hubgo6bljk7m9q0kj0t6vg8bk6g0b.apps.googleusercontent.com",
      scope:
        "email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
      ux_mode: "popup",
    });
    await window.gapi.client.load("calendar", "v3");

    dispatch({
      type: INITIALIZE_GAPI,
      payload: {
        gapiAuth: window.gapi.auth2.getAuthInstance(),
        gapiCalendar: window.gapi.client.calendar,
      },
    });
  });
};
