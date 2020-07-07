import {
  GET_CALENDARS_EVENT_ERROR,
  GET_CALENDARS_EVENT_REQUEST,
  GET_CALENDARS_EVENT_SUCCESS,
  GET_CALENDAR_EVENT_ERROR,
  GET_CALENDAR_EVENT_REQUEST,
  GET_CALENDAR_EVENT_SUCCESS,
  ADD_CALENDAR_EVENT_ERROR,
  ADD_CALENDAR_EVENT_REQUEST,
  ADD_CALENDAR_EVENT_SUCCESS,
} from "../types";
import _ from "lodash";

export const getCalendarEvents = () => async (dispatch, getState) => {
  const { gapiCalendar } = getState().gapi;
  dispatch(getCalendarEventsRequest());
  try {
    const calendars = await gapiCalendar.calendarList
      .list({})
      .then(({ result }) => result.items);
    const rawEvents = await Promise.all(
      calendars.map(async (calendar) => {
        return await gapiCalendar.events
          .list({
            calendarId: calendar.id,
          })
          .then(({ result }) =>
            result.items.map((item) => {
              return {
                title: item.summary,
                startDate: Date.parse(item.start.dateTime),
                endDate: Date.parse(item.end.dateTime),
                link: item.htmlLink,
              };
            })
          );
      })
    );
    const flattenedEvents = _.flatMap(rawEvents, (event) => _.map(event));

    dispatch(getCalendarEventsSuccess(flattenedEvents));
  } catch (error) {
    dispatch(getCalendarEventsError(error));
  }
};

export const getCalendarEventsRequest = () => {
  return {
    type: GET_CALENDARS_EVENT_REQUEST,
  };
};

export const getCalendarEventsSuccess = (results) => {
  return {
    type: GET_CALENDARS_EVENT_SUCCESS,
    data: results,
    error: null,
  };
};

export const getCalendarEventsError = (error) => {
  return {
    type: GET_CALENDARS_EVENT_ERROR,
    data: null,
    error: error,
  };
};
