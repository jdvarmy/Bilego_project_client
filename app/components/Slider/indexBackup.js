import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import styled from 'styled-components';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { style }from '../../theme';

// Нужно помнить, что в Revolution Slider для всех элементов rs-layer свойство className должно быть заменено на свойство class
// https://drive.google.com/drive/folders/1XDGs0rK1gHXdi_OVsXoMUdBJ9kzNC5tG

const SliderEvent = styled.div`
  text-align: center;
  overflow: hidden;
  height: 440px;
  background-color: ${style.$greydark};
  .ant-carousel{
    .slick-slide{
      height: 440px;
    }
  }
  .slick-slide > div{
    height: 100%;
  }
`;
const SlideContainer = styled.div``;
const ControlPanel = styled.div``;
const Slide = styled.div``;
const Image = styled.div`
  background-image: url('${p=>(p.img)}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
`;
const TextContainer = styled.div``;
const Left = styled.div``;
const Right = styled.div``;
const Numbers = styled.div``;
const Gradient = styled.div`
  background: rgb(204,204,204);
  background: radial-gradient(circle, 
              rgba(238,174,202,0.22) 0%, 
              rgba(237,237,237,0.4) 16%, 
              rgba(237,237,237,0) 62%
              );
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;

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
  constructor(props) {
    super(props);
    this.sliderWrap = React.createRef();
    this.slider = React.createRef();
  }

  componentDidMount() {
    const {globalStore: {apiRoot}, sliderStore:{getMainSlides}} = this.props;
    getMainSlides(apiRoot);
  }

  @action
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

  render() {
    const {sliderStore:{slides}, globalStore:{baseNameForRouting}} = this.props;

    const shuffleSlides = this.shuffle(slides);
    // return slides.length > 0
    //   ? <MainSlider slides={slides} baseNameForRouting={baseNameForRouting}/>
    //   : null
    return <div ref={this.sliderWrap} className="bilego-main-slider">
      <SliderEvent ref={this.slider} style={{width: this.sliderWidth, height: this.sliderHeight}}>
        {slides.length > 0 &&
          <React.Fragment>
            <Carousel
              effect="fade"
              // autoplay
              lazyLoad
              infinite
            >
              {shuffleSlides.map((slide) => (
                <React.Fragment key={slide.id}>
                  {/*<SlideContainer>*/}
                  {/*  <Slide className="bilego-slide">*/}
                      <Gradient/>
                      <Image img={slide.image_src}/>
                      <Link to={`/${baseNameForRouting}/event/${slide.name}`} className="bilego-item-slider-event-title-mobile">
                        <Typography variant="h6" component="div">{slide.image_title}</Typography>
                      </Link>
                      <Typography className="bilego-slider-subtitle-date" variant="subtitle2" component="span">
                        {slide.date}
                      </Typography>
                      <Typography className="bilego-slider-subtitle-location" variant="subtitle2" component="span">
                        {slide.location}
                      </Typography>
                    {/*</Slide>*/}
                  {/*</SlideContainer>*/}
                </React.Fragment>
              ))}
            </Carousel>
            <ControlPanel>
              <Left />
              <Right />
              <Numbers>

              </Numbers>
            </ControlPanel>
          </React.Fragment>
        }
      </SliderEvent>
    </div>
  }
}

export default Slider;
