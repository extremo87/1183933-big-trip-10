import Component from './component';

export default class TripRoute extends Component {

  constructor(days) {
    super();
    this._days = days;
  }

  getTemplate() {
    const startPoint = this._days[0].points[0].city.name;
    const finalPoint = this._days[this._days.length - 1].points[this._days[this._days.length - 1].points.length - 1].city.name;
    // TODO : redner dashes depending om point quantity
    return (`<div class="trip-info__main">
        <h1 class="trip-info__title">${startPoint} &mdash; ... &mdash; ${finalPoint}</h1>
        <p class="trip-info__dates">${this._days[0].date.format(`D MMM`)}&nbsp;&mdash;&nbsp; ${this._days[this._days.length - 1].date.format(`D MMM`)}</p>
      </div>`);
  }
}

