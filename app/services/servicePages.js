import requests from './helpers/requests';

export default {
  getMetaPageByName: (params) =>
    requests.post('service/meta', {}, params),

  sendContactForm: (fields) =>
    requests.fileUpload('https://mos.bilego.ru/wp-json/contact-form-7/v1/contact-forms/1049/feedback', {}, [], fields),
  // sendContactForm: (fields) =>
  //   requests.post('service/feedback', {}, fields),
}
