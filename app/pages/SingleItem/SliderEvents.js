import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Carousel } from 'antd';
import Typography from '@material-ui/core/Typography';
import style from '../../theme/style';

const Wrapper = styled.div`
  height: 360px;
  background-color: ${style.$greydark};
  .ant-carousel .slick-slide {
    text-align: center;
    height: 360px;
    overflow: hidden;
    position: relative;
  }
  .slick-slide div{
    height: 100%;
  }
`;
const Gradient = styled.div`
  background: radial-gradient(circle at right, transparent 40%, black);
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

export default function SliderEvents(props){
  const {item, baseNameForRouting} = props;

  const category = item.categories && item.categories.length > 0 && item.categories[0].name;

  return (
    <Wrapper>
      {item.events.length > 0 && <Carousel effect="fade" autoplay>
        {item.events.map(event => {
          return (
            <div key={event.id}>
              <Gradient/>
              <Image alt={event.title} img={event.origin_img}/>
              <Link to={`/${baseNameForRouting}/event/${event.name}`} className="bilego-item-slider-event-title">
                <Typography variant="subtitle2" component="div">
                  {event.title}
                </Typography>
              </Link>
            </div>
          )
        })}
      </Carousel>
      }
      <div className="bilego-item-data">
        <img src={item.img} alt={item.title}/>
        <div>
          <Typography variant="caption" component="span">{category}</Typography>
          <Typography variant="h2" component="h2">{item.title}</Typography>
          <Typography variant="h6" component="h6">{item.address}</Typography>
        </div>
      </div>
    </Wrapper>
  )
}