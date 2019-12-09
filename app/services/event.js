import requests from './helpers/requests';

export default {
  getEventDataBySlug: (filterParams) => requests.get('/event/slug', {...filterParams}),
}