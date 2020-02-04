import React from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import style from '../../theme/style';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { BilegoSendMail } from '../../theme/bilegoIcons';

const GridWrap = styled(Grid)`
  padding: 20px 0;
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
    await sendContactForm({
      'your-name': this.name,
      'your-email': this.email,
      'your-message': this.message,
      'your-subject': cityLabel
    });

    console.log('send')

    this.clear();
  };

  render() {
    const {servicePagesStore:{social, contacts}} = this.props;

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
                  {social.map(el=>(
                    <StyledA key={el.name} href={el.link}>
                      <IconButton aria-label={el.name} className="bilego-button">
                        {el.icon}
                      </IconButton>
                    </StyledA>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Padding />
            </Grid>
            {contacts.map(el=>(
              <Grid key={el.name} item xs className="center">
                <IconContainer>
                  {el.icon}
                </IconContainer>
                <Typography component="div" variant="subtitle1">
                  {el.name}:
                </Typography>
                <Typography component="h5" variant="h5">
                  <a href={`mailto:${el.email}`}>{el.email}</a>
                </Typography>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Padding />
            </Grid>
            <Grid item xs={12}>
              <ValidatorForm onSubmit={this.send} autoComplete="off">
                <Typography component="h4" variant="h4">Задайте вопрос</Typography>
                <GridWrap container spacing={8}>
                  <Grid item xs={6}>
                    <TextValidator
                      onChange={this.handleChange}
                      fullWidth
                      name="name"
                      label="Ваше имя"
                      validators={['required']}
                      errorMessages={['this field is required']}
                      value={this.name} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextValidator
                      onChange={this.handleChange}
                      fullWidth
                      name="email"
                      label="E-mail"
                      validators={['required', 'isEmail']}
                      errorMessages={['this field is required', 'email is not valid']}
                      value={this.email} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextValidator
                      onChange={this.handleChange}
                      fullWidth
                      name="message"
                      label="Сообщение"
                      validators={['required']}
                      errorMessages={['this field is required']}
                      value={this.message} />
                  </Grid>
                  <Grid item xs={6}>
                    {/*todo: добавить капчу*/}
                  </Grid>
                  <Grid item xs={6} style={{textAlign: 'end'}}>
                    <Fab type="submit" variant="extended" disabled={this.disabled} aria-label="send">
                      {
                        (this.disabled && 'Ваше сообщение отправлено!')
                        || (!this.disabled && `Отправить ${BilegoSendMail}`)
                      }
                    </Fab>
                  </Grid>
                </GridWrap>
              </ValidatorForm>
              <Padding />
            </Grid>
          </Grid>
        </Content>
      </React.Fragment>
    );
  }
}

export default Contacts;
