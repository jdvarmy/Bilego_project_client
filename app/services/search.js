import requests from './helpers/requests';

export default {
  getSearchResult: (filterParams) =>
    requests.post('search', {}, {...filterParams}),

  getSearchPageResult: (filterParams) =>
    requests.post('events/search', {}, {...filterParams}),
}
