import { Request, Response } from 'express';
import { Product } from '../models/admin';
import type { IProduct } from '../types/types';

export const getStore = (_: Request, res: Response) => {
  Product.fetchAll((products: IProduct) => {
    // console.log(products);
    res.render('shop/index', { prods: products, titlePage: 'Home - Shop', path: '/' });
  });
};

export const getProductDetail = (req: Request, res: Response) => {
  const { productId } = req.params;
  console.log({ productId });
  res.redirect('/');
};
