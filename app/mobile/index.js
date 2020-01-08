import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Switch, Route } from 'react-router-dom';
import { inject } from 'mobx-react';
import routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';

// https://habr.com/ru/post/432368/

@inject('globalStore')
export default class Mobile extends React.Component{
  render() {
    const {globalStore:{baseNameForRouting, ssrSide}} = this.props;
    const routs = routes(baseNameForRouting);

    return (
      <React.Fragment>
        <Header />
        {ssrSide === 'server' && renderRoutes(routs)}
        {ssrSide === 'client' &&
          <Switch>
            {routs.map(props => (
              <Route {...props} />
            ))}
          </Switch>}
        <Footer />
      </React.Fragment>
    )
  }
}
