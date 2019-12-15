import Form from '../components/editEvent';
import Event from '../components/event';
import {render, RenderPosition, replaceWith, replace} from '../utils';

export default class EventController {
  constructor(container, onDataChange) {
    this._container = container;
    this._eventForm = null;
    this._eventCard = null;
    this._onDataChange = onDataChange;
  }

  renderEvent(event) {
    const oldEventCard = this._eventCard;
    const oldEventForm = this._eventForm;

    this._eventCard = new Event(event);
    this._eventForm = new Form(event);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        replaceWith(this._eventForm, this._eventCard);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._eventCard.setShowButtonHandler(() => {
      replaceWith(this._eventCard, this._eventForm);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._eventForm.setSubmitHandler(() => {
      replaceWith(this._eventForm, this._eventCard);
    });

    this._eventForm.setCollapseHandler(() => {
      replaceWith(this._eventForm, this._eventCard);
    });

    this._eventForm.setFavouriteButtonHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {favorite: !event.favorite}));
    });

    if (oldEventCard && oldEventForm) {
      replace(this._eventCard, oldEventCard);
      replace(this._eventForm, oldEventForm);
    } else {
      render(this._container, this._eventCard.getElement(), RenderPosition.BEFOREEND);
    }

  }
}
