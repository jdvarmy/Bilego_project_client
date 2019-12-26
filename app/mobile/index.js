import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Switch, Route } from 'react-router-dom';
import { inject } from 'mobx-react';
import routes from './routes';
import Header from './components/Header';

// https://habr.com/ru/post/432368/

@inject('globalStore')
export default class Mobile extends React.Component{
  render() {
    const {type, globalStore:{baseNameForRouting}} = this.props;
    const routs = routes(baseNameForRouting);

    return (
      <React.Fragment>
        <Header />
        {type === 'server' && renderRoutes(routs)}
        {type === 'client' &&
        <Switch>
          {routs.map(props => (
            <Route {...props} />
          ))}
        </Switch>}
      </React.Fragment>
    )
  }
}
