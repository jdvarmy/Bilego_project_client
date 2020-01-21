import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Zoom from '@material-ui/core/Zoom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Info from './Info';
import PopularOnWeek from '../../components/PopularOnWeek';
import style from '../../../theme/style';
import { BilegoIconTicket } from '../../../theme/bilegoIcons';
import makeStyles from '@material-ui/styles/makeStyles';

const Content = styled.div`
  background-color: ${style.$white};
  overflow: hidden;
  margin-top: -16px;
  border-radius: 16px 16px 0 0;
  z-index: 1;
  position: relative;
  padding-top: 16px;
`;
const Header = styled.div`
  height: 375px;
  background-color: ${style.$greydark};
  overflow: hidden;
  position: relative;
  > div{
    height: 100%;
  }
`;
const Gradient = styled.div`
  background: rgb(204,204,204);
  background: linear-gradient(180deg, rgba(20,20,20,0.75) 0%, 
              rgba(20,20,20,0.15) 30%, 
              rgba(20,20,20,0) 80%, 
              rgba(20,20,20,0.6) 100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  position: absolute;
  top: 0;
`;
const Image = styled.div`
  background-image: url('${p=>(p.img)}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const Title = styled.div`
  position: absolute;
  bottom: 46px;
  left: 16px;
  > *{
    color: ${style.$white};
  }
`;
const SubTitle = styled(Typography)`
  position: absolute;
  bottom: 10px;
  left: 16px;
  color: ${style.$white};
`;
const SFab = styled(Fab)`
  width: calc(100% - 40px)!important;
  margin: 10px 20px!important;
  position: relative;
  z-index: 99999;
  a{
    white-space: nowrap;
  }
`;
const GridWrap = styled(Grid)`
  padding: 5px 16px;
`;
const ItemImage = styled.div`
  width: 65px;
  height: 65px;
  overflow: hidden;
  border-radius: 100%;
  border: 1px solid ${style.$red};
  padding: 2px;
  div{
    width: 100%;
    height: 100%;
    background-image: url('${p=>(p.img)}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    border-radius: 100%;
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: 0,
    zIndex: 9999
  },
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 425,
  });

  return (
    <Zoom in={trigger}>
      <div className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

@withRouter
@inject('singleEventStore', 'globalStore')
@observer
class SingleEvent extends React.Component{
  componentDidMount = async () => {
    try {
      const {match, singleEventStore: {getEventDataBySlug}, globalStore: {apiRoot, setMeta}} = this.props;
      await getEventDataBySlug(apiRoot, {slug: match.params.eventSlug});

      setMeta(this.props.singleEventStore.event.seo_meta);
    }catch (e) {
      console.log('single event: ', e);
    }
  };

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    try {
      const {singleEventStore: {getEventDataBySlug}, globalStore: {apiRoot, setMeta}} = this.props;

      if (prevProps.match.params.eventSlug !== this.props.match.params.eventSlug) {
        await getEventDataBySlug(apiRoot, {slug: this.props.match.params.eventSlug});
        setMeta(this.props.singleEventStore.event.seo_meta);
      }
    }catch (e) {
      console.log('single event: ', e);
    }
  };

  componentWillUnmount() {
    this.props.singleEventStore.clear();
  }

  render() {
    const {singleEventStore: {sliderData, event}, globalStore:{baseNameForRouting}} = this.props;

    return (
      <Content>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Header>
              <Gradient />
              <Image img={sliderData && sliderData.image} />
              <span>
                <Title>
                  <Typography component="h2" variant="h4">{sliderData && sliderData.title1}</Typography>
                  <Typography component="h2" variant="h4">{sliderData && sliderData.title2}</Typography>
                </Title>
                <SubTitle component="h3" variant="subtitle2">{sliderData && sliderData.sub_title}</SubTitle>
              </span>
            </Header>
          </Grid>
          <Grid item xs={12}>
            <SFab variant="extended" aria-label="tickets" href={event && event.ticket_link}>
              {BilegoIconTicket} Купить билеты
            </SFab>
            {event &&
            <React.Fragment>
              <Info {...event}/>
              <GridWrap container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={9}>
                      <Typography component="div" variant="subtitle1">
                        <Link to={`/${baseNameForRouting}/item/${event.item.name}`}>{event.item.title}</Link>
                      </Typography>
                      <Typography component="div" variant="caption">{event.item.address}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Link to={`/${baseNameForRouting}/item/${event.item.name}`}>
                        <ItemImage img={event.item.img}><div /></ItemImage>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <div style={{marginTop: '1em'}}/>
                  <Typography component="h1" variant="h4">{event.title}</Typography>
                  <div style={{marginTop: '1em'}}/>
                  <Typography className="bilego-event-content" component="div" variant="body1">
                    <span dangerouslySetInnerHTML={{ __html: event.content }} />
                  </Typography>
                </Grid>
              </GridWrap>
            </React.Fragment>
            }
          </Grid>
          <Grid item xs={12}>
            <PopularOnWeek/>
          </Grid>
        </Grid>
        <ScrollTop {...this.props}>
          <SFab variant="extended" aria-label="tickets" href={event && event.ticket_link}>
            {BilegoIconTicket} Купить билеты
          </SFab>
        </ScrollTop>
      </Content>
    );
  }
}

export default SingleEvent;
