import requests from './helpers/requests';

export default {
  getXmlMapData: () =>
    requests.post('service/xmlmap', {}, {}),
}
