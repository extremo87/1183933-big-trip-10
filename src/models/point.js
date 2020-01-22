import moment from 'moment';

import {CURRENCY} from '../config';
import {calculateDuration, calculateDurationMs, generatePlaceholder} from '../utils';
import {types} from '../config/const';

export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.name = generatePlaceholder(data[`type`]);
    this.type = {
      name: data[`type`],
      img: `${data[`type`]}.png`,
      type: types.get(data[`type`])
    };
    this.city = data[`destination`];
    this.options = data[`offers`];
    this.startTime = moment(data[`date_from`]);
    this.finishTime = moment(data[`date_to`]);
    this.duration = calculateDuration(this.startTime, this.finishTime);
    this.durationInMs = calculateDurationMs(this.startTime, this.finishTime);
    this.price = data[`base_price`];
    this.currency = CURRENCY;
    this.favorite = Boolean(data[`is_favorite`]);
  }

  toRAW() {
    const type = this.type.name;
    return {
      'id': this.id,
      'type': type,
      'date_from': this.startTime,
      'date_to': this.finishTime,
      'destination': this.city,
      'base_price': Number(this.price),
      'is_favorite': this.favorite,
      'offers': this.options,
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}
