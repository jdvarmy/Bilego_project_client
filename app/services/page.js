import requests from './helpers/requests';

export default {
  getFrontPageData: (apiRoot, filterParams) =>
    requests.get(apiRoot+'/frontPageData', {...filterParams}),

  getPopularOnWeek: (apiRoot, filterParams) =>
    requests.get(apiRoot+'/events/popularOnWeek', {...filterParams}),

  getEvents: (apiRoot, {page = 1, size = 21}, filterParams) =>
    requests.get(apiRoot+'/events', {page, size, ...filterParams}),
  getEventsByCategory: (apiRoot, {page = 1, size = 21}, filterParams) =>
    requests.get(apiRoot+'/events/category', {page, size, ...filterParams}),

  getItems: (apiRoot, {page = 1, size = 21}, filterParams) =>
    requests.get(apiRoot+'/items', {page, size, ...filterParams}),
  getItemsCategoryList: (apiRoot, filterParams) =>
    requests.get(apiRoot+'/items/category/list', {...filterParams}),
}