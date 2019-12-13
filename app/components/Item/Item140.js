import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import style from '../../theme/style';

import I140 from './images/I140.jpg';

const Wrapper = styled.div`
  padding: 36px 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Content = styled.div`
  .category{
    margin-bottom: 5px;
    letter-spacing: .1em;
    text-transform: uppercase;
    font-size: 10px;
    line-height: 16px;
    color: ${style.$greydark};
  }
  .title{
    margin-bottom: 2px;
    a{
      font-size: 18px;
      font-weight: 400;
      line-height: 25px;
      color: ${style.$black};
      :hover{
        color: ${style.$red};
      }
    }
  }
  .address{
    display: inline-block;
    margin-right: 15px;
    font-size: 13px;
    line-height: 19px;
    color: ${style.$black};
  }
  .metro{
    display: inline-block;
    font-size: 13px;
    line-height: 19px;
    color: ${style.$black};
  }
`;
const Image = styled.div`
  width: 70px;
  height: 70px;
  border: 1px solid ${style.$grey};
  border-radius: 50%;
  background-image: url('${p => (p.image)}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export default function Item140(props) {
  // eslint-disable-next-line react/prop-types
  const { title, address, name, img, metro, categories, baseNameForRouting } = props;

  // eslint-disable-next-line react/prop-types
  let addr = address.replace(/Москва, /g, '');
  addr = addr.replace(/Санкт-Петербург, /g, '');

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Wrapper>
      <Content>
        <div className="category">
          {/* eslint-disable-next-line react/prop-types,react/no-array-index-key */}
          {categories.map((cat, k) => (<span key={k} id={cat.id}>{cat.name}</span>))}
        </div>
        <div className="title">
          <Link to={`/${baseNameForRouting}/item/${name}`}>{title}</Link>
        </div>
        <div className="address">{addr}</div>
        <div className="metro">
          {/* eslint-disable-next-line react/prop-types,array-callback-return */}
          {metro.length > 0 && metro.map((el, k) => {
            // eslint-disable-next-line react/no-array-index-key,no-unused-expressions
            <span key={k}>{el.number}</span>;
          })
          }
        </div>
      </Content>
      <div>
        <Link to={`/${baseNameForRouting}/item/${name}`}>
          <Image image={img !== undefined ? img : I140} />
        </Link>
      </div>
    </Wrapper>
  );
}
