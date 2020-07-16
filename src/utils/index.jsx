import { sub, getHours, getMinutes } from "date-fns";
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
