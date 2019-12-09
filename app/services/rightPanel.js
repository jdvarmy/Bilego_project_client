import requests from './helpers/requests';

export default {
  getDataTimeLine: (filterParams) => requests.get('/timeline', {...filterParams}),
}