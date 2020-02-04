import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import style from '../../theme/style';

const GridWrap = styled(Grid)`
  position: absolute;
  top: calc( 50% - 68px );
`;
const Content = styled.div`
  background-color: ${style.$white};
  overflow: hidden;
`;
const Title = styled(Typography)`
  text-align: center;
  margin-top: 25px!important;
`;

// todo: переделать

@inject('servicePagesStore', 'globalStore')
@observer
class Offer extends React.Component{
  componentDidMount = async () => {
    const { servicePagesStore:{getMetaPageByName}, globalStore:{apiRoot, setMeta}} = this.props;

    await getMetaPageByName(apiRoot, {slug:'offer'});
    setMeta(this.props.servicePagesStore.seoPage);
  };

  render() {
    return (
      <React.Fragment>
        <Content>
          <GridWrap container spacing={2}>
            <Grid item xs={12}>
              <Title component="div" variant="subtitle1">
                Оферта:
              </Title>
              <Title component="h4" variant="h4">
                link
              </Title>
            </Grid>
          </GridWrap>
        </Content>
      </React.Fragment>
    );
  }
}

export default Offer;
