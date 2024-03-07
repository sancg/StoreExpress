import path from 'node:path';

import { Router } from 'express';
import root from '../utils/root.js';
const admin = Router();

admin.get('/users', (req, res) => {
  res.sendFile(path.join(root, 'templates', 'users.html'));
});

admin.get('/add-product', (req, res) => {
  res.render('addProduct', { title: 'New Product' });
});

admin.post('/my-listing', (req, res, next) => {
  const { title, price, description } = req.body;
  // console.log({ data: req.body, params: req.params });
  products.push({ title, price, description });
  res.redirect('/');
});

export { admin };
