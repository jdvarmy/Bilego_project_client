import {observable, action, configure} from 'mobx';

configure({
  enforceActions: 'always'
});

class TicketsModal{
  @observable show = false;
  @observable link = '';
  @observable showConfirm = false;

  @action
  setTicketsModal = (status, link) => {
    this.link = link;
    this.show = status;
  };

  @action
  handlerConfirm = (flag) => {
    this.showConfirm = flag;
  }
}

export default new TicketsModal();
