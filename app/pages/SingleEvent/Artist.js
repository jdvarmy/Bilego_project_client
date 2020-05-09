import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ruLocale from 'date-fns/locale/ru';
import format from 'date-fns/format';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography'
import { List } from 'antd';
import Padding from '../../components/Padding';
import BlockHeaderTextH3 from '../../components/BlockHeaderTextH3';
import { BilegoIconTicket } from '../../theme/bilegoIcons';

import { cities } from '../../stores';

import css from '../../theme/style';

const Wrap = styled.div`
  padding: ${css.sizes.md};
  overflow: hidden;
  .MuiTypography-h3{
    color: ${css.$white};
  }
  .subtitle{
    margin-left: ${css.sizes.xl};
    color: ${css.$red}!important;
    transform: translate(0, 12px);
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
`;
const Image = styled.div`
  display: inline-block;
  width: 90px;
  height: 90px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  border-radius: 100%;
  margin: 0 ${css.sizes.lg} 0 0;
`;
const ArtistImage = styled(Image)`
  background-image: url(${p => p.img});
  Box-shadow: 0px 0px 0px ${css.sizes.xs} ${css.$white};
`;
const ItemImage = styled(Image)`
  width: 80px;
  height: 80px;
  background-image: url(${p => p.img});
`;
const Item = styled(List.Item)`
  margin: ${css.sizes.xl} ${css.sizes.xl} ${css.sizes.xl} ${css.sizes.xl}; 
  justify-content: space-between;
  border: none!important; 
  .flex{
    display: flex;
    align-items: center;
    h3{
      color: ${css.$red}!important;
      margin-right: ${css.sizes.base};
    }
    > div p{
      color: ${css.$white};
    }
    > div .lite{
      font-size: 0.9rem;
      font-weight: 100;
    }
  }
  .shadow{
    filter: ${css.$shadowred};
    transform: scale(0.8);
    justify-self: right;
  }
  .short{
    width: 240px;
  }
`;

@inject('singleEventStore', 'globalStore')
@observer
class Artist extends Component{
  render() {
    const {singleEventStore:{event:{artist, artist_events}}} = this.props;

    return(
       artist && artist_events && artist_events.length > 0 ? <Wrap>
        <Padding />
        <Grid container spacing={4} className="bilego-dark">
          <Grid item xs={12}>
            <Padding />
            <Container>
              <ArtistImage img={artist.foto}/>
              <BlockHeaderTextH3>{artist.title}</BlockHeaderTextH3>
              <Typography variant="subtitle1" component="h6" className="subtitle">Расписание выступлений</Typography>
            </Container>
          </Grid>
          <Grid item xs={12}>
            <List
              itemLayout="horizontal"
              dataSource={artist_events}
              renderItem={event => {
                const img = event.images && event.images.thumbnail
                  ? event.images.thumbnail
                  : undefined;

                const cityBaseNameForRouting = event.city;

                // todo: переделать это говно
                const flag = event.city === 'mos'
                  ? 0
                  : event.city === 'spb'
                    ? 1
                    : undefined;

                return <React.Fragment>
                  <Divider style={{background: 'rgba(255, 255, 255, 0.12)'}}/>
                  <Item>
                    <div className="flex">
                      <div className="flex short">
                        <BlockHeaderTextH3>{format(new Date(event.date_time), 'd', {locale: ruLocale})}</BlockHeaderTextH3>
                        <div>
                          <Typography className="lite">{format(new Date(event.date_time), 'EEEE', {locale: ruLocale})}</Typography>
                          <Typography>{format(new Date(event.date_time), 'MMMM', {locale: ruLocale})}</Typography>
                        </div>
                      </div>
                      <div className="flex">
                        <a target="_blank" href={`/${cityBaseNameForRouting}/item/${event.item.name}`}>
                          <ItemImage img={img}/>
                        </a>
                        <div>
                          <Typography>{cities[flag].cityRus}</Typography>
                          <a target="_blank" href={`/${cityBaseNameForRouting}/item/${event.item.name}`}>
                            <Typography className="lite">{event.item.title}</Typography>
                          </a>
                        </div>
                      </div>
                    </div>
                    <a target="_blank" href={`/${cityBaseNameForRouting}/event/${event.name}`}>
                    <Fab className="shadow" variant="extended" aria-label="buy">
                      {BilegoIconTicket} купить билеты
                    </Fab>
                  </a>
                  </Item>
                </React.Fragment>
              }}
            />
          </Grid>
        </Grid>
      </Wrap>
        : null
    )
  }
}

export default Artist;
