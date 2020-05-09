import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import NoSsr from '@material-ui/core/NoSsr';
import { Event300 } from '../../components/Event';
import { BilegoIconLoading } from '../../theme/bilegoIcons';
import NoContent from '../../components/NoContent';
import { LoadingForEvents } from '../../components/LoadingsTemplate';

const GridWrap = styled(Grid)``;
const CardWrap = styled(Card)`
  margin-bottom: 30px;
`;
const SFab = styled(Fab)`
  margin: 50px auto!important;
  transition: opacity .2s ease 0s;
`;

@withRouter
@inject('pageStore', 'globalStore')
@observer
class EventsList extends Component{
  componentDidMount = async () => {
    const {pageStore:{categoryEventId, getEventsByCategory, changeCategoryEvent, changePageType, changePageName}, globalStore:{categoriesForMenu, baseNameForRouting, setMeta}} = this.props;

    categoriesForMenu.map(el => {
      if(this.props.history.location.pathname.indexOf(el.link) + 1){
        changePageName(el.name);
        changeCategoryEvent(el.id, el.slug);
        changePageType(el.page);
      }
    });

    await getEventsByCategory({city: baseNameForRouting, category: this.props.pageStore.categoryEventSlug});
    setMeta(this.props.pageStore.seoPage);
  };

  componentWillUnmount() {
    this.props.pageStore.clear();
  }

  loadMore = () => {
    const {pageStore:{pagination, setPagination, getEventsByCategory}, globalStore:{baseNameForRouting}} = this.props;

    setPagination(pagination.current + 1);
    getEventsByCategory({city: baseNameForRouting, category: this.props.pageStore.categoryEventSlug});
  };

  render() {
    const {pageStore:{eventsByCategory, isLoading, pagination:{showButton}}, globalStore:{baseNameForRouting}} = this.props;

    const content = <React.Fragment>
      {eventsByCategory.length > 0
        ? eventsByCategory.map(event=>(
          <Grid item xs={4} key={event.id}>
            <CardWrap>
              <Event300 {...event} baseNameForRouting={baseNameForRouting}/>
            </CardWrap>
          </Grid>
        ))
        : !isLoading &&
        <Grid item xs={12}>
          <NoContent/>
        </Grid>
      }
      <Grid container spacing={4}>
        <NoSsr>
          {showButton &&
          <SFab disabled={isLoading} onClick={this.loadMore} variant="extended" aria-label="load" style={{opacity: `${p=>p.loading ? 0 : 1}`}}>
            {BilegoIconLoading} Загрузить ещё
          </SFab>}
        </NoSsr>
      </Grid>
    </React.Fragment>;

    return (
      <React.Fragment>
          <GridWrap container spacing={4}>
            {isLoading && eventsByCategory.length <= 0
              ? <LoadingForEvents />
              : content
            }
          </GridWrap>
      </React.Fragment>
    );
  }
}

export default EventsList;
