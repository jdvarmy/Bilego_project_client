import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Spin } from 'antd';
import Spinner from '../../components/Spinner';
import SliderEvents from './SliderEvents';
import Events from './Events';
import Address from './Address';
import EventsList from './EventsList';

const Wrapper = styled.div`
  min-height: 840px;
`;

@withRouter
@inject('singleItemStore', 'globalStore')
@observer
class SingleItem extends Component{
  componentDidMount() {
    const {singleItemStore:{getItemDataBySlug}, match, globalStore:{apiRoot}} = this.props;
    getItemDataBySlug(apiRoot, {slug: match.params.itemSlug});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {singleItemStore:{getItemDataBySlug}, globalStore:{apiRoot}} = this.props;

    if(prevProps.match.params.itemSlug !== this.props.match.params.itemSlug)
      getItemDataBySlug(apiRoot, {slug: this.props.match.params.itemSlug});
  }

  // componentWillUnmount() {
  //   this.props.singleItemStore.clear();
  // }

  render(){
    const {singleItemStore:{isLoading, item}, globalStore:{baseNameForRouting}} = this.props;
    return(
      <Spin spinning={isLoading} indicator={<Spinner leftPadding={27/2}/>}>
        <Wrapper>
          {
            item &&
            <Fragment>
              <SliderEvents item={item} baseNameForRouting={baseNameForRouting}/>
              {item.events && <Events events={item.events} baseNameForRouting={baseNameForRouting}/>}
              <EventsList item={item}/>
              <Address item={item}/>
            </Fragment>
          }
        </Wrapper>
      </Spin>
    );
  }
}

export default SingleItem;