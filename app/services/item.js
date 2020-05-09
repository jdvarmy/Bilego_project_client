import requests from './helpers/requests';

export default {
  getItemDataBySlug: (filterParams) =>
    requests.post('item', {}, filterParams),
}
