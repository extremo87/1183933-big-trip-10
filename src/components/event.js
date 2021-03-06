import {CURRENCY_SIGN, VISIBLE_OPTIONS_COUNT} from '../config';
import Component from './component';
import moment from 'moment';
export default class Event extends Component {

  constructor(event, options) {
    super();
    this._event = event;
    this._showBtnHandler = null;
    this._shownOptions = null;
    this._allOptions = options;
    this.recoveryListeners();
  }

  setShowButtonHandler(handler) {
    this._showBtnHandler = handler;
    this.setClickHandler(`.event__rollup-btn`, handler);
  }

  recoveryListeners() {
    this.setClickHandler(`.event__rollup-btn`, this._showBtnHandler);
  }

  renderOption(option) {

    if (this._shownOptions > VISIBLE_OPTIONS_COUNT) {
      return ``;
    }

    this._shownOptions++;


    return (`
         <li class="event__offer">
          <span class="event__offer-title">${option.title}</span>
          &plus;
          ${CURRENCY_SIGN}&nbsp;<span class="event__offer-price">${option.price}</span>
         </li>
    `);
  }

  getTemplate() {
    const {name, city, startTime, finishTime, duration, price, options, type} = this._event;
    const cityName = city === undefined ? `` : city.name;
    this._shownOptions = 1;

    return (`<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.img}" alt="Event type icon">
      </div>
      <h3 class="event__title">${name} ${cityName}</h3>
  
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${moment(startTime).format(`HH:mm`)}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${moment(finishTime).format(`HH:mm`)}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
  
      <p class="event__price">
        ${CURRENCY_SIGN} &nbsp;<span class="event__price-value">${price}</span>
      </p>
  
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${ options.length > 0 ? options.map((option) => this.renderOption(option)).join(`\n`) : ``}
      </ul>
  
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`);
  }


}

