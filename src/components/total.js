import {CURRENCY_SIGN} from '../config';
export const createTotalTemplate = (total) => {
  return (`
   <p class="trip-info__cost">
      Total: ${CURRENCY_SIGN}&nbsp;<span class="trip-info__cost-value">${total}</span>
    </p>
  `);
};
