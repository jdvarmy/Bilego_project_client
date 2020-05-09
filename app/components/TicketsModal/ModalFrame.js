import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ModalAnimated from '../../components/ModalAnimated';
import Confirm from './Confirm';

@inject('ticketsModalStore')
@observer
class ModalFrame extends Component{
  handleClose = () => {
    const {ticketsModalStore:{handlerConfirm}} = this.props;

    handlerConfirm(true);
  };

  iframe = (link) => (
    {__html: `<iframe src="${link}" width="100%" height="100%"/>`}
  );

  render(){
    const {ticketsModalStore:{show, link}} = this.props;

    return <React.Fragment>
      <ModalAnimated ModalClass="ticket-modal" closable show={show} onClose={this.handleClose}>
        <div dangerouslySetInnerHTML={this.iframe(link)} />
      </ModalAnimated>
      <Confirm />
    </React.Fragment>
  }
}

export default ModalFrame;
