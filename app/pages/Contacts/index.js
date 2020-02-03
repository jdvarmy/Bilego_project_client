import React from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import style from '../../theme/style';
import {IconFacebook, IconVk, IconInstagram} from '../../theme/bilegoIcons';

const GridWrap = styled(Grid)`
  padding: 20px 0;
  .MuiTextField-root{
    width: 100%;
  }
`;
const Content = styled.div`
  position: relative;
  background-color: ${style.$white};
  z-index: 1;
  padding: 20px;
`;
const Padding = styled.div`
  padding-top:48px;
`;
const StyledA = styled(IconButton)`
  margin: 10px 10px 10px 0!important;
  border: 1px solid rgba(0, 0, 0, 0.38)!important;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1)!important;
  svg{
    cursor: pointer;
    vertical-align: middle;
    font-size: 1.25rem!important;
    color: ${style.$black};
  }
  :hover{
    background-color: transparent!important;
    border-color: ${style.$red}!important;
    svg{
      fill: ${style.$red};
    }
  }
`;

class Contacts extends React.Component{
  send = () => {
    console.log('send')
  };

  render() {
    return (
      <React.Fragment>
        <Content>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h2">Свяжитесь с нами</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="div" variant="h6">Можно смело писать</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography component="div" variant="subtitle2">По организационным вопросам:</Typography>
                  <StyledA href="#">
                    <IconButton aria-label="vk" className="bilego-button">
                      {IconVk}
                    </IconButton>
                  </StyledA>
                  <StyledA href="#">
                    <IconButton aria-label="facebook" className="bilego-button">
                      {IconFacebook}
                    </IconButton>
                  </StyledA>
                  <StyledA href="#">
                    <IconButton aria-label="facebook" className="bilego-button">
                      {IconInstagram}
                    </IconButton>
                  </StyledA>
                </Grid>
                <Grid item xs={6}>
                  <Typography component="div" variant="subtitle2">По техническим вопросам:</Typography>
                  <StyledA href="#">
                    <IconButton aria-label="vk" className="bilego-button">
                      {IconVk}
                    </IconButton>
                  </StyledA>
                  <StyledA href="#">
                    <IconButton aria-label="facebook" className="bilego-button">
                      {IconFacebook}
                    </IconButton>
                  </StyledA>
                  <StyledA href="#">
                    <IconButton aria-label="facebook" className="bilego-button">
                      {IconInstagram}
                    </IconButton>
                  </StyledA>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Padding />
              <Padding />
            </Grid>
            <Grid item xs>
              <Typography component="div" variant="subtitle1">
                Сотрудничество:
              </Typography>
              <Typography component="h5" variant="h5">
                <a href="mailto:sales@bilego.ru">sales@bilego.ru</a>
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography component="div" variant="subtitle1">
                Реклама:
              </Typography>
              <Typography component="h5" variant="h5">
                <a href="mailto:adv@bilego.ru">adv@bilego.ru</a>
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography component="div" variant="subtitle1">
                Техподдержка:
              </Typography>
              <Typography component="h5" variant="h5">
                <a href="mailto:support@bilego.ru">support@bilego.ru</a>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Padding />
            </Grid>
            <Grid item xs={12}>
              <Typography component="h4" variant="h4">Задайте вопрос</Typography>
              <form noValidate autoComplete="off">
                <GridWrap container spacing={8}>
                  <Grid item xs={6}>
                    <TextField id="name" name="name" label="Ваше имя" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField id="email" name="email" label="E-mail" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField id="message" name="message" label="Сообщение" />
                  </Grid>
                  <Grid item xs={6}>
                    {/*todo: добавить капчу*/}
                  </Grid>
                  <Grid item xs={6} style={{textAlign: 'end'}}>
                    <Fab onClick={this.send} variant="extended" aria-label="send">
                      Отправить
                    </Fab>
                  </Grid>
                </GridWrap>
              </form>
              <Padding />
            </Grid>
          </Grid>
        </Content>
      </React.Fragment>
    );
  }
}

export default Contacts;
