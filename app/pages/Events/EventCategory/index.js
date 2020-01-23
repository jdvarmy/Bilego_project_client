import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import EventsList from '../EventsList';
import BlockHeaderText from '../../../components/BlockHeaderText';

const Wrap = styled.div`
  padding: 20px;
  overflow: hidden;
`;
const GridWrap = styled(Grid)`
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;

@inject('pageStore')
@observer
class EventCategory extends Component{
  render() {
    const {pageStore:{name}} = this.props;

    return(
      <Wrap>
      <GridWrap container spacing={4}>
        <Grid item xs={12}><BlockHeaderText>{name}</BlockHeaderText></Grid>
        <Grid item xs={12}>
          <EventsList/>
        </Grid>
      </GridWrap>
      </Wrap>
    );
  }
}

export default EventCategory;