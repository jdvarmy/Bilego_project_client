import {observable, action, configure, flow} from 'mobx';
import {sliderService} from '../services';

configure({
  enforceActions: 'always'
});

class Slider{
  @observable slides = [];
  @observable isLoading = false;

  revapi = false;

  @action
  setRevapi = (el) => {
    this.revapi = el;
  };
  @action
  clear = () => {
    this.slides = [];
  };

  @action
  getMainSlides = flow( function* getMainSlides(params){
    this.isLoading = true;
    try{
      this.clear();
      const response = yield sliderService.getSlides(params);
      this.slides = response;
    }catch(e){
      console.log(e);
    }finally {
      this.isLoading = false;
    }
  }).bind(this);
}

export default new Slider();
