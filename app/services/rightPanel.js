import requests from './helpers/requests';

export default {
  getDataTimeLine: (filterParams, page = 1, size = 8) =>
    requests.post('events/timeline', {}, {page, size, ...filterParams}),
}
