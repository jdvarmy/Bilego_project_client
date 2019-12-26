import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';
import {inject} from "mobx-react";
import {renderRoutes} from "react-router-config";

// https://habr.com/ru/post/432368/

@inject('globalStore')
export default class Mobile extends React.Component{
  render() {
    const {type, globalStore:{baseNameForRouting}} = this.props;
    const routs = routes(baseNameForRouting);

    return (
      <React.Fragment>
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
