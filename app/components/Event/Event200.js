import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ruLocale from 'date-fns/locale/ru';
import format from 'date-fns/format';

import style from '../../theme/style';
import { TicketsModalButton } from '../TicketsModal';

const Div = styled.div`
  z-index: 2;
  position: absolute!important;
  background: transparent;
  color: white!important;
  left: 20px;
`;
const Info = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: transparent;
  div{
    z-index: 2;
    position: absolute;
    background: transparent;
    text-transform: uppercase;
    color: ${style.$white};
    left: 20px;
    top: 20px;
  }
`;
const Image = styled.div`
  background-image: url('${p => (p.img ? p.img : '')}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 200px;
  transition: transform .5s ease 0s;
`;
const Hover = styled.div`
  background: radial-gradient(circle at right, transparent 40%, black);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  position: absolute;
  height: 200px;
  top: 0;
`;
const Content = styled(Div)`
  top: 65px;
`;
const Title = styled.div`
  font-size: 1.5em;
  line-height: 1.15em;
  display: inline-block;
  margin-bottom: 30px;
  margin-right: 15px;
  a{
    color: ${style.$white}
  }
`;
const Footer = styled(Div)`
  bottom: 25px;
  .MuiFab-extended{
    height: 25px;
    padding: 0 15px;
    .MuiFab-label{
      font-size: 0.8em;
    }
    svg{
      font-size: 1rem;
    }
  }
`;
const Wrapper = styled.div`
  overflow: hidden;
  border-radius: 12px;
  position: relative;
  height: 200px;
  :hover .event-200-hover{
    transform: scale(1.10, 1.10);
  }
`;

export default function Event200(props) {
  const { title, date_time, images, name, ticket_link, baseNameForRouting } = props;
  const img = images && images.medium
    ? images.medium
    : images && images.medium_large
      ? images.medium_large
      : undefined;

  return (
    <Wrapper>
      {img !== undefined
        && <React.Fragment>
          <Info>
            <div>{format(new Date(date_time), 'd MMMM', { locale: ruLocale })}</div>
          </Info>
          <Image className="event-200-hover" img={img} />
          <Link to={`/${baseNameForRouting}/event/${name}`}>
            <Hover />
          </Link>
          <Content>
            <Title><Link to={`/${baseNameForRouting}/event/${name}`}>{title}</Link></Title>
          </Content>
          <Footer>
            <TicketsModalButton href={ticket_link} />
          </Footer>
        </React.Fragment>
      }
    </Wrapper>
  );
}
