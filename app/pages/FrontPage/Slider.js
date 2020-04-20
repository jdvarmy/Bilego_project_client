import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { style }from '../../theme';
import { ArrowNext, ArrowBack } from "../../theme/bilegoIcons";

const SliderEvent = styled.div`
  position: relative;
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
  .date{
    position: absolute;
    top: 10px;
    right: 16px;
    color: ${style.$white};
    height: 25px;
    padding: 0 15px;
    font-size: 0.875rem;
  }
`;
const Text = styled.div`
  position: absolute;
  bottom: 8px;
  left: 16px;
  color: ${style.$white};
  display: block;
  width: 75%;
  text-align: left;
  .location{
    color: ${style.$red};
  }
`;
const Image = styled.div`
  background-image: url('${p=>(p.img)}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
`;
const ControlPanel = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 175px;
  height: 70px;
  background: ${style.$white};
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const Button = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  ::after{
    content: '';
    width: 100%;
    height: 100%;
    border: 2px solid ${style.$greydark};
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 100%;
    transition: color 0.2s;
  }
  svg{
    font-size: 1.3em;
    color: ${style.$greydark};
    transition: color 0.2s;
  }
  :hover{
    ::after{
      border: 2px solid ${style.$red};
      border-radius: 100%;
    }
    svg{
      color: ${style.$red};
    }
  }
`;
const Numbers = styled.div``;
const BilegoTypography = styled.div`
  line-height: 65px;
  letter-spacing: -6px;
  font-weight: 700;
  font-size: 82px;
  color: ${style.$white};
`;
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
              autoplay
              // lazyLoad //todo? неправильно работает lazy. посылаем много запросов и грузить одни и теже картинки много раз
              infinite
              dotPosition="right"
              ref={slider => (this.slider = slider)}
            >
              {shuffleSlides.map((slide) => (
                <React.Fragment key={slide.id}>
                  <Gradient/>
                  <Image img={slide.image_src}/>
                  <Text>
                    <Typography className="location" variant="subtitle1" component="div">
                      {slide.location}
                    </Typography>
                    <Link to={`/${baseNameForRouting}/event/${slide.name}`} className="bilego-slider-title">
                      <BilegoTypography variant="h2" component="h2">{slide.image_title}</BilegoTypography>
                    </Link>
                  </Text>
                  <Typography className="date" variant="subtitle2" component="div">
                    {slide.date}
                  </Typography>
                </React.Fragment>
              ))}
            </Carousel>
            <ControlPanel className="hello">
              <Button onClick={() => this.slider.prev()} className="left">{ArrowBack}</Button>
              <Button onClick={() => this.slider.next()} className="right">{ArrowNext}</Button>
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
