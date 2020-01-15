import {render, RenderPosition} from './utils';
import Menu, {MenuItem} from './components/menu';
import NoPoints from './components/noPoints';
import TripController from './controllers/tripController';
import TripDetailsController from './controllers/tripDetailsController';
import TotalController from './controllers/totalController';
import Statistics from './components/statistics';
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
const statistics = new Statistics(model);
const appMenu = new Menu();

render(menuTitle, appMenu.getElement(), RenderPosition.AFTERNODE);
render(body, tripBoard.getElement(), RenderPosition.BEFOREEND);
render(body, statistics.getElement(), RenderPosition.BEFOREEND);
statistics.hide();

const filterController = new FilterController(filterTitle, model);
filterController.render();

const controller = new TripController(tripBoard, model, api);
const detailsController = new TripDetailsController(trip, model);
const totalController = new TotalController(trip, model);

appMenu.setOnClick((item) => {
  switch (item) {
    case MenuItem.STAT:
      controller.hide();
      statistics.show();
      break;
    case MenuItem.TABLE:
      statistics.hide();
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
  const [points, options, cities] = res;
  controller.setOptions(options);
  controller.setCities(cities);
  model.setPoints(points);

  if (points[0].length === 0) {
    totalController.render();
    render(trips, new NoPoints().getElement(), RenderPosition.AFTERNODE);
  } else {
    detailsController.render();
    totalController.render();
    controller.renderLayout();
  }
});
