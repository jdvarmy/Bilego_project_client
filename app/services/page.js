import requests from './helpers/requests';

export default {
  getEventsSoon: (filterParams) => requests.get('/events/eventsSoon', {...filterParams}),
  getEventsHot: (filterParams) => requests.get('/events/eventsHot', {...filterParams}),
  getEventsConcerts: ({page = 1, size = 3}, filterParams) => requests.get('/events/category', {page, size, ...filterParams}),
  getItemsFrontPage: ({page = 1, size = 4}, filterParams) => requests.get('/items', {page, size, ...filterParams}),
  getPopularOnWeek: (filterParams) => requests.get('/events/popularOnWeek', {...filterParams}),

  getEvents: ({page = 1, size = 21,}, filterParams) => requests.get('/events', {page, size, ...filterParams}),
  getEventsByCategory: ({page = 1, size = 21,}, filterParams) => requests.get('/events/category', {page, size, ...filterParams}),

  getItems: ({page = 1, size = 21,}, filterParams) => requests.get('/items', {page, size, ...filterParams}),
  // getItemsByCategory: ({page = 1, size = 21,}, filterParams) => requests.get('/items/category/', {page, size, ...filterParams}),
  getItemsCategoryList: (filterParams) => requests.get('/items/category/list', {...filterParams}),
}