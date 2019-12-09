import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import MainSlider from './MainSlider';

// Нужно помнить, что в Revolution Slider для всех элементов rs-layer свойство className должно быть заменено на свойство class
// https://drive.google.com/drive/folders/1XDGs0rK1gHXdi_OVsXoMUdBJ9kzNC5tG

@inject('sliderStore')
@observer
class Slider extends Component{
  render() {
    const {slides} = this.props.sliderStore;

    return slides.length > 0
      ? <>
        <MainSlider slides={slides} />
      </>
      : null
  }
}

export default Slider;