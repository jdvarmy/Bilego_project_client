import React from 'react';
import styled from 'styled-components';
import style from '../../theme/style';
import {NavLink} from 'react-router-dom';
import {TicketsModalButton} from '../TicketsModal';

const Div = styled.div`
  z-index: 2;
  position: absolute!important;
  background: transparent;
  color: white!important;
  left: 40px;
`;
const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: 200px;
  &:hover .event-200-hover{
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
    top: 20px;
  }
`;
const Image = styled.div`
  background-image: url('${p=>(p.img)}');
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

export default function Event200(props){
  const {title, day, month, img, name, ticket_link, baseNameForRouting} = props;

  return (
    <Wrapper>
      <Info>
        <div>{day} {month}</div>
      </Info>
      <Image className="event-200-hover" img={img}/>
      <NavLink to={`/${baseNameForRouting}/event/${name}`} exact>
        <Hover/>
      </NavLink>
      <Content>
        <Title><NavLink to={`/${baseNameForRouting}/event/${name}`} exact>{title}</NavLink></Title>
      </Content>
      <Footer>
        <TicketsModalButton href={ticket_link}/>
      </Footer>
    </Wrapper>
  )
}