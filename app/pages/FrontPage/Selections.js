import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Selection from '../../components/Selection';
import BlockHeaderTextH3 from '../../components/BlockHeaderTextH3';
import { LoadingSelections } from '../../components/LoadingsTemplate';

import css from '../../theme/style';

const GridWrap = styled(Grid)`
  padding: ${css.sizes.lg};
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
      <GridWrap container spacing={4}>
        {isLoading && eventCategoriesSelections.length <= 0
        ? <LoadingSelections />
        : <React.Fragment>
          <Grid item xs={12}>
            <BlockHeaderTextH3>
              Подборки Bilego
            </BlockHeaderTextH3>
          </Grid>
          {eventCategoriesSelections.map( selection => (
            <Grid key={selection.id} item xs={12} sm={6}>
              <Paper>
                <Selection {...selection} link={`/${baseNameForRouting}/search/?selection=${selection.slug}`} />
              </Paper>
            </Grid>
          ))}
          </React.Fragment>}
      </GridWrap>
    );
  }
}

export default Selections;
