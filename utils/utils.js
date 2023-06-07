export const SECONDS_IN_MINUTE = 60;
export const SECONDS_IN_HOUR = 60 * 60;
export const SECONDS_IN_DAY = 60 * 60 * 24;

export const HOUR = 60;
export const MONEY_PER_MINUTE_FIRST_HOUR = 6;
export const MONEY_PER_MINUTE_SECOND_HOUR = 3;
export const MONEY_PER_MINUTE_MORE_THAN_TWO_HOURS = 2;

export const MONEY_PER_MINUTE_FIRST_HOUR_CHILD = 4.2;
export const MONEY_PER_MINUTE_SECOND_HOUR_CHILD = 3;
export const MONEY_PER_MINUTE_MORE_THAN_TWO_HOURS_CHILD = 2;

export const convertTimeStringToObject = timeString => {
  if (!timeString) {
    throw new Error('Значение времени не передано!');
  }
  if (typeof timeString !== 'string') {
    timeString = String(timeString);
  }
  if (timeString.length !== 8) {
    throw new Error('Невалидный формат : длина timeString НЕ РАВНА 8');
  }

  const timeStringOnlyNumbers = timeString.split(':').join('')+'00';

  for (let char of timeStringOnlyNumbers) {
    if (char.codePointAt(0) < 48 || char.codePointAt(0) > 57) {
      throw new Error('Невалидный формат : допустимые символы : "0123456789"');
    } 
  }

  if (timeString[2] !== ':' || timeString[5] !== ':') {
    throw new Error('Невалидный формат : верный формат XX:XX:XX');
  }
  
  const timeStringArr = timeString.split(':');

  if (+timeStringArr[0] < 0 || +timeStringArr[0] > 23) {
    throw new Error('Значение часов не лежит в диапазоне 0-23');
  }
  if (+timeStringArr[1] < 0 || +timeStringArr[1] > 59) {
    throw new Error('Значение минут не лежит в диапазоне 0-59');
  }
  if (+timeStringArr[2] < 0 || +timeStringArr[2] > 59) {
    throw new Error('Значение секунд не лежит в диапазоне 0-59');
  }

  return {
    hours: +timeStringArr[0],
    minutes: +timeStringArr[1],
    seconds: +timeStringArr[2],
  }
}

export const calculateSeconds = time => time.hours * SECONDS_IN_HOUR + time.minutes * SECONDS_IN_MINUTE + time.seconds;

export const calculateMinutes = (startTimeObj, stopTimeObj) => {
  let minutes = 0;
  const startTimeSeconds = calculateSeconds(startTimeObj);
  const stopTimeSeconds  = calculateSeconds(stopTimeObj);
  
  minutes = Math.round((stopTimeSeconds - startTimeSeconds) / SECONDS_IN_MINUTE);

  if (minutes < 0) {
    minutes = Math.round((stopTimeSeconds - startTimeSeconds + SECONDS_IN_DAY) / SECONDS_IN_MINUTE);
  }

  return minutes;
}

export const calculatePayment = (o, minutes, moneyPerMinute, message) => {
  const money = Math.round(minutes * moneyPerMinute);
  o.forPayment += money;
  o.paymentDescription += `${message}${money}: `;
}

export const standartTariff = minutes => {
  if (minutes === undefined) {
    throw new Error('Значение времени не передано!');
  }

  const result = {
    forPayment: 0,
    paymentDescription: ''
  }
  // Если гость пробыл час или меньше
  if (minutes <= HOUR) {
    calculatePayment(result, minutes, MONEY_PER_MINUTE_FIRST_HOUR, 'За 1-ый час :');
    return result;
  }
  // Если гость пробыл два часа или меньше
  if (minutes <= HOUR * 2) {
    calculatePayment(result, HOUR, MONEY_PER_MINUTE_FIRST_HOUR, 'За 1-ый час :');
    minutes -= HOUR;
    calculatePayment(result, minutes, MONEY_PER_MINUTE_SECOND_HOUR, 'За 2-ой час :');
    return result;
  }
  // Если гость пробыл больше двух часов
  calculatePayment(result, HOUR, MONEY_PER_MINUTE_FIRST_HOUR, 'За 1-ый час :');
  minutes -= HOUR;
  calculatePayment(result, HOUR, MONEY_PER_MINUTE_SECOND_HOUR, 'За 2-ой час :');
  minutes -= HOUR;
  calculatePayment(result, minutes, MONEY_PER_MINUTE_MORE_THAN_TWO_HOURS, 'За 3-ий час и более:');

  return result;
}

export const childTariff = minutes => {
  if (minutes === undefined) {
    throw new Error('Значение времени не передано!');
  }

  const result = {
    forPayment: 0,
    paymentDescription: ''
  }

  // Если гость пробыл час или меньше
  if (minutes <= HOUR) {
    calculatePayment(result, minutes, MONEY_PER_MINUTE_FIRST_HOUR_CHILD, 'За 1-ый час :');
    return result;
  }
  // Если гость пробыл два часа или меньше
  if (minutes <= HOUR * 2) {
    calculatePayment(result, HOUR, MONEY_PER_MINUTE_FIRST_HOUR_CHILD, 'За 1-ый час :');
    minutes -= HOUR;
    calculatePayment(result, minutes, MONEY_PER_MINUTE_SECOND_HOUR_CHILD, 'За 2-ой час :');
    return result;
  }
  // Если гость пробыл больше двух часов
  calculatePayment(result, HOUR, MONEY_PER_MINUTE_FIRST_HOUR_CHILD, 'За 1-ый час :');
  minutes -= HOUR;
  calculatePayment(result, HOUR, MONEY_PER_MINUTE_SECOND_HOUR_CHILD, 'За 2-ой час :');
  minutes -= HOUR;
  calculatePayment(result, minutes, MONEY_PER_MINUTE_MORE_THAN_TWO_HOURS_CHILD, 'За 3-ий час и более:');
  
  return result;
}

export const convertMinutesToMoney = ({minutes, breakMinutes, isHoliday = false, tariffsId = '1'}) => {
  if (minutes === undefined || breakMinutes === undefined) {
    throw new Error('Значение времени не передано!');
  }

  let result;

  switch (tariffsId) {
    case '1':
        result = standartTariff(minutes - breakMinutes);
        result.paymentDescription += ` Перерыв :${breakMinutes}:`
      break;

    case '2':
        result = childTariff(minutes - breakMinutes);
        result.paymentDescription += ` Перерыв :${breakMinutes}: Детский тариф`
      break;

    default:
      break;
  }

  if (isHoliday) {
    if (result.forPayment >= 700) {
      result = {
        forPayment: 700,
        paymentDescription: 'Стопчек :700:'
      }
    }
  } else {
    if (result.forPayment >= 600) {
      result = {
        forPayment: 600,
        paymentDescription: 'Стопчек :600:'
      }
    }
  }

  return result;
}
