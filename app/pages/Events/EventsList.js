import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import NoSsr from '@material-ui/core/NoSsr';
import { Spin } from 'antd';
import { Event300 } from '../../components/Event';
import Spinner from '../../components/Spinner';
import { BilegoIconLoading } from '../../theme/BilegoIcons';
import NoContent from '../../components/NoContent';

const GridWrap = styled(Grid)`
  // min-height: ${document.documentElement.clientHeight - 160}px;
  min-height: 485px;
`;
const CardWrap = styled(Card)`
  margin-bottom: 30px;
`;
const SFab = styled(Fab)`
  margin: 50px auto!important;
  transition: opacity .2s ease 0s;
`;

// todo: доделать NO CONTENT

@withRouter
@inject('pageStore', 'globalStore')
@observer
class EventsList extends Component{
  componentDidMount() {
    const {pageStore:{categoryEventId, getEventsByCategory}, globalStore:{apiRoot}} = this.props;

    if(categoryEventId === 0){
      const {pageStore:{changeCategoryEvent, changePageType, changePageName}, globalStore:{categoriesForMenu}} = this.props;

      categoriesForMenu.map(el => {
        if(this.props.history.location.pathname.indexOf(el.link) + 1){
          changePageName(el.name);
          changeCategoryEvent(el.id, el.cat);
          changePageType(el.page);
        }
      });
    }

    getEventsByCategory(apiRoot, {categoryId: this.props.pageStore.categoryEventId});
  };

  componentWillUnmount() {
    this.props.pageStore.clear();
  }

  loadMore = () => {
    const {pageStore:{pagination, setPagination, categoryEventId, getEventsByCategory}, globalStore:{apiRoot}} = this.props;

    setPagination(pagination.current + 1);
    getEventsByCategory(apiRoot, {categoryId: this.props.pageStore.categoryEventId});
  };

  render() {
    const {pageStore:{eventsByCategory, isLoading, pagination:{showButton}}, globalStore:{baseNameForRouting}} = this.props;

    return (
      <Spin spinning={isLoading} indicator={<Spinner leftPadding={27/2}/>}>
        <GridWrap container spacing={4}>
          {eventsByCategory.length > 0
            ?
            eventsByCategory.map(event=>(
            <Grid key={event.id} item xs={4}>
              <CardWrap>
                <Event300 {...event} baseNameForRouting={baseNameForRouting}/>
              </CardWrap>
            </Grid>
          ))
            :
            !isLoading && <Grid item xs={12}>
              <NoContent/>
            </Grid>
          }
        </GridWrap>
        <Grid container spacing={4}>
          <NoSsr>
            {showButton &&
            <SFab disabled={isLoading} onClick={this.loadMore} variant="extended" aria-label="load" style={{opacity: `${p=>p.loading ? 0 : 1}`}}>
              {BilegoIconLoading} Загрузить ещё
            </SFab>}
          </NoSsr>
        </Grid>
      </Spin>
    );
  }
}

export default EventsList;
