import moment from 'moment';

import {prepositions, types} from '../config/const';

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInt(0, array.length);
  return array[randomIndex];
};

export const getRandomInt = (min, max) => {
  return min + Math.floor(max * Math.random());
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomInt(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

export const isToday = (date) => {
  return moment().isSame(moment(date), `day`);
};

export const isExpired = (date) => {
  return moment().isAfter(moment(date));
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTERNODE: `after`,
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTERNODE:
      container.after(element);
      break;
  }
};

export const replaceWith = (component, newComponent) => {
  component.getElement().replaceWith(newComponent.getElement());
};

export const generateDays = (points, firstDay) => {
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
  const firstDayValue = 1;

  for (const dateTime of allPointTimes) {
    const difference = Math.round(dateTime.diff(firstDay, `days`, true));
    days.push({
      counter: (dateTime === firstDay) ? firstDayValue : difference + firstDayValue,
      date: dateTime,
      points: points.filter((item) => item.startTime.isSame(dateTime, `day`))
    });
  }
  return days;
};

export const replace = (newComponent, oldComponent) => {

  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const calculateDuration = (startTime, finishTime) => {

  const diff = finishTime.diff(startTime);
  const diffDuration = moment.duration(diff);

  let duration = ``;

  if (diffDuration.days() !== 0) {
    duration += `${diffDuration.days()}D `;
  }

  if (diffDuration.hours() !== 0) {
    duration += `${diffDuration.hours()}H `;
  }

  if (diffDuration.minutes() !== 0) {
    duration += `${diffDuration.minutes()}M`;
  }

  return duration;
};

export const calculateDurationMs = (startTime, finishTime) => {
  const diff = finishTime.diff(startTime);
  const diffDuration = moment.duration(diff);
  return diffDuration.asMilliseconds();
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const getTotalPrice = (points) => {
  let sum = 0;
  for (const event of points) {
    sum += event.price;
    sum += event.options.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0
    );
  }
  return sum;
};

export const calculateDurationFromMs = (mseconds) => {

  const diffDuration = moment.duration(mseconds);

  let duration = ``;

  if (diffDuration.days() !== 0) {
    duration += `${diffDuration.days()}D `;
  }

  if (diffDuration.hours() !== 0) {
    duration += `${diffDuration.hours()}H `;
  }

  if (diffDuration.minutes() !== 0) {
    duration += `${diffDuration.minutes()}M`;
  }

  return duration;
};

export const setFirstLetterToUpperCase = (string) => {
  return `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;
};

export const generatePlaceholder = (type) => {
  return `${setFirstLetterToUpperCase(type)} ${prepositions.get(types.get(type))}`;
};


