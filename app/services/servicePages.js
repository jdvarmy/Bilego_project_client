import requests from './helpers/requests';

export default {
  getMetaPageByName: (apiRoot, filterParams) =>
    requests.get(apiRoot+'/service/page/meta', {...filterParams}),
  sendContactForm: (fields) =>
    requests.fileUpload('https://mos.bilego.ru/wp-json/contact-form-7/v1/contact-forms/1049/feedback', {}, [], fields),
}
