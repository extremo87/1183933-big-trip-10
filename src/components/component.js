import {createElement} from '../utils';

const HIDDEN_CLASS = `visually-hidden`;

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  setClickHandler(element, handler) {
    this.getElement().querySelector(element).addEventListener(`click`, handler);
  }

  removeElement() {
    this._element = null;
  }

  clearElement() {
    this.getElement().innerHTML = ``;
  }

  show() {
    if (this._element) {
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add(HIDDEN_CLASS);
    }
  }
}
