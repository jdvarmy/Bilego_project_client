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
const Title = styled(Typography)`
  text-align: center;
  margin-top: 25px!important;
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

  componentWillUnmount() {
    this.props.calendarStore.setDaysFilter('');
  }

  componentDidMount() {
    const {searchStore:{setSearchString, getSearchPageResult, setTitle}, location, globalStore:{apiRoot, CITY}} = this.props;

    setSearchString(location.search.substr(1));
    getSearchPageResult(apiRoot, true);

    if(CITY === 0){
      setTitle('Мероприятия в Москве')
    }else if(CITY === 1){
      setTitle('Мероприятия в Санкт-Петербурге')
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {searchStore:{setSearchString, getSearchPageResult}, globalStore:{apiRoot}} = this.props;

    if(prevProps.location.search.substr(1) !== this.props.location.search.substr(1)) {
      setSearchString(this.props.location.search.substr(1));
      getSearchPageResult(apiRoot, true);
    }
  }

  render(){
    const {searchStore:{isLoading, searchEvents, title}, globalStore:{baseNameForRouting}} = this.props;

    return(
      <Content>
        <Padding>
          <div />
        </Padding>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Title component="h1" variant="h4">
              {title}
            </Title>
          </Grid>
          <Grid item xs={12}>
            <DateContainer style={{overflow: 'hidden'}}>
              <DatePickerLine flickity mini/>
            </DateContainer>
          </Grid>
          <Grid item xs={12}>
            {searchEvents.length > 0
              ?
              searchEvents.slice(0, this.count).map(event => (
                <EventDef key={event.id} {...event} baseNameForRouting={baseNameForRouting}/>
              ))
              :
              <NoContent />
            }
          </Grid>
          <Grid item xs={12}>
            <NoSsr>
              {searchEvents.length > this.count &&
              <SFab onClick={this.loadMore} variant="extended" aria-label="load">
                {BilegoIconLoading} Показать ещё
              </SFab>
              }
            </NoSsr>
          </Grid>
          <Grid item xs={12}>
            <PopularOnWeek />
          </Grid>
        </Grid>
      </Content>
    );
  }
}

export default Search;
