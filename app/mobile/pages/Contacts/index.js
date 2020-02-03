import React from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import style from '../../../theme/style';
import Padding from '../../components/Padding';
import animateBackground from '../../../components/animatedBackground';

const GridWrap = styled(Grid)`
`;
const Content = styled.div`
  background-color: ${style.$white};
  z-index: 1;
  position: relative;
`;
const Title = styled(Typography)`
  text-align: center;
  margin-top: 15px!important;
  margin-bottom: 15px!important;
`;
const Canvas = styled.canvas`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

class Contacts extends React.Component{
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
        <Padding>
          <div/>
        </Padding>
        <Content>
          <Canvas ref={this.canvas} />
          <GridWrap container spacing={2}>
            <Grid item xs={12}>
              <Title component="h4" variant="subtitle1">
                Сотрудничество: <a style={{color: '#fff'}} href="mailto:sales@bilego.ru">sales@bilego.ru</a>
              </Title>
              <Title component="h4" variant="subtitle1">
                Реклама: <a style={{color: '#fff'}} href="mailto:adv@bilego.ru">adv@bilego.ru</a>
              </Title>
              <Title component="h4" variant="subtitle1">
                Техподдержка: <a style={{color: '#fff'}} href="mailto:support@bilego.ru">support@bilego.ru</a>
              </Title>
            </Grid>
          </GridWrap>
        </Content>
      </React.Fragment>
    );
  }
}

export default Contacts;

