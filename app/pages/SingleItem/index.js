import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import SliderEvents from './SliderEvents';
import Events from './Events';
import Address from './Address';
import EventsList from './EventsList';
import LoadingSingleItem from '../../components/LoadingsTemplate/LoadingSingleItem';

const Wrap = styled.div`
  overflow: hidden;
`;

// todo: если вордпресс не нашел клуб, то 404

@withRouter
@inject('singleItemStore', 'globalStore')
@observer
class SingleItem extends Component{
  componentDidMount = async () => {
    try {
      const {singleItemStore:{getItemDataBySlug}, match, globalStore:{baseNameForRouting, setMeta}} = this.props;
      await getItemDataBySlug({city: baseNameForRouting, slug: match.params.itemSlug});

      setMeta(this.props.singleItemStore.item.seo);
    }catch (e) {
      console.log('single item: ', e);
    }
  };

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    try {
      const {singleItemStore: {getItemDataBySlug, clear}, globalStore: {baseNameForRouting, setMeta}} = this.props;

      if (prevProps.match.params.itemSlug !== this.props.match.params.itemSlug) {
        clear();
        await getItemDataBySlug({city: baseNameForRouting, slug: match.params.eventSlug});
        setMeta(this.props.singleItemStore.item.seo);
      }
    }catch (e) {
      console.log('single item: ', e);
    }
  };

  componentWillUnmount() {
    this.props.singleItemStore.clear();
  }

  render(){
    const {singleItemStore:{item, isLoading}, globalStore:{baseNameForRouting, ssrSide}} = this.props;

    return(
      <React.Fragment>
        {
          isLoading && item === undefined
          ? <LoadingSingleItem />
          :  item !== undefined && <Fragment>
              <SliderEvents item={item} baseNameForRouting={baseNameForRouting} ssrSide={ssrSide}/>
              <Wrap>
                <Events />
                <EventsList item={item}/>
                <Address item={item}/>
              </Wrap>
            </Fragment>
        }
      </React.Fragment>
    );
  }
}

export default SingleItem;
