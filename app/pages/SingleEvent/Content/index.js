import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Gallery from './Gallery';
import AddressWidthMap from './AddressWidthMap';
import PopularOnWeek from '../../FrontPage/PopularOnWeek';
import style from '../../../theme/style';

const Padding = styled.div`
  padding-top:48px;
`;
const SBox = styled(Box)`
  margin: 24px;
  & div:first-child a{
    color: ${style.$black};
    :hover{
      color: ${style.$red};
    }
  }
  & div:last-child{
    color: ${style.$greydark};
  }
`;
const ItemBg = styled.div`
  background-image: url('${p=>(p.img)}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 178px;
  transition: transform .5s ease 0s;
`;

@inject('singleEventStore', 'globalStore')
@observer
class Content extends Component{
  render() {
    const {singleEventStore:{event}, globalStore:{baseNameForRouting}} = this.props;

    return(
      event
        ?
        <div>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Gallery />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Divider />
              <Padding />
              Ya music and videos
            </Grid>
            <Grid item xs={8}>
              <Divider />
              <Padding />
              <Typography component="h2" variant="h2">
                {event.title}
              </Typography>
              <div style={{marginTop: '1em'}}/>
              <Typography className="bilego-event-content" component="div" variant="body1">
                <span dangerouslySetInnerHTML={{ __html: event.content }} />
              </Typography>
              <div>
                <Typography component="div" variant="h4">
                  Место
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <ItemBg img={event.item.img_for_event} />
                  </Grid>
                  <Grid item xs={6}>
                    <SBox>
                      <Typography variant="h6" component="div">
                        <Link to={`/${baseNameForRouting}/item/${event.item.name}`}>{event.item.title}</Link>
                      </Typography>
                      <Typography variant="subtitle1" component="div">
                        {event.item.address}
                      </Typography>
                    </SBox>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <AddressWidthMap />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <PopularOnWeek />
            </Grid>
          </Grid>
        </div>
        :
        null
    )
  }
}

export default Content;