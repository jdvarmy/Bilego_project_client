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
    margin-right: 5px;
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
const Span = styled.span`
  display: inline-block;
  vertical-align: middle;
  background-color: ${style.$red};
  width: 8px;
  height: 8px;
  margin: 0px 5px 1px 15px;
  border-radius: 50%;
`;

export default function Item140(props) {
  const { title, address, name, images, metro, categories, baseNameForRouting } = props;
  const img = images && images.thumbnail
    ? images.thumbnail
    : images.medium
      ? images.medium
      : images.medium_large
        ? images.medium_large
        : images.default;

  return (
    <Wrapper>
      <Content>
        <div className="category">
          {categories && categories.length > 0 && categories.map((cat, k) => (<span key={k} id={cat.id}>{cat.name}</span>))}
        </div>
        <div className="title">
          <Link to={`/${baseNameForRouting}/item/${name}`}>{title}</Link>
        </div>
        <div className="address">{address}</div>
        <div className="metro">
          {metro.length > 0 && metro.map((el, k) => {
            if(k >= 2) return null;
            return <React.Fragment key={k}><Span /><span>{el.number}</span></React.Fragment>
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
