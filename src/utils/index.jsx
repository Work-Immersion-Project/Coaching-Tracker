import { sub, getHours, getMinutes } from "date-fns";
import moment from "moment";
export const delayInMilliseconds = async (milliseconds) =>
  await new Promise((resolve) => setTimeout(resolve, milliseconds));

export const delayInSeconds = async (seconds) =>
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export const normalizeDate = (date) =>
  sub(date, {
    hours: getHours(date),
    minutes: getMinutes(date),
  });

export const isDayBehind = (date) => new Date() > date;
export const isMeetingAvailable = (startDate, endDate) => {
  const currentDate = new Date();
  return currentDate >= startDate && currentDate <= endDate;
};

export const convertCoachingScheduleDates = (startDate, endDate, startTime, endTime) => {
  const convertedStartTime = convertDateToHourMin(startTime);
  const convertedEndTime = convertDateToHourMin(endTime);

  return {
    formattedStartingDate: moment(startDate).hour(convertedStartTime.hour).minute(convertedStartTime.min).format(),
    formattedEndingDate:  moment(endDate).hour(convertedEndTime.hour).minute(convertedEndTime.min).format(),
  }
} 

export const convertDateToHourMin =(date) => {
  return {
    hour: moment(date).hour(),
    min: moment(date).minute(),
  }
}
