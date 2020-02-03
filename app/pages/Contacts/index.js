import React from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import style from '../../theme/style';
import animateBackground from '../../components/animatedBackground';

const GridWrap = styled(Grid)`
`;
const Content = styled.div`
  position: relative;
  background-color: ${style.$white};
  z-index: 1;
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
        <Content>
          <Canvas ref={this.canvas} />
          <GridWrap container spacing={2}>
            <Grid item xs={12}>
              <Title component="div" variant="subtitle1">
                Сотрудничество:
              </Title>
              <Title component="h4" variant="h4">
                <a href="mailto:sales@bilego.ru">sales@bilego.ru</a>
              </Title>
              <Title component="div" variant="subtitle1">
                Реклама:
              </Title>
              <Title component="h4" variant="h4">
                <a href="mailto:adv@bilego.ru">adv@bilego.ru</a>
              </Title>
              <Title component="div" variant="subtitle1">
                Техподдержка:
              </Title>
              <Title component="h4" variant="h4">
                <a href="mailto:support@bilego.ru">support@bilego.ru</a>
              </Title>
            </Grid>
          </GridWrap>
        </Content>
      </React.Fragment>
    );
  }
}

export default Contacts;
