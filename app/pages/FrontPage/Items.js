import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Item220 } from '../../components/Item';
import BlockHeaderText from '../../components/BlockHeaderText';
import { BilegoIconRightArrow } from '../../theme/bilegoIcons';
import style from '../../theme/style';
import Typography from '@material-ui/core/Typography';

const GridWrap = styled(Grid)`
  padding: 24px;
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;
const CardWrap = styled(Card)`
  margin-bottom: 30px;
`;
const STypography = styled(Typography)`
  svg{
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
  :hover{
    svg{
      transform: translate(15px, 0);
    }
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
          <STypography component="h3" variant="h3">
            <Link to={baseNameForRouting + '/items'}>
              Концертные площадки {cityLabel} {BilegoIconRightArrow}
            </Link>
          </STypography>
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
