import requests from './helpers/requests';

export default {
  getEventDataBySlug: (params) =>
    requests.post('event', {},  params),
}
