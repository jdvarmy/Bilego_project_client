import 'babel-polyfill';

import React, { Fragment } from 'react';
import { hydrate } from 'react-dom';
import { Provider as MobxProvider } from 'mobx-react';
import { createBrowserHistory, createMemoryHistory } from 'history';

// import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';

import StyleContext from 'isomorphic-style-loader/StyleContext';
import { ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route, Router } from 'react-router-dom';
import routes from './routes';
import * as stores from './stores';
import ConfigureStartStore from './ConfigureStartStore';

import { theme } from './theme';
import { Header } from './components';

export const ClientBilegoGateUi = () => {
  // React.useEffect(() => {
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if (jssStyles)
  //     jssStyles.parentElement.removeChild(jssStyles);
  // }, []);

  const insertCss = (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(style => style._insertCss());
    return () => removeCss.forEach(dispose => dispose());
  };

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
    <ThemeProvider theme={theme}>
      <StyleContext.Provider value={{ insertCss }}>
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
      </StyleContext.Provider>
    </ThemeProvider>,
    document.getElementById('app'),
  );
};

export const ServerBilegoGateUi = () => (
  <Fragment>
    <Header />
    {renderRoutes(routes)}
  </Fragment>
);
