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
import { LoadingFrontPage } from '../../components/LoadingsTemplate';

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
  width: calc(100% - 40px)!important;
  margin: 20px!important;
`;

@inject('globalStore', 'pageStore')
@observer
class FrontPage extends React.PureComponent{
  constructor(props){
    super(props);
    this.props.globalStore.setMobileMenuCityColor(style.$white);
  };

  @observable selectionsCount = 2;
  @action loadMore = () => {
    this.selectionsCount += 2;
  };

  componentDidMount = async () => {
    try {
      const {pageStore: {getFrontPageData}, globalStore: {baseNameForRouting, setMeta}} = this.props;

      await getFrontPageData({city: baseNameForRouting});
      setMeta(this.props.pageStore.seoPage);
    }catch (e) {
      console.log('front page: ', e);
    }
  };

  render() {
    const { globalStore:{ baseNameForRouting, ssrSide }, pageStore:{ eventsSoon, eventsPopular, eventsConcerts, eventCategoriesSelections, isLoading} } = this.props;

    const content =
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
              link: '/search',
              carts: eventsSoon
            },
            {
              id: 2,
              name: 'Популярные события',
              link: '/search?cat=popular',
              carts: eventsPopular
            },
            {
              id: 3,
              name: 'Концерты',
              link: '/search?cat=concerts',
              carts: eventsConcerts
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
        {eventCategoriesSelections &&
          <Grid item xs={12}>
            <GridWrap container spacing={3}>
              <Grid item xs={12}>
                <SBlockHeaderText component="h5" variant="h5">Подборки Bilego</SBlockHeaderText>
              </Grid>
              {eventCategoriesSelections.slice(0, this.selectionsCount)
                .map(selection => {
                  return (
                    <Grid key={selection.id} item xs={12}>
                      <Event190 {...selection} link={`/${baseNameForRouting}/search/?selection=${selection.slug}`}/>
                    </Grid>
                  )
                })}
            </GridWrap>
            <Grid item xs={12}>
              {eventCategoriesSelections.length > this.selectionsCount &&
              <SFab onClick={this.loadMore} variant="extended" aria-label="load">
                {BilegoIconLoading} Показать ещё
              </SFab>
              }
              <div style={{ height: '2em' }}/>
            </Grid>
          </Grid>
        }
      </Grid>;

    return (
      <React.Fragment>
        <Slider />
        <Content>
          {isLoading && (eventsSoon.length <= 0 && eventsPopular.length <= 0 && eventsConcerts.length <= 0)
            ? <LoadingFrontPage />
            : content}
        </Content>
      </React.Fragment>
    );
  }
}

export default FrontPage;
