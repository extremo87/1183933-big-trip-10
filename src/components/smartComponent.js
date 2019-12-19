import Component from "./component";

export default class SmartComponent extends Component {

  recoveryListeners() {
    throw new Error(`You should to implement recoveryListeners in child class.`);
  }

  rerender() {
    const oldElement = this.getElement();
    this.removeElement();
    const newElement = this.getElement();
    oldElement.replaceWith(newElement);
    this.recoveryListeners();
  }
}
