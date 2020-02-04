import requests from './helpers/requests';

export default {
  getMetaPageByName: (apiRoot, filterParams) =>
    requests.get(apiRoot+'/service/page/meta', {...filterParams}),
}