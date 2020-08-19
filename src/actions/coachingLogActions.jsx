// import { GET_COACHING_LOGS_REQUEST, GET_COACHING_LOGS_SUCCESS } from "../types";

// export const getCoachingLogs = (page) => async (dispatch, getState) => {
//   dispatch(getCoachingLogsRequest());
//   coachingLogsCollection.onSnapshot((snapshot) => {
//     dispatch(getCoachingLogsSuccess(snapshot.docs.map((doc) => doc.data())));
//   });
// };

// const getCoachingLogsRequest = () => {
//   return {
//     type: GET_COACHING_LOGS_REQUEST,
//   };
// };

// const getCoachingLogsSuccess = (results) => {
//   return {
//     type: GET_COACHING_LOGS_SUCCESS,
//     data: results,
//   };
// };
