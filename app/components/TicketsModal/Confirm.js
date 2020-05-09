import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ModalAnimated from '../../components/ModalAnimated';

import css from '../../theme/style';

const Wrapper = styled.div`
  padding: ${css.sizes.xxl} ${css.sizes.xxxxl};
  width: 470px;
  h4{
    text-align: center;
  }
  > div > div{
    text-align: center;
    button{
      white-space: nowrap;
      border-radius: ${css.sizes.borderRadius};
    }
  }
`;

@inject('ticketsModalStore')
@observer
class Confirm extends React.Component{
  handleClose = () => {
    const {ticketsModalStore:{handlerConfirm}} = this.props;

    handlerConfirm(false)
  };

  confirm = () => {
    const {ticketsModalStore:{handlerConfirm, setTicketsModal}} = this.props;
    handlerConfirm(false);
    setTicketsModal(false, '')
  };

  render(){
    const {ticketsModalStore:{showConfirm}} = this.props;

    return (
      <ModalAnimated show={showConfirm} closable onClose={this.handleClose} header="Прекратить покупку билетов?">
        <Wrapper>
          <Grid alignItems="center" container justify="center" spacing={0}>
            <Grid item xs={6}>
              <Button variant="outlined" disableElevation onClick={this.handleClose}>Вернуться</Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" disableElevation onClick={this.confirm}>Выйти</Button>
            </Grid>
          </Grid>
        </Wrapper>
      </ModalAnimated>
    )
  }
}

export default Confirm;
