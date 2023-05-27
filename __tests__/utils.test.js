import { convertTimeStringToObject, calculateMinutes, calculateSeconds, standartTariff } from '../utils/utils';

describe('standartTariff work', () => {
  test('throw Error value do not make', () => {
    expect(() => standartTariff()).toThrow();
  });

  test('standartTariff get money', () => {
    expect(standartTariff(0)).toStrictEqual({forPayment: 0, paymentDescription: 'За 1-ый час :0: '});
    expect(standartTariff(1)).toStrictEqual({forPayment: 6, paymentDescription: 'За 1-ый час :6: '});
    expect(standartTariff(15)).toStrictEqual({forPayment: 90, paymentDescription: 'За 1-ый час :90: '});
    expect(standartTariff(59)).toStrictEqual({forPayment: 354, paymentDescription: 'За 1-ый час :354: '});
    expect(standartTariff(60)).toStrictEqual({forPayment: 360, paymentDescription: 'За 1-ый час :360: '});
    expect(standartTariff(61)).toStrictEqual({forPayment: 363, paymentDescription: 'За 1-ый час :360: За 2-ой час :3: '});
    expect(standartTariff(120)).toStrictEqual({forPayment: 540, paymentDescription: 'За 1-ый час :360: За 2-ой час :180: '});
    expect(standartTariff(121)).toStrictEqual({forPayment: 542, paymentDescription: 'За 1-ый час :360: За 2-ой час :180: За 3-ий час и более:2: '});
    expect(standartTariff(180)).toStrictEqual({forPayment: 660, paymentDescription: 'За 1-ый час :360: За 2-ой час :180: За 3-ий час и более:120: '});
    expect(standartTariff(200)).toStrictEqual({forPayment: 700, paymentDescription: 'За 1-ый час :360: За 2-ой час :180: За 3-ий час и более:160: '});
  });
});

describe('calculateSeconds work', () => {
  test('throw Error value do not make', () => {
    expect(() => calculateSeconds()).toThrow();
  });

  test('calculateSeconds get seconds', () => {
    expect(calculateSeconds({hours : 0, minutes: 0, seconds: 0})).toBe(0);
    expect(calculateSeconds({hours : 0, minutes: 0, seconds: 1})).toBe(1);
    expect(calculateSeconds({hours : 0, minutes: 1, seconds: 1})).toBe(61);
    expect(calculateSeconds({hours : 1, minutes: 1, seconds: 1})).toBe(3661);
    expect(calculateSeconds({hours : 23, minutes: 59, seconds: 59})).toBe(86399);
  });
});

describe('calculateMinutes work', () => {
  test('throw Error value do not make', () => {
    expect(() => calculateMinutes()).toThrow();
  });

  test('calculateMinutes get minutes', () => {
    expect(calculateMinutes({hours : 0, minutes: 0, seconds: 0}, {hours : 0, minutes: 0, seconds: 0})).toBe(0);
    expect(calculateMinutes({hours : 1, minutes: 1, seconds: 1}, {hours : 1, minutes: 1, seconds: 1})).toBe(0);
    expect(calculateMinutes({hours : 23, minutes: 59, seconds: 59}, {hours : 23, minutes: 59, seconds: 59})).toBe(0);
    
    expect(calculateMinutes({hours : 0, minutes: 0, seconds: 0}, {hours : 1, minutes: 1, seconds: 1})).toBe(61);
    expect(calculateMinutes({hours : 0, minutes: 0, seconds: 0}, {hours : 23, minutes: 59, seconds: 59})).toBe(1440);
    
    expect(calculateMinutes({hours : 1, minutes: 2, seconds: 3}, {hours : 4, minutes: 5, seconds: 6})).toBe(183);
    expect(calculateMinutes({hours : 10, minutes: 11, seconds: 12}, {hours : 13, minutes: 14, seconds: 15})).toBe(183);
    expect(calculateMinutes({hours : 20, minutes: 21, seconds: 22}, {hours : 23, minutes: 24, seconds: 25})).toBe(183);

    // переходы 
    expect(calculateMinutes({hours : 0, minutes: 0, seconds: 59}, {hours : 0, minutes: 1, seconds: 1})).toBe(0);
    expect(calculateMinutes({hours : 0, minutes: 0, seconds: 59}, {hours : 0, minutes: 1, seconds: 28})).toBe(0);
    expect(calculateMinutes({hours : 0, minutes: 0, seconds: 59}, {hours : 0, minutes: 1, seconds: 29})).toBe(1);
    expect(calculateMinutes({hours : 22, minutes: 59, seconds: 59}, {hours : 23, minutes: 0, seconds: 1})).toBe(0);
    expect(calculateMinutes({hours : 22, minutes: 59, seconds: 59}, {hours : 23, minutes: 0, seconds: 28})).toBe(0);
    expect(calculateMinutes({hours : 22, minutes: 59, seconds: 59}, {hours : 23, minutes: 0, seconds: 29})).toBe(1);

    // "отрицательное время"
    expect(calculateMinutes({hours : 23, minutes: 59, seconds: 59}, {hours : 0, minutes: 0, seconds: 1})).toBe(0);
    expect(calculateMinutes({hours : 23, minutes: 59, seconds: 59}, {hours : 0, minutes: 0, seconds: 28})).toBe(0);
    expect(calculateMinutes({hours : 23, minutes: 59, seconds: 59}, {hours : 0, minutes: 0, seconds: 29})).toBe(1);
    expect(calculateMinutes({hours : 23, minutes: 59, seconds: 59}, {hours : 0, minutes: 1, seconds: 28})).toBe(1);
    expect(calculateMinutes({hours : 23, minutes: 59, seconds: 59}, {hours : 0, minutes: 1, seconds: 29})).toBe(2);
  });
});

describe('convertTimeStringToObject work', () => {
  test('throw Error value do not make', () => {
    expect(() => convertTimeStringToObject()).toThrow('Значение времени не передано!');
  });

  test('throw Error length string < 8 chars', () => {
    expect(convertTimeStringToObject).toThrow();
    expect(() => convertTimeStringToObject(':')).toThrow('Невалидный формат : длина timeString НЕ РАВНА 8');
    expect(() => convertTimeStringToObject('::')).toThrow('Невалидный формат : длина timeString НЕ РАВНА 8');
    expect(() => convertTimeStringToObject('1')).toThrow('Невалидный формат : длина timeString НЕ РАВНА 8');
    expect(() => convertTimeStringToObject('12')).toThrow('Невалидный формат : длина timeString НЕ РАВНА 8');
    expect(() => convertTimeStringToObject('123')).toThrow('Невалидный формат : длина timeString НЕ РАВНА 8');
    expect(() => convertTimeStringToObject('1234')).toThrow('Невалидный формат : длина timeString НЕ РАВНА 8');
    expect(() => convertTimeStringToObject('12345')).toThrow('Невалидный формат : длина timeString НЕ РАВНА 8');
    expect(() => convertTimeStringToObject('123456')).toThrow('Невалидный формат : длина timeString НЕ РАВНА 8');
    expect(() => convertTimeStringToObject('1234567')).toThrow('Невалидный формат : длина timeString НЕ РАВНА 8');
  });
  test('throw Error length string > 8 chars', () => {
    expect(() => convertTimeStringToObject('123456789')).toThrow('Невалидный формат : длина timeString НЕ РАВНА 8');
    expect(() => convertTimeStringToObject('123456789a')).toThrow('Невалидный формат : длина timeString НЕ РАВНА 8');
    expect(() => convertTimeStringToObject('123456789ab')).toThrow('Невалидный формат : длина timeString НЕ РАВНА 8');
    expect(() => convertTimeStringToObject('123456789abc')).toThrow('Невалидный формат : длина timeString НЕ РАВНА 8');
    expect(() => convertTimeStringToObject('                  ')).toThrow('Невалидный формат : длина timeString НЕ РАВНА 8');
  });
  test('throw Error string contein only 0123456789', () => {
    expect(() => convertTimeStringToObject('x0000000')).toThrow('Невалидный формат : допустимые символы : "0123456789"');
    expect(() => convertTimeStringToObject('0x000000')).toThrow('Невалидный формат : допустимые символы : "0123456789"');
    expect(() => convertTimeStringToObject('00x00000')).toThrow('Невалидный формат : допустимые символы : "0123456789"');
    expect(() => convertTimeStringToObject('000x0000')).toThrow('Невалидный формат : допустимые символы : "0123456789"');
    expect(() => convertTimeStringToObject('0000x000')).toThrow('Невалидный формат : допустимые символы : "0123456789"');
    expect(() => convertTimeStringToObject('00000x00')).toThrow('Невалидный формат : допустимые символы : "0123456789"');
    expect(() => convertTimeStringToObject('x0000x00')).toThrow('Невалидный формат : допустимые символы : "0123456789"');
    expect(() => convertTimeStringToObject('xx00xx00')).toThrow('Невалидный формат : допустимые символы : "0123456789"');
    expect(() => convertTimeStringToObject('00xxxx00')).toThrow('Невалидный формат : допустимые символы : "0123456789"');
    expect(() => convertTimeStringToObject('xxxxxx00')).toThrow('Невалидный формат : допустимые символы : "0123456789"');
  });
  test('throw Error string does not contain ":"', () => {
    expect(() => convertTimeStringToObject('00000000')).toThrow('Невалидный формат : верный формат XX:XX:XX');
    expect(() => convertTimeStringToObject('00:00000')).toThrow('Невалидный формат : верный формат XX:XX:XX');
    expect(() => convertTimeStringToObject('000000:0')).toThrow('Невалидный формат : верный формат XX:XX:XX');
    expect(() => convertTimeStringToObject('0000000:')).toThrow('Невалидный формат : верный формат XX:XX:XX');
    expect(() => convertTimeStringToObject(':0000000')).toThrow('Невалидный формат : верный формат XX:XX:XX');
  });
  test('throw Error the value is out of range', () => {
    expect(() => convertTimeStringToObject('24:00:00')).toThrow('Значение часов не лежит в диапазоне 0-23');
    expect(() => convertTimeStringToObject('99:00:00')).toThrow('Значение часов не лежит в диапазоне 0-23');
    expect(() => convertTimeStringToObject('00:60:00')).toThrow('Значение минут не лежит в диапазоне 0-59');
    expect(() => convertTimeStringToObject('00:99:00')).toThrow('Значение минут не лежит в диапазоне 0-59');
    expect(() => convertTimeStringToObject('00:00:60')).toThrow('Значение секунд не лежит в диапазоне 0-59');
    expect(() => convertTimeStringToObject('00:00:99')).toThrow('Значение секунд не лежит в диапазоне 0-59');
  });
  test('valided time', () => {
    expect(convertTimeStringToObject('00:00:00')).toStrictEqual({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    expect(convertTimeStringToObject('23:59:59')).toStrictEqual({
        hours: 23,
        minutes: 59,
        seconds: 59,
    });
    expect(convertTimeStringToObject('01:01:01')).toStrictEqual({
        hours: 1,
        minutes: 1,
        seconds: 1,
    });
  });
});
