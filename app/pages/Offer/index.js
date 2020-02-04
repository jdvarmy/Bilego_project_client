import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import style from '../../theme/style';

const GridWrap = styled(Grid)`
`;
const Content = styled.div`
  position: relative;
  background-color: ${style.$white};
  z-index: 1;
  padding: 20px;
  max-width: 1250px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Padding = styled.div`
  padding-top:48px;
`;

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
              <Typography component="h1" variant="h2">Свяжитесь с нами</Typography>
              <Padding />
            </Grid>
          </GridWrap>
        </Content>
      </React.Fragment>
    );
  }
}

export default Offer;
