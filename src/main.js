import {generatePoints, generateDays, getTotalPrice} from './mocks/point';
import {render, RenderPosition} from './utils';
import Filters from './components/filters';
import Menu from './components/menu';
import Total from './components/total';
import TripRoute from './components/tripRoute';
import NoPoints from './components/noPoints';
import TripController from './controllers/tripController';


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

  const controller = new TripController(trips);

  controller.renderLayout(daysEvents);
}


