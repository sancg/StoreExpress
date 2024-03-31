import path from 'node:path';
import express from 'express';
import bps from 'body-parser';

import store from './routes/store.js';
import admin from './routes/admin.js';
import { error404 } from './controllers/error404.js';

import livereload from 'livereload';
import connectLive from 'connect-livereload';

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

const app = express();
app.use(connectLive());

const PORT = 3000;

app.set('x-powered-by', false);

// Adding a global configuration value | Ref: https://expressjs.com/en/5x/api.html#app.set
app.set('view engine', 'ejs');

app.use(express.static(path.join(process.cwd(), 'public')));

app.use(bps.urlencoded({ extended: false }));

app.use(store);
app.use('/admin', admin);

app.use(error404);

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`App Running on: http://localhost:${PORT}/`);
});
