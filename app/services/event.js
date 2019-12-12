import requests from './helpers/requests';

export default {
  getEventDataBySlug: (apiRoot, filterParams) =>
    requests.get(apiRoot+'/event/slug', {...filterParams}),
}