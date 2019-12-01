import {getRandomInt, getRandomDate} from '../utils';
import {CURRENCY} from '../config';
import moment from 'moment';
import {Options} from './data/options';
import {Types} from './data/types';

const DEFAULT_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
 Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis 
 at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex,
 convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, 
 condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam 
 faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue 
 convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. 
 In rutrum ac purus sit amet tempus.`;

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
