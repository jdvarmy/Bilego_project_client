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
  min-height: 533px;
`;

// todo: если вордпресс не нашел клуб, то 404

@withRouter
@inject('singleItemStore', 'globalStore')
@observer
class SingleItem extends Component{
  componentDidMount = async () => {
    try {
      const {singleItemStore:{getItemDataBySlug}, match, globalStore:{apiRoot, setMeta}} = this.props;
      await getItemDataBySlug(apiRoot, {slug: match.params.itemSlug});

      setMeta(this.props.singleItemStore.item.seo_meta);
    }catch (e) {
      console.log('single item: ', e);
    }
  };

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    try {
      const {singleItemStore: {getItemDataBySlug}, globalStore: {apiRoot, setMeta}} = this.props;

      if (prevProps.match.params.itemSlug !== this.props.match.params.itemSlug) {
        await getItemDataBySlug(apiRoot, {slug: this.props.match.params.itemSlug});
        setMeta(this.props.singleItemStore.item.seo_meta);
      }
    }catch (e) {
      console.log('single item: ', e);
    }
  };

  componentWillUnmount() {
    this.props.singleItemStore.clear();
  }

  render(){
    const {singleItemStore:{isLoading, item}, globalStore:{baseNameForRouting}} = this.props;

    return(
      <Spin spinning={isLoading} indicator={<Spinner leftPadding={27/2}/>}>
        <Wrapper>
          {
            item &&
            <Fragment>
              <SliderEvents item={item} baseNameForRouting={baseNameForRouting}/>
              <Events />
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