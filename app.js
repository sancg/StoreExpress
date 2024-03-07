import path from 'node:path';
import express from 'express';
import bps from 'body-parser';

import display from './routes/display.js';
import admin from './routes/admin.js';

const app = express();
const PORT = 3000;

app.set('x-powered-by', false);

// Adding a global configuration value | Ref: https://expressjs.com/en/5x/api.html#app.set
app.set('view engine', 'ejs');
app.use(express.static(path.join(process.cwd(), 'public')));

app.use(bps.urlencoded({ extended: false }));

app.use(display);
app.use('/admin', admin);

app.use((req, res) => {
  res.status(404).send('<h1> Page Not Found </h1>');
});

app.listen(PORT, () => {
  console.log(`App Running on: http://localhost:${PORT}/`);
});
