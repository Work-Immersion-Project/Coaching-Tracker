import { createSelector } from "reselect";

const coachingSessionsSelector = (state) => state.coaching.coachingSchedules;

export const onGoingSessionsSelector = createSelector(
  coachingSessionsSelector,
  (coachingSessions) =>
    coachingSessions.filter(
      (coachingSession) => coachingSession.status === "ongoing"
    )
);

export const normalCoachingSessionsSelector = createSelector(
  coachingSessionsSelector,
  (coachingSessions) =>
    coachingSessions.filter(
      (coachingSession) => coachingSession.status !== "ongoing"
    )
);
