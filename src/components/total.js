import {CURRENCY_SIGN} from '../config';
import Component from './component';

export default class Menu extends Component {

  constructor(total) {
    super();
    this._total = total;
  }

  getTemplate() {
    return (`
     <p class="trip-info__cost">
      Total: ${CURRENCY_SIGN}&nbsp;<span class="trip-info__cost-value">${this._total}</span>
    </p>
    `);
  }
}
