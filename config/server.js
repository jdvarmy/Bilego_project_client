import 'babel-polyfill';

import path from 'path';
import fs from 'fs';
import Loadable from 'react-loadable';

import Helmet from 'react-helmet';
import React from 'react';
import express from 'express';
import { createMemoryHistory } from 'history';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider as MobxProvider } from 'mobx-react';

import { parse as parseUrl } from 'url';

import { MuiThemeProvider, ServerStyleSheets } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { theme } from '../app/theme';

import * as stores from '../app/stores';
import { ServerBilegoGateUi } from '../app';
import ConfigureStartStore from '../app/ConfigureStartStore';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./build'));

// const httpsRedirect = require('express-https-redirect'); //todo: установить на проме express-https-redirect
// app.use('/', httpsRedirect());

app.get('/', async (req, res) => {
  const url = req.originalUrl || req.url;
  const history = createMemoryHistory({initialEntries: [url]});
  const initialState = {};
  const ip = req.ip ||
    (req.headers['x-forwarded-for'] || '').split(',').pop() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const store = new ConfigureStartStore(initialState, history);
  await store.getData({ip});

  res.redirect(302, '/' + store.baseNameForRouting);
});

app.get(/\/mos|\/spb/, async (req, res) => {
  const url = req.originalUrl || req.url;
  if (url.indexOf('favicon') + 1) return; // fix for chrome requests... todo: сделать нормальный фикс этого говна. хром постоянно запрашивает иконку

  const history = createMemoryHistory({
    initialEntries: [url]
  });
  const initialState = {};

  const store = new ConfigureStartStore(initialState, history);
  await store.getData();
  const location = parseUrl(url);
  const indexFile = path.resolve('./build/main.html');
  await store.getDataCurrentPage({});

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
              <ServerBilegoGateUi serverBaseRout={store.baseNameForRouting} />
            </StaticRouter>
          </MobxProvider>
        </MuiThemeProvider>
      </StyleSheetManager>
    )
  );

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
      .replace('__LOADER__', '')
      .replace('<div id=app></div>', `<div id=app>${appContent}</div>`)
      .replace('<div id="app"></div>', `<div id="app">${appContent}</div>`)
      .replace('<title></title>', helmet.title.toString())
      .replace('<meta name="description" content=""/>', helmet.meta.toString())
      .replace('<script>__INITIAL_DATA__</script>', `<script>window.__INITIAL_DATA__ = ${JSON.stringify(store.toJson())};</script>`);

    return res.send(data);
  });
});

Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    console.log(`😎 Server is listening on port ${PORT}`);
  });
});
