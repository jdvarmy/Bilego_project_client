import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Tooltip } from 'antd';
import NoSsr from '@material-ui/core/NoSsr';
import Gallery from './Gallery';
import AddressWidthMap from './AddressWidthMap';
import PopularOnWeek from '../../FrontPage/PopularOnWeek';
import css from '../../../theme/style';
import { LoadingContent } from '../../../components/LoadingsTemplate';
import Yamusic from './Yamusic';
import YouTubeWrapper from './YouTube';
import BlockHeaderTextH3 from '../../../components/BlockHeaderTextH3';
import Padding from '../../../components/Padding';

const Wrap = styled.div`
  padding: 20px;
  overflow: hidden;
`;
const WrapIcons = styled.div`
  object{
    width: ${css.sizes.xxl};
    height: ${css.sizes.xxl};
    margin-right: ${css.sizes.md};
  }
`;

@inject('singleEventStore', 'globalStore')
@observer
class Content extends Component{
  render() {
    const {singleEventStore:{isLoading, event}} = this.props;

    return(
      isLoading && event === undefined
        ? <LoadingContent />
        : event !== undefined && <Wrap>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Gallery />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Divider />
              <Padding />
              {
                event.yamusic &&
                <NoSsr>
                  <Yamusic artist={event.yamusic}/>
                </NoSsr>
              }
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
              <div style={{marginTop: '1em'}}/>
              <WrapIcons>
                {event.categories && event.categories.length > 0 && event.categories.map(
                  el => <Tooltip placement="top" key={el.id} title={el.name}>
                    <object type="image/svg+xml" data={el.icon_image} />
                  </Tooltip>
                )
                }
                {event.genre && event.genre.length > 0 && event.genre.map(
                  el => <Tooltip placement="top" key={el.id} title={el.name}>
                    <object type="image/svg+xml" data={el.icon_image} />
                  </Tooltip>
                )
                }
              </WrapIcons>
            </Grid>
          </Grid>
          {
            event.youtube &&
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Padding />
                <BlockHeaderTextH3>
                  Видео
                </BlockHeaderTextH3>
              </Grid>
              <Grid item xs={12}>
                <NoSsr>
                  <YouTubeWrapper video={event.youtube}/>
                </NoSsr>
              </Grid>
            </Grid>
          }
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Padding />
              <BlockHeaderTextH3>
                Адрес
              </BlockHeaderTextH3>
            </Grid>
            <Grid item xs={12}>
              <AddressWidthMap />
            </Grid>
          </Grid>
          <Padding />
          <PopularOnWeek />
        </Wrap>
    )
  }
}

export default Content;
