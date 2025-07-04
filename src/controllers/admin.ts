import { Request, Response } from 'express';
import { Product } from '../models/admin';
import type { IProduct } from '../types/types';

export const getProductForm = (_req: Request, res: Response) => {
  res.render('admin/add-product', { titlePage: 'Admin - Shop', path: '/admin' });
};

export const getProducts = (_req: Request, res: Response) => {
  Product.fetchAll((products: IProduct) => {
    res.render('admin/view-products', {
      prods: products,
      titlePage: 'Admin - Products',
      path: '/admin/view-products',
    });
  });
};

export const postProduct = (req: Request, res: Response) => {
  const { title, price, description, imageUrl } = req.body;

  new Product({ title, price, imageUrl, description }).save();

  // console.log({ data: req.body, params: req.params });
  res.redirect('/');
};
