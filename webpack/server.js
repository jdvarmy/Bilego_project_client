import '@babel/polyfill';

import path from 'path';
import Loadable from 'react-loadable';
import express from 'express';
import fs from 'fs';

import Helmet from 'react-helmet';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider as MobxProvider } from 'mobx-react';

import MobileDetect from 'mobile-detect';

import { parse as parseUrl } from 'url';

import { MuiThemeProvider, ServerStyleSheets } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { theme } from '../app/theme';

import * as stores from '../app/stores';
import { ServerBilegoGateUi } from '../app';
import ConfigureStartStore from '../app/ConfigureStartStore';
import routes from '../app/routes';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./build'));

app.set('trust proxy', 'loopback');

// const httpsRedirect = require('express-https-redirect'); //todo: установить на проме express-https-redirect
// app.use('/', httpsRedirect());

app.get(/\/mos|\/spb/, async (req, res) => {
  const url = req.originalUrl || req.url;

  const history = createMemoryHistory({
    initialEntries: [url]
  });
  const initialState = {};

  const store = new ConfigureStartStore(initialState, history);
  await store.getData();
  const location = parseUrl(url);
  const indexFile = path.resolve('./build/main.html');

  const md = new MobileDetect(req.headers['user-agent']);
  store.setMobile(md.mobile());

  const ip = {
    ip: req.ip ? req.ip : null,
    ips: req.ips ? req.ips : null,
    headers: (req.headers['x-forwarded-for'] || '').split(',').pop(),
    connection: req.connection ? req.connection.remoteAddress : null,
    socket: req.socket ? req.socket.remoteAddress : null,
    connectionSocket: req.connection && req.connection.socket ? req.connection.socket.remoteAddress : null,
    reqHeaders: (req.headers['x-real-ip'] || '').split(',').pop(),
    iteration: 3
  }
  store.setReq(ip);

  store.ssrSide = 'server';

  const routs = routes(store.baseNameForRouting);

  const pageData = await store.getPageData(routs);
  if(store.frontPageFirstData)
    stores.pageStore.setStartDataFrontPage(pageData);
  else if(store.eventsFirstData)
    stores.pageStore.setStartDataEventsPage(pageData);
  else if(store.eventCategoryFirstData) {
    stores.pageStore.setStartDataCategoryPage(pageData);
    stores.pageStore.changePageName(store.pageName);
  }else if(store.itemsFirstData)
    stores.pageStore.setStartDataItemsPage(pageData);
  else if(store.singleEventFirstData)
    stores.singleEventStore.setStartDataSingleEventPage(pageData);
  else if(store.singleItemFirstData)
    stores.singleItemStore.setStartDataSingleItemPage(pageData);

  const context = {};
  const sheetsMui = new ServerStyleSheets();
  const sheetStyled = new ServerStyleSheet();

  const appContent = ReactDOMServer.renderToString(
    sheetsMui.collect(
      <StyleSheetManager sheet={sheetStyled.instance}>
        <MuiThemeProvider theme={theme}>
          <MobxProvider {...stores} globalStore={store}>
            <CssBaseline />
            <StaticRouter context={context} location={location}>
              <ServerBilegoGateUi serverBaseRout={store.baseNameForRouting} mobile={store.mobile}/>
            </StaticRouter>
          </MobxProvider>
        </MuiThemeProvider>
      </StyleSheetManager>
    )
  );

  if (context.url) {
    res.redirect(301, context.url);
  }

  const helmet = Helmet.renderStatic();
  const muicss = sheetsMui.toString();
  const styleTags = sheetStyled.getStyleTags();

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.log('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }
    data = data.replace('__STYLES__', styleTags)
      .replace('__MUISTYLES__', muicss)
      .replace('__LINKS__', helmet.link.toString())
      .replace('<div id=app></div>', `<div id=app>${appContent}</div>`)
      .replace('<div id="app"></div>', `<div id="app">${appContent}</div>`)
      .replace('<title></title>', helmet.title.toString())
      .replace('<meta name="description" content=""/>', helmet.meta.toString())
      .replace('<script>__INITIAL_DATA__</script>', `<script>window.__INITIAL_DATA__ = ${JSON.stringify(store.toJson())};</script>`);

    return res.send(data);
  });
});

app.get('*', async (req, res) => {
  const url = req.originalUrl || req.url;
  const history = createMemoryHistory({initialEntries: [url]});
  const initialState = {};
  const ip = (req.headers['x-real-ip'] || '').split(',').pop() ||
    req.ip ||
    (req.headers['x-forwarded-for'] || '').split(',').pop() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  // console.log(ip);
  // console.log(req.headers['x-real-ip']);

  const store = new ConfigureStartStore(initialState, history);
  await store.getData({ip});

  res.redirect(302, '/' + store.baseNameForRouting);
});

Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    console.log(`😎 Server is listening on port ${PORT}`);
  });
});
