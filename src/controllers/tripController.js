import Event from '../components/event';
import Form from '../components/editEvent';
import Sorting from '../components/sorting';
import Day from '../components/day';
import TripDays from '../components/tripDays';
import {render, RenderPosition, replaceWith} from '../utils';

export default class TripController {

  constructor(container) {
    this._container = container;
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

  renderLayout(daysEvents) {

    render(this._container, new Sorting().getElement(), RenderPosition.BEFOREEND);
    render(this._container, new TripDays().getElement(), RenderPosition.BEFOREEND);

    const days = document.querySelector(`.trip-days`);

    const daysElements = [];

    daysEvents.map((item) => {
      const dayDOM = new Day(item);
      daysElements.push(dayDOM);
      render(days, dayDOM.getElement(), RenderPosition.BEFOREEND);
    });

    daysElements.map((element) => {
      const dayList = element.getElement().querySelector(`.trip-events__list`);
      element.points.map((point) => this.renderEvent(point, dayList));
    });
  }

}


