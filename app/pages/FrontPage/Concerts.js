import Grid from '@material-ui/core/Grid';
import React, {Component} from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import {inject, observer} from 'mobx-react';
import {Event300} from '../../components/Event';
import {BlockHeaderText, Next} from '../../theme/elements'
import {BilegoIconRightArrow} from '../../theme/BilegoIcons';
import style from '../../theme/style';
import {NavLink} from 'react-router-dom';

const GridWrap = styled(Grid)`
  min-height: 533px;
  padding: 24px;
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;
const SBlockHeaderText = styled(BlockHeaderText)`
  a{
    color: ${style.$black};
  }
`;
const CardWrap = styled(Card)`
  margin-bottom: 30px;
`;

@inject('pageStore', 'globalStore')
@observer
class Concerts extends Component{
  render() {
    const {pageStore:{eventsConcerts}, globalStore:{baseNameForRouting}} = this.props;

    return (
      <GridWrap container spacing={4}>
        <Grid item xs={12}>
          <SBlockHeaderText>
            <NavLink to={`/${baseNameForRouting}/events/concerts`} exact activeClassName="" className="">
              Концерты
              <Next ariaLabel="buy">
                {BilegoIconRightArrow} Смотреть все
              </Next>
            </NavLink>
          </SBlockHeaderText>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            {eventsConcerts.map(event=>(
              <Grid key={event.id} item xs={4}>
                <CardWrap>
                  <Event300 {...event} baseNameForRouting={baseNameForRouting}/>
                </CardWrap>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </GridWrap>
    );
  }
}

export default Concerts;