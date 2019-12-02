import {CURRENCY} from '../../config';
export const Options = [
  {
    name: `Book a taxi`,
    type: `taxi`,
    price: 20,
    currency: CURRENCY,
    priority: true
  },
  {
    name: `Book a premium taxi`,
    type: `taxi`,
    price: 35,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Book a motobike taxi`,
    type: `taxi`,
    price: 10,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Business class seat`,
    type: `flight`,
    price: 500,
    currency: CURRENCY,
    priority: true
  },
  {
    name: ` Choose a seat`,
    type: `flight`,
    price: 10,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Extra luggage`,
    type: `flight`,
    price: 50,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Business class seat`,
    type: `train`,
    price: 30,
    currency: CURRENCY,
    priority: true
  },
  {
    name: `Add a meal`,
    type: `train`,
    price: 20,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Using train media system`,
    type: `train`,
    price: 2,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Choose a seat`,
    type: `bus`,
    price: 3,
    currency: CURRENCY,
    priority: true
  },
  {
    name: `Add a luggage`,
    type: `bus`,
    price: 20,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Using bus media system`,
    type: `bus`,
    price: 2,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Speed boat`,
    type: `ship`,
    price: 50,
    currency: CURRENCY,
    priority: true
  },
  {
    name: `Ferry`,
    type: `ship`,
    price: 20,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Add a meal`,
    type: `ship`,
    price: 30,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Ride a hourse`,
    type: `transport`,
    price: 50,
    currency: CURRENCY,
    priority: true
  },
  {
    name: `Reserve riksha`,
    type: `transport`,
    price: 20,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Rent a tuk-tuk`,
    type: `transport`,
    price: 5,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Business class vehicle`,
    type: `drive`,
    price: 50,
    currency: CURRENCY,
    priority: true
  },
  {
    name: `Standard class vehicle`,
    type: `drive`,
    price: 30,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Rent a bus`,
    type: `drive`,
    price: 200,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Early check in`,
    type: `check-in`,
    price: 10,
    currency: CURRENCY,
    priority: true
  },
  {
    name: `Late check out`,
    type: `check-in`,
    price: 10,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Add an extra-bed`,
    type: `check-in`,
    price: 25,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Private tour`,
    type: `sightseeing`,
    price: 50,
    currency: CURRENCY,
    priority: true
  },
  {
    name: `Choose a tour language`,
    type: `sightseeing`,
    price: 10,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Half day tour`,
    type: `sightseeing`,
    price: 25,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Local cuisine dishes`,
    type: `restaurant`,
    price: 50,
    currency: CURRENCY,
    priority: true
  },
  {
    name: `Reserve a table`,
    type: `restaurant`,
    price: 10,
    currency: CURRENCY,
    priority: false
  },
  {
    name: `Unlimited beer`,
    type: `restaurant`,
    price: 25,
    currency: CURRENCY,
    priority: false
  }
];
