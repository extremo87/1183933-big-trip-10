import Form from '../components/editEvent';
import Event from '../components/event';
import {render, RenderPosition, replaceWith, replace} from '../utils';
import {Types} from '../mocks/data/types';
import {getCities} from '../mocks/city';
import {Activities} from '../mocks/data/activities';
import moment from 'moment';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class EventController {
  constructor(container, onDataChange, onViewChange, rerenderEventsWithDays) {
    this._container = container;
    this._eventForm = null;
    this._eventCard = null;
    this._onDataChange = onDataChange;
    this._mode = Mode.DEFAULT;
    this._onViewChange = onViewChange;
    this._prevousEvent = null;
    this._currentEvent = null;
    this._rerenderEventsWithDays = rerenderEventsWithDays;
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      if (this._prevousEvent !== this._currentEvent) {
        this._rolledBack();
        this._prevousEvent = null;
      }
      this.replaceWithCard();
      this._mode = Mode.DEFAULT;
    }
  }

  _rolledBack() {
    this._onDataChange(this, this._currentEvent, this._prevousEvent);
  }

  _commitChanges() {
    this._onDataChange(this, this._currentEvent, Object.assign({}, this._currentEvent, this._eventForm.getState()));
  }

  replaceWithCard() {
    replaceWith(this._eventForm, this._eventCard);
  }

  replaceWithForm() {
    replaceWith(this._eventCard, this._eventForm);
  }

  renderEvent(event) {

    if (!this._prevousEvent) {
      this._prevousEvent = event;
    }

    this._currentEvent = event;

    const oldEventForm = this._eventForm;
    const oldEventCard = this._eventCard;
    this._eventCard = new Event(event);
    this._eventForm = new Form(event);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        this.replaceWithCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._eventCard.setShowButtonHandler(() => {
      this._onViewChange();
      this.replaceWithForm();
      this._mode = Mode.EDIT;
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._eventForm.setCollapseHandler(() => {
      this._rolledBack();
      this.replaceWithCard();
    });

    this._eventForm.setFavouriteButtonHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {favorite: !event.favorite}));
    });

    this._eventForm.selectTypeHandler((evt) => {
      this._eventForm._type = Types.find((x) => x.name === evt.target.value);
      this._eventForm._name = Activities.get(this._eventForm._type.name);
      this._commitChanges();
    });

    this._eventForm.setOnSelectChange((evt) => {
      this._eventForm._city = getCities().find((x) => x.name === evt.target.value);
      this._commitChanges();
    });

    this._eventForm.setStartTimeHandler((evt) => {
      this._eventForm._startTime = moment(evt.target.value, `DD/MM/YYYY hh:mm`);
      this._commitChanges();
    });

    this._eventForm.setFinishTimeHandler((evt) => {
      this._eventForm._finishTime = moment(evt.target.value, `DD/MM/YYYY hh:mm`);
      this._commitChanges();
    });

    this._eventForm.setSubmitHandler(() => {
      this._prevousEvent = null;
      this._commitChanges();
      this.replaceWithCard();
      this._rerenderEventsWithDays();
    });

    if (oldEventForm && oldEventCard) {
      replace(this._eventForm, oldEventForm);
      replace(this._eventCard, oldEventCard);
    } else {
      render(this._container, this._eventCard.getElement(), RenderPosition.BEFOREEND);
    }
  }
}
