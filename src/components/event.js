import {CURRENCY_SIGN} from '../config';
export const createEventTemplate = (event) => {
  return (`<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type.img}" alt="Event type icon">
        </div>
        <h3 class="event__title">${event.name}</h3>
    
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${event.startTime.format(`hh:mm`)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${event.finishTime.format(`hh:mm`)}</time>
          </p>
          <p class="event__duration">${event.duration}</p>
        </div>
    
        <p class="event__price">
          ${CURRENCY_SIGN} &nbsp;<span class="event__price-value">${event.price}</span>
        </p>
    
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">${event.options[0].name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">20</span>
           </li>
        </ul>
    
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`);
};
