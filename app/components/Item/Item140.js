import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import style from '../../theme/style';

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
  background-image: url('${p => (p.img ? p.img : '')}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export default function Item140(props) {
  const { title, address, name, img, metro, categories, baseNameForRouting } = props;

  let addr = address.replace(/Москва, /g, '');
  addr = addr.replace(/Санкт-Петербург, /g, '');

  return (
    <Wrapper>
      <Content>
        <div className="category">
          {categories && categories.length > 0 && categories.map((cat, k) => (<span key={k} id={cat.id}>{cat.name}</span>))}
        </div>
        <div className="title">
          <Link to={`/${baseNameForRouting}/item/${name}`}>{title}</Link>
        </div>
        <div className="address">{addr}</div>
        <div className="metro">
          {metro.length > 0 && metro.map((el, k) => {
            <span key={k}>{el.number}</span>;
          })
          }
        </div>
      </Content>
      <div>
        <Link to={`/${baseNameForRouting}/item/${name}`}>
          <Image img={img} />
        </Link>
      </div>
    </Wrapper>
  );
}
