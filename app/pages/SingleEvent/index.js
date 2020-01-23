import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import NoSsr from '@material-ui/core/NoSsr';
import style from '../../theme/style';
import { Spin } from 'antd';
import Spinner from '../../components/Spinner';
import ConcertInfo from './ConcertInfo';
import TicketsFrame from './TicketsFrame';
import SliderEvent from './SliderEvent';
import Content from './Content';

const TicketsFrameWrap = styled.div`
  border-top: 1px solid ${style.$grey};
  height: 645px;
  margin-bottom: -31px;
  background: radial-gradient(circle, 
  rgba(238,174,202,0.22) 0%, 
  rgba(237,237,237,0.4) 16%, 
  rgba(237,237,237,0) 62%
  );
`;

// https://ui8.net/products/stellar-ui-kit
// todo: если вордпресс не нашел событие, то 404

@withRouter
@inject('singleEventStore', 'globalStore')
@observer
class SingleEvent extends Component{
  componentDidMount = async () => {
    const {match, singleEventStore: {getEventDataBySlug, notFoundMeta}, globalStore: {apiRoot, setMeta}} = this.props;
    try {
      await getEventDataBySlug(apiRoot, {slug: match.params.eventSlug});

      setMeta(this.props.singleEventStore.event.seo_meta);

      console.log(this.props.singleEventStore.event.seo_meta)
    }catch (e) {
      console.log('single event: ', e);
      setMeta(notFoundMeta); // todo: сделать для SSR серверной части
    }
  };

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    const {singleEventStore: {getEventDataBySlug, notFoundMeta, clear}, globalStore: {apiRoot, setMeta}} = this.props;

    try {
      if (prevProps.match.params.eventSlug !== this.props.match.params.eventSlug) {
        clear();
        await getEventDataBySlug(apiRoot, {slug: this.props.match.params.eventSlug});
        setMeta(this.props.singleEventStore.event.seo_meta);
      }
    }catch (e) {
      console.log('single event: ', e);
      setMeta(notFoundMeta);
    }
  };

  componentWillUnmount() {
    this.props.singleEventStore.clear();
  }

  render(){
    const {singleEventStore:{isLoading, event}, history, globalStore} = this.props;

    console.log(this.props)
    return(
      <React.Fragment>
        <Spin spinning={isLoading} indicator={<Spinner leftPadding={27/2}/>}>
          <div>
            <SliderEvent />
          </div>
          <div>
            <ConcertInfo
              share={history.location.pathname}
              site={globalStore.siteAddress}
              event={event}
            />
          </div>
          <TicketsFrameWrap>
            <NoSsr>
              <TicketsFrame />
            </NoSsr>
          </TicketsFrameWrap>
          <Content />
        </Spin>
      </React.Fragment>
    );
  }
}

export default SingleEvent;