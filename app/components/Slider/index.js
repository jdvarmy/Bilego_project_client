import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import MainSlider from './MainSlider';
import { Carousel } from 'antd';

// Нужно помнить, что в Revolution Slider для всех элементов rs-layer свойство className должно быть заменено на свойство class
// https://drive.google.com/drive/folders/1XDGs0rK1gHXdi_OVsXoMUdBJ9kzNC5tG

const SlideContainer = styled.div``;
const ControlPanel = styled.div``;
const Slide = styled.div``;
const Image = styled.div``;
const TextContainer = styled.div``;
const Left = styled.div``;
const Right = styled.div``;
const Numbers = styled.div``;

// id: 3263
// ticket_link: "https://webapp.bilego.ru/?a7128442f9c084eaa71261ccce1ece1e&city=spb"
// title: "Гражданская оборона — 12 лет без Егора Летова"
// image_src: "https://spb.bilego.ru/wp-content/uploads/2020/02/grazhdanskaya-oborona.jpg"
// youtybe_id: ""
// ml_video_src: ""
// name: "grazhdanskaja-oborona-bez-egora-letova"
// image_title: "Гражданская оборона"
// image_title1: ""
// image_title2: ""
// date: "Ср, 19 февраля в 17:00"
// location: "Клуб Сердце"

@inject('sliderStore', 'globalStore')
@observer
class Slider extends Component{
  componentDidMount() {
    const {globalStore: {apiRoot}, sliderStore:{getMainSlides}} = this.props;

    getMainSlides(apiRoot);
  }

  shuffle = (arr) => {
    let j, temp;
    for(let i = arr.length - 1; i > 0; i--){
      j = Math.floor(Math.random()*(i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  slide = (slide) => {
    return <SlideContainer>
      <Slide>
        <Image>
          <img src={slide.image_src} />
        </Image>
        <TextContainer>

        </TextContainer>
      </Slide>
    </SlideContainer>
  };

  render() {
    const {sliderStore:{slides}, globalStore:{baseNameForRouting}} = this.props;

    const shuffleSlides = this.shuffle(slides);
    console.log(slides);
    // return slides.length > 0
    //   ? <MainSlider slides={slides} baseNameForRouting={baseNameForRouting}/>
    //   : null
    return slides.length > 0
      ? <React.Fragment>
          <Carousel effect="fade" autoplay>
            {shuffleSlides.map((slide) => (
              <div key={slide.id}>
                {this.slide(slide)}
              </div>
            ))}
          </Carousel>
          <ControlPanel>
            <Left />
            <Right />
            <Numbers>

            </Numbers>
          </ControlPanel>
        </React.Fragment>
      : null
  }
}

export default Slider;