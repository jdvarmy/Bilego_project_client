import { observable, action, configure, flow } from 'mobx';
import { itemService } from '../services';

configure({
  enforceActions: 'always'
});

class SingleItem{
  @observable isLoading = false;
  @observable slug = '';
  @observable item = undefined;

  @action
  clear = () => {
    this.slug = '';
    this.item = undefined;
  };

  @action
  setStartDataSingleItemPage = (data) => {
    this.item = data;
  };

  @action
  getItemDataBySlug = flow( function* getItemDataBySlug(apiRoot, params){
    this.isLoading = true;
    try{
      const response = yield itemService.getItemDataBySlug(apiRoot, params);
      console.log(response)
      this.item = response;
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);
}

export default new SingleItem();
