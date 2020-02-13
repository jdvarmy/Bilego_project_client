import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { style }from '../../theme';

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
  h2{
    position: absolute;
    bottom: 5px;
    left: 16px;
    color: ${style.$white};
    display: block;
    width: 75%;
    text-align: left;
  }
`;
const ControlPanel = styled.div``;
const Image = styled.div`
  background-image: url('${p=>(p.img)}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
`;
const Left = styled.div``;
const Right = styled.div``;
const Numbers = styled.div``;
const Gradient = styled.div`
  background: radial-gradient(circle at right, transparent 40%, ${style.$greydark});
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

@withRouter
@inject('sliderStore', 'globalStore')
@observer
class Slider extends Component{
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

    return <div className="bilego-main-slider">
      <SliderEvent>
        {slides.length > 0 &&
          <React.Fragment>
            <Carousel
              effect="fade"
              // autoplay
              lazyLoad
              infinite
              dotPosition="right"
            >
              {shuffleSlides.map((slide) => (
                <React.Fragment key={slide.id}>
                  <Gradient/>
                  <Image img={slide.image_src}/>
                  <Link to={`/${baseNameForRouting}/event/${slide.name}`} className="bilego-slider-title">
                    <Typography variant="h2" component="h2">{slide.image_title}</Typography>
                  </Link>
                  <Typography className="bilego-slider-subtitle-date" variant="subtitle2" component="span">
                    {slide.date}
                  </Typography>
                  <Typography className="bilego-slider-subtitle-location" variant="subtitle2" component="span">
                    {slide.location}
                  </Typography>
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
