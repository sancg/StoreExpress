import express from 'express';
import bps from 'body-parser';

import livereload from 'livereload';
import connectLive from 'connect-livereload';

import rootPath from './utils/paths';
import adminRoute from './routes/admin';
import route from './routes/store';
import { error404 } from './controllers/error404';

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
app.set('views', [rootPath + '/views']);

app.use(express.static(rootPath + '/public'));
app.use(bps.urlencoded({ extended: false }));

app.use(route);
app.use('/admin', adminRoute);

app.use(error404);

app.listen(PORT, () => {
  console.log(`App Running on: http://localhost:${PORT}/`);
});
