import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Item220 } from '../../components/Item';
import { BilegoIconRightArrow } from '../../theme/bilegoIcons';
import BlockHeaderTextH3 from '../../components/BlockHeaderTextH3';

import css from '../../theme/style';

const GridWrap = styled(Grid)`
  padding: ${css.sizes.lg};
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;
const CardWrap = styled(Card)`
  margin-bottom: ${css.sizes.xl};
`;

@inject('pageStore', 'globalStore')
@observer
class Items extends Component{
  render() {
    const {pageStore:{itemsFrontPage}, globalStore:{cityLabel, baseNameForRouting}} = this.props;
    const items = itemsFrontPage && itemsFrontPage.length>0 ? itemsFrontPage : [{id:0},{id:1},{id:2},{id:3}];

    return (
      <GridWrap container spacing={4}>
        <Grid item xs={12} />
        <Grid item xs={12}>
          <BlockHeaderTextH3>
            <Link to={baseNameForRouting + '/items'}>
              Концертные площадки {cityLabel} {BilegoIconRightArrow}
            </Link>
          </BlockHeaderTextH3>
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
