import {createEventEditTemplate} from './components/editEvent';
import {generatePoints, generateDays, getTotalPrice} from './mocks/point';
import {render as domRender, RenderPosition} from './utils';
import Filters from './components/filters';
import Menu from './components/menu';
import Total from './components/total';
import TripRoute from './components/tripRoute';
import Sorting from './components/sorting';
import TripDays from './components/tripDays';
import Day from './components/day';
import Event from './components/event';
import Form from './components/editEvent';


const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const points = generatePoints(10);
const daysEvents = generateDays(points);
const total = getTotalPrice(daysEvents);

const [menuTitle, filterTitle] = document.querySelector(`.trip-controls`).children;
const trip = document.querySelector(`.trip-info`);
domRender(trip, new TripRoute(daysEvents).getElement(), RenderPosition.BEFOREEND);
domRender(trip, new Total(total).getElement(), RenderPosition.BEFOREEND);
domRender(menuTitle, new Menu().getElement(), RenderPosition.AFTERNODE);
domRender(filterTitle, new Filters().getElement(), RenderPosition.AFTERNODE);

const trips = document.querySelector(`.trip-events`);
domRender(trips, new Sorting().getElement(), RenderPosition.BEFOREEND);
domRender(trips, new TripDays().getElement(), RenderPosition.BEFOREEND);

const days = document.querySelector(`.trip-days`);

const daysDOMElements = [];

daysEvents.map((item) => {
  const dayDOM = new Day(item);
  daysDOMElements.push(dayDOM);
  domRender(days, dayDOM.getElement(), RenderPosition.BEFOREEND);
});

const renderEvent = (event, position) => {
  const eventCard = new Event(event);

  const showButton = eventCard.getElement().querySelector(`.event__rollup-btn`);

  showButton.addEventListener(`click`, () => {
    console.log(event);
  });

  domRender(position, eventCard.getElement(), RenderPosition.BEFOREEND);
};

daysDOMElements.map((element) => {
  const dayList = element.getElement().querySelector(`.trip-events__list`);
  element.points.map((point) => renderEvent(point, dayList));
});

const dayEvents = document.querySelector(`.trip-events__list`);

domRender(dayEvents, new Form(daysEvents[0].points[0]).getElement(), RenderPosition.BEFOREEND);
