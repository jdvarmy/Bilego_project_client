import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #ffffff;
  .MuiTypography-subtitle1{
    margin-bottom: 20px;
    text-align: center;
  }
  .MuiTypography-caption{
    text-align: right;
  }
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

  componentDidMount = async () => {
    const config = {
      id: 'runner',
      width: this.outerContainerEl.current.offsetWidth,
    };
    const { Runner } = await import('./Runner');
    const runner = new Runner(this.outerContainerEl.current, config);
    await runner.init()
  };

  render() {
    return (
      <Container>
        <div>
          <RunnerWrapper ref={this.outerContainerEl} />
        </div>
        <div style={{width: '100%'}}>
          <Typography variant="subtitle1" component="div">Такой страницы не существует!</Typography>
          <Typography variant="body1" component="div">Попробуй:</Typography>
          <ul>
            <li><Typography variant="body2" component="span">Не паниковать</Typography></li>
            <li><Typography variant="body2" component="span">Оглядеться вокруг</Typography></li>
            <li><Typography variant="body2" component="span">Взаимодействовать с реальностью</Typography></li>
          </ul>
          <Typography variant="caption" component="div">Чтобы начать играть, нажми "пробел" на клавиатуре</Typography>
        </div>
      </Container>
    )
  }
}

export default Game;
