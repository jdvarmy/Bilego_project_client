import requests from './helpers/requests';

export default {
  getSearchResult: (apiRoot, filterParams) =>
    requests.get(apiRoot+'/search', {...filterParams}),
  getSearchPageResult: (apiRoot, filterParams) =>
    requests.get(apiRoot+'/searchpage', {...filterParams}),
}