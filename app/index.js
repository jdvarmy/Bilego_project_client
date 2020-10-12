import '@babel/polyfill';
import 'mobx-react/batchingForReactDom';

import React, { Fragment, useEffect } from 'react';
import { hydrate } from 'react-dom';
import { Provider as MobxProvider } from 'mobx-react';
import { createBrowserHistory, createMemoryHistory } from 'history';
import Loadable from 'react-loadable';

import { renderRoutes } from 'react-router-config';
import { Router, useLocation } from 'react-router-dom';

import { CookiesProvider, ServerCookiesManager } from './cookie';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import styled from 'styled-components';

import { style, theme } from './theme';
import routes from './routes';
import * as stores from './stores';
import ConfigureStartStore from './ConfigureStartStore';

import BilegoFrontUi from './BilegoFrontUi';
import { Header } from './components';
import RightPanel from './components/RightPanel';
import Footer from './components/Footer';
import SiteMeta from './components/SiteMeta';

import Mobile from './mobile';

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

  store.ssrSide = 'client';

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
  else if(store.searchFirstData)
    stores.searchStore.setStartDataSearchPage(store.searchFirstData);

  // console.log(store.req)
  const path = window.location.pathname;

  Loadable.preloadReady().then(() => {
    hydrate(
      // eslint-disable-next-line react/jsx-filename-extension
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <MobxProvider {...stores} globalStore={store}>
          <SiteMeta/>
          <Router history={history} path={path}>
            <CookiesProvider>
              <ScrollToTop/>
              {!store.mobile
              ? <Fragment>
                  <Root>
                    <Main className="bilego-main">
                      <Header />
                      <BilegoFrontUi />
                      <RightPanel />
                    </Main>
                  </Root>
                  <Footer />
                </Fragment>
              :
                <Mobile/>
              }
            </CookiesProvider>
          </Router>
        </MobxProvider>
      </MuiThemeProvider>,
      document.getElementById('app'),
      () => {
        document.getElementById('jss-server').remove()
      }
    );
  });
};

export const ServerBilegoGateUi = (props) => {
  const { serverBaseRout, req, res } = props,
    routs = routes(serverBaseRout),
    cookieManager = new ServerCookiesManager(req, res);
  return (
    <CookiesProvider manager={cookieManager}>
      <SiteMeta />
      {!props.mobile
      ? <Fragment>
          <Root>
            <Main className="bilego-main">
              <Header/>
              {renderRoutes(routs)}
              <RightPanel/>
            </Main>
          </Root>
          <Footer/>
        </Fragment>
      :
        <Mobile/>
      }
    </CookiesProvider>
  );
};
