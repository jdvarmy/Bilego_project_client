import requests from './helpers/requests';

export default {
  getSlides: (params) => requests.post('slider/slides', {}, params),
}
