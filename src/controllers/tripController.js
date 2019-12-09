import Event from '../components/event';
import Form from '../components/editEvent';
import Sorting from '../components/sorting';
import Day from '../components/day';
import TripDays from '../components/tripDays';
import {render, RenderPosition, replaceWith, generateDays} from '../utils';

export default class TripController {

  constructor(container) {
    this._container = container;
    this._sort = new Sorting();
    this._tripDays = new TripDays();
  }

  renderEvent(event, position) {
    const eventCard = new Event(event);
    const eventForm = new Form(event);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        replaceWith(eventForm, eventCard);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventCard.setShowButtonHandler(() => {
      replaceWith(eventCard, eventForm);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventForm.setSubmitHandler(() => {
      replaceWith(eventForm, eventCard);
    });

    eventForm.setCollapseHandler(() => {
      replaceWith(eventForm, eventCard);
    });

    render(position, eventCard.getElement(), RenderPosition.BEFOREEND);
  }

  renderLayout(points) {

    render(this._container, this._sort.getElement(), RenderPosition.BEFOREEND);
    render(this._container, this._tripDays.getElement(), RenderPosition.BEFOREEND);

    this._sort.setOnClickHandler((sortType) => {
      const sortTypes = this._sort.sortTypes;
      this._tripDays.clearElement();
      switch (sortType) {
        case sortTypes().DEFAULT:
          this.renderEventsWithDays(points);
          break;
        case sortTypes().PRICE:
          this.renderEventsWithoutDays(points.slice().sort((a, b) => b.price - a.price));
          break;
        case sortTypes().DATE:
          this.renderEventsWithoutDays(points.slice().sort((a, b) => b.durationInMs - a.durationInMs));
          break;
      }
    });

    this.renderEventsWithDays(points);
  }


  renderEventsWithoutDays(points) {
    const day = new Day();
    render(this._tripDays.getElement(), day.getElement(), RenderPosition.BEFOREEND);
    const dayList = day.getEventsContainer();
    points.map((point) => this.renderEvent(point, dayList));
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

    daysElements.map((element) => {
      const dayList = element.getEventsContainer();
      element.points.map((point) => this.renderEvent(point, dayList));
    });
  }

}


