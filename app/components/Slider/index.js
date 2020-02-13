import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import MainSlider from './MainSlider';

// Нужно помнить, что в Revolution Slider для всех элементов rs-layer свойство className должно быть заменено на свойство class
// https://drive.google.com/drive/folders/1XDGs0rK1gHXdi_OVsXoMUdBJ9kzNC5tG

@withRouter
@inject('sliderStore', 'globalStore')
@observer
class Slider extends Component{
  componentDidMount() {
    const {globalStore: {apiRoot}, sliderStore:{getMainSlides}} = this.props;
    getMainSlides(apiRoot);

    console.log('slider')
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.key !== this.props.location.key){
      console.log('slider')
    }
  }

  render() {
    const {sliderStore:{slides}, globalStore:{baseNameForRouting}} = this.props;

    return slides.length > 0
      ? <MainSlider slides={slides} baseNameForRouting={baseNameForRouting}/>
      : null
  }
}

export default Slider;
