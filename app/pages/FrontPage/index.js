import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { Spin } from 'antd';
import NoSsr from '@material-ui/core/NoSsr';

import style from '../../theme/style';
import Slider from '../../components/Slider';
import EventsSoon from './EventsSoon';
import EventsHot from './EventsHot';
import Concerts from './Concerts';
import Selections from './Selections';
import Items from './Items';
import Spinner from '../../components/Spinner';
import DatePickerLine from '../../components/DatePickerLine';
import SiteMeta from '../../components/SiteMeta';

const DateContainer = styled.div`
  height: ${style.$heightMenu}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

@withRouter
@inject('pageStore', 'globalStore', 'sliderStore')
@observer
class FrontPage extends Component {
  componentDidMount() {
    const {pageStore:{getFrontPageData}, globalStore:{categoryConcertsForFrontPage, apiRoot}} = this.props;

    getFrontPageData(apiRoot, {categoryId: categoryConcertsForFrontPage, itemOrderby: 'rand'});
    this.props.sliderStore.getMainSlides(apiRoot);
  }

  render() {
    const {pageStore, sliderStore, history} = this.props;

    console.log(history)

    return (
      <Spin spinning={pageStore.isLoading || sliderStore.isLoading} indicator={<Spinner leftPadding={27/2}/>}>
        <SiteMeta location={history.location.pathname} title="react"/>
        <div>
          <NoSsr>
            <Slider type="main"/>
          </NoSsr>
        </div>
        <DateContainer align='middle' type='flex' justify='center'>
          <DatePickerLine/>
        </DateContainer>
        <div>
          <EventsSoon/>
          <EventsHot/>
          <Concerts/>
          <Selections/>
          <Items/>
        </div>
      </Spin>
    );
  }
}

export default FrontPage;