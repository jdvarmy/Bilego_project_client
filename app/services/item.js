import requests from './helpers/requests';

export default {
  getItemDataBySlug: (apiRoot, filterParams) => requests.get(apiRoot+'/item/slug', {...filterParams}),
}