import Component from './component';

export default class Day extends Component {

  constructor(day) {
    super();
    this._day = day;
  }

  get points() {
    return this._day.points;
  }

  getTemplate() {
    const {date} = this._day;

    return (`<li class="trip-days__item  day">
      <div class="day__info">
          <span class="day__counter">${date.format(`D`)}</span>
          <time class="day__date" datetime="2019-03-18">${date.format(`MMM YY`)}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
      </li>`);
  }
}
