import React from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';

const Wrapper = styled.div``;

export default function YouTubeWrapper(props){
  const opts = {
    height: '420',
    width: '100%'
  };

  return (
    <Wrapper>
      <YouTube videoId={props.video} opts={opts} />
    </Wrapper>
  )
}
