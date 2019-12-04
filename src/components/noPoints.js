import Component from './component';

export default class NoPoints extends Component {
  getTemplate() {
    return (`<p class="trip-events__msg">Click New Event to create your first point</p>`);
  }
}
