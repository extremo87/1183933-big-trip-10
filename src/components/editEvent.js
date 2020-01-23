/* eslint-disable camelcase */
import moment from 'moment';
import he from 'he';
import debounce from 'lodash/debounce';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/light.css';

import {TYPES} from '../mocks/data/types';
import {CURRENCY_SIGN, CURRENCY} from '../config';
import SmartComponent from './smartComponent';
import {calculateDuration, calculateDurationMs, generatePlaceholder} from '../utils';
import Adapter from '../models/point.js';


const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
};

const TIMEOUT = 2000;

export default class Form extends SmartComponent {

  constructor(event, cities, options) {
    super();
    this._event = event;
    this._name = event.name;
    this._city = event.city;
    this._type = event.type;
    this._startTime = event.startTime;
    this._finishTime = event.finishTime;
    this._flatpickrStart = null;
    this._flatpickrFinish = null;
    this._externalData = DefaultData;
    this._cities = cities;
    this._options = options;
    this.price = this._event.price;
    this.offers = event.options;

    this._selectTypeHandler = null;
    this._collapseHandler = null;
    this._selectCityHandler = null;
    this._favouriteHandler = null;
    this._formHandler = null;
    this._priceHandler = null;
    this._offerHandler = null;
    this._deleteHandler = null;
    this._startTimeHandler = null;
    this._finishTimeHandler = null;
    this._applyFlatpickr();

    this.hasErrors = false;
    this.isBlocked = false;
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  renderTypeItem(type) {
    return (`
        <div class="event__type-item">
            <input id="event-type-${type.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.name}" ${ (this._type.name === type.name) ? `checked` : ``}>
            <label class="event__type-label  event__type-label--${type.name}" for="event-type-${type.name}-1">${type.name}</label>
        </div>
    `);
  }

  setError(value) {
    this.hasErrors = value;
  }

  lock() {
    this.isBlocked = true;
  }

  unlock() {
    this.isBlocked = false;
  }

  setSubmitHandler(handler) {
    this._formHandler = handler;
    this.setClickHandler(`.event__save-btn`, handler);
  }

  setCollapseHandler(handler) {
    this._collapseHandler = handler;
    this.setClickHandler(`.event__rollup-btn`, handler);
  }

  setFavouriteButtonHandler(handler) {
    this._favouriteHandler = handler;
    this.setClickHandler(`.event__favorite-checkbox`, debounce(handler, TIMEOUT));
  }

  setDeleteButtonHandler(handler) {
    this._deleteHandler = handler;
    this.setClickHandler(`.event__reset-btn`, handler);
  }

  setStartTimeHandler(handler) {
    this._startTimeHandler = handler;
    const element = this.getElement().querySelector(`.start-time`);
    element.addEventListener(`change`, (evt) => {
      handler(evt);
      this.rerender();
    });
  }

  setFinishTimeHandler(handler) {
    this._finishTimeHandler = handler;
    const element = this.getElement().querySelector(`.finish-time`);
    element.addEventListener(`change`, (evt) => {
      handler(evt);
      this.rerender();
    });
  }

  setPriceHandler(handler) {
    this._priceHandler = handler;
    const element = this.getElement().querySelector(`.event__input--price`);
    element.addEventListener(`change`, (evt) => {
      handler(evt);
      this.rerender();
    });
  }

  selectTypeHandler(handler) {
    this._selectTypeHandler = handler;
    const radioButtons = this.getElement().querySelectorAll(`.event__type-input`);
    radioButtons.forEach((button) => {
      button.addEventListener(`change`, (evt) => {
        handler(evt);
        this.rerender();
      });
    });
  }

  setOfferHandler(handler) {
    this._offerHandler = handler;
    const offers = this.getElement().querySelectorAll(`.event__offer-checkbox`);
    if (offers) {
      offers.forEach((offer) => {
        offer.addEventListener(`change`, (evt) => {
          handler(evt);
          this.rerender();
        });
      });
    }
  }


  setOnSelectChange(handler) {
    this._selectCityHandler = handler;
    const select = this.getElement().querySelector(`.event__input--destination`);
    select.addEventListener(`change`, (evt) => {
      handler(evt);
      this.rerender();
    });
  }

  _applyFlatpickr() {
    if (this._flatpickrStart) {
      this._flatpickrStart.destroy();
      this._flatpickrStart = null;
    }
    if (this._flatpickrFinish) {
      this._flatpickrFinish.destroy();
      this._flatpickrFinish = null;
    }

    const startTimeElement = this.getElement().querySelector(`.start-time`);
    const finishTimeElement = this.getElement().querySelector(`.finish-time`);
    this._flatpickrStart = flatpickr(startTimeElement, {
      'dateFormat': `d/m/Y H:i`,
      'defaultDate': this._startTime,
      'maxDate': this._finishTime,
      'enableTime': true,
      'time_24hr': true
    });

    this._flatpickrFinish = flatpickr(finishTimeElement, {
      'dateFormat': `d/m/Y H:i`,
      'defaultDate': this._finishTime,
      'enableTime': true,
      'time_24hr': true,
      'minDate': this._startTime
    });
  }

  recoveryListeners() {
    this.setSubmitHandler(this._formHandler);
    this.setFavouriteButtonHandler(this._favouriteHandler);
    this.setCollapseHandler(this._collapseHandler);
    this.setOnSelectChange(this._selectCityHandler);
    this.selectTypeHandler(this._selectTypeHandler);
    this.setPriceHandler(this._priceHandler);
    this.setOfferHandler(this._offerHandler);
    this.setDeleteButtonHandler(this._deleteHandler);
    this.setStartTimeHandler(this._startTimeHandler);
    this.setFinishTimeHandler(this._finishTimeHandler);
  }

  parseFormData(formData) {

    const formName = formData.get(`event-destination`);
    const formStartTime = moment(formData.get(`event-start-time`), `DD/MM/YYYY hh:mm`);
    const formFinishTime = moment(formData.get(`event-end-time`), `DD/MM/YYYY hh:mm`);
    const formDuration = calculateDuration(formStartTime, formFinishTime);
    const formDurationMs = calculateDurationMs(formStartTime, formFinishTime);
    const formPrice = he.encode(formData.get(`event-price`));
    const formCity = this._cities.find((city) => city.name === formName);
    const formType = this._type.name;
    const formId = formData.get(`event-id`) === `undefined` ? Math.random().toString(36).substr(2, 9) : formData.get(`event-id`);

    return new Adapter({
      'id': formId,
      'name': generatePlaceholder(formType),
      'destination': formCity,
      'type': formType,
      'offers': this.offers,
      'date_from': formStartTime,
      'date_to': formFinishTime,
      'duration': formDuration,
      'durationInMs': formDurationMs,
      'base_price': formPrice,
      'currency': CURRENCY,
      'is_favorite': formData.has(`event-favorite`),
    });
  }

  getData() {
    const form = this.getElement().querySelector(`.event--edit`);
    const formData = new FormData(form);
    return this.parseFormData(formData);
  }

  renderOption(option) {

    const availableOptions = this.offers.map((item) => item.title);
    const isChecked = (availableOptions.includes(option.title)) ? `checked` : ``;
    const currentEventOption = this.offers.find((item) => item.title === option.title);
    const price = (currentEventOption) ? currentEventOption.price : option.price;

    return (`
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${option.title}-1" type="checkbox" data-name="${option.title}" name="event-offer-${option.title}" ${isChecked}>
          <label class="event__offer-label" for="event-offer-${option.title}-1">
            <span class="event__offer-title">${option.title}</span>
            &plus;
            ${CURRENCY_SIGN}&nbsp;<span class="event__offer-price">${price}</span>
          </label>
        </div>
    `);
  }

  renderOptions(options) {
    return (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${options.find((option) => option.type === this._type.name).offers.map((option) => this.renderOption(option)).join(`\n`)}
      </div>
    </section>
  `);
  }

  renderImage(image) {
    return (`<img class="event__photo" src="${image.src}" alt="${image.description}">`);
  }

  renderForm() {
    const {favorite, id} = this._event;
    const cityName = this._city === undefined ? `` : this._city.name;
    const cityDescription = this._city === undefined ? `` : this._city.description;
    const cityImages = this._city === undefined ? [] : this._city.pictures;
    const {deleteButtonText, saveButtonText} = this._externalData;

    return (`
        <li class="trip-events__item"><form class="event  event--edit ${this.hasErrors ? `error` : ``}" action="#" method="post">
        <input class="some-hidden" name="type-event" type="hidden" value="${this._type.name}">
        <input class="some-hidden" name="event-id" type="hidden" value="${id}">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${this._type.img}" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" name="type" type="checkbox">
           

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${TYPES.filter((item) => item.type === `transfer` && item.name !== this._type.name).map((item) => this.renderTypeItem(item))}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${TYPES.filter((item) => item.type === `activity` && item.name !== this._type.name).map((item) => this.renderTypeItem(item))}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__${this._type.name}-output" for="event-destination-1">
            ${this._name}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${cityName}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${this._cities.map((item) => `<option value="${item.name}"></option>`)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time start-time" id="event-start-time-1" type="text" name="event-start-time" value="${moment(this._startTime).format(`DD/MM/YY hh:mm`)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time finish-time" id="event-end-time-1" type="text" name="event-end-time" value="${moment(this._finishTime).format(`DD/MM/YY hh:mm`)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              ${CURRENCY_SIGN}
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this.price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${this.isBlocked ? `disabled` : ``}>${saveButtonText}</button>
          <button class="event__reset-btn" type="reset">${deleteButtonText}</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${ favorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          ${(this._options.length !== 0) ? this.renderOptions(this._options) : ``} 
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description"> ${cityDescription}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
              ${cityImages.map((image) => this.renderImage(image)).join(`\n`)}   
              </div>
            </div>
          </section>
        </section>
      </form>
      </li>
    `);
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
  }


  getTemplate() {
    return this.renderForm();
  }

  removeElement() {
    if (this._flatpickrStart) {
      this._flatpickrStart.destroy();
      this._flatpickrStart = null;
    }
    if (this._flatpickrFinish) {
      this._flatpickrFinish.destroy();
      this._flatpickrFinish = null;
    }

    super.removeElement();
  }
}
