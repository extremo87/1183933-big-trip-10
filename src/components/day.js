import Component from './component';
import Event from './event';

export default class Day extends Component {

  constructor(day) {
    super();
    this._day = day;
  }

  renderEvent(point) {
    const event = new Event(point);
    const button = event.getElement().querySelector(`.event__rollup-btn`);
    button.addEventListener(`click`, () => {
      console.log(point.name);
    });
    return event;
  }

  getTemplate() {
    const {date, points} = this._day;

    return (`<li class="trip-days__item  day">
      <div class="day__info">
          <span class="day__counter">${date.format(`D`)}</span>
          <time class="day__date" datetime="2019-03-18">${date.format(`MMM YY`)}</time>
      </div>
      <ul class="trip-events__list">
          ${ points.map((point) => this.renderEvent(point).getElement().innerHTML).join(`\n`)}
      </ul>
      </li>`);
  }
}
