import {generatePoints, generateDays, getTotalPrice} from './mocks/point';
import {render, RenderPosition} from './utils';
import Filters from './components/filters';
import Menu from './components/menu';
import Total from './components/total';
import TripRoute from './components/tripRoute';
import Sorting from './components/sorting';
import TripDays from './components/tripDays';
import Day from './components/day';
import Event from './components/event';
import Form from './components/editEvent';


const points = generatePoints(10);
const daysEvents = generateDays(points);
const total = getTotalPrice(daysEvents);
const [menuTitle, filterTitle] = document.querySelector(`.trip-controls`).children;
const trip = document.querySelector(`.trip-info`);

render(trip, new TripRoute(daysEvents).getElement(), RenderPosition.BEFOREEND);
render(trip, new Total(total).getElement(), RenderPosition.BEFOREEND);
render(menuTitle, new Menu().getElement(), RenderPosition.AFTERNODE);
render(filterTitle, new Filters().getElement(), RenderPosition.AFTERNODE);

const trips = document.querySelector(`.trip-events`);
render(trips, new Sorting().getElement(), RenderPosition.BEFOREEND);
render(trips, new TripDays().getElement(), RenderPosition.BEFOREEND);

const days = document.querySelector(`.trip-days`);

const daysElements = [];

daysEvents.map((item) => {
  const dayDOM = new Day(item);
  daysElements.push(dayDOM);
  render(days, dayDOM.getElement(), RenderPosition.BEFOREEND);
});

const renderEvent = (event, position) => {
  const eventCard = new Event(event);
  const eventForm = new Form(event);
  const showButton = eventCard.getElement().querySelector(`.event__rollup-btn`);
  const collapseButton = eventForm.getElement().querySelector(`.event__rollup-btn`);
  const saveButton = eventForm.getElement().querySelector(`.event__save-btn`);

  showButton.addEventListener(`click`, () => {
    eventCard.getElement().replaceWith(eventForm.getElement());
  });

  collapseButton.addEventListener(`click`, () => {
    eventForm.getElement().replaceWith(eventCard.getElement());
  });

  saveButton.addEventListener(`click`, () => {
    eventForm.getElement().replaceWith(eventCard.getElement());
  });

  render(position, eventCard.getElement(), RenderPosition.BEFOREEND);
};

daysElements.map((element) => {
  const dayList = element.getElement().querySelector(`.trip-events__list`);
  element.points.map((point) => renderEvent(point, dayList));
});
