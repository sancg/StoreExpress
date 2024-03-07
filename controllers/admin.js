import { Product } from '../models/admin.js';
export const getProductForm = (req, res, next) => {
  res.render('admin', { titlePage: 'Admin - Shop', path: '/admin' });
};

export const postProduct = (req, res, next) => {
  const { title, price, desc } = req.body;
  new Product(title, price, desc).save();

  // console.log({ data: req.body, params: req.params });
  res.redirect('/');
};
