import React from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import style from '../../../theme/style';
import Padding from '../../components/Padding';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import { inject } from 'mobx-react';

const GridWrap = styled(Grid)`
`;
const Content = styled.div`
  background-color: ${style.$white};
  overflow: hidden;
  z-index: 1;
  position: relative;
  padding-top: 56px;
  margin: auto 16px;
  form{
    h4{
      padding-bottom: 20px;
    }
    button{
      margin: 0 auto;
      display: block;
    }
  }
`;
const LinePadding = styled.div`
  padding-top:48px;
`;
const Title = styled(Typography)`
  text-align: center;
  margin-top: 25px!important;
`;
const StyledA = styled(IconButton)`
  margin: 10px 18px!important;
  border: 1px solid rgba(0, 0, 0, 0.78)!important;
  svg{
    cursor: pointer;
    vertical-align: middle;
    font-size: 1.25rem!important;
    color: ${style.$black};
  }
`;
const IconContainer = styled.div`
  svg{
    font-size: 4rem;
    display: block;
    margin: 0 auto;
  }
`;

@inject('servicePagesStore')
class Contacts extends React.Component{
  render() {
    const {servicePagesStore:{social, contacts}} = this.props;

    return (
      <React.Fragment>
        <Padding>
          <div/>
        </Padding>
        <Content>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Title component="h1" variant="h4">Свяжитесь с нами</Title>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} justify="center">
                {social.map(el=>(
                  <Grid key={el.name} item>
                    <StyledA href={el.link}>
                      <IconButton aria-label={el.name} className="bilego-button">
                        {el.icon}
                      </IconButton>
                    </StyledA>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <LinePadding />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} justify="center" style={{textAlign: 'center'}}>
              {contacts.map(el=>(
                <Grid key={el.name} item xs={12}>
                  <IconContainer>
                    {el.icon}
                  </IconContainer>
                  <Typography component="div" variant="subtitle1">
                    {el.name}:
                  </Typography>
                  <Typography component="h5" variant="h5">
                    <a href={`mailto:${el.email}`}>{el.email}</a>
                  </Typography>
                  <LinePadding />
                </Grid>
              ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <form autoComplete="off">
                <Typography component="h4" variant="h4">Задайте вопрос</Typography>
                <GridWrap container spacing={4}>
                  <Grid item xs={12}>
                    <TextField id="name" name="name" label="Ваше имя" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField id="email" name="email" label="E-mail" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField id="message" name="message" label="Сообщение" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    {/*todo: добавить капчу*/}
                  </Grid>
                  <Grid item xs={12} style={{textAlign: 'end'}}>
                    <Fab onClick={this.send} variant="extended" aria-label="send">
                      Отправить
                    </Fab>
                  </Grid>
                </GridWrap>
              </form>
              <LinePadding />
            </Grid>
          </Grid>
        </Content>
      </React.Fragment>
    );
  }
}

export default Contacts;

