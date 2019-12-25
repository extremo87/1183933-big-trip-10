import {render as domRender, RenderPosition, replace} from '../utils';
import Filters from '../components/filters';
import {FilterType} from '../config/const';
export default class FilterController {

  constructor(container, model) {
    this._container = container;
    this._model = model;
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        title: filterType,
        isChecked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new Filters(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      domRender(this._container, this._filterComponent.getElement(), RenderPosition.AFTERNODE);
    }
  }

  _onFilterChange(filterType) {
    this._model.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
