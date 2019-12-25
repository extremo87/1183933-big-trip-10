import {generatePoints, getTotalPrice} from './mocks/point';
import {render, RenderPosition} from './utils';
import Menu from './components/menu';
import Total from './components/total';
import TripRoute from './components/tripRoute';
import NoPoints from './components/noPoints';
import TripController from './controllers/tripController';
import PointModel from './models/points';
import FilterController from './controllers/filterController';


const points = generatePoints(20);

const model = new PointModel(points);

const [menuTitle, filterTitle] = document.querySelector(`.trip-controls`).children;
const trip = document.querySelector(`.trip-info`);
const trips = document.querySelector(`.trip-events`);
render(menuTitle, new Menu().getElement(), RenderPosition.AFTERNODE);

const filterController = new FilterController(filterTitle, model);
filterController.render();

if (points.length === 0) {

  render(trip, new Total(0).getElement(), RenderPosition.BEFOREEND);
  render(trips, new NoPoints().getElement(), RenderPosition.AFTERNODE);

} else {
  const total = getTotalPrice(points);

  render(trip, new TripRoute(points).getElement(), RenderPosition.BEFOREEND);
  render(trip, new Total(total).getElement(), RenderPosition.BEFOREEND);

  const controller = new TripController(trips, model);
  controller.renderLayout();
}


