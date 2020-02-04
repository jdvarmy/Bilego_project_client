import {observable, action, configure, flow} from 'mobx';
import {servicePagesService} from '../services';

configure({
  enforceActions: 'always'
});

class servicePages{
  @observable isLoading = false;
  @observable seoPage = undefined;

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
}

export default new servicePages();
