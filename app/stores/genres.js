import {observable, action, configure, flow} from 'mobx';
import {sliderService} from '../services';

configure({
  enforceActions: 'always'
});

class Genres{

}

export default new Genres();
