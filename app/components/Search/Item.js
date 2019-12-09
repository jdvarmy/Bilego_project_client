import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import style from '../../theme/style';

const Wrap = styled.div`
  width: 100%;
  margin-bottom: 20px;
  a{
    display: flex;
    & > div:last-child{
      width: calc(100% - 145px);
      padding-left: 20px;
      color: ${style.$black};
      font-size: 1.2em;
    }
    
    .item-search-hover{
      height: 80px;
      width: 80px;
      overflow: hidden;
      position: relative;
      border-radius: 100px;

      .item-search-backgr{
        background-color: ${style.$redtr};
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity ${style.$transition} ${style.$transitionanimation} 0s;
      }
    }

    &:hover .item-search-backgr, &:hover .item-search-date{
      opacity: 1;
    }
    &:hover .item-search-image{
      transform: scale(1.10, 1.10);
    }
  }
`;
const Image = styled.div`
  .item-search-image{
    background-image: url('${p=>(p.img)}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 80px;
    width: 80px;
    transition: transform .5s ease 0s;
  }
`;
const Text = styled.div`
  span{
    display: block;
    color: grey;
    font-size: 0.8em;
  }
`;

export default function Item(props){
  const {baseNameForRouting, name, img, title, address} = props;

  return(
    <Wrap className="item-search">
      <NavLink to={`/${baseNameForRouting}/item/${name}`} exact>
        <Image className="item-search-hover" img={img}>
          <div className="item-search-image">
          </div>
          <div className="item-search-backgr"/>
        </Image>
        <Text>
          {title}
          <span>{address}</span>
        </Text>
      </NavLink>
    </Wrap>
  )
}