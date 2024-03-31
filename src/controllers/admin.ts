import { Request, Response } from 'express';
import { Product } from '../models/admin';

export const getProductForm = (_req: Request, res: Response) => {
  res.render('admin/add-product', { titlePage: 'Admin - Shop', path: '/admin' });
};

export const postProduct = (req: Request, res: Response) => {
  const { title, price, description, imageUrl } = req.body;
  // console.log({
  //   title,
  //   price,
  //   description,
  //   imageUrl,
  // });
  new Product({ title, price, imageUrl, description }).save();

  // console.log({ data: req.body, params: req.params });
  res.redirect('/');
};
