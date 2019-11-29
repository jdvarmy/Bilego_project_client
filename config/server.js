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
import StyleContext from 'isomorphic-style-loader/StyleContext';

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

  const css = new Set(); // CSS for all rendered React components
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));

  const appContent = ReactDOMServer.renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <MobxProvider {...stores} globalStore={store}>
        <StaticRouter location={location} context={context}>
          <ServerBilegoGateUi />
        </StaticRouter>
      </MobxProvider>
    </StyleContext.Provider>
  );

  const helmet = Helmet.renderStatic();

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.log('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }
    data = data.replace('__STYLES__', [...css].join(''));
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

