import {createRouteTemplate} from './components/tripRoute';
import {createMenuTemplate} from './components/menu';
import {createFiltersTemplate} from './components/filters';
import {createDayTemplate} from './components/day';
import {createTripDaysTemplate} from './components/tripDays';
import {createEventEditTemplate} from './components/editEvent';
import {createEventAddTemplate} from './components/addEvent';
import {createEventTemplate} from './components/event';
import {createSortingTemplate} from './components/sorting';
import {COUNT} from './config';
import {generatePoints} from './mocks/point';
import {getCities} from './mocks/city';

const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const [menuTitle, filterTitle] = document.querySelector(`.trip-controls`).children;
const trip = document.querySelector(`.trip-info`);
render(trip, createRouteTemplate(), `afterbegin`);
render(menuTitle, createMenuTemplate(), `afterend`);
render(filterTitle, createFiltersTemplate(), `afterend`);

const trips = document.querySelector(`.trip-events`);
render(trips, createSortingTemplate());
render(trips, createEventAddTemplate());
render(trips, createTripDaysTemplate());

const days = document.querySelector(`.trip-days`);
render(days, createDayTemplate());

const dayEvents = document.querySelector(`.trip-events__list`);
render(dayEvents, createEventEditTemplate());

new Array(COUNT).fill(``).forEach(
    () => render(dayEvents, createEventTemplate())
);

console.log(generatePoints(100), getCities());
