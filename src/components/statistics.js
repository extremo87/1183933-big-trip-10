import SmartComponent from '../components/smartComponent';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Types} from '../mocks/data/types';

const getSumByType = (type, points) => {
  let sum = 0;
  const items = points.filter((item) => item.type.name === type);
  for (const event of items) {
    sum += event.price;
  }
  return sum;
};

const padding = {
  padding: {
    left: 150,
    right: 0,
    top: 0,
    bottom: 0
  }
};

const emojis = new Map().set(`ship`, String.fromCodePoint())
    .set(`flight`, String.fromCodePoint(0x2708))
    .set(`bus`, String.fromCodePoint(0x1F68C))
    .set(`train`, String.fromCodePoint(0x1F686))
    .set(`ship`, String.fromCodePoint(0x1F6F3))
    .set(`restaurant`, String.fromCodePoint(0x1F374))
    .set(`check-in`, String.fromCodePoint(0x1F3E8))
    .set(`sightseeing`, String.fromCodePoint(0x1F3DB))
    .set(`transport`, String.fromCodePoint(0x1F698))
    .set(`drive`, String.fromCodePoint(0x1F697))
    .set(`taxi`, String.fromCodePoint(0x1F695));

const renderMoneyChart = (element, points) => {

  const types = [];
  points.map((point) => {
    if (!types.includes(point.type.name)) {
      types.push(point.type.name);
    }
  });
  const chartData = types.map((label) => {
    return {
      name: label,
      total: getSumByType(label, points)
    };
  }).sort((a, b) => b.total - a.total);

  const labels = chartData.map((item) => `${emojis.get(item.name)} ${item.name}`);
  const values = chartData.map((item) => item.total);


  return new Chart(element, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    label: `MONEY`,
    fontSize: 16,
    data: {
      labels,
      datasets: [
        {
          label: `Money spent`,
          backgroundColor: `#ffffff`,
          fontColor: `#000000`,
          fontSize: 16,
          data: values,
          barThickness: 40,
        }
      ]
    },
    options: {
      layout: padding,
      title: {
        display: true,
        text: `MONEY`,
        position: `left`,
        fontSize: 20
      },
      plugins: {
        datalabels: {
          formatter(value) {
            return `$ ${value}`;
          }
        }
      },
      scales: {
        xAxes: [{
          display: false,
          ticks: {
            beginAtZero: true,
            fontSize: 20,
          },
          gridLines: {
            display: false
          },
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontSize: 20
          },
          gridLines: {
            display: false
          },
        }]
      },
      legend: {
        display: false
      },
    }
  });
};


const renderTransportChart = (element, points) => {
  const transportTypes = Types.filter((item) => item.type === `transfer`).map((item) => item.name);
  const dataTransport = [];
  points.map((point) => {
    if (transportTypes.includes(point.type.name)) {
      if (dataTransport[point.type.name]) {
        dataTransport[point.type.name]++;
      } else {
        dataTransport[point.type.name] = 1;
      }
    }
  });
  dataTransport.sort((a, b) => b - a);
  const labels = [];
  const values = [];
  for (const key in dataTransport) {
    if (key) {
      labels.push(`${emojis.get(key)} ${key}`);
      values.push(dataTransport[key]);
    }
  }

  return new Chart(element, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    label: `TRANSPORT`,
    fontSize: 16,
    data: {
      labels,
      datasets: [
        {
          label: `Times`,
          backgroundColor: `#ffffff`,
          fontColor: `#000000`,
          fontSize: 16,
          data: values,
          barThickness: 40,
        }
      ]
    },
    options: {
      layout: padding,
      title: {
        display: true,
        text: `TRANSPORT`,
        position: `left`,
        fontSize: 20
      },
      plugins: {
        datalabels: {
          formatter(value) {
            return `${value}x`;
          }
        }
      },
      scales: {
        xAxes: [{
          display: false,
          ticks: {
            beginAtZero: true,
            fontSize: 20,
          },
          gridLines: {
            display: false
          },
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontSize: 20
          },
          gridLines: {
            display: false
          },
        }]
      },
      legend: {
        display: false
      },
    }
  });
};


export default class Statistics extends SmartComponent {
  constructor(model) {
    super();
    this._model = model;
    this._moneyChart = null;
    this._transportChart = null;
    this._renderCharts();
  }

  getTemplate() {
    return (
      `<section class="statistic container">
        <div class="statistic__line">
          <div class="statistic">
            <canvas class="statistic__money" width="550" height="220"></canvas>
          </div>
        </div>
        <div class="statistic__line">
          <div class="statistic">
            <canvas class="statistic__transport" width="550" height="220"></canvas>
          </div>
        </div>
      </section>`
    );
  }

  show() {
    super.show();
    this.rerender();
  }

  recoveryListeners() {}

  rerender() {
    super.rerender();
    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();
    const moneyBlock = element.querySelector(`.statistic__money`);
    const transportBlock = element.querySelector(`.statistic__transport`);
    this._resetCharts();

    this._moneyChart = renderMoneyChart(moneyBlock, this._model.getPointsAll());
    this._transportChart = renderTransportChart(transportBlock, this._model.getPointsAll());
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }
  }

}
