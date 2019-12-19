import Sorting from '../components/sorting';
import Day from '../components/day';
import TripDays from '../components/tripDays';
import {render, RenderPosition, generateDays} from '../utils';
import EventController from './eventController';

export default class TripController {

  constructor(container) {
    this._container = container;
    this._sort = new Sorting();
    this._tripDays = new TripDays();
    this._points = [];
    this._renderedControllers = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this.rerenderEventsWithDays = this.rerenderEventsWithDays.bind(this);
  }

  _onDataChange(controller, oldObject, newObject) {

    const index = this._points.findIndex((object) => object === oldObject);
    if (index === -1) {
      return;
    }
    this._points[index] = newObject;
    controller.renderEvent(newObject);
  }

  rerenderEventsWithDays() {
    this.renderEventsWithDays(this._points);
  }

  _onViewChange() {
    this._renderedControllers.forEach((controller) => controller.setDefaultView());
  }

  renderLayout(points) {

    this._points = points;

    render(this._container, this._sort.getElement(), RenderPosition.BEFOREEND);
    render(this._container, this._tripDays.getElement(), RenderPosition.BEFOREEND);

    this._sort.setOnClickHandler((sortType) => {
      const sortTypes = this._sort.sortTypes;
      this._tripDays.clearElement();
      switch (sortType) {
        case sortTypes().DEFAULT:
          this.renderEventsWithDays(this._points);
          break;
        case sortTypes().PRICE:
          this.renderEventsWithoutDays(this._points.slice().sort((a, b) => b.price - a.price));
          break;
        case sortTypes().DATE:
          this.renderEventsWithoutDays(this._points.slice().sort((a, b) => b.durationInMs - a.durationInMs));
          break;
      }
    });

    this.renderEventsWithDays(this._points);
  }

  renderEventsWithoutDays(points) {
    const day = new Day();
    render(this._tripDays.getElement(), day.getElement(), RenderPosition.BEFOREEND);
    const dayList = day.getEventsContainer();
    this._renderedControllers = points.map((point) => {
      const event = new EventController(dayList, this._onDataChange, this._onViewChange, this.rerenderEventsWithDays);
      event.renderEvent(point, dayList);
      return event;
    });
  }

  renderEventsWithDays(points) {
    const daysEvents = generateDays(points);
    const daysElements = [];
    const days = this._tripDays.getElement();

    daysEvents.map((item) => {
      const day = new Day(item);
      daysElements.push(day);
      render(days, day.getElement(), RenderPosition.BEFOREEND);
    });
    this._renderedControllers = [];
    daysElements.map((element) => {
      const dayList = element.getEventsContainer();
      element.points.map((point) => {
        const event = new EventController(dayList, this._onDataChange, this._onViewChange, this.rerenderEventsWithDays);
        event.renderEvent(point, dayList);
        this._renderedControllers.push(event);
      });
    });
  }

}


