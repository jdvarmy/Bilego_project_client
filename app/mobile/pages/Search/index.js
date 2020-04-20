import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import Fab from '@material-ui/core/Fab';
import style from '../../../theme/style';
import DatePickerLine from '../../../components/DatePickerLine';
import { EventDef } from './../../components/Event';
import PopularOnWeek from './../../components/PopularOnWeek';
import { BilegoIconLoading } from '../../../theme/bilegoIcons';
import NoContent from '../../../components/NoContent';
import Padding from '../../components/Padding';
import { LoadingForEvents, LoadingTitle } from '../../components/LoadingsTemplate';

const Content = styled.div`
  background-color: ${style.$white};
  overflow: hidden;
  z-index: 1;
  position: relative;
  padding-top: 75px;
`;
const DateContainer = styled.div`
  height: ${style.$heightMenu}px;
  display: flex;
  align-items: center;
  width: 100%;
`;
const Title = styled(Typography)`
  text-align: center;
  margin-top: 25px!important;
  min-height: 41px; 
`;
const SFab = styled(Fab)`
  width: calc(100% - 40px)!important;
  margin: 20px!important;
`;

@withRouter
@inject('searchStore', 'globalStore', 'calendarStore')
@observer
class Search extends Component{
  @observable count = 18;
  @action loadMore = () => {
    this.count += 18;
  };

  constructor(props){
    super(props);
    this.props.globalStore.setMobileMenuCityColor(style.$black);
  };

  componentWillUnmount() {
    this.props.calendarStore.setDaysFilter('');
    this.props.searchStore.clear();
  }

  componentDidMount = async () => {
    const {
      searchStore:{setSearchString, getSearchPageResult, setTitle},
      location,
      globalStore:{apiRoot, setMeta}
    } = this.props;

    try {
      setSearchString(location.search.substr(1));

      await getSearchPageResult(apiRoot, true);
      setMeta(this.props.searchStore.seoPage);

      setTitle(this.props.searchStore.seoPage.title_page)
    }catch (e) {
      console.log('single event: ', e);
    }
  };

  componentDidUpdate = async (prevProps) => {
    const {
      searchStore:{setSearchString, getSearchPageResult, clear, setTitle},
      globalStore:{apiRoot, setMeta}
    } = this.props;

    try {
      if(prevProps.location.search.substr(1) !== this.props.location.search.substr(1)) {
        clear();
        setSearchString(this.props.location.search.substr(1));

        await getSearchPageResult(apiRoot, true);
        setMeta(this.props.searchStore.seoPage);

        setTitle(this.props.searchStore.seoPage.title_page)
      }
    }catch (e) {
      console.log('single event: ', e);
    }
  };

  render(){
    const {searchStore:{isLoading, searchEvents, title}, globalStore:{baseNameForRouting}} = this.props;

    const content = <React.Fragment>
      <Grid item xs={12}>
        {searchEvents && searchEvents.length > 0
          ? searchEvents.slice(0, this.count).map(event => (
            <EventDef key={event.id} {...event} baseNameForRouting={baseNameForRouting}/>
          ))
          : <NoContent />
        }
      </Grid>
      <Grid item xs={12}>
        <NoSsr>
          {searchEvents && searchEvents.length > this.count &&
          <SFab onClick={this.loadMore} variant="extended" aria-label="load">
            {BilegoIconLoading} Показать ещё
          </SFab>
          }
        </NoSsr>
      </Grid>
    </React.Fragment>;

    return(
      <React.Fragment>
        <Padding>
          <div />
        </Padding>
        <Content>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Title component="h1" variant="h4">
                {isLoading && searchEvents && searchEvents.length <= 0
                  ? <LoadingTitle />
                  : title
                }
              </Title>
            </Grid>
            <Grid item xs={12}>
              <DateContainer style={{overflow: 'hidden'}}>
                <DatePickerLine flickity mini/>
              </DateContainer>
            </Grid>
            {isLoading && searchEvents && searchEvents.length <= 0
              ? <LoadingForEvents />
              : content
            }
            <Grid item xs={12}>
              <PopularOnWeek />
            </Grid>
          </Grid>
        </Content>
      </React.Fragment>
    );
  }
}

export default Search;
