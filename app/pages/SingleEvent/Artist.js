import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography'
import { List } from 'antd';
import Padding from '../../components/Padding';
import BlockHeaderTextH3 from '../../components/BlockHeaderTextH3';
import { BilegoIconTicket } from '../../theme/bilegoIcons';

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
  }
`;

@inject('singleEventStore', 'globalStore')
@observer
class Artist extends Component{
  render() {
    const {singleEventStore:{event}, globalStore:{baseNameForRouting}} = this.props;

    return(
      event && event.artist && event.artist.events && event.artist.events.length > 0 ? <Wrap>
        <Padding />
        <Grid container spacing={4} className="bilego-dark">
          <Grid item xs={12}>
            <Padding />
            <Container>
              <ArtistImage img={event.artist.foto}/>
              <BlockHeaderTextH3>{event.artist.artist}</BlockHeaderTextH3>
              <Typography variant="subtitle1" component="h6" className="subtitle">Расписание выступлений</Typography>
            </Container>
          </Grid>
          <Grid item xs={12}>
            <List
              itemLayout="horizontal"
              dataSource={event.artist.events}
              renderItem={event => (
                <React.Fragment>
                  <Divider style={{background: css.$grey}} />
                  <Item>
                    <div className="flex">
                      <BlockHeaderTextH3>{event.day}</BlockHeaderTextH3>
                      <div>
                        <Typography className="lite">{event.day_of_week.toUpperCase()}</Typography>
                        <Typography>{event.month.toUpperCase()}</Typography>
                      </div>
                    </div>
                    <div className="flex">
                      <Link to={`/${baseNameForRouting}/item/${event.item_name}`}><ItemImage img={event.item_img}/></Link>
                      <div>
                        <Link to={`/${baseNameForRouting}/item/${event.item_name}`}><Typography>{event.item_title}</Typography></Link>
                        <Typography className="lite">{event.address}</Typography>
                      </div>
                    </div>
                    <Link to={`/${baseNameForRouting}/event/${event.event_name}`}>
                      <Fab className="shadow" variant="extended" aria-label="buy">
                        {BilegoIconTicket} купить билеты
                      </Fab>
                    </Link>
                  </Item>
                </React.Fragment>
              )}
            />
          </Grid>
        </Grid>
      </Wrap>
        : null
    )
  }
}

export default Artist;
