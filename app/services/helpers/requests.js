import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const http = superagentPromise(_superagent, global.Promise);

const handleErrors = error => {
  // console.log(error)
  // console.log(error.rawResponse)
};

const handleCatch = (url, err) => {
  console.log(url, err)
};

const responseBody = res => res.body || res.text;

const tokenPlugin = request => {
  // todo: включить на проме, блокирует запросы с разных адресов
  // request.set('X-Requested-With', 'XMLHttpRequest');
  // request.set('X-NX-Origin', 'SG');

};

// todo: globalStore is not defined = globalStore.apiRoot
export default {
  get: (url, query = {}) =>
    http
      .get(`${url}`)
      .query(query)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody)
      .catch(err => handleCatch(url, err)),
  post: (url, query = {}, body = {}) =>
    http
      .post(`${url}`, body)
      .query(query)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody)
      .catch(err => handleCatch(url, err)),
  getDaData: () =>
    http
      .get('https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address')
      .set('Authorization', 'Token 4d3739ec83300aaa79e828ff17dfeaa0396135ba')
      .end(handleErrors)
      .then(responseBody)
      .catch(err => handleCatch('daData', err)),
  getSypex: (ip) =>
    http
      .get('http://api.sypexgeo.net/OzbD7/json/' + ip)
      .set('Authorization', 'Token 4d3739ec83300aaa79e828ff17dfeaa0396135ba')
      .end(handleErrors)
      .then(responseBody)
      .catch(err => handleCatch('daData', err)),
};
