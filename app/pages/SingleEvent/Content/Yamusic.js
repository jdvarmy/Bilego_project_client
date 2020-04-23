import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: calc(100% - 48px);
  > div{
    min-height: 512px;
    height: 100%;
  }
  #app{
    background: white!important;
  }
`;

export default function Yamusic(props){
  const iframe = (id) => (
    {__html: `<iframe id="yamusic" frameborder="0" style="border:none;width:100%;height:100%;" width="100%" height="100%" src="https://music.yandex.ru/iframe/#artist/${id}">`}
  );

  return (
    <Wrapper>
      <div dangerouslySetInnerHTML={iframe(props.artist)}/>
    </Wrapper>
  )
}
