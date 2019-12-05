import {observable, action, configure} from 'mobx';

configure({
  enforceActions: 'always'
});

class TicketsModal{
  @observable show = false;
  @observable link = '';

  @action
  setTicketsModal = (status, link) => {
    this.link = link;
    this.show = status;
  }
}

export default new TicketsModal();