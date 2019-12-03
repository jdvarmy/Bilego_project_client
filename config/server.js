import 'babel-polyfill';

import path from 'path';
import fs from 'fs';
import Loadable from 'react-loadable';

import Helmet from 'react-helmet';
import React from 'react';
import express from 'express';
import { createMemoryHistory } from 'history';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Provider as MobxProvider} from 'mobx-react';

import ConfigureStartStore from '../app/ConfigureStartStore';
import { parse as parseUrl } from 'url';

import { JssProvider, SheetsRegistry } from 'react-jss';
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';
import { theme } from '../app/theme';

import * as stores from '../app/stores';
import { ServerBilegoGateUi } from '../app';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./build'));

app.get('*', async (req, res) => {
  const url = req.originalUrl || req.url;
  const history = createMemoryHistory({
    initialEntries: [url],
  });
  const initialState = {};
  const store = new ConfigureStartStore(initialState, history);
  const location = parseUrl(url);
  const indexFile = path.resolve('./build/main.html');

  const context = {};

  if (context.url) {
    req.header('Location', context.url);
    return res.send(302)
  }

  const sheetsRegistry = new SheetsRegistry();
  const generateClassName = createGenerateClassName();
  const sheetsManager = new Map();

  const appContent = ReactDOMServer.renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <MobxProvider {...stores} globalStore={store}>
          <StaticRouter location={location} context={context}>
            <ServerBilegoGateUi />
          </StaticRouter>
        </MobxProvider>
      </MuiThemeProvider>
    </JssProvider>
  );

  const helmet = Helmet.renderStatic();
  const muicss = sheetsRegistry.toString();

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.log('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }
    // data = data.replace('__STYLES__', [...css].join(''));
    data = data.replace('__MUISTYLES__', muicss);
    data = data.replace('__LOADER__', '');
    data = data.replace('<div id=app></div>', `<div id=app>${appContent}</div>`);
    data = data.replace('<div id="app"></div>', `<div id="app">${appContent}</div>`);
    data = data.replace('<title></title>', helmet.title.toString());
    data = data.replace('<meta name="description" content=""/>', helmet.meta.toString());
    data = data.replace('<script>__INITIAL_DATA__</script>', `<script>window.__INITIAL_DATA__ = ${JSON.stringify(store.toJson())};</script>`);

    return res.send(data);
  });
});

Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    console.log(`😎 Server is listening on port ${PORT}`);
  });
});

