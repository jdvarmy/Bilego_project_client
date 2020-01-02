import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Flickity from 'react-flickity-component';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Carousel } from 'antd';
import style from '../../../theme/style';
import DatePickerLine from '../../../components/DatePickerLine';
import { Event143 } from '../../components/Event';

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
const Content = styled.div`
  background-color: ${style.$white};
  overflow: hidden;
  margin-top: -16px;
  border-radius: 16px 16px 0 0;
  z-index: 1;
  position: relative;
  padding-top: 16px;
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
const DateContainer = styled.div`
  height: ${style.$heightMenu}px;
  display: flex;
  align-items: center;
  width: 100%;
`;
const GridWrap = styled(Grid)`
  padding: 0 16px;
`;
const SBlockHeaderText = styled(Typography)`
  a{
    color: ${style.$black};
  }
`;


@inject('globalStore', 'sliderStore', 'pageStore')
@observer
class FrontPage extends React.Component{
  componentDidMount() {
    const { globalStore:{ apiRoot }, sliderStore:{ getMainSlides }}  = this.props;
    getMainSlides(apiRoot);
  }

  render() {
    const { globalStore:{ baseNameForRouting }, sliderStore:{ slides } } = this.props;

    return (
      <React.Fragment>
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
        <Content>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DateContainer style={{overflow: 'hidden'}}>
                <DatePickerLine flickity mini/>
              </DateContainer>
            </Grid>
            <Grid item xs={12}>
              {[
                {
                  id: 1,
                  name: 'Ближайшие события',
                  link: '/events',
                  carts: this.props.pageStore.eventsSoon
                },
                {
                  id: 2,
                  name: 'Популярные события',
                  link: '',
                  carts: this.props.pageStore.eventsHot
                },
                {
                  id: 3,
                  name: 'Концерты',
                  link: '/events/concerts',
                  carts: this.props.pageStore.eventsConcerts
                }
              ].map(el=>{
                return(
                  <GridWrap container spacing={3} key={el.id}>
                    <Grid item xs={12}>
                      <SBlockHeaderText component="h5" variant="h5">
                        {el.link !== ''
                        ? <Link to={`/${baseNameForRouting + el.link}`}>
                            {el.name}
                          </Link>
                          : el.name
                          }
                      </SBlockHeaderText>
                    </Grid>
                    <Grid item xs={12}>
                      <Flickity options={{prevNextButtons: false, pageDots: false, contain: true, freeScroll: true}}>
                        {el.carts.slice(0, 4).map(event=>(
                            <Event143 key={event.id} {...event} baseNameForRouting={baseNameForRouting}/>
                          ))}
                      </Flickity>
                    </Grid>
                  </GridWrap>
                )
              })}
            </Grid>
          </Grid>
        </Content>
      </React.Fragment>
    );
  }
}

export default FrontPage;
