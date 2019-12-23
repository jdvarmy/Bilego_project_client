import React, {Component} from 'react';
import {BilegoIconTicket} from '../../theme/bilegoIcons';
import Fab from '@material-ui/core/Fab';
import {inject} from 'mobx-react';

@inject('ticketsModalStore')
class TicketsModalButton extends Component{
  setTicketsModal = e => {
    e.preventDefault();
    const {href, ticketsModalStore:{setTicketsModal}} = this.props;

    setTicketsModal(true, href);
  };

  render(){
    const {href} = this.props;

    return(
      <Fab onClick={this.setTicketsModal} variant="extended" aria-label="buy" href={href}>
        {BilegoIconTicket} купить билеты
      </Fab>
    )
  }
}

export default TicketsModalButton;