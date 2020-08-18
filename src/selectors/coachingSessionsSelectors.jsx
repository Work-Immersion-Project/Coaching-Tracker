import { createSelector } from "reselect";
import { currentUserSelector } from "./authSelectors";
import _ from "lodash";

const coachingSessionsSelector = (state) => state.coaching.coachingSchedules;

export const onGoingSessionsSelector = createSelector(
  coachingSessionsSelector,
  (coachingSessions) =>
    coachingSessions.filter(
      (coachingSession) => coachingSession.status === "ongoing"
    )
);

export const allCoachingSessionsSelector = createSelector(
  coachingSessionsSelector,
  (coachingSessions) =>
    coachingSessions.filter(
      (coachingSession) => coachingSession.status !== "ongoing"
    )
);

export const coachingSessionStudentInstancesSelector = createSelector(
  coachingSessionsSelector,
  currentUserSelector,
  (coachingSessions, currentUser) => {
    return _.flatten(
      coachingSessions.map((session) =>
        session.studentAttendees.map((student) => {
          return {
            text:
              currentUser.email !== student.email
                ? student.metadata.fullName
                : "You",
            id: student.email,
            color: "red",
          };
        })
      )
    );
  }
);
