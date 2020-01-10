import {render, RenderPosition, getTotalPrice} from './utils';
import Menu, {MenuItem} from './components/menu';
import Total from './components/total';
import TripRoute from './components/tripRoute';
import NoPoints from './components/noPoints';
import TripController from './controllers/tripController';
import PointModel from './models/points';
import FilterController from './controllers/filterController';
import TripBoard from './components/tripBoard';
import {AUTHORIZATION, END_POINT} from './config';
import API from './api';

const model = new PointModel();
const api = new API(END_POINT, AUTHORIZATION);
const btnNew = document.querySelector(`.trip-main__event-add-btn`);
const [menuTitle, filterTitle] = document.querySelector(`.trip-controls`).children;
const trip = document.querySelector(`.trip-info`);
const body = document.querySelector(`.page-body_main`);
const trips = document.querySelector(`.trip-events`);
const tripBoard = new TripBoard();
const appMenu = new Menu();

render(menuTitle, appMenu.getElement(), RenderPosition.AFTERNODE);
render(body, tripBoard.getElement(), RenderPosition.BEFOREEND);

const filterController = new FilterController(filterTitle, model);
filterController.render();

const controller = new TripController(tripBoard, model, api);

appMenu.setOnClick((item) => {
  switch (item) {
    case MenuItem.STAT:
      controller.hide();
      break;
    case MenuItem.TABLE:
      controller.show();
      break;
  }
});

btnNew.addEventListener(`click`, () => {
  controller.show();
  controller.createPoint();
});

Promise.all([
  api.getPoints(),
  api.getOffers(),
  api.getDestinations()
]).then((res) => {
  const points = res[0];
  controller.setOptions(res[1]);
  controller.setCities(res[2]);
  model.setPoints(points);

  if (points[0].length === 0) {
    render(trip, new Total(0).getElement(), RenderPosition.BEFOREEND);
    render(trips, new NoPoints().getElement(), RenderPosition.AFTERNODE);
  } else {
    const total = getTotalPrice(points);
    render(trip, new TripRoute(points).getElement(), RenderPosition.BEFOREEND);
    render(trip, new Total(total).getElement(), RenderPosition.BEFOREEND);
    controller.renderLayout();
  }
});
