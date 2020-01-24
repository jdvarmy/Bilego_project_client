import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import NoSsr from '@material-ui/core/NoSsr';
import BlockHeaderText from '../../components/BlockHeaderText';
import { Event300 } from '../../components/Event';
import { BilegoIconLoading } from '../../theme/bilegoIcons';
import NoContent from '../../components/NoContent';
import {LoadingForEvents} from "../../components/LoadingsTemplate";

const Wrap = styled.div`
  padding: 20px;
`;
const GridWrap = styled(Grid)`
  .MuiPaper-elevation1{
    box-shadow: none;
  }
`;
const GridCont = styled(Grid)``;
const CardWrap = styled(Card)`
  margin-bottom: 30px;
`;
const SFab = styled(Fab)`
  margin: 50px auto!important;
  transition: opacity .2s ease 0s;
`;

@inject('pageStore', 'globalStore')
@observer
class Events extends Component{
  componentDidMount = async () => {
    const {pageStore:{changePageType, getEvents}, globalStore:{apiRoot, setMeta}} = this.props;

    changePageType('page');
    await getEvents(apiRoot);
    setMeta(this.props.pageStore.seoPage);
  };

  componentWillUnmount() {
    this.props.pageStore.clear();
  }

  loadMore = () => {
    const {pageStore:{pagination, setPagination, getEvents}, globalStore:{apiRoot}} = this.props;

    setPagination(pagination.current + 1);
    getEvents(apiRoot);
  };

  render(){
    const {pageStore:{events, isLoading, pagination:{showButton}}, globalStore:{baseNameForRouting}} = this.props;

    const content = <React.Fragment>
      <GridCont container spacing={4}>
        {events && events.length > 0
          ?
          events.map(event=>(
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
      </GridCont>
      <Grid container spacing={4}>
        <NoSsr>
          {showButton &&
          <SFab disabled={isLoading} onClick={this.loadMore} variant="extended" aria-label="load" style={{opacity: `${p=>p.loading ? 0 : 1}`}}>
            {BilegoIconLoading} load more
          </SFab>}
        </NoSsr>
      </Grid>
    </React.Fragment>;

    return(
      <Wrap>
        <GridWrap container spacing={4}>
          <Grid item xs={12}><BlockHeaderText>События</BlockHeaderText></Grid>
          <Grid item xs={12}>
            {isLoading && events.length <= 0
              ? <LoadingForEvents />
              : content
            }
          </Grid>
        </GridWrap>
      </Wrap>
    );
  }
}

export default Events;
