import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import styled from 'styled-components';
import Flickity from 'react-flickity-component';

import style from '../../../theme/style';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import DatePickerLine from '../../../components/DatePickerLine';
import { Event143, Event190 } from '../../components/Event';
import Slider from './Slider';
import { BilegoIconLoading } from '../../../theme/bilegoIcons';

const Content = styled.div`
  background-color: ${style.$white};
  overflow: hidden;
  margin-top: -16px;
  border-radius: 16px 16px 0 0;
  z-index: 1;
  position: relative;
  padding-top: 16px;
`;
const DateContainer = styled.div`
  height: ${style.$heightMenu}px;
  display: flex;
  align-items: center;
  width: 100%;
`;
const GridWrap = styled(Grid)`
  padding: 0 16px;
`;
const SBlockHeaderText = styled(Typography)`
  a{ color: ${style.$black}; }
`;
const Line = styled.div`
  width: 1000px;
  > div{
    display: inline-block;
  }
`;
const SFab = styled(Fab)`
  width: 90%!important;
  margin: 20px auto!important;
  display: block!important;
`;

@inject('globalStore', 'pageStore')
@observer
class FrontPage extends React.Component{
  @observable selectionsCount = 2;
  @action loadMore = () => {
    this.selectionsCount += 2;
  };

  render() {
    const { globalStore:{ baseNameForRouting, ssrSide, selections } } = this.props;

    console.log(ssrSide)

    return (
      <React.Fragment>
        <Slider />
        <Content>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DateContainer style={{overflow: 'hidden'}}>
                <DatePickerLine flickity mini/>
              </DateContainer>
            </Grid>
            <Grid item xs={12}>
              {[
                {
                  id: 1,
                  name: 'Ближайшие события',
                  link: '/events',
                  carts: this.props.pageStore.eventsSoon
                },
                {
                  id: 2,
                  name: 'Популярные события',
                  link: '',
                  carts: this.props.pageStore.eventsHot
                },
                {
                  id: 3,
                  name: 'Концерты',
                  link: '/events/concerts',
                  carts: this.props.pageStore.eventsConcerts
                }
              ].map(el=>{
                return(
                  <GridWrap container spacing={3} key={el.id}>
                    <Grid item xs={12}>
                      <SBlockHeaderText component="h5" variant="h5">
                        {el.link !== ''
                        ? <Link to={`/${baseNameForRouting + el.link}`}>
                            {el.name}
                          </Link>
                          : el.name
                          }
                      </SBlockHeaderText>
                    </Grid>
                    <Grid item xs={12}>
                      { // todo: Warning: Did not expect server HTML to contain a <div> in <div>
                        ssrSide === 'client'
                          ?
                          <Flickity options={{
                            prevNextButtons: false,
                            pageDots: false,
                            contain: true,
                            freeScroll: true
                          }}>
                            {el.carts.slice(0, 4).map(event => (
                              <Event143 key={event.id} {...event} baseNameForRouting={baseNameForRouting}/>
                            ))}
                          </Flickity>
                          :
                          <div>
                            <div>
                              <Line>
                                {el.carts.slice(0, 4).map(event => (
                                  <Event143 key={event.id} {...event} baseNameForRouting={baseNameForRouting}/>
                                ))}
                              </Line>
                            </div>
                          </div>
                      }
                    </Grid>
                  </GridWrap>
                )
              })}
            </Grid>
            <Grid item xs={12}>
              <GridWrap container spacing={3}>
                <Grid item xs={12}>
                  <SBlockHeaderText component="h5" variant="h5">Подборки Bilego</SBlockHeaderText>
                </Grid>
                {Object.keys(selections).slice(0, this.selectionsCount).map(key=>{
                  return (
                    <Grid key={selections[key].mask} item xs={12}>
                      <Event190 {...selections[key]}/>
                    </Grid>
                  )
                })}
              </GridWrap>
              <Grid item xs={12}>
                {Object.keys(selections).length > this.selectionsCount &&
                  <SFab onClick={this.loadMore} variant="extended" aria-label="load">
                    {BilegoIconLoading} Показать ещё
                  </SFab>
                }
              </Grid>
            </Grid>
          </Grid>
        </Content>
      </React.Fragment>
    );
  }
}

export default FrontPage;
