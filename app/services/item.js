import requests from './helpers/requests';

export default {
  getItemDataBySlug: (filterParams) => requests.get('/item/slug', {...filterParams}),
}