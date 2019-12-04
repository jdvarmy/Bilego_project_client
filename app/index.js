import 'babel-polyfill';

import React, { Fragment } from 'react';
import { hydrate } from 'react-dom';
import { Provider as MobxProvider } from 'mobx-react';
import { createBrowserHistory, createMemoryHistory } from 'history';

// import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';

import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';

import { Switch, Route, Router } from 'react-router-dom';
import routes from './routes';
import * as stores from './stores';
import ConfigureStartStore from './ConfigureStartStore';

import { theme } from './theme';
import { Header } from './components';

export const ClientBilegoGateUi = () => {
  const history = process.env.IS_SERVER
    ? createMemoryHistory({
      initialEntries: ['/'],
    })
    : createBrowserHistory();

  // eslint-disable-next-line no-underscore-dangle
  const initialState = !process.env.IS_SERVER ? window.__INITIAL_DATA__ : {};

  const store = new ConfigureStartStore(initialState, history);
  if (!process.env.IS_SERVER) {
    window.store = store;
  }

  const route = [...routes];

  hydrate(
      <MuiThemeProvider theme={theme}>
        <MobxProvider {...stores} globalStore={store}>
          <Router history={history} path={window.location.pathname}>
            <Header />
            <Switch>
              {route.map(props => (
                <Route {...props} />
              ))}
            </Switch>
          </Router>
        </MobxProvider>
      </MuiThemeProvider>,
    document.getElementById('app'),
    () => {
      document.getElementById("jss-server").remove()
    }
  );
};

export const ServerBilegoGateUi = () => (
  <Fragment>
    <Header />
    {renderRoutes(routes)}
  </Fragment>
);
