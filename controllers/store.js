import { Product } from '../models/admin.js';

export const getStore = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('home', { prods: products, titlePage: 'Home - Shop', path: '/' });
  });
};
