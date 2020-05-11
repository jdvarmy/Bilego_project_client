import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ruLocale from 'date-fns/locale/ru';
import format from 'date-fns/format';

import style from '../../../theme/style';
import Typography from '@material-ui/core/Typography';

const Wrapper = styled.div`
  height: 236px;
  width: 208px;
  overflow: hidden;
  margin-right: 16px;
  & > a{
    height: 143px;
    overflow: hidden;
    display: block;
  }
`;
const Image = styled.div`
  background-image: url('${p => (p.img ? p.img : '')}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 143px;
  border-radius: 12px;
  transition: transform .5s ease 0s;
`;
const Content = styled.div`
  position: relative;
  margin-top: 12px;
  a{
    color: ${style.$black}
  }
`;
const Span = styled.span`
  color: ${style.$greydark};
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  a{
    color: ${style.$greydark};
  }
`;
const SWrap = styled.div`
  .MuiFab-extended{
    position: absolute!important;
    top: -65px;
    left: 40px;
    height: 25px;
    padding: 0 15px;
    .MuiFab-label{
      font-size: 0.8em;
      color: ${style.$white};
    }
    svg{
      font-size: 1rem;
    }
  }
`;

export default function Event143(props) {
  const { title, date_time, images, name, ticket_link, item, baseNameForRouting } = props;
  const img = images && images.medium
    ? images.medium
    : images && images.medium_large
      ? images.medium_large
      : undefined;

  return (
    <Wrapper>
      {img !== undefined
        ? <React.Fragment>
          <Link to={`/${baseNameForRouting}/event/${name}`}>
            <Image className="event-143-hover" img={img} />
          </Link>
          <Content>
            <SWrap>
              {/*<TicketsModalButton href={ticket_link} />*/}
            </SWrap>
            <Typography component="h2" variant="subtitle1">
              <Link to={`/${baseNameForRouting}/event/${name}`}>{title}</Link>
            </Typography>
            <Span>{format(new Date(date_time), 'd MMMM', { locale: ruLocale })} / <Link to={`/${baseNameForRouting}/item/${item.name}`}>{item.title}</Link></Span>
          </Content>
        </React.Fragment>
        :
        <Image className="event-143-hover" />
      }
    </Wrapper>
  );
}

