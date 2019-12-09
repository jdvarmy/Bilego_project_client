import requests from './helpers/requests';

export default {
  getSlides: () => requests.get('/slider/slides'),
}