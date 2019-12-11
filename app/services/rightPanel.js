import requests from './helpers/requests';

export default {
  getDataTimeLine: (apiRoot, filterParams) =>
    requests.get(apiRoot+'/timeline', {...filterParams}),
}