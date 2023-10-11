const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');

const port = 8090;
const app = express();

const compiler = webpack(require('../build/webpack.js'));

app.use(new webpackDevMiddleware(compiler));
app.use(new webpackHotMiddleware(compiler));

app.listen(port, () => {
  const url = `http://localhost:${port}/`;
  console.log('--------------------------');
  console.log('===> 😊  Starting frontend ...');
  console.log(`===>  Build Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`===>  Listening on port: ${port}`);
  console.log(`===>  Url: ${url}`);
  console.log('--------------------------');
});