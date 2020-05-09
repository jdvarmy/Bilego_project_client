import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import NoSsr from '@material-ui/core/NoSsr';
import Typography from '@material-ui/core/Typography';
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
  width: 100%;
  margin-bottom: -31px;
  background: radial-gradient(circle, 
  rgba(238,174,202,0.22) 0%, 
  rgba(237,237,237,0.4) 16%, 
  rgba(237,237,237,0) 62%
  );
`;
const WrapNoEvent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// https://ui8.net/products/stellar-ui-kit

@withRouter
@inject('singleEventStore', 'globalStore')
@observer
class SingleEvent extends Component{
  componentDidMount = async () => {
    const {match, singleEventStore: {getEventDataBySlug, notFoundMeta}, globalStore: {baseNameForRouting, setMeta}} = this.props;
    try {
      await getEventDataBySlug({city: baseNameForRouting, slug: match.params.eventSlug});
      setMeta(this.props.singleEventStore.event.seo);
    }catch (e) {
      console.log('single event: ', e);
      setMeta(notFoundMeta); // todo: сделать для SSR серверной части
    }
  };

  componentDidUpdate = async (prevProps) => {
    const {singleEventStore: {getEventDataBySlug, notFoundMeta, clear}, globalStore: {baseNameForRouting, setMeta}} = this.props;

    try {
      if (prevProps.match.params.eventSlug !== this.props.match.params.eventSlug) {
        clear();
        await getEventDataBySlug({city: baseNameForRouting, slug: this.props.match.params.eventSlug});
        setMeta(this.props.singleEventStore.event.seo);
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
    const {singleEventStore:{isLoading, event}} = this.props;

    return(
      <React.Fragment>
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
            {
              !isLoading && event === undefined &&
              <WrapNoEvent>
                <Typography variant="h5" component="div">Мы и правда искали это событие, но найти не смогли</Typography>
                <p/>
                <Typography variant="subtitle2" component="span">Попробуйте поискать другие интересные события на нашем сайте</Typography>
              </WrapNoEvent>
            }
            </NoSsr>
          </TicketsFrameWrap>
          <Content />
        </Spin>
      </React.Fragment>
    );
  }
}

export default SingleEvent;
