import { Product } from '../models/admin.js';

export const getProductForm = (req, res, next) => {
  res.render('admin/add-product', { titlePage: 'Admin - Shop', path: '/admin' });
};

export const postProduct = (req, res, next) => {
  const { title, price, desc, imageUrl } = req.body;
  console.log({
    title,
    price,
    desc,
    imageUrl,
  });
  new Product({ title, price, imageUrl, desc }).save();

  // console.log({ data: req.body, params: req.params });
  res.redirect('/');
};
