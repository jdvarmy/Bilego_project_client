import React, { Component } from 'react';
import { inject } from 'mobx-react';
import styled from 'styled-components';

import Fab from '@material-ui/core/Fab';
import { BilegoIconTicket } from '../../theme/bilegoIcons';


const SFab = styled(Fab)`
  white-space: nowrap;
`;

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
      <SFab onClick={this.setTicketsModal} variant="extended" aria-label="buy" href={href}>
        {BilegoIconTicket} купить билеты
      </SFab>
    )
  }
}

export default TicketsModalButton;