import {getRandomInt, getRandomDate} from '../utils';
import {CURRENCY} from '../config';
import moment from 'moment';
import {Options} from './data/options';
import {Types} from './data/types';
import {Activities} from './data/activities';
import {getCities} from '../mocks/city';

const getRandomType = (types) => {
  return types[Math.floor(Math.random() * types.length)];
};

const getRandomOptions = (type, options) => {
  const randomInt = getRandomInt(0, 4);
  const randomOptions = options.filter((item) => type.name === item.type).slice(0, getRandomInt(1, randomInt));
  return randomOptions;
};

export const getTotalPrice = (days) => {
  let sum = 0;

  for (const day of days) {
    for (const event of day.points) {
      sum += event.price;
      sum += event.options.reduce(
          (accumulator, currentValue) => accumulator + currentValue.price,
          0
      );
    }
  }
  return sum;
};

const getRandomCity = (cities) => {
  return cities[Math.floor(Math.random() * cities.length)];
};

export const generatePoint = () => {
  const randomType = getRandomType(Types);
  const randomOptions = getRandomOptions(randomType, Options);
  const randomPrice = getRandomInt(1, 500);
  const startTimeRandom = moment(getRandomDate());
  const finishTimeRandom = startTimeRandom.clone().add(getRandomInt(1, 4), `h`).add(getRandomInt(1, 60), `m`);
  const timeDifference = finishTimeRandom.clone().diff(startTimeRandom);
  const eventDuration = moment.utc(moment.duration(timeDifference).asMilliseconds());
  const formattedDuration = `${eventDuration.format(`h`)}H ${eventDuration.format(`mm`)}M`;
  const currentCity = getRandomCity(getCities());

  return {
    name: Activities.get(randomType.name),
    city: currentCity,
    type: randomType,
    options: randomOptions,
    startTime: startTimeRandom,
    finishTime: finishTimeRandom,
    duration: formattedDuration,
    price: randomPrice,
    currency: CURRENCY,
    favorite: false,

  };
};

export const generatePoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generatePoint);
};

export const generateDays = (points) => {
  points.sort((a, b) => {
    if (a.startTime > b.startTime) {
      return 1;
    }
    if (a.startTime < b.startTime) {
      return -1;
    }
    return 0;
  });

  const repeatingDays = [];

  const allPointTimes = points.filter((item) => {
    if (!repeatingDays.includes(item.startTime.format(`L`))) {
      repeatingDays.push(item.startTime.format(`L`));
      return true;
    }
    return false;
  }).map((item) => item.startTime);

  const days = [];

  for (const dateTime of allPointTimes) {
    days.push({
      date: dateTime,
      points: points.filter((item) => item.startTime.isSame(dateTime, `day`))
    });
  }
  return days;
};

