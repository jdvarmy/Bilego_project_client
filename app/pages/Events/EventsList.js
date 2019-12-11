import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import { Spin } from 'antd';
import { Event300 } from '../../components/Event';
import Spinner from '../../components/Spinner';
import { BilegoIconLoading } from '../../theme/BilegoIcons';
import NoContent from '../../components/NoContent';

const GridWrap = styled(Grid)`
  min-height: ${document.documentElement.clientHeight - 160}px;
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
    const {pageStore:{categoryEventId, getEventsByCategory, clear}} = this.props;

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

    clear();
    getEventsByCategory({categoryId: this.props.pageStore.categoryEventId});
  };

  loadMore = () => {
    const {pageStore:{pagination, setPagination, categoryEventId, getEventsByCategory}} = this.props;

    setPagination(pagination.current + 1);
    getEventsByCategory({categoryId: categoryEventId});
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
          {showButton &&
          <SFab disabled={isLoading} onClick={this.loadMore} variant="extended" aria-label="load" style={{opacity: `${p=>p.loading ? 0 : 1}`}}>
            {BilegoIconLoading} Загрузить ещё
          </SFab>}
        </Grid>
      </Spin>
    );
  }
}

export default EventsList;
