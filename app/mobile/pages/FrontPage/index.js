import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Typography from '@material-ui/core/Typography';
import { Carousel } from 'antd';

@inject('globalStore', 'sliderStore')
@observer
class FrontPage extends React.Component{
  componentDidMount() {
    const { globalStore:{ apiRoot }, sliderStore:{ getMainSlides }}  = this.props;
    getMainSlides(apiRoot);
  }

  render() {
    const { globalStore:{ baseNameForRouting }, sliderStore:{ slides } } = this.props;

    console.log(slides)

    return (
      // {item.events.length > 0 && <Carousel effect="fade" autoplay>
      //     {item.events.map(event => {
      //       return (
      //         <div key={event.id}>
      //           <Gradient/>
      //           <Image alt={event.title} img={event.origin_img}/>
      //           <Link to={`/${baseNameForRouting}/event/${event.name}`} className="bilego-item-slider-event-title">
      //             <Typography variant="subtitle2" component="div">
      //               {event.title}
      //             </Typography>
      //           </Link>
      //         </div>
      //       )
      //     })}
      //   </Carousel>
      // }
      <div>1</div>
    );
  }
}

export default FrontPage;
