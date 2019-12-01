import {getRandomInt,getRandomDate} from '../utils';
import {CURRENCY} from '../config';
import moment from 'moment';

const Types = [
  {
    name: `taxi`,
    img: `taxi.png`
  },
  {
    name: `bus`,
    img: `bus.png`
  },
  {
    name: `train`,
    img: `train.png`
  },
  {
    name: `ship`,
    img: `ship.png`
  },
  {
    name: `transport`,
    img: `transport.png`
  },

  {
    name: `drive`,
    img: `drive.png`
  },
  {
    name: `flight`,
    img: `flight.png`
  },
  {
    name: `check-in`,
    img: `check.png`
  },
  {
    name: `sightseeing`,
    img: `sightseeing.png`
  },
  {
    name: `restaurant`,
    img: `restaurant.png`
  }
];

const Options = [
  {
    name: `Book a taxi`,
    type: `taxi`,
    price: 20,
    currency: CURRENCY,
  },
  {
    name: `Book a premium taxi`,
    type: `taxi`,
    price: 35,
    currency: CURRENCY,
  },
  {
    name: `Book a motobike taxi`,
    type: `taxi`,
    price: 10,
    currency: CURRENCY,
  },
  {
    name: `Business class seat`,
    type: `flight`,
    price: 500,
    currency: CURRENCY,
  },
  {
    name: ` Choose a seat`,
    type: `flight`,
    price: 10,
    currency: CURRENCY,
  },
  {
    name: `Extra luggage`,
    type: `flight`,
    price: 50,
    currency: CURRENCY,
  },
  {
    name: `Business class seat`,
    type: `train`,
    price: 30,
    currency: CURRENCY,
  },
  {
    name: `Add a meal`,
    type: `train`,
    price: 20,
    currency: CURRENCY,
  },
  {
    name: `Using train media system`,
    type: `train`,
    price: 2,
    currency: CURRENCY,
  },
  {
    name: `Choose a seat`,
    type: `bus`,
    price: 3,
    currency: CURRENCY,
  },
  {
    name: `Add a luggage`,
    type: `bus`,
    price: 20,
    currency: CURRENCY,
  },
  {
    name: `Using bus media system`,
    type: `bus`,
    price: 2,
    currency: CURRENCY,
  },
  {
    name: `Speed boat`,
    type: `ship`,
    price: 50,
    currency: CURRENCY,
  },
  {
    name: `Ferry`,
    type: `ship`,
    price: 20,
    currency: CURRENCY,
  },
  {
    name: `Add a meal`,
    type: `ship`,
    price: 30,
    currency: CURRENCY,
  },
  {
    name: `Ride a hourse`,
    type: `transport`,
    price: 50,
    currency: CURRENCY,
  },
  {
    name: `Reserve riksha`,
    type: `transport`,
    price: 20,
    currency: CURRENCY,
  },
  {
    name: `Rent a tuk-tuk`,
    type: `transport`,
    price: 5,
    currency: CURRENCY,
  },
  {
    name: `Business class vehicle`,
    type: `drive`,
    price: 50,
    currency: CURRENCY,
  },
  {
    name: `Standard class vehicle`,
    type: `drive`,
    price: 30,
    currency: CURRENCY,
  },
  {
    name: `Rent a bus`,
    type: `drive`,
    price: 200,
    currency: CURRENCY,
  },
  {
    name: `Early check in`,
    type: `check-in`,
    price: 10,
    currency: CURRENCY,
  },
  {
    name: `Late check out`,
    type: `check-in`,
    price: 10,
    currency: CURRENCY,
  },
  {
    name: `Add an extra-bed`,
    type: `check-in`,
    price: 25,
    currency: CURRENCY,
  },
  {
    name: `Private tour`,
    type: `sightseeing`,
    price: 50,
    currency: CURRENCY,
  },
  {
    name: `Choose a tour language`,
    type: `sightseeing`,
    price: 10,
    currency: CURRENCY,
  },
  {
    name: `Half day tour`,
    type: `sightseeing`,
    price: 25,
    currency: CURRENCY,
  },
  {
    name: `Local cuisine dishes`,
    type: `restaurant`,
    price: 50,
    currency: CURRENCY,
  },
  {
    name: `Reserve a table`,
    type: `restaurant`,
    price: 10,
    currency: CURRENCY,
  },
  {
    name: `Unlimited beer`,
    type: `restaurant`,
    price: 25,
    currency: CURRENCY,
  }
];

const getRandomType = (types) => {
  return types[Math.floor(Math.random() * types.length)];
};

const getRandomOptions = (type, options) => {
  const randomInt = getRandomInt(0, 4);
  const randomOptions = options.filter((item) => type.name === item.type).slice(0, getRandomInt(1, randomInt));
  return randomOptions;
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

  return {
    type: randomType,
    options: randomOptions,
    startTime: startTimeRandom.format(`DD.MM.YYYY HH:mm`),
    finishTime: finishTimeRandom.format(`DD.MM.YYYY HH:mm`),
    duration: formattedDuration,
    price: randomPrice,
    currency: CURRENCY,
  };
};

export const generatePoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generatePoint);
};

