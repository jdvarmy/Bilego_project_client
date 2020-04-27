import requests from './helpers/requests';

export default {
  getXmlMapData: (apiRoot) =>
    requests.get(apiRoot+'/service/xmlmap'),
}
