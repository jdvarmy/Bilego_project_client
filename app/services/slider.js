import requests from './helpers/requests';

export default {
  getSlides: (apiRoot) => requests.get(apiRoot+'/slider/slides'),
}