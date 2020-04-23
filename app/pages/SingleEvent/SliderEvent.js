import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';

import EventSingleDoubleEffects from '../../components/Slider/EventSingleDoubleEffects';
import EventSingleVideo from '../../components/Slider/EventSingleVideo';
import EventSingleImage from '../../components/Slider/EventSingleImage';

@inject('singleEventStore')
@observer
class SliderEvent extends Component{
  render() {
    const {singleEventStore:{sliderType, sliderData}} = this.props;

    return(
      <Fragment>
        {sliderType === 'esdse' && <EventSingleDoubleEffects {...sliderData}/>}
        {sliderType === 'video' && <EventSingleVideo {...sliderData}/>}
        {sliderType === 'image' && <EventSingleImage {...sliderData}/>}
      </Fragment>
    )
  }
}

export default SliderEvent;
