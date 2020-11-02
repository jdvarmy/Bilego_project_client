import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import style from '../../theme/style';
import EventsSoon from './EventsSoon';
import EventsPopular from './EventsPopular';
import EventsExpect from './EventsExpect';
import Concerts from './Concerts';
import Selections from './Selections';
import Items from './Items';
import Slider from './Slider';
import DatePickerLine from '../../components/DatePickerLine';
import { FilterLine } from '../../components/FilterLine';
import Divider from '@material-ui/core/Divider';
import Padding from '../../components/Padding';

import css from '../../theme/style';

const DateContainer = styled.div`
  display: flex;
  padding-left: ${css.sizes.lg};
  padding-right: ${css.sizes.lg};
`;
const Container = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

@withRouter
@inject('pageStore', 'globalStore', 'sliderStore')
@observer
class FrontPage extends Component {
  componentDidMount = async () => {
    try {
      const {pageStore: {getFrontPageData}, globalStore: {setMeta, baseNameForRouting}} = this.props;

      await getFrontPageData({city: baseNameForRouting});
      setMeta(this.props.pageStore.seoPage);
    }catch (e) {
      console.log('front page: ', e);
    }
  };

  componentWillUnmount() {
    this.props.pageStore.clear();
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Slider />
        </div>
        <Padding />
        <DateContainer align='middle' type='flex' justify='center'>
          <FilterLine/>
        </DateContainer>
        <Padding />
        <Container>
          <EventsPopular/>
          <EventsSoon/>
          <EventsExpect/>
          <Concerts/>
          <Selections/>
          <Divider />
          <Items/>
        </Container>
      </React.Fragment>
    );
  }
}

export default FrontPage;
