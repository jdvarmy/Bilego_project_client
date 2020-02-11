import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Switch, Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';

// https://habr.com/ru/post/432368/

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;
const H = styled.div`
  flex: 1 0 auto;
`;
const F = styled(Footer)`
  flex: 0 0 auto;
`;

@inject('globalStore')
@observer
export default class Mobile extends React.Component{
  render() {
    const {globalStore:{baseNameForRouting, ssrSide}} = this.props;
    const routs = routes(baseNameForRouting);

    return (
      <Wrapper>
        <Header />
        <H>
        {ssrSide === 'server' && renderRoutes(routs)}
        {ssrSide === 'client' &&
          <Switch>
            {routs.map(props => (
              <Route {...props} />
            ))}
          </Switch>}
        </H>
        <F />
      </Wrapper>
    )
  }
}
