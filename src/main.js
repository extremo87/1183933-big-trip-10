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
import NoPoints from './components/noPoints';


const points = generatePoints(20);

const [menuTitle, filterTitle] = document.querySelector(`.trip-controls`).children;
const trip = document.querySelector(`.trip-info`);
const trips = document.querySelector(`.trip-events`);
render(menuTitle, new Menu().getElement(), RenderPosition.AFTERNODE);
render(filterTitle, new Filters().getElement(), RenderPosition.AFTERNODE);

if (points.length === 0) {

  render(trip, new Total(0).getElement(), RenderPosition.BEFOREEND);
  render(trips, new NoPoints().getElement(), RenderPosition.AFTERNODE);

} else {

  const daysEvents = generateDays(points);
  const total = getTotalPrice(daysEvents);

  render(trip, new TripRoute(daysEvents).getElement(), RenderPosition.BEFOREEND);
  render(trip, new Total(total).getElement(), RenderPosition.BEFOREEND);

  render(trips, new Sorting().getElement(), RenderPosition.BEFOREEND);
  render(trips, new TripDays().getElement(), RenderPosition.BEFOREEND);

  const days = document.querySelector(`.trip-days`);

  const daysElements = [];

  daysEvents.map((item) => {
    const dayDOM = new Day(item);
    daysElements.push(dayDOM);
    render(days, dayDOM.getElement(), RenderPosition.BEFOREEND);
  });

  daysElements.map((element) => {
    const dayList = element.getElement().querySelector(`.trip-events__list`);
    element.points.map((point) => Event.renderEvent(point, dayList));
  });
}


