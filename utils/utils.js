export const SECONDS_IN_MINUTE = 60;
export const SECONDS_IN_HOUR = 60 * 60;
export const SECONDS_IN_DAY = 60 * 60 * 24;

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

export const calculateSeconds = timeObj => timeObj.hours * SECONDS_IN_HOUR + timeObj.minutes * SECONDS_IN_MINUTE + timeObj.seconds;

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






// =======================================================================================================

export const standartTariff = minutes => {
  const HOUR = 60;
  const MONEY_PER_MINUTE_FIRST_HOUR = 6;
  const MONEY_PER_MINUTE_SECOND_HOUR = 3;
  const MONEY_PER_MINUTE_MORE_THAN_TWO_HOURS = 2;

  if (minutes === undefined) {
    throw new Error('Значение времени не передано!');
  }

  let result = {
    forPayment: 0,
    paymentDescription: ''
  }

  // Если гость пробыл час или меньше
  if (minutes <= HOUR) {
    result.forPayment = minutes * MONEY_PER_MINUTE_FIRST_HOUR;
    result.paymentDescription += `За 1-ый час :${minutes * MONEY_PER_MINUTE_FIRST_HOUR}: `;
    return result;
  }

  // Если гость пробыл два часа или меньше
  if (minutes <= HOUR * 2) {
    result.forPayment += HOUR * MONEY_PER_MINUTE_FIRST_HOUR;
    result.paymentDescription += `За 1-ый час :${HOUR * MONEY_PER_MINUTE_FIRST_HOUR}: `;
    minutes -= HOUR;

    result.forPayment += minutes * MONEY_PER_MINUTE_SECOND_HOUR;
    result.paymentDescription += `За 2-ой час :${minutes * MONEY_PER_MINUTE_SECOND_HOUR}: `;
    return result;
  }

  // Если гость пробыл больше двух часов
  result.forPayment += HOUR * MONEY_PER_MINUTE_FIRST_HOUR;
  result.paymentDescription += `За 1-ый час :${HOUR * MONEY_PER_MINUTE_FIRST_HOUR}: `;
  minutes -= HOUR;

  result.forPayment += HOUR * MONEY_PER_MINUTE_SECOND_HOUR;
  result.paymentDescription += `За 2-ой час :${HOUR * MONEY_PER_MINUTE_SECOND_HOUR}: `;
  minutes -= HOUR;

  result.forPayment += minutes * MONEY_PER_MINUTE_MORE_THAN_TWO_HOURS;
  result.paymentDescription += `За 3-ий час и более:${minutes * MONEY_PER_MINUTE_MORE_THAN_TWO_HOURS}: `;

  return result;
}

export const childTariff = minutes => {
  const HOUR = 60;
  const MONEY_PER_MINUTE_FIRST_HOUR = 4.2;
  const MONEY_PER_MINUTE_SECOND_HOUR = 3;
  const MONEY_PER_MINUTE_MORE_THAN_TWO_HOURS = 2;

  let result = {
    forPayment: 0,
    paymentDescription: ''
  }

  // Если гость пробыл час или меньше
  if (minutes <= HOUR) {
    result.forPayment = minutes * MONEY_PER_MINUTE_FIRST_HOUR;
    result.paymentDescription += `За 1-ый час :${minutes * MONEY_PER_MINUTE_FIRST_HOUR}: `;

    result.forPayment = Math.round(result.forPayment);
    return result;
  }

  // Если гость пробыл два часа или меньше
  if (minutes <= HOUR * 2) {
    result.forPayment += HOUR * MONEY_PER_MINUTE_FIRST_HOUR;
    result.paymentDescription += `За 1-ый час :${HOUR * MONEY_PER_MINUTE_FIRST_HOUR}: `;
    minutes -= HOUR;

    result.forPayment += minutes * MONEY_PER_MINUTE_SECOND_HOUR;
    result.paymentDescription += `За 2-ой час :${minutes * MONEY_PER_MINUTE_SECOND_HOUR}: `;

    result.forPayment = Math.round(result.forPayment);
    return result;
  }

  // Если гость пробыл больше двух часов
  result.forPayment += HOUR * MONEY_PER_MINUTE_FIRST_HOUR;
  result.paymentDescription += `За 1-ый час :${HOUR * MONEY_PER_MINUTE_FIRST_HOUR}: `;
  minutes -= HOUR;

  result.forPayment += HOUR * MONEY_PER_MINUTE_SECOND_HOUR;
  result.paymentDescription += `За 2-ой час :${HOUR * MONEY_PER_MINUTE_SECOND_HOUR}: `;
  minutes -= HOUR;

  result.forPayment += minutes * MONEY_PER_MINUTE_MORE_THAN_TWO_HOURS;
  result.paymentDescription += `За 3-ий час :${minutes * MONEY_PER_MINUTE_MORE_THAN_TWO_HOURS}: `;

  result.forPayment = Math.round(result.forPayment);
  return result;
}




export const convertMinutesToMoney = ({minutes, breakMinutes, isHoliday = false, tariffsId = '1'}) => {
  let result;

  switch (tariffsId) {
    case '1':
        result = standartTariff(minutes - breakMinutes);
        result.paymentDescription += ` Перерыв :${breakMinutes}:`
      break;

    case '2':
        result = childTariff(minutes - breakMinutes);
        // result = standartTariff(minutes - breakMinutes);
        result.paymentDescription += ` Перерыв :${breakMinutes}:`
        result.paymentDescription += ` Детский тариф`
      break;

    default:
      break;
  }

  // if (isHoliday) {
  //   // result.forPayment = result.forPayment >= 700 ? 700 : Math.round(result.forPayment); // Проверка на стопчек по праздникам и выходным
  //   result.forPayment = result.forPayment >= 700 ? 700 : Math.round(result.forPayment); // Проверка на стопчек по праздникам и выходным
  // } else {
  //   result.forPayment = result.forPayment >= 600 ? 600 : Math.round(result.forPayment); // Проверка на стопчек по будним дням
  // }

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

