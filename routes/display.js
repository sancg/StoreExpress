import { Router } from 'express';
import { Product } from '../models/admin.js';
const route = Router();

route.get('/my-listing', (req, res, next) => {
  res.send(`<h1> Listing Items </h1>`);
});

route.get('/', (req, res, next) => {
  const products = Product.fetchAll();
  console.log(products);
  res.render('home', { prods: products, titlePage: 'Home - Shop', path: '/' });
});

export default route;
