import requests from './helpers/requests';

export default {
  getDaData: () => requests.getDaData(),
  getSypex: ip => requests.getSypex(ip)
};
