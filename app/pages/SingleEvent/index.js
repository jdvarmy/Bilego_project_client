import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import NoSsr from '@material-ui/core/NoSsr';
import { Spin } from 'antd';
import style from '../../theme/style';
import Spinner from '../../components/Spinner';
import ConcertInfo from './ConcertInfo';
import TicketsFrame from './TicketsFrame';
import SliderEvent from './SliderEvent';
import Content from './Content';

const TicketsFrameWrap = styled.div`
  border-top: 1px solid ${style.$grey};
  height: 645px;
  margin-bottom: -31px;
`;

// https://ui8.net/products/stellar-ui-kit

@withRouter
@inject('singleEventStore', 'globalStore')
@observer
class SingleEvent extends Component{
  componentDidMount = () => {
    const {match, singleEventStore:{getEventDataBySlug}, globalStore:{apiRoot}} = this.props;
    getEventDataBySlug(apiRoot, {slug: match.params.eventSlug});

    // if( false ) { // todo: если вордпресс не нашел событие, то 404
    //   this.props.history.push('/${baseNameForRouting}/404?query=' + this.props.match.params.eventSlug);
    // }
  };

  componentWillUnmount() {
    this.props.singleEventStore.clear();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {singleEventStore:{getEventDataBySlug}, globalStore:{apiRoot}} = this.props;

    if(prevProps.match.params.eventSlug !== this.props.match.params.eventSlug)
      getEventDataBySlug(apiRoot, {slug: this.props.match.params.eventSlug});
  }

  render(){
    const {singleEventStore:{isLoading}} = this.props;
    return(
      <Spin spinning={isLoading} indicator={<Spinner leftPadding={27/2}/>}>
        <div>
          <SliderEvent />
        </div>
        <div>
          <ConcertInfo />
        </div>
        <TicketsFrameWrap>
          <NoSsr>
            <TicketsFrame />
          </NoSsr>
        </TicketsFrameWrap>
        <Content />
      </Spin>
    );
  }
}

export default SingleEvent;