import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import { style } from '../../theme';
import Top4 from './Top4';
import Top8 from './Top8';
import Bottom4 from './Bottom4';
import Bottom8 from './Bottom8';
import ModalFrame from '../TicketsModal/ModalFrame';

import lama from './images/screen-2.jpg';

const Wrapper = styled(Grid)`
  &.MuiGrid-root{
    width: 100%;
    margin: 0;
    position: relative;
    z-index: 10000;
    .MuiGrid-root{
      position: relative;
    }
  }
  .bilego-flex.MuiGrid-item{
    display: flex;
    align-items: center;
  }
`;
const Backgr = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const SBackgr = styled(Backgr)`
  background: ${style.$second};
  opacity: 0.8;
`;
const Image = styled(Backgr)`
  background-image: url('${lama}');
  background-size: cover;
  background-position: 50% 25%;
  background-repeat: no-repeat;
`;
const BilegoDivider = styled.div`
  width: 90%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: auto;
`;

@inject('globalStore')
@observer
class Footer extends Component{
  render(){
    const {globalStore:{baseNameForRouting}} = this.props;

    return(
      <Fragment>
        <Wrapper container spacing={10}>
          <Image/>
          <SBackgr/>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <Top4 baseNameForRouting={baseNameForRouting}/>
              </Grid>
              <Grid item xs={8}>
                <Top8/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <BilegoDivider/>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid className="bilego-flex" item xs={4}>
                <Bottom4/>
              </Grid>
              <Grid item xs={8}>
                <Bottom8 baseNameForRouting={baseNameForRouting}/>
              </Grid>
            </Grid>
          </Grid>
        </Wrapper>
        <ModalFrame />
      </Fragment>
    );
  }
}

export default Footer;
