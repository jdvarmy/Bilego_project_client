import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Event200 } from '../../components/Event';
import BlockHeaderTextH3 from '../../components/BlockHeaderTextH3';

import css from '../../theme/style';

const GridWrap = styled(Grid)`
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;
const CardWrap = styled(Card)`
  margin-bottom: ${css.sizes.xxl};
`;

@inject('pageStore', 'globalStore', 'singleEventStore')
@observer
class PreviouslyWatched extends Component{
  componentDidMount = async () => {
    const {pageStore:{getPreviouslyWatched}, globalStore:{baseNameForRouting}, singleEventStore:{event:{id}}} = this.props;
    let previously = JSON.parse(localStorage.getItem('_bilego_previously')) || [];

    if(previously.indexOf( id ) === -1) {
      previously.unshift(id);
      localStorage.setItem('_bilego_previously', JSON.stringify(previously.slice(0, 4)));
    }
    if(previously.indexOf( id ) !== -1) {
      previously.splice(previously.indexOf( id ), 1);
    }

    if(previously.length > 1) {
      getPreviouslyWatched({city: baseNameForRouting, ids: previously, page: 1, size: 3});
    }
  };

  render() {
    const {pageStore:{previouslyWatched}, globalStore:{baseNameForRouting}} = this.props;
    return (
      previouslyWatched.length > 0
      ? <GridWrap container spacing={4}>
          <Grid item xs={12}>
            <BlockHeaderTextH3>Вы смотрели</BlockHeaderTextH3>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              {previouslyWatched.slice(0, 3).map(event=>(
                  <Grid key={event.id} item xs={4}>
                    <CardWrap>
                      <Event200 {...event} baseNameForRouting={baseNameForRouting}/>
                    </CardWrap>
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
          <Grid item xs={12} />
        </GridWrap>
        : null
    );
  }
}

export default PreviouslyWatched;
