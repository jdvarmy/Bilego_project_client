import 'babel-polyfill';

import React, { Fragment, useEffect } from 'react';
import { hydrate } from 'react-dom';
import { Provider as MobxProvider } from 'mobx-react';
import { createBrowserHistory, createMemoryHistory } from 'history';

import { renderRoutes } from 'react-router-config';
import { Switch, Route, Router, useLocation } from 'react-router-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import styled from 'styled-components';

import { style, theme } from './theme';
import routes from './routes';
import * as stores from './stores';
import ConfigureStartStore from './ConfigureStartStore';

import { Header } from './components';
import RightPanel from './components/RightPanel';
import Footer from './components/Footer';
import SiteMeta from './components/SiteMeta';

/**
 * @return {null}
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const Root = styled.div`display: flex;`;
const Main = styled.div`width: ${style.$leftBodyPanel};`;

export const ClientBilegoGateUi = () => {
  const history = process.env.IS_SERVER
    ? createMemoryHistory({
      initialEntries: ['/']
    })
    : createBrowserHistory();

  // eslint-disable-next-line no-underscore-dangle
  const initialState = !process.env.IS_SERVER ? window.__INITIAL_DATA__ : {};

  const store = new ConfigureStartStore(initialState, history);
  if (!process.env.IS_SERVER) {
    window.store = store;
  }
  if (
    !(history.location.pathname.indexOf('/mos') + 1)
    && !(history.location.pathname.indexOf('/spb') + 1)
  ) {
    history.push(`/${store.baseNameForRouting}`);
  }

  if(store.frontPageFirstData)
    stores.pageStore.setStartDataFrontPage(store.frontPageFirstData);
  else if(store.eventsFirstData)
    stores.pageStore.setStartDataEventsPage(store.eventsFirstData);
  else if(store.eventCategoryFirstData) {
    stores.pageStore.setStartDataCategoryPage(store.eventCategoryFirstData);
    stores.pageStore.changePageName(store.pageName);
  }
  else if(store.itemsFirstData)
    stores.pageStore.setStartDataItemsPage(store.itemsFirstData);
  else if(store.singleEventFirstData)
    stores.singleEventStore.setStartDataSingleEventPage(store.singleEventFirstData);
  else if(store.singleItemFirstData)
    stores.singleItemStore.setStartDataSingleItemPage(store.singleItemFirstData);


  const routs = routes(store.baseNameForRouting);
  const path = window.location.pathname;

  hydrate(
    // eslint-disable-next-line react/jsx-filename-extension
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <MobxProvider {...stores} globalStore={store}>
        <SiteMeta />
        <Router history={history} path={path}>
          <ScrollToTop />
          <Root>
            <Main>
              <Header />
              <Switch>
                {routs.map(props => (
                  <Route {...props} />
                ))}
              </Switch>
              <RightPanel />
            </Main>
          </Root>
          <Footer />
        </Router>
      </MobxProvider>
    </MuiThemeProvider>,
    document.getElementById('app'),
    () => {
      document.getElementById('jss-server').remove();
      // document.querySelector("style[data-styled]").remove()
    }
  );
};

export const ServerBilegoGateUi = (props) => {
  // eslint-disable-next-line react/prop-types
  const routs = routes(props.serverBaseRout);

  return (
    <Fragment>
      <SiteMeta />
      <Root>
        <Main>
          <Header />
          {renderRoutes(routs)}
          <RightPanel />
        </Main>
      </Root>
      <Footer />
    </Fragment>
  );
};
