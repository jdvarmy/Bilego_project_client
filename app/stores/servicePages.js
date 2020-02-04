import {observable, action, configure, flow} from 'mobx';
import {servicePagesService} from '../services';
import {
  BilegoIconHandshake, BilegoIconHelp,
  BilegoIconTarget,
  IconFacebook,
  IconInstagram,
  IconSkype,
  IconTwitter,
  IconVk,
  IconYoutube
} from '../theme/bilegoIcons';

configure({
  enforceActions: 'always'
});

class servicePages{
  @observable isLoading = false;
  @observable seoPage = undefined;

  social = [
    {name: 'vk', link: '#', icon: IconVk},
    {name: 'Facebook', link: '#', icon: IconFacebook},
    {name: 'Instagram', link: '#', icon: IconInstagram},
    {name: 'Twitter', link: '#', icon: IconTwitter},
    {name: 'Skype', link: '#', icon: IconSkype},
    {name: 'Youtube', link: '#', icon: IconYoutube},
  ];

  contacts = [
    {name: 'Сотрудничество', icon: BilegoIconHandshake, email: 'sales@bilego.ru'},
    {name: 'Реклама', icon: BilegoIconTarget, email: 'adv@bilego.ru'},
    {name: 'Техподдержка', icon: BilegoIconHelp, email: 'support@bilego.ru'}
  ];

  @action
  getMetaPageByName = flow( function* getMetaPageByName(apiRoot, params){
    this.isLoading = true;
    try{
      const resp = yield servicePagesService.getMetaPageByName(apiRoot, params);
      this.seoPage = resp;
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);

  @action
  sendContactForm = flow( function* sendContactForm(params) {
    this.isLoading = true;
    try {
      const resp = yield servicePagesService.sendContactForm(params);
      console.log(resp)
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }).bind(this);
}

export default new servicePages();
