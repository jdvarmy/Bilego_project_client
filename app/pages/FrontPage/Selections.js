import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Selection from '../../components/Selection';
import Typography from '@material-ui/core/Typography';

import { LoadingSelections } from '../../components/LoadingsTemplate';

const GridWrap = styled(Grid)`
  padding: 24px;
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;

@inject('globalStore', 'pageStore')
@observer
class Selections extends React.Component{
  render() {
    const {globalStore:{ baseNameForRouting }, pageStore:{ eventCategoriesSelections, isLoading }} = this.props;

    return (
      isLoading
        ? <GridWrap container spacing={4}>
          <Grid item xs={12}>
            <Typography component="h3" variant="h3">
              Подборки Bilego
            </Typography>
          </Grid>
          <LoadingSelections />
        </GridWrap>
        : eventCategoriesSelections
          ? <GridWrap container spacing={4}>
            <Grid item xs={12}>
              <Typography component="h3" variant="h3">
                Подборки Bilego
              </Typography>
            </Grid>
            {eventCategoriesSelections.map( selection => (
              <Grid key={selection.id} item xs={12} sm={6}>
                <Paper>
                  <Selection {...selection} link={`/${baseNameForRouting}/search/?selection=${selection.slug}`} />
                </Paper>
              </Grid>
            ))}
          </GridWrap>
          : ''
    );
  }
}

export default Selections;
