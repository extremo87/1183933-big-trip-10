import Form from '../components/editEvent';
import Event from '../components/event';
import {render, RenderPosition, replaceWith, replace} from '../utils';
import {Types} from '../mocks/data/types';
import {getCities} from '../mocks/city';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};


export default class EventController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._eventForm = null;
    this._eventCard = null;
    this._onDataChange = onDataChange;
    this._mode = Mode.DEFAULT;
    this._onViewChange = onViewChange;
    this._prevousEvent = null;
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      this.replaceWithCard();
      this._mode = Mode.DEFAULT;
    }
  }

  replaceWithCard() {
    replaceWith(this._eventForm, this._eventCard);
  }

  replaceWithForm() {
    replaceWith(this._eventCard, this._eventForm);
  }

  renderEvent(event) {
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
      if (!this._prevousEvent) {
        this._prevousEvent = event;
      }
      this._onViewChange();
      this.replaceWithForm();
      this._mode = Mode.EDIT;
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._eventForm.setCollapseHandler(() => {
      this._onDataChange(this, event, this._prevousEvent);
      this.replaceWithCard();
    });

    this._eventForm.setFavouriteButtonHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {favorite: !event.favorite}));
    });

    this._eventForm.selectTypeHandler((evt) => {
      const currentType = Types.find((x) => x.name === evt.target.value);
      this._eventForm._type = currentType;
      this._onDataChange(this, event, Object.assign({}, event, this._eventForm.getState()));
    });

    this._eventForm.setOnSelectChange((evt) => {
      const cities = getCities();
      const currentCity = cities.find((x) => x.name === evt.target.value);
      this._eventForm._city = currentCity;
      this._onDataChange(this, event, Object.assign({}, event, this._eventForm.getState()));
    });

    this._eventForm.setSubmitHandler(() => {
      this._prevousEvent = null;
      this._onDataChange(this, event, Object.assign({}, event, this._eventForm.getState()));
      this.replaceWithCard();
    });


    if (oldEventForm && oldEventCard) {
      replace(this._eventForm, oldEventForm);
      replace(this._eventCard, oldEventCard);
    } else {
      render(this._container, this._eventCard.getElement(), RenderPosition.BEFOREEND);
    }
  }
}
