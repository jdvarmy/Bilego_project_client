import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import style from '../../theme/style';
import EventsSoon from './EventsSoon';
import EventsHot from './EventsHot';
import Concerts from './Concerts';
import Selections from './Selections';
import Items from './Items';
import Slider from './Slider';
import DatePickerLine from '../../components/DatePickerLine';
import Divider from '@material-ui/core/Divider';

const DateContainer = styled.div`
  height: ${style.$heightMenu}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
      const {pageStore: {getFrontPageData}, globalStore: {categoryConcertsForFrontPage, apiRoot, setMeta}} = this.props;

      await getFrontPageData(apiRoot, {categoryId: categoryConcertsForFrontPage, itemOrderby: 'rand'});
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
        <DateContainer align='middle' type='flex' justify='center'>
          <DatePickerLine/>
        </DateContainer>
        <Container>
          <EventsSoon/>
          <EventsHot/>
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
