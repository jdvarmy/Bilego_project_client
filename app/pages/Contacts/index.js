import React from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import style from '../../theme/style';
import { IconFacebook, IconVk, IconInstagram, IconSkype, IconTwitter, IconYoutube,
  BilegoIconHelp,
  BilegoIconTarget,
  BilegoIconHandshake
} from '../../theme/bilegoIcons';

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
  max-width: 1250px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .center{
    text-align: center;
  }
  form{
    padding: 50px;
    border: 1px solid rgba(0, 0, 0, 0.42);
    border-radius: 12px;
  }
`;
const Padding = styled.div`
  padding-top:48px;
`;
const StyledA = styled(IconButton)`
  margin: 10px 18px 10px 0!important;
  border: 1px solid rgba(0, 0, 0, 0.78)!important;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1)!important;
  svg{
    cursor: pointer;
    vertical-align: middle;
    font-size: 1.25rem!important;
    color: ${style.$black};
  }
  :hover{
    background-color: transparent!important;
    border-color: inherit!important;
    svg{
      // fill: ${style.$red};
    }
  }
  :last-child{
    margin-right: 0!important;
  }
`;
const IconContainer = styled.div`
  svg{
    font-size: 3rem;
    display: block;
    margin: 0 auto 20px;
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
              <Padding />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} className="center">
                <Grid item xs={12}>
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
                  <StyledA href="#">
                    <IconButton aria-label="facebook" className="bilego-button">
                      {IconTwitter}
                    </IconButton>
                  </StyledA>
                  <StyledA href="#">
                    <IconButton aria-label="facebook" className="bilego-button">
                      {IconSkype}
                    </IconButton>
                  </StyledA>
                  <StyledA href="#">
                    <IconButton aria-label="facebook" className="bilego-button">
                      {IconYoutube}
                    </IconButton>
                  </StyledA>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Padding />
            </Grid>
            <Grid item xs className="center">
              <IconContainer>
                {BilegoIconHandshake}
              </IconContainer>
              <Typography component="div" variant="subtitle1">
                Сотрудничество:
              </Typography>
              <Typography component="h5" variant="h5">
                <a href="mailto:sales@bilego.ru">sales@bilego.ru</a>
              </Typography>
            </Grid>
            <Grid item xs className="center">
              <IconContainer>
                {BilegoIconTarget}
              </IconContainer>
              <Typography component="div" variant="subtitle1">
                Реклама:
              </Typography>
              <Typography component="h5" variant="h5">
                <a href="mailto:adv@bilego.ru">adv@bilego.ru</a>
              </Typography>
            </Grid>
            <Grid item xs className="center">
              <IconContainer>
                {BilegoIconHelp}
              </IconContainer>
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
              <form noValidate autoComplete="off">
                <Typography component="h4" variant="h4">Задайте вопрос</Typography>
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
