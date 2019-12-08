import {createElement} from '../utils';

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
    this._element.remove();
  }
}
