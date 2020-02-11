import React from 'react';
import { inject } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import style from '../../../theme/style';
import Padding from '../../components/Padding';
import animateBackground from '../../../components/animatedBackground';

const GridWrap = styled(Grid)`
  position: absolute;
  top: 100px;
`;
const Content = styled.div`
  background-color: ${style.$white};
  overflow: hidden;
  z-index: 1;
  position: relative;
  padding-top: 75px;
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

inject('globalStore')
class Advertising extends React.Component{
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.props.globalStore.setMobileMenuCityColor(style.$black);
  }

  componentDidMount() {
    animateBackground(this.canvas);
  }

  render() {
    return (
      <React.Fragment>
        <Padding>
          <div/>
        </Padding>
        <Content>
          <Canvas ref={this.canvas} />
          <GridWrap container spacing={2}>
            <Grid item xs={12}>
              <Title component="div" variant="subtitle1">
                По вопросам рекламы:
              </Title>
              <Title component="h4" variant="h4">
                contacts
              </Title>
            </Grid>
          </GridWrap>
        </Content>
      </React.Fragment>
    );
  }
}

export default Advertising;
