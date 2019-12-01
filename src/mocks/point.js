import {getRandomInt, getRandomDate} from '../utils';
import {CURRENCY} from '../config';
import moment from 'moment';

const DEFAULT_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
 Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis 
 at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex,
 convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, 
 condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam 
 faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue 
 convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. 
 In rutrum ac purus sit amet tempus.`;

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
    priority: true
  },
  {
    name: `Book a premium taxi`,
    type: `taxi`,
    price: 35,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Book a motobike taxi`,
    type: `taxi`,
    price: 10,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Business class seat`,
    type: `flight`,
    price: 500,
    currency: CURRENCY,
    priority: true
  },
  {
    name: ` Choose a seat`,
    type: `flight`,
    price: 10,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Extra luggage`,
    type: `flight`,
    price: 50,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Business class seat`,
    type: `train`,
    price: 30,
    currency: CURRENCY,
    priority: true
  },
  {
    name: `Add a meal`,
    type: `train`,
    price: 20,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Using train media system`,
    type: `train`,
    price: 2,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Choose a seat`,
    type: `bus`,
    price: 3,
    currency: CURRENCY,
    priority: true
  },
  {
    name: `Add a luggage`,
    type: `bus`,
    price: 20,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Using bus media system`,
    type: `bus`,
    price: 2,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Speed boat`,
    type: `ship`,
    price: 50,
    currency: CURRENCY,
    priority: true
  },
  {
    name: `Ferry`,
    type: `ship`,
    price: 20,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Add a meal`,
    type: `ship`,
    price: 30,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Ride a hourse`,
    type: `transport`,
    price: 50,
    currency: CURRENCY,
    priority: true
  },
  {
    name: `Reserve riksha`,
    type: `transport`,
    price: 20,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Rent a tuk-tuk`,
    type: `transport`,
    price: 5,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Business class vehicle`,
    type: `drive`,
    price: 50,
    currency: CURRENCY,
    priority: true
  },
  {
    name: `Standard class vehicle`,
    type: `drive`,
    price: 30,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Rent a bus`,
    type: `drive`,
    price: 200,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Early check in`,
    type: `check-in`,
    price: 10,
    currency: CURRENCY,
    priority: true
  },
  {
    name: `Late check out`,
    type: `check-in`,
    price: 10,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Add an extra-bed`,
    type: `check-in`,
    price: 25,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Private tour`,
    type: `sightseeing`,
    price: 50,
    currency: CURRENCY,
    priority: true
  },
  {
    name: `Choose a tour language`,
    type: `sightseeing`,
    price: 10,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Half day tour`,
    type: `sightseeing`,
    price: 25,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Local cuisine dishes`,
    type: `restaurant`,
    price: 50,
    currency: CURRENCY,
    priority: true
  },
  {
    name: `Reserve a table`,
    type: `restaurant`,
    price: 10,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Unlimited beer`,
    type: `restaurant`,
    price: 25,
    currency: CURRENCY,
    priority: false
  }
];

const getRandomDescriprion = (someText) => {
  const sentences = someText.split(`.`);
  const finalString = [];
  const count = getRandomInt(1, 3);
  for (let i = 0; i <= count; i++) {
    finalString.push(sentences[getRandomInt(0, sentences.length)]);
  }
  return finalString.join(`.`);
};

const generateImages = (count) => {
  return new Array(count)
    .fill(``)
    .map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
};

export const getCities = () => {
  return [
    {
      name: `Bangkok`,
      description: getRandomDescriprion(DEFAULT_TEXT),
      images: generateImages(5)
    },
    {
      name: `Kuala-Lumpur`,
      description: getRandomDescriprion(DEFAULT_TEXT),
      images: generateImages(5)
    },
    {
      name: `Tokio`,
      description: getRandomDescriprion(DEFAULT_TEXT),
      images: generateImages(5)
    },
    {
      name: `Seul`,
      description: getRandomDescriprion(DEFAULT_TEXT),
      images: generateImages(5)
    },
    {
      name: `Denpasar`,
      description: getRandomDescriprion(DEFAULT_TEXT),
      images: generateImages(5)
    },
    {
      name: `Moscow`,
      description: getRandomDescriprion(DEFAULT_TEXT),
      images: generateImages(5)
    },
    {
      name: `London`,
      description: getRandomDescriprion(DEFAULT_TEXT),
      images: generateImages(5)
    }
  ];
};

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
    startTime: startTimeRandom,
    finishTime: finishTimeRandom,
    duration: formattedDuration,
    price: randomPrice,
    currency: CURRENCY,
    important: false,
  };
};

export const generatePoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generatePoint);
};
