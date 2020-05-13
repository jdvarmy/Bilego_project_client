import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import { Carousel } from 'antd';
import style from '../../../theme/style';

const Wrapper = styled.div`
  height: 375px;
  background-color: radial-gradient(circle, rgba(238,174,202,0.6) 0%, rgba(148,187,233,0.6) 100%);
  position: relative;
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
    bottom: 33px;
  }
  .bilego-item-subtitle{
    position: absolute;
    top: 65px;
    left: 16px;
  }
`;
const Gradient = styled.div`
  background: rgb(204,204,204);
  background: linear-gradient(180deg, rgba(20,20,20,0.75) 0%, 
              rgba(20,20,20,0.15) 30%, 
              rgba(20,20,20,0.2) 70%, 
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
const Title = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 16px;
  width: calc(100% - 16px);
  display: flex;
  img{
    position: absolute;
    width: 65px;
    height: 65px;
    bottom: 60px;
    left: 0;
    overflow: hidden;
    border-radius: 100%;
  }
  > div{
    position: absolute;
    bottom: 47px;
    left: 85px;
    *{
      color: ${style.$white}
    }
  }
`;

export default function Slider(props){
  const {item, baseNameForRouting} = props;
  const category = item.categories && item.categories.length > 0 && item.categories[0].name;

  return (
    <Wrapper>
      {item && item.events.length > 0 &&
        <Carousel effect="fade" autoplay>
          {item.events.map(event => {
            const img = event.images && event.images.medium
              ? event.images.medium
              : event.images && event.images.medium_large
                ? event.images.medium_large
                : event.images.default;

            return (
              <div key={event.id}>
                <Gradient/>
                <Image alt={event.title} img={img}/>
                <Link to={`/${baseNameForRouting}/event/${event.name}`}>
                  <Typography variant="subtitle2" component="div" className="bilego-item-subtitle">
                    {event.title}
                  </Typography>
                </Link>
              </div>
            )
          })}
        </Carousel>
      }
      <Title>
        <img src={item.images.thumbnail} alt={item.title}/>
        <div>
          <Typography variant="caption" component="span">{category}</Typography>
          <Typography variant="h6" component="h2">{item.title}</Typography>
          <Typography variant="subtitle2" component="h6">{item.address}</Typography>
        </div>
      </Title>
    </Wrapper>
  )
}

