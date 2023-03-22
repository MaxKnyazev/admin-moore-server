export const convertTimeStringToObject = timeString => {
  if (timeString.length !== 8) {
    throw new Error('Невалидное время');
  }
  timeString = timeString.split(':');
  return {
    hours: +timeString[0],
    minutes: +timeString[1],
    seconds: +timeString[2],
  }
}

export const calculateMinutes = (startTimeObj, stopTimeObj) => {
  let minutes = 0;

  let startTimeSeconds = (startTimeObj.hours * 3600) + (startTimeObj.minutes * 60) + startTimeObj.seconds;
  let stopTimeSeconds = (stopTimeObj.hours * 3600) + (stopTimeObj.minutes * 60) + stopTimeObj.seconds;
  
  minutes = Math.round((stopTimeSeconds - startTimeSeconds) / 60);

  if (minutes < 0) {
    throw new Error('Гость ушел раньше, чем пришел!');
  }
  
  return minutes;
}