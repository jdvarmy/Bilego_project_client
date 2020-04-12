import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import style from '../../theme/style';
import { TicketsModalButton } from '../TicketsModal';
import { BilegoIconMenuDotted } from '../../theme/bilegoIcons';

const Div = styled.div`
  z-index: 2;
  position: absolute!important;
  background: transparent;
  color: white!important;
  left: 40px;
`;
const Wrapper = styled.div`
  overflow: hidden;
  border-radius: 12px;
  position: relative;
  height: 430px;
  &:hover .event-430-hover{
    transform: scale(1.10, 1.10);
  }
`;
const Info = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: transparent;
  & div{
    z-index: 2;
    position: absolute;
    background: transparent;
    text-transform: uppercase;
    color: ${style.$white};
    left: 40px;
    top: 28px;
  }
`;
const Image = styled.div`
  background-image: url('${p => (p.img ? p.img : '')}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 430px;
  transition: transform .5s ease 0s;
`;
const Hover = styled.div`
  background: radial-gradient(circle at right, transparent 40%, black);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  position: absolute;
  height: 430px;
  top: 0;
`;
const Content = styled(Div)`
  top: 100px;
`;
const Title = styled.div`
  font-size: 2.2em;
  line-height: 1.4em;
  display: inline-block;
  margin-bottom: 30px;
  margin-right: 30px;
  a{
    color: ${style.$white}
  }
`;
const Footer = styled(Div)`
  bottom: 25px;
  & a{
    font-weight: 600;
    &:hover{
      // text-decoration: line-through;
    }
  }
`;
const SIconButton = styled(IconButton)`
  z-index: 2;
  position: absolute!important;
  background: transparent;
  color: white!important;
  right: 15px;
  top: 25px;
`;

export default function Event430(props){
  // eslint-disable-next-line react/prop-types,camelcase
  const {title, day, month, img, name, ticket_link, item_title, item_name, baseNameForRouting} = props;

  return (
    <Wrapper>
      <Info>
        <div>{day} {month}</div>
        <SIconButton aria-label="menu" className="bilego-button">
          {BilegoIconMenuDotted}
        </SIconButton>
      </Info>
      <Image className="event-430-hover" img={img} />
      {name !== undefined &&
        <React.Fragment>
          <Link to={`/${baseNameForRouting}/event/${name}`}>
            <Hover />
          </Link>
          <Content>
            <Title><Link to={`/${baseNameForRouting}/event/${name}`}>{title}</Link></Title>
            {/* eslint-disable-next-line camelcase */}
            { ticket_link !== undefined && <TicketsModalButton href={ticket_link} /> }
          </Content>
          <Footer>
            {/* eslint-disable-next-line camelcase */}
            <Link to={`/${baseNameForRouting}/item/${item_name}`}>{item_title}</Link>
          </Footer>
        </React.Fragment>
      }
    </Wrapper>
  );
}
