import {createEventTemplate} from './event';

export const createDayTemplate = (day) => {
  return (`<li class="trip-days__item  day">
      <div class="day__info">
          <span class="day__counter">${day.date.format(`D`)}</span>
          <time class="day__date" datetime="2019-03-18">${day.date.format(`MMM YY`)}</time>
      </div>
      <ul class="trip-events__list">
          ${day.points.map((point) => createEventTemplate(point)).join(`\n`)}
      </ul>
      </li>`);
};
