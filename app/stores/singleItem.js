import { observable, action, configure, flow } from 'mobx';
import { itemService } from '../services';

configure({
  enforceActions: 'always'
});

class SingleItem{
  @observable isLoading = false;
  @observable slug = '';
  @observable item = undefined;

  clear = () => {
    this.slug = '';
    this.item = undefined;
  };

  @action
  getItemDataBySlug = flow( function* getItemDataBySlug(apiRoot, params){
    this.isLoading = true;
    try{
      this.clear();

      const response = yield itemService.getItemDataBySlug(apiRoot, params);
      this.item = response;

      console.log(response)
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);
}

export default new SingleItem();