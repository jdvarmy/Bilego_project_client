import React from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import style from '../../theme/style';
import animateBackground from '../../components/animatedBackground';

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
const Canvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
`;

class Offer extends React.Component{
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    animateBackground(this.canvas);
  }

  render() {
    return (
      <React.Fragment>
        <Content>
          <Canvas ref={this.canvas} />
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
