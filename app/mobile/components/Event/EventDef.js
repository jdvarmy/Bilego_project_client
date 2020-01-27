import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import style from '../../../theme/style';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { BilegoIconTicket } from '../../../theme/bilegoIcons';

const Wrapper = styled.div`
  // height: 266px;
  overflow: hidden;
  margin: 0 16px 20px;
  & > a{
    height: 190px;
    overflow: hidden;
    display: block;
  }
`;
const Image = styled.div`
  background-image: url('${p => (p.img)}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 190px;
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
    top: -180px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    .MuiFab-label{
      font-size: 0.8em;
      color: ${style.$white};
    }
    svg{
      font-size: 1.5rem;
      margin: 0;
    }
  }
`;

export default function EventDef(props) {
  const { title, day, month, img, name, ticket_link, item_title, item_name, baseNameForRouting } = props;

  return (
    <Wrapper>
      <Link to={`/${baseNameForRouting}/event/${name}`}>
        <Image img={img} />
      </Link>
      <Content>
        <SWrap>
          <Fab variant="extended" aria-label="buy" href={ticket_link}>
            {BilegoIconTicket}
          </Fab>
        </SWrap>
        <Typography component="h2" variant="subtitle1">
          <Link to={`/${baseNameForRouting}/event/${name}`}>{title}</Link>
        </Typography>
        <Span>{day} {month} / <Link to={`/${baseNameForRouting}/item/${item_name}`}>{item_title}</Link></Span>
      </Content>
    </Wrapper>
  );
}

