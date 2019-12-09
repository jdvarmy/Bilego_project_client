import React, {Component} from 'react';
import styled from 'styled-components';
import style from '../../theme/style';
// import Slider from '../../components/Slider';
import EventsSoon from './EventsSoon';
import EventsHot from './EventsHot';
import Concerts from './Concerts';
import Selections from './Selections';
import Items from './Items';
import {inject, observer} from 'mobx-react';
import {Spinner} from '../../components/Spinner';
import {Spin} from 'antd';
import DatePickerLine from '../../components/DatePickerLine';

const DateContainer = styled.div`
  height: ${style.$heightMenu}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

@inject('pageStore', 'globalStore', 'sliderStore')
@observer
class FrontPage extends Component {
  componentDidMount() {
    const {pageStore:{getEventsConcerts, getEventsHot, getEventsSoon, getItemsFrontPage}, globalStore:{categoryConcertsForFrontPage}} = this.props;
    getEventsSoon();
    getEventsHot();
    getEventsConcerts({categoryId: categoryConcertsForFrontPage});
    getItemsFrontPage({orderby: 'rand'});
    this.props.sliderStore.getMainSlides();
  }

  render() {
    const {pageStore, sliderStore} = this.props;

    return (
      <Spin spinning={pageStore.isLoading || sliderStore.isLoading} indicator={<Spinner leftPadding={27/2}/>}>
        <div>
          {/*<Slider type="main"/>*/}
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