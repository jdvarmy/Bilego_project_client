import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {ModalAnimated} from '../../theme/elements';

@inject('ticketsModalStore')
@observer
class ModalFrame extends Component{
  handleClose = () => {
    const {ticketsModalStore:{setTicketsModal}} = this.props;

    setTicketsModal(false, '');
  };

  iframe = (link) => (
    {__html: `<iframe src="${link}" width="100%" height="100%"/>`}
  );

  render(){
    const {ticketsModalStore:{show, link}} = this.props,
      modalStyle = {width: '90%'};

    return (
      <ModalAnimated ModalClass="ticket-modal" closable show={show} onClose={this.handleClose}>
        <div dangerouslySetInnerHTML={this.iframe(link)} />
      </ModalAnimated>
    )
  }
}

export default ModalFrame;