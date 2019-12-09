import Grid from '@material-ui/core/Grid';
import React, {Component} from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import {inject, observer} from 'mobx-react';
import {Item220} from '../../components/Item';
import {BlockHeaderText, Next} from '../../theme/elements';
import {BilegoIconRightArrow} from "../../theme/BilegoIcons";
import {NavLink} from 'react-router-dom';
import style from "../../theme/style";

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

    return (
      <GridWrap container spacing={4}>
        <Grid item xs={12}>
          <SBlockHeaderText>
            <NavLink to={baseNameForRouting + '/items'} exact activeClassName="" className="">
              Концертные площадки {cityLabel}
              <Next ariaLabel="buy" href="#">
                {BilegoIconRightArrow} Смотреть все
              </Next>
            </NavLink>
          </SBlockHeaderText>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            {itemsFrontPage.map(item=>(
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
