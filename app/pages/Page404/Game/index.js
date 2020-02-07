import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #ffffff;
`;
const RunnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// https://github.com/seohyun0120/t-rex-react

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.outerContainerEl = React.createRef();
  }

  async componentDidMount() {
    const config = {
      id: 'runner',
      width: 645 //this.outerContainerEl.offsetWidth,
    };
    console.log(config);
    const { Runner } = await import('./Runner');
    const runner = new Runner(this.outerContainerEl, config);
    await runner.init()
  }

  render() {
    return (
      <Container>
        <div>
          <RunnerWrapper ref={this.outerContainerEl} />
        </div>
        <div />
      </Container>
    )
  }
}

export default Game;
