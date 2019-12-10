import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Item220 } from '../../components/Item';
import BlockHeaderText from '../../components/BlockHeaderText';
import Next from '../../components/Next';
import { BilegoIconRightArrow } from '../../theme/BilegoIcons';
import style from '../../theme/style';

const GridWrap = styled(Grid)`
  padding: 24px;
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;
const CardWrap = styled(Card)`
  margin-bottom: 30px;
`;
const SBlockHeaderText = styled(BlockHeaderText)`
  a{
    color: ${style.$black};
  }
`;

@inject('pageStore', 'globalStore')
@observer
class Items extends Component{
  render() {
    const {pageStore:{itemsFrontPage}, globalStore:{cityLabel, baseNameForRouting}} = this.props;
    const items = itemsFrontPage && itemsFrontPage.length>0 ? itemsFrontPage : [{id:0},{id:1},{id:2},{id:3}];

    return (
      <GridWrap container spacing={4}>
        <Grid item xs={12}>
          <SBlockHeaderText>
            <Link to={baseNameForRouting + '/items'}>
              Концертные площадки {cityLabel}
              <Next ariaLabel="buy" href="#">
                {BilegoIconRightArrow} Смотреть все
              </Next>
            </Link>
          </SBlockHeaderText>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            {items.map(item=>(
              <Grid key={item.id} item xs={3}>
                <CardWrap>
                  <Item220 {...item} baseNameForRouting={baseNameForRouting}/>
                </CardWrap>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </GridWrap>
    );
  }
}

export default Items;
