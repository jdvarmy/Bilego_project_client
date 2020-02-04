import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Selection from '../../components/Selection';
import Typography from "@material-ui/core/Typography";

const GridWrap = styled(Grid)`
  padding: 24px;
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;

@inject('globalStore')
@observer
class Selections extends Component{
  render() {
    const {baseNameForRouting, selections} = this.props.globalStore;

    return (
      <GridWrap container spacing={4}>
        <Grid item xs={12}>
          <Typography component="h3" variant="h3">
            Подборки Bilego
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>
            <Selection {...selections.weekends}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>
            <Selection {...selections.bilego}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>
            <Selection {...selections.art}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>
            <Selection {...selections.theatre}/>
          </Paper>
        </Grid>
      </GridWrap>
    );
  }
}

export default Selections;
