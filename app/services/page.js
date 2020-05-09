import requests from './helpers/requests';

export default {
  getItemsCategoryList: params =>
    requests.post('categories/list', {}, params),

  getItems: (filterParams, page = 1, size = 21) =>
    requests.post('items', {}, {page, size, ...filterParams}),

  getEventsByCategory: (filterParams, page = 1, size = 21) =>
    requests.post('events/category', {}, {page, size, ...filterParams}),
  getFrontPageData: params =>
    requests.post('events/front', {}, params),
  getEvents: (filterParams, page = 1, size = 21) =>
    requests.post('events', {}, {page, size, ...filterParams}),

  getPopularOnWeek: (filterParams) =>
    requests.post('events/category/term', {}, filterParams),
}
