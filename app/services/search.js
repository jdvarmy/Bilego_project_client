import requests from './helpers/requests';

export default {
  getSearchResult: (filterParams) => requests.get('/search', {...filterParams}),
  getSearchPageResult: (filterParams) => requests.get('/searchpage', {...filterParams}),
}