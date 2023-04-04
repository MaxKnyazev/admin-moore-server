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

export const convertMinutesToMoney = ({minutes, breakMinutes, isHoliday = false, tariffsId = '1'}) => {
  let result;

  switch (tariffsId) {
    case '1':
      result = standartTariff(minutes - breakMinutes);
      result.paymentDescription += ` Перерыв :${breakMinutes}:`
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

const standartTariff = minutes => {
  const HOUR = 60;
  const MONEY_PER_MINUTE_FIRST_HOUR = 6;
  const MONEY_PER_MINUTE_SECOND_HOUR = 3;
  const MONEY_PER_MINUTE_MORE_THAN_TWO_HOURS = 2;

  let result = {
    forPayment: 0,
    paymentDescription: ''
  }
  // let money = 0;

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
  result.paymentDescription += `За 3-ий час :${minutes * MONEY_PER_MINUTE_MORE_THAN_TWO_HOURS}: `;

  return result;
}