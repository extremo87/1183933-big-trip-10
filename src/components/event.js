import {CURRENCY_SIGN} from '../config';
import Component from './component';
import Form from './editEvent';
import {render, RenderPosition, replaceWith} from '../utils';

export default class Event extends Component {

  constructor(event) {
    super();
    this._event = event;
  }

  setShowButtonHandler(handler) {
    this.setClickHandler(`.event__rollup-btn`, handler);
  }

  static renderEvent(event, position) {
    const eventCard = new this(event);
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


  getTemplate() {
    const {name, city, startTime, finishTime, duration, price, options, type} = this._event;

    return (`<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.img}" alt="Event type icon">
      </div>
      <h3 class="event__title">${name} at ${city.name}</h3>
  
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${startTime.format(`hh:mm`)}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${finishTime.format(`hh:mm`)}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
  
      <p class="event__price">
        ${CURRENCY_SIGN} &nbsp;<span class="event__price-value">${price}</span>
      </p>
  
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">${options[0].name}</span>
          &plus;
          ${CURRENCY_SIGN}&nbsp;<span class="event__offer-price">${options[0].price}</span>
         </li>
      </ul>
  
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`);
  }


}

