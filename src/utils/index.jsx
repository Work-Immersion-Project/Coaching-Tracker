export const delayInMilliseconds = async (milliseconds) =>
  await new Promise((resolve) => setTimeout(resolve, milliseconds));

export const delayInSeconds = async (seconds) =>
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
