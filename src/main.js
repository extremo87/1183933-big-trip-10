import {createRouteTemplate} from './components/tripRoute';
import {createMenuTemplate} from './components/menu';
import {createFiltersTemplate} from './components/filters';
import {createDayTemplate} from './components/day';
import {createTripDaysTemplate} from './components/tripDays';
import {createEventEditTemplate} from './components/editEvent';
import {createSortingTemplate} from './components/sorting';
import {createTotalTemplate} from './components/total';
import {generatePoints, generateDays, getTotalPrice} from './mocks/point';


const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const points = generatePoints(10);
const daysEvents = generateDays(points);
const total = getTotalPrice(daysEvents);

const [menuTitle, filterTitle] = document.querySelector(`.trip-controls`).children;
const trip = document.querySelector(`.trip-info`);
render(trip, createRouteTemplate(daysEvents), `afterbegin`);
render(trip, createTotalTemplate(total));
render(menuTitle, createMenuTemplate(), `afterend`);
render(filterTitle, createFiltersTemplate(), `afterend`);

const trips = document.querySelector(`.trip-events`);
render(trips, createSortingTemplate());
render(trips, createTripDaysTemplate());


const days = document.querySelector(`.trip-days`);

daysEvents.map((item) => render(days, createDayTemplate(item)));

const dayEvents = document.querySelector(`.trip-events__list`);
render(dayEvents, createEventEditTemplate(daysEvents[0].points[0]));
