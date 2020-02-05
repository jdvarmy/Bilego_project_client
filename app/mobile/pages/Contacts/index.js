import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import style from '../../../theme/style';
import Padding from '../../components/Padding';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { BilegoSendMail } from '../../../theme/bilegoIcons';

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
  button .MuiFab-label{
    display: flex;
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
const SSnackbar = styled(Snackbar)`
  width: 100%!important;
  left: 0!important;
  right: 0!important;
  z-index: 99999!important;
  .MuiPaper-root{
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.1), 
                0 0 12px rgba(255, 255, 255, 0.1), 
                inset 0 0 4px rgba(255, 255, 255, 0.1), 
                0 0 8px rgba(0, 0, 0, 0.15);
    background: ${style.$white};
    padding: 10px 30px;
    font-weight: 500;
    color: ${style.$black};
  }
`;

@inject('servicePagesStore', 'globalStore')
@observer
class Contacts extends React.Component{
  componentDidMount = async () => {
    const { servicePagesStore:{getMetaPageByName}, globalStore:{apiRoot, setMeta}} = this.props;

    await getMetaPageByName(apiRoot, {slug:'contacts'});
    setMeta(this.props.servicePagesStore.seoPage);
  };

  @observable disabled = false;
  @observable name = '';
  @observable email = '';
  @observable message = '';

  @action clear = () => {
    this.name = '';
    this.email = '';
    this.message = '';
    this.disabled = false;
  };

  @action
  handleChange = (event) => {
    this[event.target.name] = event.target.value;
  };

  @action
  send = async () => {
    this.disabled = true;

    const {servicePagesStore:{sendContactForm}, globalStore:{cityLabel}} = this.props;
    const resp = await sendContactForm([
      {'your-name': this.name},
      {'your-email': this.email},
      {'your-message': this.message},
      {'your-subject': cityLabel}
    ]);

    this.handleSnackbar(resp.status === 'mail_sent', resp.message);
  };

  @observable openSnackbar = false;
  @observable snackbarMessage = '';
  @observable snackbarSeverity = 'success';
  @action
  handleSnackbar = (flag, message) => {
    if(flag) {
      this.clear();
      this.openSnackbar = true;
      this.snackbarSeverity = 'success';
      this.snackbarMessage = message;
    }else {
      this.disabled = false;
      this.openSnackbar = true;
      this.snackbarSeverity = 'error';
      this.snackbarMessage = message;
    }
  };
  @action
  handleCloseSnackbar = () => {
    this.openSnackbar = false;
  };

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
              <ValidatorForm onSubmit={this.send} autoComplete="off">
                <Typography component="h4" variant="h4">Задайте вопрос</Typography>
                <GridWrap container spacing={4}>
                  <Grid item xs={12}>
                    <TextValidator
                      onChange={this.handleChange}
                      fullWidth
                      name="name"
                      label="Ваше имя"
                      validators={['required']}
                      errorMessages={['пожалуйста, заполните поле']}
                      value={this.name} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextValidator
                      onChange={this.handleChange}
                      fullWidth
                      name="email"
                      label="E-mail"
                      validators={['required', 'isEmail']}
                      errorMessages={['пожалуйста, заполните поле', 'email не похож сам на себя =)']}
                      value={this.email} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextValidator
                      onChange={this.handleChange}
                      fullWidth
                      name="message"
                      label="Сообщение"
                      validators={['required']}
                      errorMessages={['пожалуйста, заполните поле']}
                      value={this.message} />
                  </Grid>
                  <Grid item xs={12}>
                    {/*todo: добавить капчу*/}
                  </Grid>
                  <Grid item xs={12} style={{textAlign: 'end'}}>
                    <Fab type="submit" variant="extended" disabled={this.disabled} aria-label="send">
                      <React.Fragment>{BilegoSendMail}Отправить</React.Fragment>
                    </Fab>
                  </Grid>
                </GridWrap>
              </ValidatorForm>
              <LinePadding />
            </Grid>
          </Grid>
        </Content>
        <Slide direction="up" in={this.openSnackbar} mountOnEnter unmountOnExit>
          <SSnackbar
            open
            onClose={this.handleCloseSnackbar}
            message={this.snackbarMessage}
            severity={this.snackbarSeverity}
          />
        </Slide>
      </React.Fragment>
    );
  }
}

export default Contacts;

