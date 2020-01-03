import React from 'react';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import style from '../../../theme/style';
import { inject, observer } from 'mobx-react';

const Wrapper = styled.div`
  height: 375px;
  background-color: ${style.$greydark};
  .ant-carousel .slick-slide {
    text-align: center;
    height: 375px;
    overflow: hidden;
    position: relative;
  }
  .slick-slide div{
    height: 100%;
  }
  .slick-dots.slick-dots-bottom{
    bottom: 30px;
  }
`;
const Gradient = styled.div`
  background: rgb(204,204,204);
  background: linear-gradient(180deg, rgba(20,20,20,0.75) 0%, 
              rgba(20,20,20,0.15) 30%, 
              rgba(20,20,20,0) 80%, 
              rgba(20,20,20,0.6) 100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  position: absolute;
  top: 0;
`;
const Image = styled.div`
  background-image: url('${p=>(p.img)}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

@inject('globalStore', 'sliderStore')
@observer
class Slider extends React.Component{
  componentDidMount() {
    const { globalStore:{ apiRoot }, sliderStore:{ getMainSlides }}  = this.props;
    getMainSlides(apiRoot);
  }

  render(){
    const { globalStore:{ baseNameForRouting }, sliderStore:{ slides } } = this.props;

    return(
      <Wrapper>
        {slides && slides.length>0 &&
        <Carousel effect="fade" autoplay>
          {slides.map(slide => {
            return (
              <div key={slide.id}>
                <Gradient/>
                <Image alt={slide.title} img={slide.image_src}/>
                <Link to={`/${baseNameForRouting}/event/${slide.name}`} className="bilego-item-slider-event-title-mobile">
                  <Typography variant="h6" component="div">
                    {slide.title}
                  </Typography>
                </Link>
                <Typography className="bilego-item-slider-event-subtitle-mobile first" variant="subtitle2" component="span">
                  {slide.date}
                </Typography>
                <Typography className="bilego-item-slider-event-subtitle-mobile second" variant="subtitle2" component="span">
                  {slide.location}
                </Typography>
              </div>
            )
          })}
        </Carousel>
        }
      </Wrapper>
    )
  }
}

export default Slider;
